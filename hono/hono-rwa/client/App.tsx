import React from 'react';
import { UserMFAMgmt } from '@auth0/web-ui-components-react';

export type Me = {
  authenticated: boolean;
  name?: string;
};

type Props = {
  me: Me | null;
  loading?: boolean;
};

export function App({ me, loading = false }: Props) {
  return (
    <>
      <header style={styles.header}>
        <h1 style={styles.h1}>Hono RWA + React</h1>
      </header>
      <main style={styles.main}>
        {loading && <p>Loading…</p>}
        {!loading && (
          <>
            {me?.authenticated ? (
              <>
                <h2 style={styles.h2}>Hello {me.name ?? 'user'}!</h2>
                <p>You are authenticated.</p>
                <div style={{ marginTop: '1rem' }}>
                  <button onClick={() => (window.location.href = '/logout')} style={styles.button}>
                    Logout
                  </button>
                </div>
                <div className="card">
                    <UserMFAMgmt />
                </div>
              </>
            ) : (
              <>
                <h2 style={styles.h2}>Welcome</h2>
                <p>You are not logged in.</p>
                <div style={{ marginTop: '1rem' }}>
                  <button onClick={() => (window.location.href = '/login')} style={styles.button}>
                    Login
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </main>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  header: {
    padding: '1rem 1.25rem',
    borderBottom: '1px solid #e5e7eb22',
  },
  main: {
    padding: '1.25rem',
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
  },
  h1: { margin: 0, fontSize: '1.25rem' },
  h2: { marginTop: 0 },
  button: {
    cursor: 'pointer',
    padding: '.5rem .9rem',
    borderRadius: '.375rem',
    border: '1px solid #e5e7eb55',
    background: '#3b82f6',
    color: 'white',
  },
};

export default App;
