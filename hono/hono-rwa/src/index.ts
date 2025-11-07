import { Hono } from 'hono';
import { auth, type OIDCEnv } from '@auth0/auth0-hono';

type Bindings = {
    AUTH0_DOMAIN: string;
    AUTH0_CLIENT_ID: string;
    AUTH0_CLIENT_SECRET: string;
    BASE_URL: string;
    AUTH0_SESSION_ENCRYPTION_KEY: string;
};

// Create the Hono app
const app = new Hono<OIDCEnv<Bindings>>();

// Configure auth middleware with custom routes and no global auth requirement
app.use(
    auth({
        routes: { login: '/login', callback: '/auth/callback', logout: '/logout' },
        authRequired: false,
    })
);

// API endpoint to return current session info
app.get('/api/me', async (c) => {
    const session = await c.var.auth0Client?.getSession(c);
    const authenticated = Boolean(session?.user);
    const name =
        (session?.user as any)?.name ||
        (session?.user as any)?.nickname ||
        (session?.user as any)?.email;

    return c.json({ authenticated, ...(authenticated ? { name } : {}) });
});

// Authenticated proxy to Auth0 /me/v1/*
app.all('/proxy/*', async (c) => {
    // Ensure the user is authenticated
    const session = await c.var.auth0Client?.getSession(c);
    if (!session?.user) {
        return c.text('Unauthorized', 401);
    }

    // Build target URL: AUTH0_DOMAIN/me/v1/<rest-of-path>?<query>
    const prefix = '/proxy/me/';
    const rest = c.req.path.startsWith(prefix) ? c.req.path.slice(prefix.length) : '';
    const search = new URL(c.req.url).search;
    const domain = (c.env.AUTH0_DOMAIN || '').replace(/\/$/, '');
    const targetUrl = `https://${domain}/me/v1/${rest}${search}`;

    // Forward method, headers, and body
    const method = c.req.method;
    const headers = new Headers(c.req.raw.headers);
    // Let the runtime set the Host header
    headers.delete('host');

    const hasBody = !['GET', 'HEAD'].includes(method.toUpperCase());
    const body = hasBody ? c.req.raw.body : undefined;

    const resp = await fetch(targetUrl, {
        method,
        headers,
        body,
        redirect: 'manual',
    });

    // Stream back the response as-is
    return new Response(resp.body, {
        status: resp.status,
        headers: resp.headers,
    });
});

// noinspection JSUnusedGlobalSymbols
export default app;
