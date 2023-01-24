import crypto from "node:crypto";

export class InMemorySessionStore {
  sessions: Map<any, any>;

  constructor() {
    this.sessions = new Map();
  }

  findSession(id: string): any {
    return this.sessions.get(id);
  }

  saveSession(id: string, session: Record<string, string | boolean>): void {
    this.sessions.set(id, session);
  }

  findAllSessions(): any[] {
    return [...this.sessions.values()];
  }
}

export const randomId = () => crypto.randomBytes(8).toString("hex");
