/**
 * Real TypeScript implementation examples for each subject.
 * These are injected into lesson modals as "Real Implementation" sections.
 * Full projects: /projects/devlearn-ts-projects/
 */

const PROJECT_EXAMPLES = {

  eda: {
    title: 'EventBus — Production Implementation',
    description: 'A full EventBus with wildcard subscriptions, middleware pipeline, and error isolation. This powers the e-commerce order flow demo.',
    lang: 'ts',
    code: `// EventBus: The core of any EDA system
class EventBus {
  private subscriptions = new Map<string, AsyncEventHandler[]>();
  private middlewares: Middleware[] = [];

  // Subscribe to an exact or wildcard topic
  subscribe(topic: string, handler: AsyncEventHandler): void {
    const handlers = this.subscriptions.get(topic) || [];
    handlers.push(handler);
    this.subscriptions.set(topic, handlers);
  }

  // Add middleware (logging, rate-limiting, tracing)
  use(middleware: Middleware): void {
    this.middlewares.push(middleware);
  }

  async publish(topic: string, data: any): Promise<void> {
    const event: BusEvent = {
      topic, data,
      id: Math.random().toString(36).slice(2),
      timestamp: new Date().toISOString(),
    };
    // Run middleware pipeline, then dispatch to all matching handlers
    await this.runPipeline(event);
  }

  private async dispatch(event: BusEvent): Promise<void> {
    // Find handlers for exact topic AND wildcards (e.g. "order.*")
    const handlers: AsyncEventHandler[] = [];
    for (const [pattern, fns] of this.subscriptions) {
      if (this.matches(pattern, event.topic)) handlers.push(...fns);
    }
    // Run all handlers in parallel — errors are isolated
    await Promise.allSettled(handlers.map(fn => fn(event)));
  }

  private matches(pattern: string, topic: string): boolean {
    if (pattern === topic) return true;
    if (pattern.endsWith('*')) {
      return topic.startsWith(pattern.slice(0, -1));
    }
    return false;
  }
}

// — Usage —
const bus = new EventBus();

// Logging middleware (cross-cutting concern)
bus.use(async (event, next) => {
  console.log(\`[EVENT] \${event.topic}\`, event.data);
  await next();
});

// Subscribe: inventory, email, analytics — all decoupled
bus.subscribe('order.placed', async ({ data }) => {
  await inventory.reserve(data.items);
});
bus.subscribe('order.*', async ({ topic, data }) => {
  await analytics.track(topic, data); // catches all order events
});

// Publish — publisher knows nothing about who's listening
await bus.publish('order.placed', { orderId: 'ORD-001', items: [...] });`
  },

  redis: {
    title: 'Redis Patterns — Session Cache + Rate Limiter',
    description: 'Production-ready Redis patterns: session caching with TTL, sliding window rate limiter, and a leaderboard using sorted sets.',
    lang: 'ts',
    code: `import Redis from 'ioredis';
const redis = new Redis({ host: 'localhost', port: 6379 });

// ── Pattern 1: Session Cache ──────────────────────────────────
class SessionCache {
  async set(sessionId: string, user: UserSession, ttl = 3600) {
    // SET session:abc123 <json> EX 3600
    await redis.set(\`session:\${sessionId}\`, JSON.stringify(user), 'EX', ttl);
  }

  async get(sessionId: string): Promise<UserSession | null> {
    const raw = await redis.get(\`session:\${sessionId}\`);
    return raw ? JSON.parse(raw) : null;
  }
}

// ── Pattern 2: Sliding Window Rate Limiter ───────────────────
class RateLimiter {
  async isAllowed(userId: string, limit = 100, windowMs = 60_000): Promise<boolean> {
    const key = \`ratelimit:\${userId}\`;
    const now = Date.now();
    const windowStart = now - windowMs;

    const pipeline = redis.pipeline();
    pipeline.zremrangebyscore(key, '-inf', windowStart); // remove old requests
    pipeline.zadd(key, now, \`\${now}-\${Math.random()}\`); // add this request
    pipeline.zcard(key);                                 // count in window
    pipeline.pexpire(key, windowMs);                     // auto-cleanup
    const results = await pipeline.exec();

    const count = results?.[2]?.[1] as number;
    return count <= limit;
  }
}

// ── Pattern 3: Leaderboard (Sorted Set) ──────────────────────
class Leaderboard {
  async addScore(board: string, userId: string, score: number) {
    await redis.zadd(board, score, userId); // O(log N)
  }

  async getTop(board: string, n = 10) {
    // ZREVRANGE returns highest scores first
    return redis.zrevrange(board, 0, n - 1, 'WITHSCORES');
  }

  async getRank(board: string, userId: string) {
    return redis.zrevrank(board, userId); // 0-indexed rank
  }
}`
  },

  docker: {
    title: 'Dockerfile Generator — TypeScript Builder API',
    description: 'Programmatically generate production-ready Dockerfiles and docker-compose.yml files with a fluent TypeScript API.',
    lang: 'ts',
    code: `// Fluent Dockerfile builder — generates valid Dockerfile strings
class DockerfileBuilder {
  private instructions: string[] = [];

  from(image: string, tag = 'latest', alias?: string): this {
    this.instructions.push(alias
      ? \`FROM \${image}:\${tag} AS \${alias}\`
      : \`FROM \${image}:\${tag}\`);
    return this;
  }

  workdir(path: string): this {
    this.instructions.push(\`WORKDIR \${path}\`);
    return this;
  }

  copy(src: string, dest: string, from?: string): this {
    this.instructions.push(from
      ? \`COPY --from=\${from} \${src} \${dest}\`
      : \`COPY \${src} \${dest}\`);
    return this;
  }

  run(...commands: string[]): this {
    this.instructions.push(\`RUN \${commands.join(' && \\\\\n    ')}\`);
    return this;
  }

  env(vars: Record<string, string>): this {
    const pairs = Object.entries(vars).map(([k, v]) => \`\${k}=\${v}\`).join(' \\\n    ');
    this.instructions.push(\`ENV \${pairs}\`);
    return this;
  }

  expose(port: number): this {
    this.instructions.push(\`EXPOSE \${port}\`);
    return this;
  }

  cmd(command: string[]): this {
    this.instructions.push(\`CMD [\${command.map(c => \`"\${c}"\`).join(', ')}]\`);
    return this;
  }

  build(): string {
    return this.instructions.join('\n') + '\n';
  }
}

// Usage — multi-stage Node.js build
const dockerfile = new DockerfileBuilder()
  .from('node', '20-alpine', 'builder')
  .workdir('/app')
  .copy('package*.json', '.')
  .run('npm ci --only=production')
  .copy('.', '.')
  .run('npm run build')
  .from('node', '20-alpine')          // final stage
  .workdir('/app')
  .copy('/app/dist', './dist', 'builder')
  .copy('/app/node_modules', './node_modules', 'builder')
  .env({ NODE_ENV: 'production', PORT: '3000' })
  .expose(3000)
  .cmd(['node', 'dist/index.js'])
  .build();

console.log(dockerfile);`
  },

  graphql: {
    title: 'Apollo Server — GraphQL Schema + DataLoader',
    description: 'A full GraphQL server with type-safe schema, resolvers, and DataLoader to solve the N+1 query problem.',
    lang: 'ts',
    code: `import { ApolloServer } from '@apollo/server';
import DataLoader from 'dataloader';

// ── Schema ────────────────────────────────────────────────────
const typeDefs = \`#graphql
  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
  }

  type Query {
    user(id: ID!): User
    posts: [Post!]!
  }

  type Mutation {
    createPost(title: String!, body: String!, authorId: ID!): Post!
    addComment(postId: ID!, text: String!, authorId: ID!): Comment!
  }
\`;

// ── DataLoader: batch + cache user lookups ────────────────────
// Without DataLoader: fetching 10 posts = 10 separate user queries (N+1)
// With DataLoader: all 10 user IDs are batched into ONE lookup
const userLoader = new DataLoader<string, User>(async (ids) => {
  const users = await db.users.findMany({ where: { id: { in: [...ids] } } });
  return ids.map(id => users.find(u => u.id === id) ?? new Error(\`User \${id} not found\`));
});

// ── Resolvers ─────────────────────────────────────────────────
const resolvers = {
  Query: {
    user: (_: any, { id }: { id: string }) => userLoader.load(id),
    posts: () => db.posts.findAll(),
  },
  Post: {
    // DataLoader batches these — 100 posts = 1 DB query, not 100
    author: (post: Post) => userLoader.load(post.authorId),
    comments: (post: Post) => db.comments.findByPostId(post.id),
  },
  Mutation: {
    createPost: async (_: any, args: CreatePostInput) => {
      const post = await db.posts.create(args);
      pubsub.publish('POST_CREATED', { postCreated: post });
      return post;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
// Start: server listens on http://localhost:4000/graphql`
  },

  rq: {
    title: 'React Query Cache — Core Mechanics',
    description: 'The core stale-while-revalidate cache, background refetch, and optimistic update patterns that power React Query.',
    lang: 'ts',
    code: `// Simplified React Query cache mechanics in plain TypeScript
type QueryState<T> = {
  data: T | undefined;
  status: 'idle' | 'loading' | 'success' | 'error';
  error: Error | null;
  lastUpdatedAt: number;
  isFetching: boolean;
};

class QueryCache {
  private cache = new Map<string, QueryState<any>>();
  private staleTime: number; // ms before data is considered stale

  constructor({ staleTime = 0 } = {}) {
    this.staleTime = staleTime;
  }

  isStale(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry || !entry.lastUpdatedAt) return true;
    return Date.now() - entry.lastUpdatedAt > this.staleTime;
  }

  async fetch<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
    const cached = this.cache.get(key);

    // Stale-While-Revalidate: return cached data immediately,
    // then refetch in the background
    if (cached?.data !== undefined && !this.isStale(key)) {
      return cached.data;
    }

    this.setFetching(key, true);
    try {
      const data = await this.withRetry(fetcher); // retry with backoff
      this.cache.set(key, {
        data, status: 'success', error: null,
        lastUpdatedAt: Date.now(), isFetching: false
      });
      return data;
    } catch (error) {
      this.cache.set(key, {
        ...cached,
        status: 'error',
        error: error as Error,
        isFetching: false
      } as QueryState<T>);
      throw error;
    }
  }

  // Optimistic update: update cache immediately, rollback on failure
  async mutate<T>(key: string, mutation: () => Promise<T>, optimisticData: T) {
    const previous = this.cache.get(key);
    this.cache.set(key, { ...previous, data: optimisticData } as QueryState<T>);
    try {
      await mutation();
      this.invalidate(key); // trigger background refetch
    } catch (err) {
      this.cache.set(key, previous!); // rollback
      throw err;
    }
  }

  invalidate(key: string) {
    const entry = this.cache.get(key);
    if (entry) this.cache.set(key, { ...entry, lastUpdatedAt: 0 });
  }

  private async withRetry<T>(fn: () => Promise<T>, attempts = 3): Promise<T> {
    for (let i = 0; i < attempts; i++) {
      try { return await fn(); }
      catch (e) {
        if (i === attempts - 1) throw e;
        await new Promise(r => setTimeout(r, 2 ** i * 1000)); // exponential backoff
      }
    }
    throw new Error('unreachable');
  }
}`
  },

  kubernetes: {
    title: 'Kubernetes Manifest Generator',
    description: 'Programmatically generate production-ready Kubernetes manifests with a TypeScript builder API.',
    lang: 'ts',
    code: `// Type-safe Kubernetes manifest builder
class DeploymentBuilder {
  private manifest: any;

  constructor(name: string, namespace = 'default') {
    this.manifest = {
      apiVersion: 'apps/v1',
      kind: 'Deployment',
      metadata: { name, namespace, labels: { app: name } },
      spec: {
        replicas: 1,
        selector: { matchLabels: { app: name } },
        template: {
          metadata: { labels: { app: name } },
          spec: { containers: [] }
        }
      }
    };
  }

  replicas(n: number): this {
    this.manifest.spec.replicas = n;
    return this;
  }

  container(opts: {
    name: string; image: string; port: number;
    env?: Record<string, string>;
    resources?: { cpu: string; memory: string };
  }): this {
    this.manifest.spec.template.spec.containers.push({
      name: opts.name,
      image: opts.image,
      ports: [{ containerPort: opts.port }],
      env: opts.env
        ? Object.entries(opts.env).map(([name, value]) => ({ name, value }))
        : [],
      resources: opts.resources ? {
        requests: { cpu: opts.resources.cpu, memory: opts.resources.memory },
        limits:   { cpu: opts.resources.cpu, memory: opts.resources.memory },
      } : undefined,
    });
    return this;
  }

  build() { return this.manifest; }
}

// Generate a full production deployment
const deployment = new DeploymentBuilder('api-server', 'production')
  .replicas(3)
  .container({
    name: 'api',
    image: 'myapp/api:v1.2.3',
    port: 3000,
    env: { NODE_ENV: 'production', LOG_LEVEL: 'info' },
    resources: { cpu: '250m', memory: '256Mi' },
  })
  .build();

// Generates valid YAML:
// apiVersion: apps/v1
// kind: Deployment
// metadata: { name: api-server, namespace: production }
// spec: { replicas: 3, ... }

import { dump } from 'js-yaml';
import { writeFileSync } from 'fs';
writeFileSync('output/deployment.yaml', dump(deployment));`
  },

  postgres: {
    title: 'PostgreSQL Query Builder + Migration Runner',
    description: 'Type-safe query builder with fluent API, automatic transaction handling, and a migration runner with up/down support.',
    lang: 'ts',
    code: `import { Pool } from 'pg';
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// ── Fluent Query Builder ──────────────────────────────────────
class QueryBuilder<T = any> {
  private _table = '';
  private _conditions: string[] = [];
  private _params: any[] = [];
  private _orderBy = '';
  private _limit?: number;
  private _joins: string[] = [];

  static from<T>(table: string): QueryBuilder<T> {
    const qb = new QueryBuilder<T>();
    qb._table = table;
    return qb;
  }

  where(condition: string, ...params: any[]): this {
    this._conditions.push(condition.replace(/\?/g, () => \`$\${this._params.length + params.indexOf(params.shift()!) + 1}\`));
    this._params.push(...params);
    return this;
  }

  join(table: string, on: string): this {
    this._joins.push(\`JOIN \${table} ON \${on}\`);
    return this;
  }

  orderBy(col: string, dir: 'ASC' | 'DESC' = 'ASC'): this {
    this._orderBy = \`ORDER BY \${col} \${dir}\`;
    return this;
  }

  limit(n: number): this { this._limit = n; return this; }

  async execute(): Promise<T[]> {
    const where = this._conditions.length
      ? \`WHERE \${this._conditions.join(' AND ')}\` : '';
    const sql = [\`SELECT * FROM \${this._table}\`,
      ...this._joins, where, this._orderBy,
      this._limit ? \`LIMIT \${this._limit}\` : ''
    ].filter(Boolean).join('\n');

    const { rows } = await pool.query(sql, this._params);
    return rows as T[];
  }
}

// ── Transaction Helper ────────────────────────────────────────
async function withTransaction<T>(fn: (client: any) => Promise<T>): Promise<T> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await fn(client);
    await client.query('COMMIT');
    return result;
  } catch (err) {
    await client.query('ROLLBACK'); // automatic rollback on any error
    throw err;
  } finally {
    client.release();
  }
}

// ── Usage ─────────────────────────────────────────────────────
const users = await QueryBuilder.from<User>('users')
  .join('posts', 'posts.user_id = users.id')
  .where('users.created_at > ?', new Date('2024-01-01'))
  .orderBy('users.name')
  .limit(20)
  .execute();

// Transfer funds — atomically
await withTransaction(async (client) => {
  await client.query('UPDATE accounts SET balance = balance - $1 WHERE id = $2', [100, fromId]);
  await client.query('UPDATE accounts SET balance = balance + $1 WHERE id = $2', [100, toId]);
});`
  },

  typescript: {
    title: 'Advanced TypeScript Patterns',
    description: 'Branded types, discriminated unions, template literal routing, and deep utility types — patterns used in production TypeScript codebases.',
    lang: 'ts',
    code: `// ── Branded Types: prevent mixing IDs ───────────────────────
type Brand<T, B> = T & { readonly __brand: B };
type UserId  = Brand<string, 'UserId'>;
type PostId  = Brand<string, 'PostId'>;

const userId = 'u-123' as UserId;
const postId = 'p-456' as PostId;

function getUser(id: UserId) { /* ... */ }
getUser(userId); // ✅
getUser(postId); // ❌ Error: Argument of type 'PostId' is not assignable to 'UserId'

// ── Discriminated Unions: type-safe state machine ─────────────
type OrderState =
  | { status: 'pending';   orderId: string }
  | { status: 'confirmed'; orderId: string; confirmedAt: Date }
  | { status: 'shipped';   orderId: string; trackingCode: string }
  | { status: 'delivered'; orderId: string; deliveredAt: Date };

function handleOrder(order: OrderState) {
  switch (order.status) {
    case 'pending':   return \`Awaiting confirmation: \${order.orderId}\`;
    case 'shipped':   return \`Tracking: \${order.trackingCode}\`; // ✅ trackingCode available
    case 'delivered': return \`Delivered at \${order.deliveredAt}\`; // ✅ deliveredAt available
  }
}

// ── Template Literal Types: type-safe API routes ─────────────
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type ApiRoute = \`/\${string}\`;
type ApiEndpoint = \`\${HttpMethod} \${ApiRoute}\`;

function apiCall(endpoint: ApiEndpoint) { /* ... */ }
apiCall('GET /users');       // ✅
apiCall('POST /posts/123');  // ✅
apiCall('FETCH /users');     // ❌ Error: 'FETCH' is not assignable

// ── Deep Utility Types ────────────────────────────────────────
type DeepPartial<T> = T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T;

type DeepReadonly<T> = T extends object
  ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : T;

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
// UnwrapPromise<Promise<User>> → User

// ── Builder Pattern with full type inference ──────────────────
class RequestBuilder<T extends Record<string, any> = {}> {
  private config = {} as T;

  set<K extends string, V>(key: K, value: V): RequestBuilder<T & Record<K, V>> {
    (this.config as any)[key] = value;
    return this as any;
  }

  build(): T { return this.config; }
}

const req = new RequestBuilder()
  .set('url', '/api/users')
  .set('method', 'GET')
  .set('timeout', 5000)
  .build();
// req is typed as { url: string, method: string, timeout: number } ✅`
  },
};

// Mapping from subject ID to project example key
const SUBJECT_EXAMPLE_MAP = {
  eda: 'eda',
  redis: 'redis',
  docker: 'docker',
  graphql: 'graphql',
  rq: 'rq',
  kubernetes: 'kubernetes',
  postgres: 'postgres',
  typescript: 'typescript',
};
