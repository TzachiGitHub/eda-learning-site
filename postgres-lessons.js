// PostgreSQL Lessons
// Research sources: postgresql.org/docs, use-the-index-luke.com — Feb 2026

const postgresLessons = {

  'p1-1': {
    title: '1.1 Why PostgreSQL?',
    xp: 50,
    content: `
      <div class="hook-story">
        <strong>📸 Instagram, 2011 — 1 million users in 3 months.</strong> They needed a database that could handle explosive growth without rewriting their stack. They chose PostgreSQL. Today, Instagram uses PostgreSQL to store billions of posts and user relationships. Same story at Spotify, Reddit, Apple, GitHub, and Twitch. PostgreSQL has been the <strong>#1 most-used database in the Stack Overflow Developer Survey for two years running</strong> (49% of developers, 2024). It started as a university project in 1986 and has been battle-tested for nearly 40 years.
      </div>
      <div class="why-matters">
        <strong>Why this matters:</strong> PostgreSQL is the default choice for new projects in 2025. It handles everything from simple CRUD apps to massive analytical workloads. Learning it deeply — not just basic SQL — is one of the highest-ROI skills a backend developer can have.
      </div>
      <h3>What makes PostgreSQL special?</h3>
      <ul>
        <li><strong>ACID compliant since 2001</strong> — your data is never corrupted</li>
        <li><strong>MVCC</strong> — readers never block writers (unlike MySQL MyISAM)</li>
        <li><strong>Rich data types</strong> — JSONB, arrays, UUIDs, ranges, enums, geometry</li>
        <li><strong>Advanced indexing</strong> — B-tree, GIN, GiST, BRIN, partial, covering</li>
        <li><strong>Full-text search</strong> — built-in, no Elasticsearch needed for basic use cases</li>
        <li><strong>Extensible</strong> — PostGIS for geospatial, pgvector for AI embeddings, TimescaleDB for time-series</li>
        <li><strong>SQL:2023 compliant</strong> — 170 of 177 mandatory features in version 18</li>
      </ul>
      <div class="who-uses">
        <h4>🏢 Who runs PostgreSQL?</h4>
        <div class="company-list">
          <span class="company">Instagram</span>
          <span class="company">Spotify</span>
          <span class="company">Reddit</span>
          <span class="company">GitHub</span>
          <span class="company">Apple</span>
          <span class="company">Twitch</span>
        </div>
        <p class="company-note">Supabase, Neon, Railway, Render, and Vercel Postgres all run PostgreSQL. It is the database of the modern cloud.</p>
      </div>
      <div class="inline-quiz">
        <h4>⚡ Quick Check</h4>
        <p>What ranking did PostgreSQL achieve in the Stack Overflow Developer Survey 2024?</p>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: PostgreSQL surpassed MySQL in 2023 and held the top spot in 2024.')">2nd — behind MySQL</button>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! PostgreSQL was #1 for the 2nd consecutive year, used by 49% of developers surveyed.')">1st — most used database for the 2nd year in a row</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: SQLite is #1 for embedded use but PostgreSQL leads for server-side development.')">3rd — behind SQLite and MySQL</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: MongoDB is popular for NoSQL, but PostgreSQL leads overall.')">5th — behind MongoDB and Redis</button>
      </div>
      <div class="teach-it-back">
        <h4>🧠 Teach It Back</h4>
        <textarea placeholder="I would choose PostgreSQL over MySQL because..."></textarea>
      </div>
    `
  },

  'p1-2': {
    title: '1.2 Tables, Rows & Data Types',
    xp: 50,
    content: `
      <div class="hook-story">
        <strong>🗂️ The wrong data type costs you later.</strong> A developer stores timestamps as <code>VARCHAR</code>. Querying "all orders in the last 30 days" now requires string parsing. Another developer uses <code>FLOAT</code> for money and discovers rounding errors. PostgreSQL has a rich type system — using the right type saves you from pain at scale.
      </div>
      <div class="why-matters">
        <strong>Why this matters:</strong> PostgreSQL has native JSONB, arrays, UUIDs, and timezone-aware timestamps. Using them correctly means cleaner queries, better performance, and fewer bugs.
      </div>
      <h3>Essential data types</h3>
      <pre><code>-- Numbers
INTEGER         -- 4 bytes, -2B to 2B
BIGINT          -- 8 bytes, use for IDs at scale
NUMERIC(10,2)   -- Exact decimal (use for MONEY, never FLOAT)
SERIAL          -- Auto-incrementing integer (old way)
BIGSERIAL       -- Auto-incrementing bigint

-- Text
TEXT            -- Unlimited length (preferred over VARCHAR in PG)
VARCHAR(100)    -- Limited length string
CHAR(2)         -- Fixed-length (use for country codes etc.)

-- Booleans & Dates
BOOLEAN         -- true / false
DATE            -- 2025-03-01
TIMESTAMP       -- No timezone (avoid in most cases)
TIMESTAMPTZ     -- With timezone (ALWAYS use this)

-- Modern types
UUID            -- gen_random_uuid() since PostgreSQL 13
JSONB           -- Binary JSON, searchable, indexable (better than JSON)
TEXT[]          -- Array of text: ARRAY['tag1', 'tag2']
</code></pre>
      <pre><code>CREATE TABLE users (
  id          BIGSERIAL PRIMARY KEY,
  email       TEXT NOT NULL UNIQUE,
  username    TEXT NOT NULL,
  tags        TEXT[],
  metadata    JSONB,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);</code></pre>
      <p><strong>Key rules:</strong> Always use <code>TIMESTAMPTZ</code> not <code>TIMESTAMP</code>. Use <code>NUMERIC</code> not <code>FLOAT</code> for money. Prefer <code>TEXT</code> over <code>VARCHAR</code> in PostgreSQL (no performance difference, more flexible).</p>
      <div class="inline-quiz">
        <h4>⚡ Quick Check</h4>
        <p>You need to store a product price (e.g. $9.99). Which data type should you use?</p>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: FLOAT uses binary floating-point and has rounding errors. 0.1 + 0.2 = 0.30000000000000004 in binary floats.')">FLOAT — it handles decimal numbers like 9.99</button>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! NUMERIC(10,2) stores exact decimal values with no rounding errors. Essential for financial data.')">NUMERIC(10,2) — exact decimal with 2 decimal places</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: INTEGER cannot store decimal values like 9.99.')">INTEGER — store cents and divide by 100 in application code</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: TEXT can store "9.99" as a string but you lose ability to do math operations efficiently.')">TEXT — prices are just formatted strings</button>
      </div>
      <div class="teach-it-back">
        <h4>🧠 Teach It Back</h4>
        <textarea placeholder="I should use TIMESTAMPTZ instead of TIMESTAMP because..."></textarea>
      </div>
    `
  },

  'p1-3': {
    title: '1.3 CRUD Operations',
    xp: 50,
    content: `
      <div class="hook-story">
        <strong>🔄 CRUD is the foundation of every app.</strong> Create, Read, Update, Delete — 80% of what your backend does day-to-day. PostgreSQL's SQL is powerful but has some subtleties that trip up developers coming from ORMs — especially around NULL handling, RETURNING clauses, and UPDATE safety.
      </div>
      <div class="why-matters">
        <strong>Why this matters:</strong> Writing efficient CRUD queries directly — not just relying on ORMs — lets you debug slow queries, optimize indexes, and handle edge cases that ORMs hide from you.
      </div>
      <h3>Create — INSERT</h3>
      <pre><code>-- Insert a single row
INSERT INTO users (email, username, tags)
VALUES ('alice@example.com', 'alice', ARRAY['admin', 'beta'])
RETURNING id, created_at;  -- Get the generated values back!

-- Insert multiple rows at once (much faster than multiple INSERTs)
INSERT INTO products (name, price, stock)
VALUES
  ('Widget A', 9.99, 100),
  ('Widget B', 19.99, 50),
  ('Widget C', 4.99, 200);

-- Insert or update (upsert)
INSERT INTO user_settings (user_id, theme, notifications)
VALUES (42, 'dark', true)
ON CONFLICT (user_id)
DO UPDATE SET theme = EXCLUDED.theme, notifications = EXCLUDED.notifications;</code></pre>
      <h3>Read — SELECT</h3>
      <pre><code>-- Basic query
SELECT id, email, created_at
FROM users
WHERE created_at > NOW() - INTERVAL '30 days'
ORDER BY created_at DESC
LIMIT 20 OFFSET 40;  -- Page 3 of results (20 per page)

-- Search in JSONB
SELECT * FROM users WHERE metadata->>'plan' = 'pro';

-- Search in array
SELECT * FROM users WHERE 'admin' = ANY(tags);</code></pre>
      <h3>Update & Delete safely</h3>
      <pre><code>-- Always add WHERE clause! Without it, you update ALL rows.
UPDATE users
SET username = 'alice_updated', updated_at = NOW()
WHERE id = 42
RETURNING id, username, updated_at;

-- Safe delete with RETURNING
DELETE FROM sessions
WHERE expires_at < NOW()
RETURNING id;  -- See what was deleted</code></pre>
      <div class="inline-quiz">
        <h4>⚡ Quick Check</h4>
        <p>What does <code>RETURNING</code> do in an INSERT statement?</p>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: RETURNING does not check constraints — the database does that regardless.')">It validates that the inserted data meets all constraints</button>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! RETURNING returns the specified columns from the newly inserted (or updated/deleted) row. Essential for getting auto-generated IDs without a separate SELECT.')">It returns the values of the inserted row, including auto-generated columns like id and created_at</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: RETURNING is a PostgreSQL feature, not a transaction command. Use BEGIN/COMMIT for transactions.')">It rolls back the insert if the returned value is unexpected</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: RETURNING works for INSERT, UPDATE, and DELETE — not just SELECT.')">It is only valid in SELECT statements</button>
      </div>
      <div class="teach-it-back">
        <h4>🧠 Teach It Back</h4>
        <textarea placeholder="The safest way to write an UPDATE statement is..."></textarea>
      </div>
    `
  },

  'p1-4': {
    title: '1.4 Primary Keys & Foreign Keys',
    xp: 75,
    content: `
      <div class="hook-story">
        <strong>🏦 The orphan record problem:</strong> A developer deletes a user from the <code>users</code> table. The user had 47 orders in the <code>orders</code> table. Now those 47 orders reference a user that does not exist. Reports break. Queries return wrong data. This is exactly what <strong>foreign keys</strong> prevent — they enforce that relationships in your database always make sense.
      </div>
      <div class="why-matters">
        <strong>Why this matters:</strong> Relational integrity is one of the core reasons to use a relational database. Skipping foreign keys is a common shortcut that leads to corrupted, untrustworthy data.
      </div>
      <h3>Primary Keys</h3>
      <pre><code>-- Auto-incrementing bigint (recommended for most tables)
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,   -- Auto-increment, unique, not null
  email TEXT NOT NULL UNIQUE
);

-- UUID primary key (good for distributed systems, public APIs)
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL
);

-- Composite primary key (when uniqueness is across 2 columns)
CREATE TABLE user_roles (
  user_id BIGINT,
  role_id BIGINT,
  PRIMARY KEY (user_id, role_id)
);</code></pre>
      <h3>Foreign Keys</h3>
      <pre><code>CREATE TABLE orders (
  id          BIGSERIAL PRIMARY KEY,
  user_id     BIGINT NOT NULL REFERENCES users(id)
                ON DELETE CASCADE,    -- Delete orders when user is deleted
  product_id  BIGINT NOT NULL REFERENCES products(id)
                ON DELETE RESTRICT,   -- Prevent deleting products that have orders
  quantity    INTEGER NOT NULL CHECK (quantity > 0),
  total       NUMERIC(10,2) NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);</code></pre>
      <h3>ON DELETE options</h3>
      <ul>
        <li><code>RESTRICT</code> — prevent deletion if related rows exist</li>
        <li><code>CASCADE</code> — delete child rows when parent is deleted</li>
        <li><code>SET NULL</code> — set the FK column to NULL</li>
        <li><code>SET DEFAULT</code> — set to the column default value</li>
      </ul>
      <div class="inline-quiz">
        <h4>⚡ Quick Check</h4>
        <p>You have <code>orders.user_id REFERENCES users(id) ON DELETE RESTRICT</code>. What happens if you try to delete a user who has orders?</p>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! ON DELETE RESTRICT prevents the parent row from being deleted if any child rows (orders) still reference it. PostgreSQL raises a foreign key violation error.')">PostgreSQL raises an error and blocks the deletion</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: RESTRICT blocks deletion — it does not cascade. Use ON DELETE CASCADE for that behavior.')">The user is deleted and all their orders are deleted too</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: RESTRICT means the database actively prevents the deletion, not ignores the constraint.')">The user is deleted and the orders now have a NULL user_id</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: PostgreSQL enforces FK constraints by default — they are not advisory.')">Foreign key constraints are advisory — the deletion succeeds but logs a warning</button>
      </div>
      <div class="teach-it-back">
        <h4>🧠 Teach It Back</h4>
        <textarea placeholder="Foreign keys protect data integrity by..."></textarea>
      </div>
    `
  },

  'p1-5': {
    title: '1.5 Indexes — Making Queries Fast',
    xp: 75,
    content: `
      <div class="hook-story">
        <strong>⚡ 1ms vs 5 seconds — same query, one index difference.</strong> A production table has 10 million rows. The query <code>SELECT * FROM users WHERE email = 'alice@example.com'</code> runs in 1ms with an index, and 4.8 seconds without. At 1000 requests per second, that is the difference between a fast app and a down app. A developer at a fintech company discovered this on Black Friday. From <em>use-the-index-luke.com</em>: "The only thing developers need to learn is how to index."
      </div>
      <div class="why-matters">
        <strong>Why this matters:</strong> Indexes are the single highest-impact performance optimization in SQL. Most slow queries are slow because of missing or wrong indexes — not because of bad SQL structure.
      </div>
      <h3>How indexes work</h3>
      <p>Without an index: PostgreSQL scans every row in the table (Sequential Scan) — O(n).</p>
      <p>With a B-tree index: PostgreSQL walks a balanced tree — O(log n). For 10M rows, that is roughly 24 comparisons instead of 10,000,000.</p>
      <pre><code>-- Create an index
CREATE INDEX users_email_idx ON users (email);

-- Create a unique index (also enforces uniqueness)
CREATE UNIQUE INDEX users_email_unique ON users (email);

-- Composite index (useful when you often query by both columns together)
CREATE INDEX orders_user_created_idx ON orders (user_id, created_at DESC);

-- Partial index (only index active users -- smaller, faster)
CREATE INDEX users_active_idx ON users (email) WHERE active = true;

-- Create without blocking writes (production-safe)
CREATE INDEX CONCURRENTLY users_username_idx ON users (username);</code></pre>
      <h3>Index gotchas</h3>
      <ul>
        <li>Indexes slow down <strong>writes</strong> — every INSERT/UPDATE/DELETE must also update all indexes</li>
        <li>Unused indexes are pure waste — they slow writes for no benefit. Drop them.</li>
        <li>The query planner may <strong>ignore</strong> your index if the table is small or the query returns most rows</li>
        <li><code>LIKE 'alice%'</code> can use a B-tree index. <code>LIKE '%alice'</code> cannot.</li>
      </ul>
      <div class="inline-quiz">
        <h4>⚡ Quick Check</h4>
        <p>You have an index on <code>users.email</code>. Your query is <code>SELECT * FROM users WHERE LOWER(email) = 'alice@example.com'</code>. Will the index be used?</p>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: The index is on email, not on LOWER(email). Applying a function prevents index use.')">Yes — PostgreSQL is smart enough to use the email index</button>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! Wrapping a column in a function (LOWER, DATE_TRUNC, etc.) prevents the index from being used. Fix: CREATE INDEX ON users (LOWER(email)) — a functional index.')">No — the LOWER() function prevents index use. You need a functional index on LOWER(email).</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: Whether an index is used depends on the exact expression, not just the column name.')">It depends on the number of rows in the table</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: LOWER() is not equivalent to the index on email — the planner sees them as different expressions.')">Yes — PostgreSQL automatically normalizes case when using indexes</button>
      </div>
      <div class="teach-it-back">
        <h4>🧠 Teach It Back</h4>
        <textarea placeholder="A database index works like a book index because..."></textarea>
      </div>
    `
  },

  'p2-1': {
    title: '2.1 JOINs — Combining Tables',
    xp: 100,
    content: `
      <div class="hook-story">
        <strong>🔗 The N+1 problem:</strong> A developer writes code that fetches 100 users, then for each user makes a separate query to get their orders. That is 101 database queries for what should be 1 JOIN. Their app runs fine locally with 5 users. On production with 100,000 users, it takes 45 seconds to load the dashboard. JOINs exist so you fetch related data in <strong>one</strong> round trip.
      </div>
      <div class="why-matters">
        <strong>Why this matters:</strong> JOINs are how you query across multiple related tables — the fundamental operation that makes relational databases powerful. Mastering them eliminates the N+1 problem.
      </div>
      <h3>JOIN types</h3>
      <pre><code>-- INNER JOIN: only rows that match in BOTH tables
SELECT u.email, o.total, o.created_at
FROM users u
INNER JOIN orders o ON o.user_id = u.id
WHERE o.created_at > NOW() - INTERVAL '30 days';

-- LEFT JOIN: all users, even those with no orders
SELECT u.email, COUNT(o.id) AS order_count
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
GROUP BY u.id, u.email
ORDER BY order_count DESC;

-- Multiple JOINs
SELECT
  u.email,
  o.id AS order_id,
  p.name AS product_name,
  o.quantity,
  o.total
FROM orders o
JOIN users u     ON u.id = o.user_id
JOIN products p  ON p.id = o.product_id
WHERE u.id = 42
ORDER BY o.created_at DESC;</code></pre>
      <h3>Quick reference</h3>
      <ul>
        <li><strong>INNER JOIN</strong> — only matching rows (most common)</li>
        <li><strong>LEFT JOIN</strong> — all rows from left table + matching from right (NULLs for no match)</li>
        <li><strong>RIGHT JOIN</strong> — opposite of LEFT (rarely used — just flip the table order)</li>
        <li><strong>FULL OUTER JOIN</strong> — all rows from both tables, NULLs where no match</li>
      </ul>
      <div class="inline-quiz">
        <h4>⚡ Quick Check</h4>
        <p>You want all users AND their orders, including users who have never placed an order. Which JOIN?</p>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: INNER JOIN only returns users who have at least one order — users with no orders are excluded.')">INNER JOIN — it returns all matching rows between users and orders</button>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! LEFT JOIN returns all rows from the left table (users) and matching rows from the right. Users with no orders get NULL in the order columns.')">LEFT JOIN users TO orders — returns all users, NULLs for those with no orders</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: FULL OUTER JOIN returns all rows from both tables — you would also get orders without a user, which you probably do not want.')">FULL OUTER JOIN — returns all rows from both tables</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: CROSS JOIN is a cartesian product — every user paired with every order. That would be millions of rows.')">CROSS JOIN — pairs every user with every order</button>
      </div>
      <div class="teach-it-back">
        <h4>🧠 Teach It Back</h4>
        <textarea placeholder="The difference between INNER JOIN and LEFT JOIN is..."></textarea>
      </div>
    `
  },

  'p2-2': {
    title: '2.2 Transactions & ACID',
    xp: 100,
    content: `
      <div class="hook-story">
        <strong>🏦 The bank transfer nightmare:</strong> You debit $100 from Alice's account. Your server crashes. You never credit Bob's account. $100 vanishes. <strong>Without transactions, this is possible.</strong> With a transaction, either BOTH operations succeed together or NEITHER does. This is called Atomicity — the A in ACID.
      </div>
      <div class="why-matters">
        <strong>Why this matters:</strong> Any operation that touches multiple rows or tables needs a transaction. Payments, inventory updates, user signups — if they involve 2+ writes, wrap them in a transaction or risk data corruption.
      </div>
      <h3>ACID explained</h3>
      <ul>
        <li><strong>Atomic</strong> — all operations succeed or all are rolled back</li>
        <li><strong>Consistent</strong> — the database moves from one valid state to another</li>
        <li><strong>Isolated</strong> — concurrent transactions cannot see each other\\'s uncommitted changes</li>
        <li><strong>Durable</strong> — committed transactions survive crashes (written to disk via WAL)</li>
      </ul>
      <pre><code>-- Basic transaction
BEGIN;

UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

-- Check for problems
-- If something goes wrong:
ROLLBACK;  -- Undo everything since BEGIN

-- If all good:
COMMIT;  -- Persist everything atomically</code></pre>
      <pre><code>-- In Node.js with pg
const client = await pool.connect();
try {
  await client.query('BEGIN');
  await client.query(
    'UPDATE accounts SET balance = balance - $1 WHERE id = $2',
    [100, senderId]
  );
  await client.query(
    'UPDATE accounts SET balance = balance + $1 WHERE id = $2',
    [100, receiverId]
  );
  await client.query('COMMIT');
} catch (err) {
  await client.query('ROLLBACK');
  throw err;
} finally {
  client.release();
}</code></pre>
      <div class="inline-quiz">
        <h4>⚡ Quick Check</h4>
        <p>You run two UPDATEs in a transaction. The second one fails with a constraint violation. What happens to the first UPDATE?</p>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: Transactions are atomic — partial success is not allowed.')">The first UPDATE is committed, the second is rolled back</button>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! Atomicity means all-or-nothing. When the transaction is rolled back (due to the error), the first UPDATE is also undone.')">Both UPDATEs are rolled back — the transaction is all-or-nothing</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: PostgreSQL marks the transaction as aborted after any error — no further operations can succeed in it.')">The first UPDATE is committed automatically after the second fails</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: PostgreSQL does not selectively commit successful statements within a failed transaction.')">PostgreSQL commits whichever UPDATEs succeeded and skips the failed one</button>
      </div>
      <div class="teach-it-back">
        <h4>🧠 Teach It Back</h4>
        <textarea placeholder="Transactions are needed when..."></textarea>
      </div>
    `
  },

  'p2-3': {
    title: '2.3 MVCC — Readers Never Block Writers',
    xp: 100,
    content: `
      <div class="hook-story">
        <strong>🚦 Old databases used locks like traffic lights.</strong> A reader had to wait for writers to finish, and writers had to wait for readers. At Black Friday scale, with thousands of concurrent queries, this caused massive queue pile-ups. PostgreSQL's MVCC (Multi-Version Concurrency Control) is different: readers and writers <strong>never block each other</strong>. Instagram handles millions of concurrent reads and writes because of this design.
      </div>
      <div class="why-matters">
        <strong>Why this matters:</strong> MVCC is why PostgreSQL scales gracefully under concurrent load. Understanding it explains why your backups do not lock your database, why long-running transactions are dangerous, and why VACUUM exists.
      </div>
      <h3>How MVCC works</h3>
      <p>When you UPDATE a row in PostgreSQL, it does NOT modify the row in place. Instead:</p>
      <ol>
        <li>It marks the old row version as "dead" (but keeps it)</li>
        <li>It creates a new row version with the updated data</li>
        <li>Each transaction sees a snapshot of data as of when it started</li>
      </ol>
      <p>From the PostgreSQL docs: <em>"Each SQL statement sees a snapshot of data as it was some time ago, regardless of the current state of the underlying data."</em></p>
      <h3>Implications</h3>
      <ul>
        <li><strong>Read never blocks write</strong> — your SELECT sees the snapshot, UPDATE writes a new version</li>
        <li><strong>Write never blocks read</strong> — the new row version is invisible to running transactions</li>
        <li><strong>Dead tuples accumulate</strong> — VACUUM cleans up old row versions. AUTOVACUUM runs this automatically.</li>
        <li><strong>Long-running transactions are dangerous</strong> — they prevent VACUUM from cleaning up dead rows, causing table bloat</li>
      </ul>
      <pre><code>-- See dead tuples accumulating
SELECT schemaname, tablename, n_live_tup, n_dead_tup,
       last_autovacuum
FROM pg_stat_user_tables
ORDER BY n_dead_tup DESC;

-- Force a manual vacuum on a bloated table
VACUUM ANALYZE orders;</code></pre>
      <div class="inline-quiz">
        <h4>⚡ Quick Check</h4>
        <p>Transaction A starts a long SELECT that takes 10 minutes. Meanwhile, Transaction B UPDATEs 100 rows. What does Transaction A see?</p>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: MVCC means Transaction A sees the snapshot from when it started — not the latest data.')">Transaction A sees the updated rows immediately</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: MVCC does not block — Transaction B proceeds without waiting.')">Transaction B must wait for Transaction A to finish before updating</button>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! MVCC gives Transaction A a snapshot from when it started. It sees the old row versions throughout its execution, regardless of what Transaction B does.')">Transaction A sees the old row versions — its snapshot was taken at the start</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: PostgreSQL does not error on concurrent access — MVCC was designed exactly for this scenario.')">PostgreSQL returns an error because two transactions accessed the same rows</button>
      </div>
      <div class="teach-it-back">
        <h4>🧠 Teach It Back</h4>
        <textarea placeholder="MVCC means readers never block writers because..."></textarea>
      </div>
    `
  },

  'p2-4': {
    title: '2.4 EXPLAIN ANALYZE — Reading Query Plans',
    xp: 125,
    content: `
      <div class="hook-story">
        <strong>🔬 The slow query that surprised everyone.</strong> A developer has an index on <code>users.email</code>. Their query runs for 3 seconds. They run <code>EXPLAIN ANALYZE</code> and discover PostgreSQL is doing a <strong>Seq Scan</strong> — ignoring the index entirely. Why? Because they wrapped the column in a function: <code>WHERE LOWER(email) = ...</code>. Without EXPLAIN, you are guessing. With it, you see exactly what PostgreSQL does.
      </div>
      <div class="why-matters">
        <strong>Why this matters:</strong> EXPLAIN ANALYZE is the most powerful query debugging tool in PostgreSQL. It tells you exactly which indexes are used, where time is spent, and why a query is slow.
      </div>
      <h3>Reading EXPLAIN output</h3>
      <pre><code>EXPLAIN ANALYZE
SELECT * FROM orders WHERE user_id = 42;

-- Output:
-- Index Scan using orders_user_id_idx on orders
--   (cost=0.43..8.45 rows=5 width=72)
--   (actual time=0.042..0.051 rows=5 loops=1)
-- Planning Time: 0.1 ms
-- Execution Time: 0.08 ms</code></pre>
      <h3>Key terms to know</h3>
      <ul>
        <li><strong>Seq Scan</strong> — reading every row. Usually bad on large tables. Means no index used.</li>
        <li><strong>Index Scan</strong> — using a B-tree index. Fast for specific rows.</li>
        <li><strong>Bitmap Index Scan</strong> — used when returning many rows. Batches index lookups.</li>
        <li><strong>Hash Join / Nested Loop</strong> — how PostgreSQL combines tables in JOINs</li>
        <li><strong>cost=X..Y</strong> — estimated cost (startup cost .. total cost). Just estimates.</li>
        <li><strong>actual time=X..Y rows=N</strong> — real measurements. Compare to estimates to spot issues.</li>
      </ul>
      <pre><code>-- Spot the problem: estimated 1 row, got 10,000 (stale statistics!)
-- Rows Removed by Filter: 999990  <-- scanning almost everything

-- Fix: update statistics
ANALYZE orders;

-- Or: check for missing index
CREATE INDEX orders_status_idx ON orders (status);</code></pre>
      <div class="inline-quiz">
        <h4>⚡ Quick Check</h4>
        <p>EXPLAIN shows <strong>Seq Scan</strong> on a 5-million row table. What does this mean?</p>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! Seq Scan = sequential table scan = reading every row. On 5M rows this is likely slow. Check if an index exists and if the query is written to allow index usage.')">PostgreSQL is reading every row in the table — likely no index is being used</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: Seq Scan is the opposite of index usage.')">PostgreSQL is using the most efficient index available</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: Seq Scan is a full table scan. For small tables it is fine, but for 5M rows it is almost always a problem.')">Seq Scan is always faster than Index Scan for large tables</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: The planner chooses Seq Scan when no suitable index exists, not because of table size alone.')">PostgreSQL chose Seq Scan because the table is too large for indexes</button>
      </div>
      <div class="teach-it-back">
        <h4>🧠 Teach It Back</h4>
        <textarea placeholder="When I see a Seq Scan in EXPLAIN output, I should..."></textarea>
      </div>
    `
  },

  'p2-5': {
    title: '2.5 JSONB — Schemaless Inside PostgreSQL',
    xp: 125,
    content: `
      <div class="hook-story">
        <strong>🔀 "We need MongoDB's flexibility but PostgreSQL's reliability."</strong> This is a real conversation that happens at startups. JSONB gives you both. Store semi-structured data (product attributes, user preferences, event metadata) as JSON inside PostgreSQL — with full indexing, querying, and ACID guarantees. No need for a separate MongoDB deployment.
      </div>
      <div class="why-matters">
        <strong>Why this matters:</strong> JSONB lets you handle variable schemas without separate NoSQL databases. Products with different attributes, flexible metadata, audit logs — JSONB handles all of these while keeping everything in one database.
      </div>
      <h3>JSON vs JSONB</h3>
      <ul>
        <li><code>JSON</code> — stored as raw text, parsed on every query. Preserves key order and duplicate keys.</li>
        <li><code>JSONB</code> — stored as binary, faster to query, supports GIN indexes. <strong>Always use JSONB.</strong></li>
      </ul>
      <pre><code>-- Create a table with JSONB
CREATE TABLE products (
  id       BIGSERIAL PRIMARY KEY,
  name     TEXT NOT NULL,
  attrs    JSONB  -- {color: "red", size: "XL", weight: 0.5}
);

-- Insert JSONB
INSERT INTO products (name, attrs)
VALUES ('T-Shirt', '{"color": "red", "size": "XL", "tags": ["cotton", "summer"]}');

-- Query JSONB — arrow operators
SELECT name, attrs->>'color' AS color        -- ->> returns text
FROM products
WHERE attrs->>'color' = 'red';

-- Query nested JSON
SELECT attrs->'dimensions'->>'width' FROM products;

-- Check if key exists
SELECT * FROM products WHERE attrs ? 'weight';

-- Filter by array element
SELECT * FROM products WHERE attrs->'tags' @> '["cotton"]';

-- GIN index for fast JSONB queries
CREATE INDEX products_attrs_idx ON products USING GIN (attrs);
-- Now all @>, ?, ?| operators use the index</code></pre>
      <div class="inline-quiz">
        <h4>⚡ Quick Check</h4>
        <p>When should you use JSONB instead of separate columns?</p>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: If you query a specific field frequently, a proper column with an index is usually better than JSONB.')">When you need to query a specific field very frequently with exact matches</button>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! JSONB shines for variable/optional attributes — product options, user preferences, event metadata — where different rows have different keys.')">When different rows have different keys or optional attributes (variable schema)</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: JSONB is great for structured queries — you can index and query it efficiently with GIN indexes.')">When you need to store data that will never be queried directly</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: JSONB has excellent query and index support. It is not a dump for unqueried data.')">JSONB should only be used as a last resort when you have no other option</button>
      </div>
      <div class="teach-it-back">
        <h4>🧠 Teach It Back</h4>
        <textarea placeholder="I would choose JSONB over a separate table when..."></textarea>
      </div>
    `
  },

  'p3-1': {
    title: '3.1 Full-Text Search',
    xp: 150,
    content: `
      <div class="hook-story">
        <strong>🔍 "Do we need Elasticsearch?"</strong> Many teams reach for Elasticsearch before trying PostgreSQL's built-in full-text search. For most applications — blog search, product search, document search — PostgreSQL FTS is more than adequate, requires no extra infrastructure, and benefits from PostgreSQL's ACID guarantees. Saves months of operational complexity.
      </div>
      <div class="why-matters">
        <strong>Why this matters:</strong> Adding a search feature is one of the most common feature requests. PostgreSQL FTS handles stemming (searches for "running" also find "run"), stop words, ranking, and highlighting — all built-in.
      </div>
      <h3>Full-Text Search basics</h3>
      <pre><code>-- tsvector: a processed document (tokens + positions)
SELECT to_tsvector('english', 'PostgreSQL indexing is powerful and fast');
-- Output: 'fast':6 'index':2 'postgresql':1 'power':4

-- tsquery: a search query
SELECT to_tsquery('english', 'postgresql & indexing');
-- Output: 'postgresql' & 'index'

-- Search!
SELECT title, body
FROM articles
WHERE to_tsvector('english', title || ' ' || body) @@ to_tsquery('english', 'postgresql & indexing');

-- Better: store tsvector in a generated column
ALTER TABLE articles
  ADD COLUMN search_vector TSVECTOR
  GENERATED ALWAYS AS (
    to_tsvector('english', coalesce(title, '') || ' ' || coalesce(body, ''))
  ) STORED;

-- Index it for speed
CREATE INDEX articles_search_idx ON articles USING GIN (search_vector);

-- Now queries are fast
SELECT title
FROM articles
WHERE search_vector @@ to_tsquery('english', 'postgresql & index:*')
ORDER BY ts_rank(search_vector, to_tsquery('english', 'postgresql')) DESC
LIMIT 10;</code></pre>
      <p><strong>Key operators:</strong> <code>&</code> (AND), <code>|</code> (OR), <code>!</code> (NOT), <code>:*</code> (prefix match)</p>
      <div class="inline-quiz">
        <h4>⚡ Quick Check</h4>
        <p>Why use <code>GIN</code> index for full-text search instead of a regular B-tree index?</p>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: B-tree indexes work on whole column values, not on the individual tokens inside a tsvector.')">B-tree indexes are faster for all types of data</button>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! GIN (Generalized Inverted Index) is designed for composite values like arrays and tsvectors. It indexes each token individually, enabling fast full-text searches.')">GIN indexes each token in the tsvector separately, enabling fast text searches</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: GIN can be used for more than full-text search — it also works for JSONB and arrays.')">GIN is only for full-text search, B-tree is for everything else</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: GIN indexes have higher write overhead than B-tree, not lower.')">GIN indexes update faster than B-tree on INSERT</button>
      </div>
      <div class="teach-it-back">
        <h4>🧠 Teach It Back</h4>
        <textarea placeholder="PostgreSQL full-text search works by..."></textarea>
      </div>
    `
  },

  'p3-2': {
    title: '3.2 Partitioning Large Tables',
    xp: 150,
    content: `
      <div class="hook-story">
        <strong>📊 Instagram's timeline problem:</strong> Instagram stores billions of media posts going back to 2010. A single table with 50 billion rows would be unusable — even with indexes. Instagram partitions their tables by time (range partitioning) so that queries for recent posts only scan the latest partition. Dropping old data means dropping a partition — instant. Adding a new month? Add a new partition.
      </div>
      <div class="why-matters">
        <strong>Why this matters:</strong> Once a table exceeds ~100M rows, indexes alone are not enough. Partitioning lets PostgreSQL skip entire partitions during queries (partition pruning), and lets you manage data lifecycle (archive/delete old partitions) efficiently.
      </div>
      <h3>Range partitioning by time</h3>
      <pre><code>-- Create the parent table
CREATE TABLE events (
  id         BIGSERIAL,
  user_id    BIGINT NOT NULL,
  type       TEXT NOT NULL,
  payload    JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
) PARTITION BY RANGE (created_at);

-- Create monthly partitions
CREATE TABLE events_2025_01 PARTITION OF events
  FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');

CREATE TABLE events_2025_02 PARTITION OF events
  FOR VALUES FROM ('2025-02-01') TO ('2025-03-01');

-- PostgreSQL automatically routes INSERTs to the right partition
-- Queries with WHERE created_at > '2025-01-01' only scan relevant partitions

-- Drop old data instantly (no slow DELETE)
DROP TABLE events_2024_01;  -- Instantly frees disk space</code></pre>
      <h3>Other partition types</h3>
      <pre><code>-- List partitioning (by discrete values)
PARTITION BY LIST (region);
-- Partitions: 'us-east', 'eu-west', 'ap-south'

-- Hash partitioning (distribute evenly by key)
PARTITION BY HASH (user_id);
-- K8s: 4 partitions, distributes rows by hash of user_id</code></pre>
      <div class="inline-quiz">
        <h4>⚡ Quick Check</h4>
        <p>You need to delete all events older than 1 year from a 50-billion row partitioned table. What is the most efficient approach?</p>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: DELETE with a WHERE clause on 10 billion rows takes hours and generates enormous WAL traffic.')">DELETE FROM events WHERE created_at < NOW() - INTERVAL '1 year'</button>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! Dropping a partition is instant — it just removes the table file. No row-by-row deletion, no WAL traffic, no VACUUM needed. This is one of the main benefits of partitioning.')">DROP TABLE the old partition — instant deletion with no row-by-row overhead</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: TRUNCATE with a WHERE clause is not valid SQL. TRUNCATE operates on whole tables/partitions.')">TRUNCATE events WHERE created_at < NOW() - INTERVAL '1 year'</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: VACUUM removes dead tuples from MVCC — it does not delete rows based on a condition.')">VACUUM FULL events — it automatically removes old rows</button>
      </div>
      <div class="teach-it-back">
        <h4>🧠 Teach It Back</h4>
        <textarea placeholder="Table partitioning helps at scale because..."></textarea>
      </div>
    `
  },

  'p3-3': {
    title: '3.3 Replication & High Availability',
    xp: 175,
    content: `
      <div class="hook-story">
        <strong>🔴 2:47 AM — your primary database server dies.</strong> Hardware failure. Everything that writes to your app is broken. How fast can you fail over to a standby? With no replication: hours. With streaming replication + Patroni: <strong>under 30 seconds</strong>, automatically, without waking anyone up. This is how Zalando, GitLab, and Supabase run PostgreSQL with 99.99% uptime.
      </div>
      <div class="why-matters">
        <strong>Why this matters:</strong> Every production database needs replication. It gives you high availability (automatic failover) and scalability (read replicas for read-heavy workloads).
      </div>
      <h3>How streaming replication works</h3>
      <p>PostgreSQL writes every change to the <strong>WAL (Write-Ahead Log)</strong> before applying it. Standby servers stream the WAL from the primary and apply it in real-time — staying within milliseconds of the primary.</p>
      <ul>
        <li><strong>Primary</strong> — handles all writes and reads</li>
        <li><strong>Standby (replica)</strong> — streams WAL from primary, can serve read-only queries</li>
        <li><strong>Synchronous replication</strong> — primary waits for standby to confirm before committing. Zero data loss, slightly slower writes.</li>
        <li><strong>Asynchronous replication</strong> — primary commits immediately, standby may lag slightly. Faster, but tiny risk of data loss on failover.</li>
      </ul>
      <h3>Patroni — automatic failover</h3>
      <pre><code># Patroni is the standard HA solution for PostgreSQL
# It uses etcd/ZooKeeper/Consul for leader election

# Check cluster status
patronictl -c /etc/patroni/config.yml list
# + Cluster: postgres-ha ---+----+-----------+
# | Member    | Host        | Role   | State   |
# |-----------+-------------|--------|---------|
# | pg-node-1 | 10.0.1.1:5432 | Leader | running |
# | pg-node-2 | 10.0.1.2:5432 | Replica| running |

# Manual switchover (zero downtime)
patronictl switchover postgres-ha</code></pre>
      <h3>Read replicas for scalability</h3>
      <pre><code>-- Route read-heavy queries to replicas
-- Primary: writes + critical reads
-- Replica: analytics, reports, non-critical reads

-- In Node.js with pg
const primary = new Pool({ host: 'primary.db.internal' });
const replica = new Pool({ host: 'replica.db.internal' });

// Writes go to primary
await primary.query('INSERT INTO events ...');

// Heavy reads go to replica
const report = await replica.query('SELECT COUNT(*) ...');</code></pre>
      <div class="inline-quiz">
        <h4>⚡ Quick Check</h4>
        <p>What is the WAL in PostgreSQL?</p>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: The WAL is written BEFORE changes are applied to the actual table files — that is what makes it write-ahead.')">A log of slow queries that exceeded a time threshold</button>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! The Write-Ahead Log records every change BEFORE it is applied. This guarantees durability (D in ACID) and enables streaming replication.')">A sequential log of every database change, written before applying to table files — enables both durability and replication</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: The WAL is for all changes, not just errors. Error logs are separate.')">A log of failed transactions and errors</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: VACUUM uses the WAL but the WAL itself is not a cleanup mechanism.')">A background process that removes dead tuples from tables</button>
      </div>
      <div class="teach-it-back">
        <h4>🧠 Teach It Back</h4>
        <textarea placeholder="Streaming replication works by..."></textarea>
      </div>
    `
  },

};

const postgresFlashcards = [
  { front: "What does ACID stand for?", back: "Atomic (all-or-nothing), Consistent (valid state to valid state), Isolated (concurrent transactions cannot see each other's uncommitted data), Durable (committed data survives crashes)." },
  { front: "What is MVCC?", back: "Multi-Version Concurrency Control. Each statement sees a snapshot of data from when its transaction started. Readers never block writers and writers never block readers." },
  { front: "NUMERIC vs FLOAT for money?", back: "Always NUMERIC(10,2) for money. FLOAT uses binary floating-point with rounding errors — 0.1 + 0.2 is not exactly 0.3 in binary floats." },
  { front: "What does RETURNING do?", back: "Returns column values from the affected rows after INSERT, UPDATE, or DELETE. Essential for getting auto-generated IDs without an extra SELECT." },
  { front: "What is a B-tree index?", back: "The default index type. Stores values in a balanced tree — lookups are O(log n). Used for =, <, >, BETWEEN, ORDER BY. Cannot be used with LIKE '%prefix' patterns." },
  { front: "INNER JOIN vs LEFT JOIN?", back: "INNER JOIN: only rows matching in both tables. LEFT JOIN: all rows from left table, NULLs where no match in right table." },
  { front: "What is EXPLAIN ANALYZE?", back: "Shows the actual execution plan with real timing. Look for Seq Scan (no index) vs Index Scan (fast). Check estimated vs actual row counts for stale statistics." },
  { front: "JSON vs JSONB?", back: "JSONB is binary-stored, faster to query, supports GIN indexes and operators like @>, ?, ?|. Always use JSONB unless you need to preserve exact JSON text." },
  { front: "What is a GIN index?", back: "Generalized Inverted Index — designed for composite values. Used for JSONB, arrays, and tsvector (full-text search). Indexes each element individually." },
  { front: "What is table partitioning?", back: "Splitting a large table into smaller sub-tables by range, list, or hash. Enables partition pruning (skip irrelevant partitions) and instant data deletion by dropping partitions." },
  { front: "What is the WAL?", back: "Write-Ahead Log — every change is written here before being applied. Ensures durability (D in ACID) and powers streaming replication." },
  { front: "What does CREATE INDEX CONCURRENTLY do?", back: "Builds an index without blocking writes (INSERT/UPDATE/DELETE). Takes longer than regular CREATE INDEX but safe for production tables." },
];
