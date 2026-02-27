const graphqlLessons = {
    'g1-1': { title: '1.1 What is GraphQL?', xp: 50, content: `
        <div class="hook-story">🚀 <strong>Real World:</strong> Facebook built GraphQL in 2012 to power their mobile app. REST was causing massive over-fetching — fetching 50 fields to display 3. With GraphQL, mobile clients ask for exactly the 3 fields they need. Facebook open-sourced it in 2015. GitHub migrated their entire public API to GraphQL in 2016.</div>
        <div class="why-matters">💡 <strong>Why this matters:</strong> GraphQL is used by GitHub, Shopify, Twitter, Netflix, and Airbnb. It's becoming the standard API layer for frontend developers.</div>
        <h3>❓ What is GraphQL?</h3>
        <p>GraphQL is a <strong>query language for APIs</strong> + a runtime for executing those queries. Instead of multiple REST endpoints, you have <strong>one endpoint</strong> that returns exactly what you ask for.</p>
        <ul>
            <li>📋 <strong>Ask for what you need</strong> — no over-fetching, no under-fetching</li>
            <li>💪 <strong>Strong type system</strong> — schema defines every field and type</li>
            <li>🔍 <strong>Introspective</strong> — you can query the schema itself</li>
            <li>🔗 <strong>Single endpoint</strong> — typically /graphql</li>
        </ul>
        <h3>🆚 REST vs GraphQL</h3>
        <table style="width:100%;border-collapse:collapse;font-size:13px">
            <tr style="background:#e535ab;color:white"><th style="padding:8px">Property</th><th style="padding:8px">REST</th><th style="padding:8px">GraphQL</th></tr>
            <tr style="background:#f8f9fa"><td style="padding:8px">Endpoints</td><td style="padding:8px">Multiple (/users, /posts)</td><td style="padding:8px">One (/graphql)</td></tr>
            <tr><td style="padding:8px">Over-fetching</td><td style="padding:8px">Common</td><td style="padding:8px">Never — ask for exact fields</td></tr>
            <tr style="background:#f8f9fa"><td style="padding:8px">Versioning</td><td style="padding:8px">/v1, /v2</td><td style="padding:8px">Versionless — evolve schema</td></tr>
            <tr><td style="padding:8px">Type safety</td><td style="padding:8px">Optional</td><td style="padding:8px">Built-in</td></tr>
        </table>
        <div class="inline-quiz"><h4>🧠 Quick Check</h4><p><strong>What problem did Facebook build GraphQL to solve?</strong></p>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! REST APIs return fixed shapes — often too much data. GraphQL lets clients request exactly the fields they need.')">REST APIs returned too much data (over-fetching) for mobile apps</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','GraphQL is an API layer — it\'s not specifically about database optimization.')">Database queries were too slow</button>
        <div class="quiz-feedback"></div></div>
        <div class="teach-it-back"><h4>🧠 Teach It Back</h4><p style="font-size:13px;margin-bottom:8px">Explain GraphQL to someone who only knows REST.</p><textarea placeholder="GraphQL is like REST but..."></textarea></div>
    `},
    'g1-2': { title: '1.2 Schema & Types', xp: 50, content: `
        <div class="lesson-recap">🔄 <strong>Last lesson:</strong> GraphQL = single endpoint, ask for exact fields. Created by Facebook 2012, used by GitHub, Shopify, Twitter.</div>
        <div class="hook-story">🚀 <strong>Real World:</strong> GitHub's GraphQL schema has 200+ types. Every field is typed. When Shopify partners build apps against the Shopify API, they get autocomplete, type errors, and documentation from the schema itself — before making a single API call.</div>
        <div class="why-matters">💡 <strong>Why this matters:</strong> The schema is the contract between frontend and backend. It defines every type, every field, every relationship.</div>
        <h3>📝 Schema Definition Language (SDL)</h3>
        <pre><code>type User {
  id: ID!           # ID type, non-null (!)
  name: String!     # String, required
  email: String!
  age: Int          # Int, nullable (no !)
  posts: [Post!]!   # Array of Post, non-null
}

type Post {
  id: ID!
  title: String!
  body: String!
  author: User!     # Relationship to User
  published: Boolean!
  createdAt: String!
}

type Query {
  user(id: ID!): User     # Fetch one user
  users: [User!]!         # Fetch all users
  post(id: ID!): Post
}

type Mutation {
  createUser(name: String!, email: String!): User!
  deletePost(id: ID!): Boolean!
}</code></pre>
        <h3>🔑 Scalar Types</h3>
        <ul>
            <li><code>String</code>, <code>Int</code>, <code>Float</code>, <code>Boolean</code>, <code>ID</code> — built-in scalars</li>
            <li><code>!</code> = non-null (required)</li>
            <li><code>[Type]</code> = array</li>
            <li><code>[Type!]!</code> = non-null array of non-null items</li>
        </ul>
        <div class="inline-quiz"><h4>🧠 Quick Check</h4><p><strong>In GraphQL schema, what does the ! symbol mean?</strong></p>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! The ! marks a field as non-null (required). Without it, the field can return null.')">The field is non-null (required, cannot return null)</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','! doesn\'t mean it\'s important — it means non-null/required.')">The field is important or special</button>
        <div class="quiz-feedback"></div></div>
        <div class="teach-it-back"><h4>🧠 Teach It Back</h4><p style="font-size:13px;margin-bottom:8px">What's the difference between String, String!, and [String!]! in GraphQL?</p><textarea placeholder="String means... String! means... [String!]! means..."></textarea></div>
    `},
    'g1-3': { title: '1.3 Queries', xp: 75, content: `
        <div class="lesson-recap">🔄 <strong>Last lesson:</strong> Schema = contract. Types define shape. ! = required. Query type = reads. Mutation type = writes.</div>
        <div class="hook-story">🚀 <strong>Real World:</strong> GitHub's GraphQL API lets you fetch a repository's name, star count, and last 10 issues — all in ONE request. With REST, that would be 3 separate calls. GraphQL queries traverse related objects in a single round trip.</div>
        <div class="why-matters">💡 <strong>Why this matters:</strong> Queries are how you READ data in GraphQL. Understanding fields, arguments, variables, and aliases unlocks 80% of what you'll do daily.</div>
        <h3>📖 Basic Query</h3>
        <pre><code># Ask for exactly what you need
query GetUser {
  user(id: "1") {
    name
    email
    posts {
      title
      published
    }
  }
}

# Response — exactly what you asked for:
{
  "data": {
    "user": {
      "name": "Alice",
      "email": "alice@example.com",
      "posts": [
        { "title": "Hello World", "published": true }
      ]
    }
  }
}</code></pre>
        <h3>🔧 Variables (always use these!)</h3>
        <pre><code># Never embed dynamic values in query string
query GetUser($userId: ID!) {   # Declare variable
  user(id: $userId) {           # Use it
    name
    email
  }
}

# Send variables separately:
{ "userId": "123" }</code></pre>
        <h3>🔀 Aliases (fetch same field twice)</h3>
        <pre><code>query CompareUsers {
  alice: user(id: "1") { name }
  bob: user(id: "2") { name }
}</code></pre>
        <div class="inline-quiz"><h4>🧠 Quick Check</h4><p><strong>Why use variables instead of embedding values in query strings?</strong></p>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! Variables keep queries static, avoid SQL-injection-style issues, enable better caching, and are cleaner to read.')">Security, caching, and cleaner code — variables separate query from data</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Variables don\'t make queries run faster, but they do make them safer and more maintainable.')">Variables make queries run faster</button>
        <div class="quiz-feedback"></div></div>
        <div class="teach-it-back"><h4>🧠 Teach It Back</h4><p style="font-size:13px;margin-bottom:8px">How is a GraphQL query different from a REST request?</p><textarea placeholder="In REST I'd... In GraphQL I..."></textarea></div>
    `},
    'g1-4': { title: '1.4 Mutations', xp: 75, content: `
        <div class="lesson-recap">🔄 <strong>Last lesson:</strong> Queries read data. Ask for exact fields. Use variables for dynamic values. Aliases for same field twice.</div>
        <div class="hook-story">🚀 <strong>Real World:</strong> When you create a repo on GitHub via their API, that's a GraphQL mutation. Shopify's checkout flow — add to cart, apply discount, process payment — all mutations. They modify server state and return the updated data.</div>
        <div class="why-matters">💡 <strong>Why this matters:</strong> Mutations are how you CREATE, UPDATE, and DELETE in GraphQL. Just like queries but for writes.</div>
        <h3>✏️ Mutations</h3>
        <pre><code># Create
mutation CreatePost($title: String!, $body: String!, $authorId: ID!) {
  createPost(title: $title, body: $body, authorId: $authorId) {
    id
    title
    author {
      name
    }
  }
}

# Update
mutation PublishPost($id: ID!) {
  updatePost(id: $id, published: true) {
    id
    published
  }
}

# Delete
mutation DeletePost($id: ID!) {
  deletePost(id: $id)  # Returns Boolean
}</code></pre>
        <h3>🔑 Mutation Rules</h3>
        <ul>
            <li>Always declare <code>mutation</code> keyword (required)</li>
            <li>Mutations run sequentially (queries run in parallel)</li>
            <li>Return whatever fields you need from the modified object</li>
            <li>Convention: name mutations as verbs (createUser, updatePost, deleteComment)</li>
        </ul>
        <div class="inline-quiz"><h4>🧠 Quick Check</h4><p><strong>What's the key operational difference between queries and mutations?</strong></p>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! Mutations run sequentially (important when order matters). Queries can run in parallel.')">Multiple mutations run sequentially; multiple queries run in parallel</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Mutations can also accept arguments — that\'s not the key difference.')">Mutations don\'t accept arguments</button>
        <div class="quiz-feedback"></div></div>
        <div class="teach-it-back"><h4>🧠 Teach It Back</h4><p style="font-size:13px;margin-bottom:8px">When would you use a mutation vs a query?</p><textarea placeholder="Mutation: ... Query: ..."></textarea></div>
    `},
    'g1-5': { title: '1.5 Quiz: GraphQL Basics', xp: 150, content: `
        <div class="lesson-recap">🔄 <strong>Module 1 summary:</strong> GraphQL = one endpoint, exact fields, strong types. Schema = contract. Queries = reads. Mutations = writes. Variables = required.</div>
        <div class="inline-quiz"><h4>Q1</h4><p><strong>GitHub offers a GraphQL API. What's the main advantage for frontend devs?</strong></p>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Ask for only the fields you need — no over-fetching. No multiple round trips.')">Fetch exactly the fields you need in one request — no over-fetching or multiple calls</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','GraphQL isn\'t inherently faster on the network — the advantage is payload efficiency and developer experience.')">It\'s faster than REST on the network</button>
        <div class="quiz-feedback"></div></div>
        <div class="inline-quiz"><h4>Q2</h4><p><strong>In the schema, type Post { title: String! } — what does ! mean?</strong></p>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Non-null. Every Post must have a title. The server will error if it tries to return null for title.')">title is non-null — it can never return null</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','! means non-null, not optional. The opposite — it makes the field required.')">title is optional</button>
        <div class="quiz-feedback"></div></div>
        <div class="inline-quiz"><h4>Q3</h4><p><strong>You need to create a new user. What GraphQL operation do you use?</strong></p>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Queries are for READING data only. Creating is a write operation.')">Query</button>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Mutations are for all write operations: create, update, delete.')">Mutation</button>
        <div class="quiz-feedback"></div></div>
        <h3>🎯 Module 1 Complete! Next: Build a real GraphQL API.</h3>
    `},
    'g2-1': { title: '2.1 Resolvers', xp: 100, content: `
        <div class="lesson-recap">🔄 <strong>Module 1 complete!</strong> Schema, types, queries, mutations, variables. Now: how does GraphQL actually return data?</div>
        <div class="hook-story">🚀 <strong>Real World:</strong> Every field in GitHub's GraphQL schema has a resolver behind it. When you query repo.stargazerCount, a resolver function fetches that exact number from GitHub's database. Resolvers are the bridge between schema and data source.</div>
        <div class="why-matters">💡 <strong>Why this matters:</strong> Without resolvers, GraphQL is just a schema with no data. Resolvers are where your business logic lives.</div>
        <h3>⚙️ What is a Resolver?</h3>
        <p>A resolver is a function that returns the value for a field. Every field in your schema can have a resolver.</p>
        <pre><code>const resolvers = {
    Query: {
        user: async (parent, args, context) => {
            return context.db.users.findById(args.id);
        },
        users: async (parent, args, context) => {
            return context.db.users.findAll();
        }
    },
    Mutation: {
        createUser: async (parent, args, context) => {
            return context.db.users.create({
                name: args.name,
                email: args.email
            });
        }
    },
    User: {
        posts: async (parent, args, context) => {
            // parent is the User object
            return context.db.posts.findByAuthorId(parent.id);
        }
    }
};</code></pre>
        <h3>🔑 Resolver Arguments</h3>
        <ul>
            <li><code>parent</code>: result from parent resolver</li>
            <li><code>args</code>: arguments passed to the field</li>
            <li><code>context</code>: shared object (auth, database, dataloaders)</li>
        </ul>
        <div class="inline-quiz"><h4>🧠 Quick Check</h4><p><strong>What is a GraphQL resolver?</strong></p>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! Every field can have a resolver function that fetches/computes its value from any data source.')">A function that returns the data for a specific field in the schema</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Resolvers run on the server, not client. They\'re the server-side data fetching logic.')">A client-side function that processes GraphQL responses</button>
        <div class="quiz-feedback"></div></div>
        <div class="teach-it-back"><h4>🧠 Teach It Back</h4><p style="font-size:13px;margin-bottom:8px">What are the 3 arguments every resolver receives?</p><textarea placeholder="parent: ..., args: ..., context: ..."></textarea></div>
    `},
    'g2-2': { title: '2.2 Build: GraphQL Server (Node.js)', xp: 100, content: `
        <div class="lesson-recap">🔄 <strong>Last lesson:</strong> Resolvers = functions that return field values. Args, parent, context. Context carries DB and auth.</div>
        <div class="hook-story">🚀 <strong>Real World:</strong> This is the exact stack used by startups and enterprises — Apollo Server + Node.js. Shopify runs their entire Partner API on this pattern.</div>
        <h3>💻 Build It</h3>
        <pre><code>npm install @apollo/server graphql</code></pre>
        <pre><code>import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = \`#graphql
    type Book {
        id: ID!
        title: String!
        author: String!
    }
    type Query {
        books: [Book!]!
        book(id: ID!): Book
    }
    type Mutation {
        addBook(title: String!, author: String!): Book!
    }
\`;

const books = [
    { id: '1', title: 'The Pragmatic Programmer', author: 'Hunt & Thomas' },
    { id: '2', title: 'Clean Code', author: 'Robert Martin' },
];

const resolvers = {
    Query: {
        books: () => books,
        book: (_, { id }) => books.find(b => b.id === id),
    },
    Mutation: {
        addBook: (_, { title, author }) => {
            const book = { id: String(books.length + 1), title, author };
            books.push(book);
            return book;
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
console.log(\`GraphQL server at \${url}\`);</code></pre>
        <p>Visit <code>http://localhost:4000</code> → Apollo Sandbox lets you explore and query the API!</p>
        <div class="teach-it-back"><h4>🧠 Teach It Back</h4><p style="font-size:13px;margin-bottom:8px">How do typeDefs and resolvers relate to each other?</p><textarea placeholder="typeDefs define the shape, resolvers..."></textarea></div>
    `},
    'g2-3': { title: '2.3 Subscriptions', xp: 100, content: `
        <div class="lesson-recap">🔄 <strong>Last lesson:</strong> Built Apollo Server + Node.js GraphQL API. typeDefs + resolvers = working GraphQL server.</div>
        <div class="hook-story">🚀 <strong>Real World:</strong> Slack's message delivery, GitHub's PR review notifications, real-time dashboards — all powered by GraphQL Subscriptions over WebSockets. When data changes on the server, subscriptions push updates to all connected clients instantly.</div>
        <div class="why-matters">💡 <strong>Why this matters:</strong> Subscriptions are GraphQL's real-time feature. Use them when clients need live updates — chat, feeds, notifications.</div>
        <h3>📡 Subscriptions</h3>
        <pre><code>type Subscription {
    messageAdded(chatId: ID!): Message!
    userOnline: User!
}

# Resolver
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const resolvers = {
    Mutation: {
        sendMessage: async (_, { chatId, content }, ctx) => {
            const message = await ctx.db.messages.create({ chatId, content });
            // Publish to all subscribers of this chat
            pubsub.publish(\`MESSAGE_ADDED_\${chatId}\`, { messageAdded: message });
            return message;
        }
    },
    Subscription: {
        messageAdded: {
            subscribe: (_, { chatId }) =>
                pubsub.asyncIterableIterator(\`MESSAGE_ADDED_\${chatId}\`)
        }
    }
};</code></pre>
        <div class="inline-quiz"><h4>🧠 Quick Check</h4><p><strong>When should you use a Subscription instead of a Query?</strong></p>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! Subscriptions push data TO clients when something changes. Queries are one-time pulls.')">When clients need real-time updates pushed from the server (chat, live feeds, notifications)</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Subscriptions aren\'t about large data — they\'re for real-time pushed updates.')">When the data is too large for a query</button>
        <div class="quiz-feedback"></div></div>
        <div class="teach-it-back"><h4>🧠 Teach It Back</h4><p style="font-size:13px;margin-bottom:8px">How is a GraphQL Subscription different from a Query?</p><textarea placeholder="A Query... A Subscription..."></textarea></div>
    `},
    'g2-4': { title: '2.4 The N+1 Problem', xp: 125, content: `
        <div class="lesson-recap">🔄 <strong>Last lesson:</strong> Subscriptions = real-time pushed updates via WebSockets. Use PubSub to publish events to subscribers.</div>
        <div class="hook-story">🚀 <strong>Real World:</strong> Shopify's first GraphQL API had horrific N+1 problems — fetching 100 products caused 101 database queries. Facebook invented DataLoader to solve this. It's now used by every serious GraphQL API.</div>
        <div class="why-matters">💡 <strong>Why this matters:</strong> N+1 is the most common performance killer in GraphQL. Every GraphQL developer hits this. Understanding it (and DataLoader) is essential.</div>
        <h3>⚠️ The N+1 Problem</h3>
        <pre><code># Query: get 10 posts + their authors
query {
    posts {        # 1 DB query → 10 posts
        title
        author {   # 10 DB queries! One per post = N+1 total
            name
        }
    }
}

# Naive resolver:
Post: {
    author: (post) => db.users.findById(post.authorId)
    // Called 10 times = 10 separate DB queries!
}</code></pre>
        <h3>✅ Solution: DataLoader</h3>
        <pre><code>npm install dataloader</code></pre>
        <pre><code>const DataLoader = require('dataloader');

// Batch function — called ONCE with all IDs collected
const userLoader = new DataLoader(async (authorIds) => {
    const users = await db.users.findAll({ where: { id: authorIds } });
    return authorIds.map(id => users.find(u => u.id === id));
});

// Now resolver uses the loader
Post: {
    author: (post) => userLoader.load(post.authorId)
    // DataLoader batches: ONE query with WHERE id IN (1,2,3,...10)
    // 10 posts = 2 total queries (not 11!))
}</code></pre>
        <div class="inline-quiz"><h4>🧠 Quick Check</h4><p><strong>What causes the N+1 problem in GraphQL?</strong></p>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! For each item in a list, a resolver fires a separate DB query. 10 posts = 10 author queries + 1 posts query = 11 total.')">Resolvers for nested fields fire once per parent item, causing N extra queries</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Large schemas don\'t cause N+1 — it\'s about resolver execution per list item.')">Having too many types in the schema</button>
        <div class="quiz-feedback"></div></div>
        <div class="teach-it-back"><h4>🧠 Teach It Back</h4><p style="font-size:13px;margin-bottom:8px">Explain the N+1 problem and how DataLoader solves it.</p><textarea placeholder="N+1 happens when... DataLoader solves it by..."></textarea></div>
    `},
    'g2-5': { title: '2.5 Authentication & Authorization', xp: 125, content: `
        <div class="lesson-recap">🔄 <strong>Last lesson:</strong> N+1 = N extra queries per parent item. DataLoader batches them into one query. Essential for production GraphQL.</div>
        <div class="hook-story">🚀 <strong>Real World:</strong> GitHub's GraphQL API requires a personal access token on every request. It verifies who you are (authentication) and what repos you can access (authorization) at the resolver level, not at the endpoint level.</div>
        <h3>🔒 Authentication Pattern</h3>
        <pre><code>// Add user to context on every request
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const token = req.headers.authorization?.replace('Bearer ', '');
        const user = token ? await verifyJWT(token) : null;
        return { user, db };
    }
});

// Resolver — check auth
Query: {
    myProfile: (_, __, { user }) => {
        if (!user) throw new GraphQLError('Not authenticated', {
            extensions: { code: 'UNAUTHENTICATED' }
        });
        return db.users.findById(user.id);
    }
},

// Field-level authorization
User: {
    email: (parent, _, { user }) => {
        // Only show email to the user themselves or admins
        if (user?.id !== parent.id && !user?.isAdmin) return null;
        return parent.email;
    }
}</code></pre>
        <div class="teach-it-back"><h4>🧠 Teach It Back</h4><p style="font-size:13px;margin-bottom:8px">Where in GraphQL do you put authentication logic and why?</p><textarea placeholder="Authentication goes in context because..."></textarea></div>
    `},
    'g2-6': { title: '2.6 Quiz & Final Assessment', xp: 200, content: `
        <div class="lesson-recap">🔄 <strong>Module 2 summary:</strong> Resolvers, Apollo Server, Subscriptions, N+1 + DataLoader, Auth.</div>
        <div class="inline-quiz"><h4>Q1</h4><p><strong>You query 50 articles, each with an author. How many DB queries without DataLoader?</strong></p>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ 51 total: 1 for articles + 50 for each author (one per article). DataLoader reduces this to 2.')">51 (1 for articles + 50 for authors)</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Without DataLoader, each author resolver fires separately. 50 articles = 50 author queries.')">2 (one for articles, one for all authors)</button>
        <div class="quiz-feedback"></div></div>
        <div class="inline-quiz"><h4>Q2</h4><p><strong>Where should you put the authenticated user in Apollo Server?</strong></p>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! Context is the shared object across all resolvers. Verify JWT once in context function, use user everywhere.')">In the context function — available in all resolvers</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Putting auth in every resolver is repetitive and error-prone. Use context.')">In every individual resolver</button>
        <div class="quiz-feedback"></div></div>
        <div class="inline-quiz"><h4>Q3</h4><p><strong>When would you use a Subscription over a Query?</strong></p>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Queries are for fetching data once. Real-time = Subscription.')">When fetching a lot of data</button>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Subscriptions push updates to clients when data changes. Perfect for chat, live dashboards, notifications.')">When clients need real-time data pushed from the server</button>
        <div class="quiz-feedback"></div></div>
        <h3>🎓 GraphQL Course Complete!</h3>
        <ul>
            <li>✅ GraphQL vs REST — one endpoint, exact fields, strong types</li>
            <li>✅ Schema — types, fields, non-null, relationships</li>
            <li>✅ Queries — ask for exactly what you need</li>
            <li>✅ Mutations — create, update, delete</li>
            <li>✅ Resolvers — functions that return field data</li>
            <li>✅ Subscriptions — real-time WebSocket updates</li>
            <li>✅ N+1 problem + DataLoader fix</li>
            <li>✅ Authentication via context</li>
        </ul>
    `}
};

const graphqlFlashcards = [
    { term: 'GraphQL', def: 'Query language for APIs. Single endpoint, ask for exactly the fields you need. Strong type system. Created by Facebook 2012.' },
    { term: 'Schema', def: 'The contract between client and server. Defines all types, fields, queries, mutations, and subscriptions available.' },
    { term: 'Query', def: 'Read operation in GraphQL. Ask for specific fields and traverserelationships. Parallel execution.' },
    { term: 'Mutation', def: 'Write operation in GraphQL (create/update/delete). Sequential execution. Always declare the mutation keyword.' },
    { term: 'Subscription', def: 'Real-time operation. Server pushes updates to client over WebSocket when data changes.' },
    { term: 'Resolver', def: 'Function that returns the data for a specific field. Receives (parent, args, context). Bridge between schema and data source.' },
    { term: 'Context', def: 'Shared object passed to all resolvers. Contains db connection, authenticated user, DataLoaders.' },
    { term: 'N+1 Problem', def: 'For N items in a list, resolver fires N extra DB queries (one per item). Causes severe performance issues.' },
    { term: 'DataLoader', def: 'Batches and caches DB lookups. Converts N+1 queries into 1 batched query. Created by Facebook.' },
    { term: 'Type !', def: 'Non-null marker. String! means field can never return null. [Post!]! means non-null array of non-null Posts.' },
    { term: 'Variables', def: 'Pass dynamic values alongside query (not embedded). Safer, cacheable, cleaner. Always use variables for dynamic values.' },
    { term: 'Introspection', def: 'GraphQL can query its own schema. Enables auto-complete, documentation, schema exploration tools.' },
];
