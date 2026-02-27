// Redis Learning Lessons
// Based on research: dragonflydb.io, coursesity.com, dev.to — Feb 2026

const redisLessons = {
    'r1-1': {
        title: '1.1 What is Redis?',
        xp: 50,
        content: `
            <div class="lesson-recap">🔴 <strong>Welcome to Redis!</strong> You're about to learn the tool that powers Twitter's timelines, GitHub's caching, and millions of production apps worldwide.</div>
            <div class="hook-story">🚀 <strong>Real World:</strong> Twitter's timelines load instantly for 300 million users. Every timeline is cached in Redis in memory. Without it, every scroll would hit the database — making Twitter as slow as loading a webpage from disk. Redis is why it feels instant.</div>
            <div class="why-matters">💡 <strong>Why this matters:</strong> Redis is in almost every production stack. Understanding it is the difference between apps that scale and apps that fall over under load.</div>

            <h3>🔑 What is Redis?</h3>
            <p><strong>Redis</strong> (Remote Dictionary Server) is an open-source, <strong>in-memory</strong> key-value data store. It holds all data in RAM — making it 50-100x faster than disk-based databases.</p>

            <ul>
                <li>📦 <strong>Key-Value Store</strong> — every piece of data has a key and a value</li>
                <li>⚡ <strong>In-Memory</strong> — data lives in RAM, not disk. Sub-millisecond reads.</li>
                <li>🔧 <strong>Multi-Purpose</strong> — cache, session store, pub/sub, leaderboard, rate limiter</li>
                <li>🌍 <strong>Used everywhere</strong> — Twitter, GitHub, Uber, Instagram, Stack Overflow</li>
            </ul>

            <h3>⚡ How Fast is Redis?</h3>
            <ul>
                <li>PostgreSQL query: ~50ms</li>
                <li>Redis same data: &lt;1ms</li>
                <li>That's a <strong>50x speed improvement</strong></li>
                <li>Redis handles <strong>100,000+ operations per second</strong> on a single server</li>
            </ul>

            <h3>🆚 Redis is NOT a replacement for your main database</h3>
            <p>Think of Redis as a <strong>speed layer</strong> in front of your database — not a replacement. Your data lives in PostgreSQL; hot/frequent data gets cached in Redis.</p>

            <div class="inline-quiz">
                <h4>🧠 Quick Check</h4>
                <p><strong>Why is Redis so much faster than a traditional database?</strong></p>
                <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! RAM access is ~100,000x faster than disk access.')">It stores data in RAM (memory)</button>
                <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Better algorithms help, but the main reason is where data lives.')">It uses better algorithms</button>
                <button class="quiz-option" onclick="checkQuiz(this,'wrong','Not quite — Redis is single-threaded! The speed comes from in-memory storage.')">It uses multiple CPU cores</button>
                <div class="quiz-feedback"></div>
            </div>

            <div class="teach-it-back">
                <h4>🧠 Teach It Back</h4>
                <p style="font-size:13px;margin-bottom:8px">In your own words: what is Redis and why is it fast?</p>
                <textarea placeholder="Type your answer here..."></textarea>
            </div>
        `
    },
    'r1-2': {
        title: '1.2 Redis vs Traditional Databases',
        xp: 50,
        content: `
            <div class="lesson-recap">🔄 <strong>Last lesson:</strong> Redis is an in-memory key-value store that's 50x faster than disk databases (&lt;1ms vs ~50ms). Used by Twitter, GitHub, Uber.</div>
            <div class="hook-story">🚀 <strong>Real World:</strong> In high-traffic e-commerce platforms for brands like DIOR and Chanel, switching from PostgreSQL-only to Redis caching cut API response times by 50ms on average. Same data, 50x faster — just by adding Redis as a cache layer in front of the database.</div>
            <div class="why-matters">💡 <strong>Why this matters:</strong> Knowing when to use Redis vs a database (and when to use both) is a core backend engineering skill. Most senior engineers use both together.</div>

            <h3>📊 Redis vs PostgreSQL vs MongoDB</h3>
            <table style="width:100%;border-collapse:collapse;font-size:13px">
                <tr style="background:#4d96ff;color:white">
                    <th style="padding:8px;text-align:left">Property</th>
                    <th style="padding:8px">Redis</th>
                    <th style="padding:8px">PostgreSQL</th>
                    <th style="padding:8px">MongoDB</th>
                </tr>
                <tr style="background:#f8f9fa">
                    <td style="padding:8px">Storage</td>
                    <td style="padding:8px;text-align:center">RAM</td>
                    <td style="padding:8px;text-align:center">Disk</td>
                    <td style="padding:8px;text-align:center">Disk</td>
                </tr>
                <tr>
                    <td style="padding:8px">Read speed</td>
                    <td style="padding:8px;text-align:center">&lt;1ms</td>
                    <td style="padding:8px;text-align:center">~50ms</td>
                    <td style="padding:8px;text-align:center">~20ms</td>
                </tr>
                <tr style="background:#f8f9fa">
                    <td style="padding:8px">Complex queries</td>
                    <td style="padding:8px;text-align:center">❌ No</td>
                    <td style="padding:8px;text-align:center">✅ Yes</td>
                    <td style="padding:8px;text-align:center">✅ Yes</td>
                </tr>
                <tr>
                    <td style="padding:8px">Data persistence</td>
                    <td style="padding:8px;text-align:center">Optional</td>
                    <td style="padding:8px;text-align:center">Always</td>
                    <td style="padding:8px;text-align:center">Always</td>
                </tr>
                <tr style="background:#f8f9fa">
                    <td style="padding:8px">Best for</td>
                    <td style="padding:8px;text-align:center">Speed layer</td>
                    <td style="padding:8px;text-align:center">Primary data</td>
                    <td style="padding:8px;text-align:center">Flexible docs</td>
                </tr>
            </table>

            <h3>🏗️ The Typical Architecture</h3>
            <pre><code>User Request
     ↓
  [Redis Cache]  ← Check here first (fast!)
     ↓ (cache miss)
  [PostgreSQL]   ← Fall back to database
     ↓
  Store result in Redis for next time</code></pre>

            <div class="inline-quiz">
                <h4>🧠 Quick Check</h4>
                <p><strong>A user's profile is requested 10,000 times per day but only changes once a week. What should you do?</strong></p>
                <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! Cache it in Redis — 9,999 requests per day served from memory instead of hitting the database.')">Cache it in Redis with a 1-hour TTL</button>
                <button class="quiz-option" onclick="checkQuiz(this,'wrong','Not quite — hitting the database 10,000 times for the same data is wasteful when Redis exists.')">Query PostgreSQL every time</button>
                <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost — storing the entire database in Redis would use too much memory and Redis isn\'t suited for complex queries.')">Move the entire database to Redis</button>
                <div class="quiz-feedback"></div>
            </div>

            <div class="teach-it-back">
                <h4>🧠 Teach It Back</h4>
                <p style="font-size:13px;margin-bottom:8px">When should you use Redis vs a traditional database?</p>
                <textarea placeholder="Type your answer here..."></textarea>
            </div>
        `
    },
    'r1-3': {
        title: '1.3 Redis Data Types',
        xp: 75,
        content: `
            <div class="lesson-recap">🔄 <strong>Last lesson:</strong> Redis is a speed layer in front of your database. It cuts API response times by 50x by serving hot data from RAM instead of disk.</div>
            <div class="hook-story">🚀 <strong>Real World:</strong> A sales leaderboard ranking Alice (35,000), Bob (25,000), Charlie (15,000) — updating in real-time as deals close. This is 4 Redis commands with Sorted Sets. With SQL, it's a full table scan + ORDER BY every time someone checks the ranking. Redis has the right data type for every job.</div>
            <div class="why-matters">💡 <strong>Why this matters:</strong> Choosing the wrong Redis data type is the #1 beginner mistake — most default to Strings for everything. The right type = less code, better performance.</div>

            <h3>1️⃣ Strings — The Basic Building Block</h3>
            <p>Store any text, number, or binary data. Most basic type.</p>
            <pre><code>SET user:name "Alice"
GET user:name        # => "Alice"
SET counter 0
INCR counter         # => 1 (atomic increment!)
SET token "abc123" EX 3600  # expires in 1 hour</code></pre>
            <p><strong>Use for:</strong> caching, counters, session tokens, feature flags</p>

            <h3>2️⃣ Hashes — Objects with Multiple Fields</h3>
            <p>Like a mini-database row. Store objects with named fields.</p>
            <pre><code>HSET user:1001 name "Alice" email "alice@example.com" age 28
HGET user:1001 name      # => "Alice"
HGETALL user:1001        # => all fields and values</code></pre>
            <p><strong>Use for:</strong> user profiles, product info, any object with fields</p>

            <h3>3️⃣ Lists — Ordered Collections</h3>
            <p>Push/pop from either end. Perfect for queues and logs.</p>
            <pre><code>RPUSH queue "task1" "task2" "task3"   # add to right
LPOP queue                             # remove from left => "task1"
LRANGE queue 0 -1                      # get all items</code></pre>
            <p><strong>Use for:</strong> job queues, recent activity feeds, message logs</p>

            <h3>4️⃣ Sets — Unique, Unordered Items</h3>
            <p>Like arrays but with guaranteed uniqueness.</p>
            <pre><code>SADD online_users "alice" "bob" "charlie"
SADD online_users "alice"  # ignored — already exists
SMEMBERS online_users      # => {alice, bob, charlie}
SCARD online_users         # => 3 (count)</code></pre>
            <p><strong>Use for:</strong> tracking unique visitors, tags, permissions</p>

            <h3>5️⃣ Sorted Sets — Ranked Items</h3>
            <p>Like Sets but every item has a score. Automatically ranked.</p>
            <pre><code>ZADD leaderboard 35000 "alice"
ZADD leaderboard 25000 "bob"
ZADD leaderboard 15000 "charlie"
ZRANGE leaderboard 0 -1 REV WITHSCORES  # top to bottom with scores</code></pre>
            <p><strong>Use for:</strong> leaderboards, priority queues, rate limiting, autocomplete</p>

            <div class="who-uses">
                <h4>🏢 Who uses Redis data types?</h4>
                <div class="company-list">
                    <span class="company">Twitter (Strings)</span>
                    <span class="company">Stack Overflow (Sorted Sets)</span>
                    <span class="company">Slack (Lists + Pub/Sub)</span>
                    <span class="company">GitHub (Hashes)</span>
                </div>
                <p class="company-note">Stack Overflow's developer reputation leaderboard = Redis Sorted Sets. Every upvote = one ZADD command.</p>
            </div>

            <div class="inline-quiz">
                <h4>🧠 Quick Check</h4>
                <p><strong>You need to build a real-time leaderboard that ranks players by score. Which Redis data type?</strong></p>
                <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hashes store objects but don\'t automatically rank by score.')">Hash</button>
                <button class="quiz-option" onclick="checkQuiz(this,'wrong','Not quite — Sets don\'t have scores, so you can\'t rank by score.')">Set</button>
                <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! Sorted Sets store items with scores and automatically maintain rank order.')">Sorted Set</button>
                <div class="quiz-feedback"></div>
            </div>

            <div class="teach-it-back">
                <h4>🧠 Teach It Back</h4>
                <p style="font-size:13px;margin-bottom:8px">Name the 5 Redis data types and one use case for each.</p>
                <textarea placeholder="String: ..., Hash: ..., List: ..., Set: ..., Sorted Set: ..."></textarea>
            </div>
        `
    },
    'r1-4': {
        title: '1.4 Core Commands: GET, SET, EXPIRE, TTL',
        xp: 100,
        content: `
            <div class="lesson-recap">🔄 <strong>Last lesson:</strong> Redis has 5 data types — Strings, Hashes, Lists, Sets, Sorted Sets. Each has a perfect use case. Don't use Strings for everything!</div>
            <div class="hook-story">🚀 <strong>Real World:</strong> Every time you log into a website, a session token is created. If it's stored in Redis with <code>SET session:abc123 "user_id:456" EX 3600</code>, it automatically expires after 1 hour. No cron job, no cleanup script needed. That's what TTL does.</div>
            <div class="why-matters">💡 <strong>Why this matters:</strong> These 8 commands cover 80% of daily Redis usage. Know them cold and you can build anything basic in Redis.</div>

            <h3>📝 The Essential 8 Commands</h3>

            <h4>1. SET — Store a value</h4>
            <pre><code>SET key value          # basic
SET key value EX 60    # expires in 60 seconds
SET key value NX       # only set if key doesn't exist</code></pre>

            <h4>2. GET — Retrieve a value</h4>
            <pre><code>GET key                # returns value or nil</code></pre>

            <h4>3. DEL — Delete a key</h4>
            <pre><code>DEL key1 key2 key3     # delete one or more keys</code></pre>

            <h4>4. EXPIRE — Set expiry on existing key</h4>
            <pre><code>EXPIRE key 300         # expire in 300 seconds (5 min)</code></pre>

            <h4>5. TTL — Check time remaining</h4>
            <pre><code>TTL key                # returns seconds remaining (-1 = no expiry, -2 = doesn't exist)</code></pre>

            <h4>6. EXISTS — Check if key exists</h4>
            <pre><code>EXISTS key             # returns 1 (exists) or 0 (doesn't)</code></pre>

            <h4>7. INCR / DECR — Atomic counters</h4>
            <pre><code>SET counter 0
INCR counter           # => 1 (atomic! thread-safe)
INCR counter           # => 2
INCRBY counter 10      # => 12</code></pre>

            <h4>8. KEYS / SCAN — Find keys (use SCAN in production!)</h4>
            <pre><code>SCAN 0 MATCH "user:*" COUNT 100  # safe iteration
# Never use KEYS * in production — it blocks Redis!</code></pre>

            <h3>⚠️ Common Beginner Mistake: Forgetting TTL</h3>
            <p>Keys without an expiry live forever and fill up Redis memory. <strong>Always set a TTL</strong> unless you explicitly need the key to persist.</p>

            <div class="inline-quiz">
                <h4>🧠 Quick Check</h4>
                <p><strong>You want to store a user's session token that should auto-delete after 30 minutes. Which command?</strong></p>
                <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! EX 1800 sets expiry to 1800 seconds (30 min) atomically with the SET.')">SET session:abc "user123" EX 1800</button>
                <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost right but this is two separate commands — SET then EXPIRE. The EX option does it atomically.')">SET session:abc "user123" then EXPIRE session:abc 1800</button>
                <button class="quiz-option" onclick="checkQuiz(this,'wrong','TTL reads the remaining time — it doesn\'t set expiry.')">TTL session:abc 1800</button>
                <div class="quiz-feedback"></div>
            </div>

            <div class="teach-it-back">
                <h4>🧠 Teach It Back</h4>
                <p style="font-size:13px;margin-bottom:8px">What does TTL do and why is it important?</p>
                <textarea placeholder="TTL stands for..."></textarea>
            </div>
        `
    },
    'r1-5': {
        title: '1.5 Quiz: Foundations Check',
        xp: 150,
        content: `
            <div class="lesson-recap">🔄 <strong>Module 1 summary:</strong> Redis = in-memory key-value store (&lt;1ms reads). 5 data types. 8 core commands. Always set TTL.</div>
            <h3>📝 Foundations Quiz (5 questions)</h3>
            <p>Answer each question, then check your result.</p>

            <div class="inline-quiz">
                <h4>Question 1</h4>
                <p><strong>What does Redis store data in?</strong></p>
                <button class="quiz-option" onclick="checkQuiz(this,'wrong','Not quite — disk storage is for traditional databases. Redis is special because it uses RAM.')">Hard disk</button>
                <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! Redis stores everything in RAM, which is why it achieves sub-millisecond read times.')">RAM (memory)</button>
                <button class="quiz-option" onclick="checkQuiz(this,'wrong','Not quite — SSD is still disk. Redis\'s speed secret is in-memory storage.')">SSD</button>
                <div class="quiz-feedback"></div>
            </div>

            <div class="inline-quiz">
                <h4>Question 2</h4>
                <p><strong>Which Redis data type would you use to store a user profile (name, email, age)?</strong></p>
                <button class="quiz-option" onclick="checkQuiz(this,'wrong','Strings store single values — you\'d need multiple keys for multiple fields.')">String</button>
                <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! Hashes store objects with named fields — perfect for user profiles.')">Hash</button>
                <button class="quiz-option" onclick="checkQuiz(this,'wrong','Sets store unique items but don\'t support named fields like name, email, age.')">Set</button>
                <div class="quiz-feedback"></div>
            </div>

            <div class="inline-quiz">
                <h4>Question 3</h4>
                <p><strong>What does TTL -2 mean when you run TTL mykey?</strong></p>
                <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost — -1 means the key exists but has no expiry. -2 is different.')">The key has no expiry set</button>
                <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! -2 means the key doesn\'t exist. -1 means it exists but has no expiry.')">The key doesn\'t exist</button>
                <button class="quiz-option" onclick="checkQuiz(this,'wrong','Not quite — negative TTL values are special codes, not actual time remaining.')">The key expired 2 seconds ago</button>
                <div class="quiz-feedback"></div>
            </div>

            <div class="inline-quiz">
                <h4>Question 4</h4>
                <p><strong>You need to count page views atomically (safe with concurrent users). Which command?</strong></p>
                <button class="quiz-option" onclick="checkQuiz(this,'wrong','GET + SET is two operations — not atomic. Concurrent requests can cause race conditions.')">GET then SET</button>
                <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! INCR is atomic — it reads, increments, and writes in one indivisible operation. Thread-safe!')">INCR</button>
                <button class="quiz-option" onclick="checkQuiz(this,'wrong','APPEND adds to a string value, not increment a number.')">APPEND</button>
                <div class="quiz-feedback"></div>
            </div>

            <div class="inline-quiz">
                <h4>Question 5</h4>
                <p><strong>Redis is best described as a _____ for your main database.</strong></p>
                <button class="quiz-option" onclick="checkQuiz(this,'wrong','Redis isn\'t a backup — it doesn\'t persist all data by default and isn\'t designed for disaster recovery.')">Backup</button>
                <button class="quiz-option" onclick="checkQuiz(this,'wrong','Redis can sometimes replace a database but typically works alongside one, not instead of it.')">Replacement</button>
                <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! Redis is a speed layer — it caches hot data in front of your database for ultra-fast access.')">Speed layer (cache)</button>
                <div class="quiz-feedback"></div>
            </div>

            <h3>🎯 Module 1 Complete!</h3>
            <p>You now understand:</p>
            <ul>
                <li>✅ What Redis is and why it's fast (in-memory)</li>
                <li>✅ When to use Redis vs a traditional database</li>
                <li>✅ The 5 data types and their use cases</li>
                <li>✅ The 8 core commands including TTL and INCR</li>
            </ul>
            <p><strong>Next:</strong> Module 2 — Real-world Redis patterns used in production!</p>
        `
    },
    'r2-1': {
        title: '2.1 Caching: Cache-Aside Pattern',
        xp: 100,
        content: `
            <div class="lesson-recap">🔄 <strong>Module 1 complete!</strong> You know what Redis is (in-memory speed layer), its 5 data types, and 8 core commands. Now let's use it in real patterns.</div>
            <div class="hook-story">🚀 <strong>Real World:</strong> A SaaS app's dashboard data was being queried from PostgreSQL on every page load. At 10,000 active users, that's 10,000 database queries per minute — for the same data. After adding Redis cache-aside with a 5-minute TTL, 95% of those requests are served from memory. Database load dropped 80%.</div>
            <div class="why-matters">💡 <strong>Why this matters:</strong> Cache-aside is the most common Redis pattern in production. Every senior backend engineer knows it cold.</div>

            <div class="who-uses">
                <h4>🏢 Who uses Cache-Aside?</h4>
                <div class="company-list"><span class="company">Every major SaaS</span><span class="company">E-commerce platforms</span><span class="company">API services</span></div>
                <p class="company-note">dev.to reports: "reduce database query times by up to 40% and improve overall API response times by 50ms on average" using Redis cache-aside.</p>
            </div>

            <h3>🔄 Cache-Aside (Lazy Loading) Flow</h3>
            <pre><code>1. Request comes in for data
2. Check Redis first (fast!)
   → Cache HIT: return data (done, &lt;1ms)
   → Cache MISS: go to database
3. Fetch from database (~50ms)
4. Store in Redis with TTL
5. Return data to user</code></pre>

            <h3>💻 Code Example (Node.js)</h3>
            <pre><code>async function getUserProfile(userId) {
    const cacheKey = \`user:\${userId}:profile\`;

    // 1. Check cache first
    const cached = await redis.get(cacheKey);
    if (cached) {
        return JSON.parse(cached); // Cache HIT ⚡
    }

    // 2. Cache MISS — fetch from database
    const user = await db.users.findById(userId);

    // 3. Store in cache for 5 minutes
    await redis.setex(cacheKey, 300, JSON.stringify(user));

    return user;
}</code></pre>

            <h3>⚠️ Cache Invalidation — The Hard Part</h3>
            <p>When a user updates their profile, you must invalidate the cache:</p>
            <pre><code>async function updateUserProfile(userId, data) {
    await db.users.update(userId, data);
    await redis.del(\`user:\${userId}:profile\`); // Remove stale cache
}</code></pre>
            <p><em>"There are only 2 hard things in CS: cache invalidation and naming things." — Phil Karlton</em></p>

            <h3>❌ Common Mistakes</h3>
            <ul>
                <li><strong>No TTL</strong> — stale data forever fills memory</li>
                <li><strong>Cache stampede</strong> — 1000 users hit cache miss simultaneously, all query DB at once</li>
                <li><strong>Caching too much</strong> — data that changes every second shouldn't be cached</li>
            </ul>

            <div class="inline-quiz">
                <h4>🧠 Quick Check</h4>
                <p><strong>In cache-aside, when does the cache get populated?</strong></p>
                <button class="quiz-option" onclick="checkQuiz(this,'wrong','Not quite — write-through does this, but cache-aside populates lazily on cache miss.')">When data is written to the database</button>
                <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! Cache-aside is "lazy" — the cache only gets populated after a cache miss causes a database read.')">When a cache miss occurs</button>
                <button class="quiz-option" onclick="checkQuiz(this,'wrong','Cache-aside doesn\'t pre-populate on startup — it builds up over time as requests come in.')">On application startup</button>
                <div class="quiz-feedback"></div>
            </div>

            <div class="teach-it-back">
                <h4>🧠 Teach It Back</h4>
                <p style="font-size:13px;margin-bottom:8px">Walk through the cache-aside flow in your own words.</p>
                <textarea placeholder="When a request comes in..."></textarea>
            </div>
        `
    },
    'r2-2': {
        title: '2.2 Session Storage',
        xp: 100,
        content: `
            <div class="lesson-recap">🔄 <strong>Last lesson:</strong> Cache-aside — check Redis first, fall back to DB on miss, store result in Redis with TTL. Invalidate when data changes.</div>
            <div class="hook-story">🚀 <strong>Real World:</strong> Every time you stay logged into a website, a session keeps you authenticated. Traditional approach: store sessions in PostgreSQL. Problem: every page load = a DB query. With Redis Hashes + TTL, session lookup is &lt;1ms and auto-expires when you want it to.</div>
            <div class="why-matters">💡 <strong>Why this matters:</strong> Session storage is one of the most universal Redis use cases. Every web app with authentication can benefit from it.</div>

            <h3>🔐 How Session Storage Works</h3>
            <pre><code>// On login: create session
const sessionId = generateSecureToken(); // "sess_abc123xyz"
await redis.hset(\`session:\${sessionId}\`,
    'userId', user.id,
    'email', user.email,
    'loginAt', Date.now()
);
await redis.expire(\`session:\${sessionId}\`, 86400); // 24 hours

// Set cookie with sessionId on client

// On each request: verify session
const session = await redis.hgetall(\`session:\${sessionId}\`);
if (!session.userId) {
    return res.status(401).send('Unauthorized');
}
// User is authenticated! ✅

// On logout: destroy session
await redis.del(\`session:\${sessionId}\`);</code></pre>

            <h3>🆚 Redis Sessions vs Database Sessions</h3>
            <ul>
                <li><strong>Database:</strong> ~50ms per request, complex JOIN queries, scales poorly</li>
                <li><strong>Redis:</strong> &lt;1ms per request, simple key lookup, scales horizontally</li>
                <li><strong>Memory sessions (in-app):</strong> Lost on server restart, doesn't work with multiple servers</li>
            </ul>

            <div class="inline-quiz">
                <h4>🧠 Quick Check</h4>
                <p><strong>Why is Redis better than in-memory (server-side) session storage?</strong></p>
                <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! In-memory sessions are lost on restart and don\'t work across multiple servers. Redis persists and shares across all servers.')">Redis sessions survive server restarts and work across multiple servers</button>
                <button class="quiz-option" onclick="checkQuiz(this,'wrong','In-memory is actually faster since there\'s no network call. But it doesn\'t scale.')">Redis is faster than in-memory</button>
                <button class="quiz-option" onclick="checkQuiz(this,'wrong','Redis sessions aren\'t inherently more secure — that depends on implementation.')">Redis is more secure</button>
                <div class="quiz-feedback"></div>
            </div>

            <div class="teach-it-back">
                <h4>🧠 Teach It Back</h4>
                <p style="font-size:13px;margin-bottom:8px">Describe how you'd store and retrieve a user session in Redis.</p>
                <textarea placeholder="On login, I would..."></textarea>
            </div>
        `
    },
    'r2-3': {
        title: '2.3 Redis Pub/Sub',
        xp: 100,
        content: `
            <div class="lesson-recap">🔄 <strong>Last lesson:</strong> Session storage — use Redis Hashes + EXPIRE to store sessions. Survives restarts, works across multiple servers, &lt;1ms lookup.</div>
            <div class="hook-story">🚀 <strong>Real World:</strong> Chat apps like Slack deliver messages to thousands of open browser tabs instantly. Under the hood: when you send a message, it's published to a Redis channel. Every connected client subscribed to that channel receives it in milliseconds — without polling, without page refresh.</div>
            <div class="why-matters">💡 <strong>Why this matters:</strong> Redis Pub/Sub enables real-time features — chat, live notifications, price updates, collaborative tools — without a heavy message broker like Kafka.</div>

            <h3>📡 How Redis Pub/Sub Works</h3>
            <pre><code>// SUBSCRIBER (runs in one process/connection)
const subscriber = redis.duplicate(); // separate connection!
await subscriber.subscribe('chat:room:123', (message) => {
    console.log('New message:', message);
    broadcastToWebSocket(message);
});

// PUBLISHER (another process/connection)
await redis.publish('chat:room:123', JSON.stringify({
    user: 'Alice',
    text: 'Hello everyone!',
    timestamp: Date.now()
}));</code></pre>

            <h3>⚠️ Redis Pub/Sub Limitations</h3>
            <ul>
                <li><strong>Not persistent</strong> — if subscriber is offline, messages are lost</li>
                <li><strong>No acknowledgment</strong> — no guarantee message was received</li>
                <li><strong>For persistence</strong> — use Redis Streams instead</li>
            </ul>

            <div class="who-uses">
                <h4>🏢 Who uses Redis Pub/Sub?</h4>
                <div class="company-list"><span class="company">Chat apps</span><span class="company">Live dashboards</span><span class="company">Real-time notifications</span></div>
                <p class="company-note">Pub/Sub is built into Redis itself — no extra setup needed. It's the fastest way to add real-time features to any app.</p>
            </div>

            <div class="inline-quiz">
                <h4>🧠 Quick Check</h4>
                <p><strong>What happens to a Redis Pub/Sub message if no one is subscribed when it's published?</strong></p>
                <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! Redis Pub/Sub has no persistence — messages are fire-and-forget. Use Streams for durability.')">The message is lost</button>
                <button class="quiz-option" onclick="checkQuiz(this,'wrong','Not quite — Redis Pub/Sub is not persistent. Use Redis Streams if you need messages stored.')">It\'s stored until a subscriber connects</button>
                <button class="quiz-option" onclick="checkQuiz(this,'wrong','Redis doesn\'t throw an error — it just doesn\'t deliver the message to anyone.')">Redis throws an error</button>
                <div class="quiz-feedback"></div>
            </div>

            <div class="teach-it-back">
                <h4>🧠 Teach It Back</h4>
                <p style="font-size:13px;margin-bottom:8px">When would you use Redis Pub/Sub vs Redis Streams?</p>
                <textarea placeholder="I'd use Pub/Sub when... I'd use Streams when..."></textarea>
            </div>
        `
    },
    'r2-4': {
        title: '2.4 Rate Limiting with INCR + EXPIRE',
        xp: 125,
        content: `
            <div class="lesson-recap">🔄 <strong>Last lesson:</strong> Redis Pub/Sub — publishers push to channels, subscribers receive instantly. Not persistent — use Streams for durability.</div>
            <div class="hook-story">🚀 <strong>Real World:</strong> GitHub's API allows 5,000 requests per hour per user. If you exceed it, you get a 429 Too Many Requests error. How does GitHub track 5,000 requests/hour for millions of users without a massive database? Two Redis commands: INCR + EXPIRE. One atomic operation per request.</div>
            <div class="why-matters">💡 <strong>Why this matters:</strong> Rate limiting protects your API from abuse and ensures fair usage. Redis makes it trivially simple with atomic INCR.</div>

            <h3>🚦 Rate Limiter Implementation</h3>
            <pre><code>async function rateLimiter(userId, limit = 100, windowSeconds = 3600) {
    const key = \`rate:\${userId}:\${Math.floor(Date.now() / (windowSeconds * 1000))}\`;

    const current = await redis.incr(key);

    if (current === 1) {
        // First request in this window — set expiry
        await redis.expire(key, windowSeconds);
    }

    if (current > limit) {
        throw new Error(\`Rate limit exceeded. Try again later.\`);
    }

    return { remaining: limit - current, limit };
}

// Usage in Express middleware
app.use(async (req, res, next) => {
    try {
        const { remaining } = await rateLimiter(req.userId);
        res.setHeader('X-RateLimit-Remaining', remaining);
        next();
    } catch (err) {
        res.status(429).json({ error: err.message });
    }
});</code></pre>

            <h3>🔑 Why INCR is Perfect for Rate Limiting</h3>
            <ul>
                <li><strong>Atomic</strong> — increment and read in one operation, no race conditions</li>
                <li><strong>Auto-reset</strong> — key includes time window, auto-expires</li>
                <li><strong>Fast</strong> — &lt;1ms per request, any scale</li>
            </ul>

            <div class="inline-quiz">
                <h4>🧠 Quick Check</h4>
                <p><strong>Why is INCR better than GET + SET for rate limiting?</strong></p>
                <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! INCR is atomic — read + increment + write in one operation. GET + SET is two operations and can have race conditions with concurrent requests.')">INCR is atomic — GET + SET can have race conditions with concurrent requests</button>
                <button class="quiz-option" onclick="checkQuiz(this,'wrong','INCR isn\'t faster in terms of network — the key benefit is atomicity.')">INCR is faster because it\'s one network call</button>
                <button class="quiz-option" onclick="checkQuiz(this,'wrong','Both use similar memory. The difference is atomicity.')">INCR uses less memory</button>
                <div class="quiz-feedback"></div>
            </div>

            <div class="teach-it-back">
                <h4>🧠 Teach It Back</h4>
                <p style="font-size:13px;margin-bottom:8px">Explain the rate limiting pattern using INCR + EXPIRE in your own words.</p>
                <textarea placeholder="For each request..."></textarea>
            </div>
        `
    },
    'r2-5': {
        title: '2.5 Leaderboards with Sorted Sets',
        xp: 125,
        content: `
            <div class="lesson-recap">🔄 <strong>Last lesson:</strong> Rate limiting — INCR key per user per time window. Atomic, auto-expires, &lt;1ms. Used by GitHub, Twitter, every major API.</div>
            <div class="hook-story">🚀 <strong>Real World:</strong> Stack Overflow ranks millions of developers by reputation in real-time. Every upvote updates a user's score. With SQL, this would be a full table ORDER BY on every page load. With Redis Sorted Sets: ZADD leaderboard 2450 "user:tzachi" — one command, instantly ranked. Stack Overflow uses this exact pattern.</div>
            <div class="why-matters">💡 <strong>Why this matters:</strong> Sorted Sets are one of Redis's killer features. Leaderboards, priority queues, autocomplete — all solved elegantly.</div>

            <h3>🏆 Leaderboard Implementation</h3>
            <pre><code>// Add/update player score
await redis.zadd('game:leaderboard', 15000, 'player:alice');
await redis.zadd('game:leaderboard', 22000, 'player:bob');
await redis.zadd('game:leaderboard', 18500, 'player:charlie');

// Get top 10 players (highest scores first)
const top10 = await redis.zrange('game:leaderboard', 0, 9, {
    REV: true,
    WITHSCORES: true
});
// => [['player:bob', 22000], ['player:charlie', 18500], ...]

// Get a specific player's rank (0-indexed)
const rank = await redis.zrevrank('game:leaderboard', 'player:alice');
// => 2 (3rd place)

// Add points to existing score
await redis.zincrby('game:leaderboard', 5000, 'player:alice');
// alice now has 20000 points — ranking auto-updates</code></pre>

            <h3>🆚 Redis vs SQL for Leaderboards</h3>
            <ul>
                <li><strong>SQL:</strong> SELECT * FROM users ORDER BY score DESC LIMIT 10 — full table scan every time</li>
                <li><strong>Redis ZRANGE:</strong> O(log N) — always fast regardless of dataset size</li>
            </ul>

            <div class="who-uses">
                <h4>🏢 Who uses Redis Sorted Sets?</h4>
                <div class="company-list"><span class="company">Stack Overflow</span><span class="company">Gaming platforms</span><span class="company">Social apps</span></div>
                <p class="company-note">Any app with rankings, scores, or ordered data benefits from Redis Sorted Sets.</p>
            </div>

            <div class="inline-quiz">
                <h4>🧠 Quick Check</h4>
                <p><strong>What command adds or updates a player's score in a Redis Sorted Set?</strong></p>
                <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! ZADD adds a member with a score. If member exists, it updates the score.')">ZADD</button>
                <button class="quiz-option" onclick="checkQuiz(this,'wrong','ZRANGE retrieves items from the sorted set — it doesn\'t add them.')">ZRANGE</button>
                <button class="quiz-option" onclick="checkQuiz(this,'wrong','SADD adds to a regular Set — no scores, no ranking.')">SADD</button>
                <div class="quiz-feedback"></div>
            </div>

            <div class="teach-it-back">
                <h4>🧠 Teach It Back</h4>
                <p style="font-size:13px;margin-bottom:8px">Why is a Redis Sorted Set better than SQL for a leaderboard?</p>
                <textarea placeholder="Redis Sorted Sets are better because..."></textarea>
            </div>
        `
    },
    'r2-6': {
        title: '2.6 Quiz: Pattern Recognition',
        xp: 150,
        content: `
            <div class="lesson-recap">🔄 <strong>Module 2 summary:</strong> Cache-aside (speed layer), Sessions (HSET + EXPIRE), Pub/Sub (real-time), Rate Limiting (INCR), Leaderboards (ZADD).</div>
            <h3>📝 Pattern Quiz — Match the use case to the pattern</h3>

            <div class="inline-quiz">
                <h4>Question 1</h4>
                <p><strong>A news site wants to reduce database load for articles that are read 10,000 times/day but updated once a week. Which pattern?</strong></p>
                <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Cache-aside! Check Redis first, fall back to DB on miss, store with TTL. 99% of reads served from Redis.')">Cache-aside with TTL</button>
                <button class="quiz-option" onclick="checkQuiz(this,'wrong','Pub/Sub delivers real-time messages — not the right pattern for caching static content.')">Pub/Sub</button>
                <button class="quiz-option" onclick="checkQuiz(this,'wrong','Rate limiting controls request frequency — it doesn\'t help with reducing DB load for reads.')">Rate Limiting</button>
                <div class="quiz-feedback"></div>
            </div>

            <div class="inline-quiz">
                <h4>Question 2</h4>
                <p><strong>A live multiplayer game needs to show real-time scores for 10,000 players. Which data type?</strong></p>
                <button class="quiz-option" onclick="checkQuiz(this,'wrong','Hashes store object fields but don\'t support ranked ordering by score.')">Hash</button>
                <button class="quiz-option" onclick="checkQuiz(this,'wrong','Lists are ordered by insertion time, not by a custom score value.')">List</button>
                <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Sorted Set! ZADD to update score, ZRANGE REV to get top players. O(log N) performance.')">Sorted Set</button>
                <div class="quiz-feedback"></div>
            </div>

            <div class="inline-quiz">
                <h4>Question 3</h4>
                <p><strong>An API allows 100 requests/minute per user. Which pattern enforces this?</strong></p>
                <button class="quiz-option" onclick="checkQuiz(this,'wrong','Cache-aside is for reading data faster — not for limiting request frequency.')">Cache-aside</button>
                <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Rate limiting! INCR per user per minute window. Atomic, fast, auto-resets with EXPIRE.')">Rate Limiting with INCR + EXPIRE</button>
                <button class="quiz-option" onclick="checkQuiz(this,'wrong','Session storage tracks authenticated users — not request rate limits.')">Session storage</button>
                <div class="quiz-feedback"></div>
            </div>

            <div class="inline-quiz">
                <h4>Question 4</h4>
                <p><strong>A collaborative document editor needs to push changes to all editors in real-time. Which pattern?</strong></p>
                <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Pub/Sub! Publisher pushes document changes to a channel. All connected editors (subscribers) receive instantly.')">Redis Pub/Sub</button>
                <button class="quiz-option" onclick="checkQuiz(this,'wrong','Caching is for read optimization — it doesn\'t push real-time updates to clients.')">Cache-aside</button>
                <button class="quiz-option" onclick="checkQuiz(this,'wrong','Rate limiting controls access frequency — not real-time data broadcasting.')">Rate Limiting</button>
                <div class="quiz-feedback"></div>
            </div>

            <h3>🎯 Module 2 Complete!</h3>
            <ul>
                <li>✅ Cache-aside — speed layer for frequently-read data</li>
                <li>✅ Session storage — HSET + EXPIRE for auth</li>
                <li>✅ Pub/Sub — real-time messaging</li>
                <li>✅ Rate limiting — INCR + EXPIRE per time window</li>
                <li>✅ Leaderboards — ZADD + ZRANGE with Sorted Sets</li>
            </ul>
            <p><strong>Next:</strong> Module 3 — Build all of these for real!</p>
        `
    }
};

// Redis Flashcards
const redisFlashcards = [
    { term: 'Redis', def: 'Remote Dictionary Server — open-source in-memory key-value store. Sub-millisecond reads. Used for caching, sessions, pub/sub, leaderboards, rate limiting.' },
    { term: 'SET key value EX 60', def: 'Store a value with a 60-second TTL. After 60 seconds, Redis automatically deletes the key.' },
    { term: 'TTL', def: 'Time To Live — remaining seconds before a key expires. Returns -1 if no expiry, -2 if key doesn\'t exist.' },
    { term: 'INCR', def: 'Atomically increment a numeric value by 1. Thread-safe — used for counters and rate limiting.' },
    { term: 'HSET / HGETALL', def: 'Store/retrieve hash fields. HSET user:1 name "Alice" email "a@b.com". HGETALL returns all fields.' },
    { term: 'ZADD / ZRANGE', def: 'Add to sorted set with score (ZADD). Retrieve by rank (ZRANGE). Used for leaderboards.' },
    { term: 'Cache-Aside', def: 'Check Redis first → on miss, query DB → store in Redis with TTL. Most common caching pattern.' },
    { term: 'Cache Invalidation', def: 'Deleting cached data when source data changes. Done with DEL key. The hardest part of caching.' },
    { term: 'Redis Pub/Sub', def: 'Publishers send messages to channels. Subscribers receive instantly. NOT persistent — messages lost if no subscriber.' },
    { term: 'RDB Persistence', def: 'Point-in-time snapshots saved to disk. Fast restarts, may lose last few minutes of data on crash.' },
    { term: 'AOF Persistence', def: 'Append-Only File — every write logged. Better durability than RDB, slightly slower writes.' },
    { term: 'Redis Sentinel', def: 'High availability — automatically promotes a replica to master if master fails. No data loss.' },
];

// Module 3 & 4 lessons (stub content for build lessons — full code exercises)
Object.assign(redisLessons, {
    'r3-1': {
        title: '3.1 Project Setup: Node.js + Redis',
        xp: 100,
        content: `
            <div class="lesson-recap">🔄 <strong>Module 2 complete!</strong> You know 5 Redis patterns. Now let's build them for real.</div>
            <div class="hook-story">🚀 <strong>Real World:</strong> Every Node.js Redis app in production uses ioredis — the most popular Redis client with 7 million weekly downloads. You're about to set up the same stack used at production scale.</div>
            <div class="why-matters">💡 <strong>Why this matters:</strong> Getting your environment right first means no debugging setup issues when you're trying to learn patterns.</div>
            <h3>📦 Install Dependencies</h3>
            <pre><code>mkdir redis-project && cd redis-project
npm init -y
npm install ioredis express dotenv</code></pre>
            <h3>🔧 Connect to Redis</h3>
            <pre><code>// redis.js
const Redis = require('ioredis');
const redis = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD || undefined,
    retryStrategy: (times) => Math.min(times * 50, 2000)
});
redis.on('connect', () => console.log('✅ Redis connected'));
redis.on('error', (err) => console.error('❌ Redis error:', err));
module.exports = redis;</code></pre>
            <h3>🐳 Run Redis with Docker (easiest)</h3>
            <pre><code>docker run -d --name redis-dev -p 6379:6379 redis:latest
# Test it:
docker exec -it redis-dev redis-cli ping
# => PONG ✅</code></pre>
            <div class="teach-it-back"><h4>🧠 Teach It Back</h4><p style="font-size:13px;margin-bottom:8px">What is ioredis and why use Docker for Redis in development?</p><textarea placeholder="ioredis is..."></textarea></div>
        `
    },
    'r3-2': {
        title: '3.2 Build: Cache-Aside API',
        xp: 150,
        content: `
            <div class="lesson-recap">🔄 <strong>Last lesson:</strong> Set up Node.js + ioredis + Docker Redis. Now let's build a real caching API.</div>
            <div class="hook-story">🚀 <strong>Real World:</strong> A weather API that charges per call. Without caching: 10,000 users requesting weather = 10,000 API charges. With Redis cache-aside and a 10-minute TTL: 1 API charge, 9,999 served from Redis.</div>
            <h3>💻 Build It</h3>
            <pre><code>const express = require('express');
const redis = require('./redis');
const app = express();

// Simulate slow external API
async function fetchWeatherFromAPI(city) {
    await new Promise(r => setTimeout(r, 500)); // simulate 500ms
    return { city, temp: 22, condition: 'sunny', fetched: new Date() };
}

app.get('/weather/:city', async (req, res) => {
    const { city } = req.params;
    const cacheKey = \`weather:\${city.toLowerCase()}\`;

    // 1. Check cache
    const cached = await redis.get(cacheKey);
    if (cached) {
        return res.json({ ...JSON.parse(cached), source: 'cache ⚡' });
    }

    // 2. Cache miss — fetch from API
    const weather = await fetchWeatherFromAPI(city);

    // 3. Cache for 10 minutes
    await redis.setex(cacheKey, 600, JSON.stringify(weather));

    res.json({ ...weather, source: 'api (cached now)' });
});

app.listen(3000, () => console.log('Server on :3000'));</code></pre>
            <p><strong>Test it:</strong> Hit /weather/london twice. First: 500ms (API). Second: &lt;5ms (cache) ⚡</p>
            <div class="teach-it-back"><h4>🧠 Teach It Back</h4><p style="font-size:13px;margin-bottom:8px">What would happen if you removed the redis.get() check?</p><textarea placeholder="Without the cache check..."></textarea></div>
        `
    },
    'r3-3': {
        title: '3.3 Build: Session Store',
        xp: 150,
        content: `
            <div class="lesson-recap">🔄 <strong>Last lesson:</strong> Built a cache-aside weather API. First request ~500ms. Second request &lt;5ms from cache.</div>
            <div class="hook-story">🚀 <strong>Real World:</strong> express-session + Redis is the standard Node.js session pattern. It's how authentication works in production Node apps worldwide.</div>
            <h3>💻 Build It</h3>
            <pre><code>npm install express-session connect-redis</code></pre>
            <pre><code>const session = require('express-session');
const RedisStore = require('connect-redis').default;
const redis = require('./redis');

app.use(session({
    store: new RedisStore({ client: redis }),
    secret: process.env.SESSION_SECRET || 'dev-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

app.post('/login', (req, res) => {
    // In real app: verify credentials first
    req.session.userId = 'user:123';
    req.session.email = 'alice@example.com';
    res.json({ message: 'Logged in ✅' });
});

app.get('/profile', (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ error: 'Not authenticated' });
    }
    res.json({ userId: req.session.userId, email: req.session.email });
});

app.post('/logout', (req, res) => {
    req.session.destroy();
    res.json({ message: 'Logged out' });
});</code></pre>
            <div class="teach-it-back"><h4>🧠 Teach It Back</h4><p style="font-size:13px;margin-bottom:8px">What does connect-redis do and why is it better than the default memory store?</p><textarea placeholder="connect-redis..."></textarea></div>
        `
    },
    'r3-4': {
        title: '3.4 Build: Real-Time Leaderboard',
        xp: 200,
        content: `
            <div class="lesson-recap">🔄 <strong>Last lesson:</strong> Built a Redis session store using express-session + connect-redis. Sessions survive restarts and work across servers.</div>
            <div class="hook-story">🚀 <strong>Real World:</strong> Gaming companies update leaderboards in real-time as millions of players score points. You're building the same pattern — ZADD for scoring, ZRANGE for rankings.</div>
            <h3>💻 Build It</h3>
            <pre><code>const LEADERBOARD = 'game:leaderboard';

// Add/update player score
app.post('/score', async (req, res) => {
    const { player, points } = req.body;
    await redis.zincrby(LEADERBOARD, points, player);
    const rank = await redis.zrevrank(LEADERBOARD, player) + 1;
    const score = await redis.zscore(LEADERBOARD, player);
    res.json({ player, score: parseInt(score), rank });
});

// Get top 10
app.get('/leaderboard', async (req, res) => {
    const top = await redis.zrange(LEADERBOARD, 0, 9, 'REV', 'WITHSCORES');
    const results = [];
    for (let i = 0; i < top.length; i += 2) {
        results.push({ rank: i/2 + 1, player: top[i], score: parseInt(top[i+1]) });
    }
    res.json(results);
});

// Get player's rank
app.get('/rank/:player', async (req, res) => {
    const rank = await redis.zrevrank(LEADERBOARD, req.params.player);
    const score = await redis.zscore(LEADERBOARD, req.params.player);
    res.json({ player: req.params.player, rank: rank + 1, score: parseInt(score) });
});</code></pre>
            <div class="teach-it-back"><h4>🧠 Teach It Back</h4><p style="font-size:13px;margin-bottom:8px">What's the difference between ZADD and ZINCRBY?</p><textarea placeholder="ZADD sets a score, ZINCRBY..."></textarea></div>
        `
    },
    'r3-5': {
        title: '3.5 Final Project: Rate-Limited API',
        xp: 300,
        content: `
            <div class="lesson-recap">🔄 <strong>Module 3 so far:</strong> Built cache-aside, session store, leaderboard. Now combining it all in a production-ready API with rate limiting.</div>
            <div class="hook-story">🚀 <strong>Real World:</strong> Every public API — GitHub, Twitter, OpenAI — uses rate limiting. You're building the same pattern that protects millions of APIs from abuse.</div>
            <h3>💻 Complete Rate-Limited API</h3>
            <pre><code>// Rate limit middleware
async function rateLimit(req, res, next) {
    const userId = req.session?.userId || req.ip;
    const window = Math.floor(Date.now() / 60000); // 1-minute window
    const key = \`rate:\${userId}:\${window}\`;
    const limit = 60; // 60 requests per minute

    const count = await redis.incr(key);
    if (count === 1) await redis.expire(key, 60);

    res.setHeader('X-RateLimit-Limit', limit);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, limit - count));

    if (count > limit) {
        return res.status(429).json({
            error: 'Rate limit exceeded',
            retryAfter: 60 - (Date.now() % 60000) / 1000
        });
    }
    next();
}

// Protected endpoint (cached + rate-limited)
app.get('/api/data/:id', rateLimit, async (req, res) => {
    const cacheKey = \`data:\${req.params.id}\`;
    const cached = await redis.get(cacheKey);
    if (cached) return res.json(JSON.parse(cached));

    const data = await fetchDataFromDB(req.params.id);
    await redis.setex(cacheKey, 300, JSON.stringify(data));
    res.json(data);
});</code></pre>
            <h3>🎉 You just built a production-ready API with:</h3>
            <ul>
                <li>✅ Redis caching (cache-aside)</li>
                <li>✅ Redis rate limiting (INCR + EXPIRE)</li>
                <li>✅ Proper rate limit headers</li>
                <li>✅ 429 responses with retry timing</li>
            </ul>
            <div class="teach-it-back"><h4>🧠 Teach It Back</h4><p style="font-size:13px;margin-bottom:8px">Explain how the rate limiter resets every minute automatically.</p><textarea placeholder="The window key includes..."></textarea></div>
        `
    },
    'r4-1': {
        title: '4.1 Persistence: RDB vs AOF',
        xp: 125,
        content: `
            <div class="lesson-recap">🔄 <strong>Module 3 complete!</strong> You built 4 real Redis systems. Now let's understand how Redis survives crashes.</div>
            <div class="hook-story">🚀 <strong>Real World:</strong> A startup ran Redis in production with no persistence configured. Their server crashed at 3am. All data — 6 months of user sessions and cache — was gone. Redis is in-memory by default. Without persistence, a restart = data lost. Here's how to prevent it.</div>
            <div class="why-matters">💡 <strong>Why this matters:</strong> Every production Redis setup needs a persistence strategy. This is a top Redis interview question.</div>
            <h3>💾 Two Persistence Options</h3>
            <h4>RDB — Point-in-Time Snapshots</h4>
            <pre><code># redis.conf
save 900 1      # snapshot if 1 key changed in 900 seconds
save 300 10     # snapshot if 10 keys changed in 300 seconds
save 60 10000   # snapshot if 10000 keys changed in 60 seconds</code></pre>
            <ul><li>✅ Fast restarts — loads snapshot file</li><li>✅ Low overhead during normal operation</li><li>❌ May lose last few minutes of data on crash</li></ul>
            <h4>AOF — Append-Only File</h4>
            <pre><code># redis.conf
appendonly yes
appendfsync everysec  # sync to disk every second (balanced)</code></pre>
            <ul><li>✅ Better durability — max 1 second of data loss</li><li>✅ Human-readable log of all writes</li><li>❌ Larger file size, slightly slower writes</li></ul>
            <h4>Both Together (recommended for production)</h4>
            <pre><code>save 900 1
appendonly yes
appendfsync everysec</code></pre>
            <div class="inline-quiz">
                <h4>🧠 Quick Check</h4>
                <p><strong>Which persistence mode logs every write operation?</strong></p>
                <button class="quiz-option" onclick="checkQuiz(this,'wrong','RDB takes periodic snapshots — it doesn\'t log every write.')">RDB</button>
                <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ AOF (Append-Only File) logs every write command. This gives much better durability than RDB snapshots.')">AOF</button>
                <div class="quiz-feedback"></div>
            </div>
            <div class="teach-it-back"><h4>🧠 Teach It Back</h4><p style="font-size:13px;margin-bottom:8px">When would you choose RDB over AOF?</p><textarea placeholder="I'd choose RDB when..."></textarea></div>
        `
    },
    'r4-2': {
        title: '4.2 High Availability: Redis Sentinel',
        xp: 125,
        content: `
            <div class="lesson-recap">🔄 <strong>Last lesson:</strong> Persistence — RDB (snapshots) vs AOF (every write). Use both in production.</div>
            <div class="hook-story">🚀 <strong>Real World:</strong> When your Redis master server goes down at 2am, you need automatic failover — a replica promoted to master in seconds without human intervention. Redis Sentinel does exactly this. Companies running Redis in production with 99.99% uptime all use Sentinel.</div>
            <div class="why-matters">💡 <strong>Why this matters:</strong> A single Redis without Sentinel is a single point of failure. Sentinel makes Redis production-ready.</div>
            <h3>🏰 How Redis Sentinel Works</h3>
            <pre><code>Architecture:
┌─────────────┐      ┌──────────────┐      ┌──────────────┐
│   Master    │─────▶│   Replica 1  │      │   Replica 2  │
│  (writes)   │─────▶│  (read-only) │      │  (read-only) │
└─────────────┘      └──────────────┘      └──────────────┘
       ▲                    ▲                     ▲
       │                    │                     │
  ┌────┴────┐         ┌─────┴────┐         ┌─────┴────┐
  │Sentinel1│         │Sentinel2 │         │Sentinel3 │
  └─────────┘         └──────────┘         └──────────┘
  (Monitors master — if it goes down, elects a new master)</code></pre>
            <h3>⚡ Automatic Failover</h3>
            <ul>
                <li>Sentinels monitor the master every second</li>
                <li>If master is down for 30 seconds → Sentinels vote</li>
                <li>Majority vote → elect a replica as new master</li>
                <li>Clients are notified of new master address</li>
                <li>Total failover time: ~30-60 seconds</li>
            </ul>
            <div class="inline-quiz">
                <h4>🧠 Quick Check</h4>
                <p><strong>What does Redis Sentinel do when the master fails?</strong></p>
                <button class="quiz-option" onclick="checkQuiz(this,'wrong','Sentinel doesn\'t restart the master — it promotes a replica instead.')">Restarts the master automatically</button>
                <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! Sentinels detect the failure, vote, and promote a replica to become the new master.')">Promotes a replica to master</button>
                <div class="quiz-feedback"></div>
            </div>
            <div class="teach-it-back"><h4>🧠 Teach It Back</h4><p style="font-size:13px;margin-bottom:8px">Why do you need 3 Sentinels (not 1 or 2)?</p><textarea placeholder="You need 3 Sentinels because..."></textarea></div>
        `
    },
    'r4-3': {
        title: '4.3 Horizontal Scaling: Redis Cluster',
        xp: 150,
        content: `
            <div class="lesson-recap">🔄 <strong>Last lesson:</strong> Sentinel — 3 monitors, automatic failover in ~30-60 seconds. Production must-have.</div>
            <div class="hook-story">🚀 <strong>Real World:</strong> When a single Redis server can't hold all your data (limited RAM) or can't handle your write throughput, Redis Cluster splits your data across multiple nodes automatically. Uber's location data for millions of drivers worldwide can't fit on one machine — Cluster is how they scale horizontally.</div>
            <div class="why-matters">💡 <strong>Why this matters:</strong> Understanding when to use Cluster vs Sentinel is a senior-level Redis question. Many teams hit this wall at scale.</div>
            <h3>🌐 Redis Cluster Key Concepts</h3>
            <ul>
                <li><strong>Hash slots:</strong> 16,384 slots distributed across nodes</li>
                <li><strong>Sharding:</strong> Each key mapped to a slot → specific node</li>
                <li><strong>Minimum 3 masters</strong> (+ 3 replicas for HA)</li>
                <li><strong>Automatic rebalancing</strong> when nodes added/removed</li>
            </ul>
            <pre><code># Key slot calculation
CLUSTER KEYSLOT "user:123"   # => 5474 (goes to node holding slots 5001-6000)
CLUSTER KEYSLOT "user:456"   # => 9891 (goes to different node)

# Same node using hash tags
CLUSTER KEYSLOT "{user:123}.profile"  # => same slot as user:123
CLUSTER KEYSLOT "{user:123}.session"  # => same slot as user:123</code></pre>
            <h3>🆚 Sentinel vs Cluster</h3>
            <ul>
                <li><strong>Sentinel:</strong> High availability (failover). Data on ONE master.</li>
                <li><strong>Cluster:</strong> High availability + horizontal scaling. Data sharded across MULTIPLE masters.</li>
            </ul>
            <div class="teach-it-back"><h4>🧠 Teach It Back</h4><p style="font-size:13px;margin-bottom:8px">When would you choose Redis Cluster over Redis Sentinel?</p><textarea placeholder="I'd choose Cluster when..."></textarea></div>
        `
    },
    'r4-4': {
        title: '4.4 Final Assessment',
        xp: 250,
        content: `
            <div class="lesson-recap">🔄 <strong>Course summary:</strong> Redis = in-memory speed layer. 5 data types. 5 patterns. Persistence. Sentinel. Cluster.</div>
            <h3>🏆 Final Assessment — 5 Questions</h3>

            <div class="inline-quiz">
                <h4>Question 1</h4>
                <p><strong>A user updates their profile. Which Redis action is required?</strong></p>
                <button class="quiz-option" onclick="checkQuiz(this,'wrong','Updating the cache without removing it risks stale data — unless you update it with the new value.')">Update the cache key</button>
                <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! DEL the cached profile key so the next request fetches fresh data from the database.')">DEL the cached profile key</button>
                <button class="quiz-option" onclick="checkQuiz(this,'wrong','Doing nothing leaves stale data in Redis. Users would see old profile info.')">Do nothing — TTL will expire it</button>
                <div class="quiz-feedback"></div>
            </div>

            <div class="inline-quiz">
                <h4>Question 2</h4>
                <p><strong>What does ZINCRBY leaderboard 100 "alice" do?</strong></p>
                <button class="quiz-option" onclick="checkQuiz(this,'wrong','ZADD would set the score to 100. ZINCRBY adds to the existing score.')">Sets alice\'s score to 100</button>
                <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! ZINCRBY increments the existing score. If alice had 500, she now has 600.')">Adds 100 to alice\'s existing score</button>
                <div class="quiz-feedback"></div>
            </div>

            <div class="inline-quiz">
                <h4>Question 3</h4>
                <p><strong>Redis Pub/Sub message is published but no subscribers exist. What happens?</strong></p>
                <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! Redis Pub/Sub has no persistence. Messages published with no active subscribers are lost forever.')">Message is lost</button>
                <button class="quiz-option" onclick="checkQuiz(this,'wrong','Redis Pub/Sub does not queue messages. Use Redis Streams for queuing.')">Message is queued until a subscriber connects</button>
                <div class="quiz-feedback"></div>
            </div>

            <div class="inline-quiz">
                <h4>Question 4</h4>
                <p><strong>What is the main difference between RDB and AOF persistence?</strong></p>
                <button class="quiz-option" onclick="checkQuiz(this,'wrong','Both handle persistence differently — speed isn\'t the main distinction.')">RDB is faster, AOF is slower</button>
                <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! RDB = periodic snapshots (may lose minutes of data). AOF = every write logged (max 1 second data loss).')">RDB takes periodic snapshots; AOF logs every write</button>
                <div class="quiz-feedback"></div>
            </div>

            <div class="inline-quiz">
                <h4>Question 5</h4>
                <p><strong>When should you use Redis Cluster instead of Sentinel?</strong></p>
                <button class="quiz-option" onclick="checkQuiz(this,'wrong','Sentinel handles failover but data still lives on one master. Cluster is needed for data sharding.')">When you need automatic failover</button>
                <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! Use Cluster when your data is too large for one Redis server, or when you need to scale writes horizontally.')">When your data exceeds one server\'s RAM or you need to scale writes</button>
                <div class="quiz-feedback"></div>
            </div>

            <h3>🎓 Course Complete!</h3>
            <p>You've mastered Redis from zero to production:</p>
            <ul>
                <li>✅ What Redis is and why it's fast</li>
                <li>✅ 5 data types + when to use each</li>
                <li>✅ Core commands (SET, GET, INCR, EXPIRE, TTL, ZADD...)</li>
                <li>✅ Cache-aside, sessions, pub/sub, rate limiting, leaderboards</li>
                <li>✅ Built 4 real systems from scratch</li>
                <li>✅ Persistence: RDB vs AOF</li>
                <li>✅ High availability: Sentinel</li>
                <li>✅ Horizontal scaling: Cluster</li>
            </ul>
            <p><strong>You're now ready for Redis interviews and production usage. 🚀</strong></p>
        `
    }
});
