import type { SessionStore, StateData, LogoutTokenClaims } from '@auth0/auth0-server-js';
import type { StoreOptions } from '../types.js';

export class MemorySessionStore implements SessionStore<StoreOptions> {
  private store = new Map<string, StateData>();

  async set(identifier: string, stateData: StateData): Promise<void> {
    this.store.set(identifier, stateData);
  }

  async get(identifier: string): Promise<StateData | undefined> {
    return this.store.get(identifier);
  }

  async delete(identifier: string): Promise<void> {
    this.store.delete(identifier);
  }

  async deleteByLogoutToken(claims: LogoutTokenClaims, _options?: StoreOptions): Promise<void> {
    for (const [identifier, stateData] of this.store.entries()) {
      const matchesSid = claims.sid && stateData.internal?.sid === claims.sid;
      const matchesSub = claims.sub && stateData.user?.sub === claims.sub;
      if (matchesSid || matchesSub) {
        this.store.delete(identifier);
      }
    }
  }
}
