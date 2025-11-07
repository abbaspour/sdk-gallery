import {Hono} from 'hono';
import {auth, type OIDCEnv} from '@auth0/auth0-hono';

type Bindings = {
    AUTH0_DOMAIN: string;
    AUTH0_CLIENT_ID: string;
    AUTH0_CLIENT_SECRET: string;
    BASE_URL: string;
    AUTH0_SESSION_ENCRYPTION_KEY: string;
};

// Create the Hono app
const app = new Hono<OIDCEnv<Bindings>>();

// Configure auth middleware
app.use(auth());

// Add a simple protected route
app.get('/', async (c) => {
    const session = await c.var.auth0Client?.getSession(c);
    return c.text(`Hello ${session?.user?.name ?? 'user'}!
    You are authenticated.`);
});

// noinspection JSUnusedGlobalSymbols
export default app;
