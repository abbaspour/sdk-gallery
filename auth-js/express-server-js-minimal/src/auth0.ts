import type { Request, Response, NextFunction } from 'express';
import express from 'express';
import {
  CookieTransactionStore,
  ServerClient,
  StatelessStateStore,
} from '@auth0/auth0-server-js';
import { StoreOptions } from './types.js';
import { ExpressCookieHandler } from './store/express-cookie-handler.js';
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
    console.log(`host: ${host}`);
    if (!host) {
      console.log(`no host. going with default ${defaultAuth0Domain}`);
      return defaultAuth0Domain;
    }
    if (host === 'local.abbaspour.net:4000') {
      console.log(`host is local.abbaspour.net. going to amcd`)
      return 'amcd-id.gallery.abbaspour.net';
    }
    console.log(`going with default`);
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
    stateStore: new StatelessStateStore(
      {
        secret: options.sessionSecret,
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
