import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App, { type Me } from './App';
import { Auth0ComponentProvider  } from '@auth0/web-ui-components-react';

function Root() {
  const [me, setMe] = useState<Me | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
      (async () => {
      try {
        const res = await fetch('/api/me', { credentials: 'include' });
        if (!res.ok) throw new Error('Failed to load session');
        const data = (await res.json()) as Me;
        if (!cancelled) setMe(data);
      } catch (e) {
        if (!cancelled) setMe({ authenticated: false });
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return <Auth0ComponentProvider>
        <App me={me} loading={loading} />
    </Auth0ComponentProvider>;
}

const el = document.getElementById('root');
if (el) {
  const root = createRoot(el);
  root.render(<Root />);
}
