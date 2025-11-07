import { Hono } from 'hono';
import { auth, requiresAuth, type OIDCEnv } from '@auth0/auth0-hono';

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

// Protected home route that renders a minimal React app for authenticated users
app.get('/', requiresAuth(), async (c) => {
    const session = await c.var.auth0Client?.getSession(c);
    const name = session?.user?.name ?? 'user';

    const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Hono RWA + React</title>
  <style>
    :root { color-scheme: light dark; }
    body { font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"; margin: 0; padding: 0; }
    header { padding: 1rem 1.25rem; border-bottom: 1px solid #e5e7eb22; }
    main { padding: 1.25rem; }
    button { cursor: pointer; padding: .5rem .9rem; border-radius: .375rem; border: 1px solid #e5e7eb55; background: #3b82f6; color: white; }
    button:hover { background: #2563eb; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script>
    window.__USER_NAME__ = ${JSON.stringify(name)};
  </script>
  <script type="module">
    import React from 'https://esm.sh/react@18.3.1';
    import { createRoot } from 'https://esm.sh/react-dom@18.3.1/client';

    const e = React.createElement;

    function App() {
      const userName = window.__USER_NAME__ || 'user';
      return e('main', null,
        e('h1', null, 'Hello ' + userName + '!'),
        e('p', null, 'You are authenticated.'),
        e('div', { style: { marginTop: '1rem' } },
          e('button', { onClick: () => { window.location.href = '/auth/logout'; } }, 'Logout')
        )
      );
    }

    const root = createRoot(document.getElementById('root'));
    root.render(e(App));
  </script>
</body>
</html>`;

    return c.html(html);
});

// noinspection JSUnusedGlobalSymbols
export default app;
