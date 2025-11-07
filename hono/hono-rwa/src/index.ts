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

// noinspection JSUnusedGlobalSymbols
export default app;
