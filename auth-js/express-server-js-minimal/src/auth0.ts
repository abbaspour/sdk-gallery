import type { Request, Response, NextFunction } from 'express';
import express from 'express';
import {
  CookieTransactionStore,
  ServerClient,
  StatefulStateStore,
} from '@auth0/auth0-server-js';
import { StoreOptions } from './types.js';
import { ExpressCookieHandler } from './store/express-cookie-handler.js';
import { MemorySessionStore } from './store/memory-session-store.js';
import type { DomainResolver, DomainResolverContext } from '@auth0/auth0-server-js';

export interface Auth0ExpressOptions {
  domain: string;
  clientId: string;
  clientSecret: string;
  appBaseUrl: string;
  sessionSecret: string;
}

declare module 'express' {
  interface Request {
    auth0Client: ServerClient<StoreOptions>;
  }
}

export function auth0(options: Auth0ExpressOptions) {
  const callbackPath = '/auth/callback';
  const redirectUri = new URL(callbackPath, options.appBaseUrl);

  const defaultAuth0Domain = 'smcd-id.gallery.abbaspour.net';

  const domainResolver: DomainResolver<StoreOptions> = async ({ storeOptions }: DomainResolverContext<StoreOptions>) => {
    const host = storeOptions?.request?.headers.host;
    //console.log(`host: ${host}`);
    if (!host) {
      //console.log(`no host. going with default ${defaultAuth0Domain}`);
      return defaultAuth0Domain;
    }
    if (host === 'local.abbaspour.net:4000' || host === 'local.abbaspour.net') {
      //console.log(`host is local.abbaspour.net. going to amcd`)
      return 'amcd-id.gallery.abbaspour.net';
    }
    //console.log(`going with default`);
    return defaultAuth0Domain;
  };

  const auth0Client = new ServerClient<StoreOptions>({
    //domain: options.domain,
    domain: domainResolver,
    clientId: options.clientId,
    clientSecret: options.clientSecret,
    authorizationParams: {
      redirect_uri: redirectUri.toString(),
    },
    transactionStore: new CookieTransactionStore(
      {
        secret: options.sessionSecret,
      },
      new ExpressCookieHandler()
    ),
    stateStore: new StatefulStateStore(
      {
        secret: options.sessionSecret,
        store: new MemorySessionStore(),
      },
      new ExpressCookieHandler()
    ),
  });

  //@ts-expect-error TypeScript doesnt like this
  const router = new express.Router();

  router.use(async (req: Request, res: Response, next: NextFunction) => {
    req.auth0Client = auth0Client;
    next();
  });

  router.get('/auth/login', async (request: Request, response: Response) => {
    const authorizationUrl = await request.auth0Client.startInteractiveLogin(
      {
        appState: { returnTo: options.appBaseUrl },
      },
      { request, response }
    );

    response.redirect(authorizationUrl.href);
  });

  router.get('/auth/callback', async (request: Request, response: Response) => {
    const { appState } = await request.auth0Client.completeInteractiveLogin<
      { returnTo: string } | undefined
    >(new URL(request.url, options.appBaseUrl), { request, response });

    response.redirect(appState?.returnTo ?? options.appBaseUrl);
  });

  router.post('/auth/backchannel-logout',
    express.urlencoded({ extended: false }),
    async (request: Request, response: Response) => {
      const logoutToken = request.body?.logout_token;
      if (!logoutToken) {
        response.status(400).send('Missing logout_token');
        return;
      }
      console.log(`logoutToken: ${logoutToken}`);
      try {
        await request.auth0Client.handleBackchannelLogout(logoutToken, { request, response });
        response.status(204).send();
      } catch (err) {
        console.error('Backchannel logout error:', err);
        response.status(400).send('Logout token invalid');
      }
    }
  );

  router.get('/auth/logout', async (request: Request, response: Response) => {
    const returnTo = options.appBaseUrl;
    const logoutUrl = await request.auth0Client.logout(
      { returnTo: returnTo.toString() },
      { request, response }
    );

    response.redirect(logoutUrl.href);
  });

  return router;
}
