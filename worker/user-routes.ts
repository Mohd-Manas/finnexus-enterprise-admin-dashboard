import { Hono } from "hono";
import type { Env } from './core-utils';
import { UserEntity, ChatBoardEntity } from "./entities";
import { ok, bad } from './core-utils';
import { SYSTEM_STATS, PROJECT_TASKS } from "@shared/mock-data";
import { User } from "@shared/types";
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  app.get('/api/test', (c) => c.json({ success: true, data: { name: 'FinNexus API V1' }}));
  // SYSTEM STATS
  app.get('/api/stats', async (c) => {
    return ok(c, SYSTEM_STATS);
  });
  // INVITE GENERATION
  app.post('/api/invites', async (c) => {
    const token = crypto.randomUUID();
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000;
    const inviteUrl = `${new URL(c.req.url).origin}/login?invite=${token}`;
    // Create Guest User in DB
    const guestUser: User = { 
      id: `guest-${token}`, 
      name: `Guest_${token.slice(0, 4)}`, 
      role: 'guest', 
      status: 'active', 
      expiresAt 
    };
    await UserEntity.create(c.env, guestUser);
    return ok(c, { token, inviteUrl, expiresAt });
  });
  // TASKS (Simulated)
  app.get('/api/tasks', async (c) => {
    return ok(c, PROJECT_TASKS);
  });
  // USERS
  app.get('/api/users', async (c) => {
    await UserEntity.ensureSeed(c.env);
    const cq = c.req.query('cursor');
    const lq = c.req.query('limit');
    const page = await UserEntity.list(c.env, cq ?? null, lq ? Math.max(1, (Number(lq) | 0)) : undefined);
    return ok(c, page);
  });
  app.post('/api/users', async (c) => {
    const { name } = (await c.req.json()) as { name?: string };
    if (!name?.trim()) return bad(c, 'name required');
    return ok(c, await UserEntity.create(c.env, { id: crypto.randomUUID(), name: name.trim() }));
  });
  // CHATS (Used for Internal Comms)
  app.get('/api/chats', async (c) => {
    await ChatBoardEntity.ensureSeed(c.env);
    const cq = c.req.query('cursor');
    const lq = c.req.query('limit');
    const page = await ChatBoardEntity.list(c.env, cq ?? null, lq ? Math.max(1, (Number(lq) | 0)) : undefined);
    return ok(c, page);
  });
  app.delete('/api/users/:id', async (c) => ok(c, { id: c.req.param('id'), deleted: await UserEntity.delete(c.env, c.req.param('id')) }));
}