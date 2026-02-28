// TypeScript Lessons
// Research sources: typescriptlang.org/docs, typescriptlang.org/tsconfig — Feb 2026

const typescriptLessons = {

  'ts1-1': {
    title: '1.1 TypeScript vs JavaScript',
    xp: 50,
    content: `
      <div class="hook-story">
        <strong>🐛 Airbnb, 2019 — post-mortem analysis.</strong> Their engineering team analyzed hundreds of production bug reports and found that <strong>38% of bugs would have been caught by TypeScript at compile time</strong> — before they ever shipped. They subsequently migrated their entire codebase. Meanwhile, VS Code — the most popular code editor on earth — is written in <strong>300,000+ lines of TypeScript</strong>. Microsoft built the tool using the tool. That is the strongest possible endorsement.
      </div>
      <div class="why-matters">
        <strong>Why this matters:</strong> TypeScript is no longer optional in professional JavaScript development. It is the default for React, Node, and most modern frameworks. Every team you join will use it.
      </div>
      <h3>The core problem TypeScript solves</h3>
      <p>JavaScript was designed for short scripts. It grew into a language powering million-line apps. Its silent type coercion causes real bugs:</p>
      <pre><code>// JavaScript — no errors, wrong answers
"" == 0          // true (!)
null == undefined // true (!)
1 + "2"          // "12" (not 3)

// A real bug TypeScript catches
const user = { name: "Alice", age: 30 };
const area = user.width * user.heigth;  // Typo!
// JavaScript: NaN (silent)
// TypeScript: Error: Property 'heigth' does not exist. Did you mean 'height'?</code></pre>
      <h3>What TypeScript adds</h3>
      <ul>
        <li><strong>Static type checking</strong> — errors caught before runtime, at compile time</li>
        <li><strong>IDE superpowers</strong> — autocomplete, rename refactoring, go-to-definition that actually works</li>
        <li><strong>Self-documenting code</strong> — function signatures tell you what goes in and comes out</li>
        <li><strong>Safe refactoring</strong> — change a type, TypeScript shows every place that breaks</li>
      </ul>
      <p>TypeScript compiles to plain JavaScript. Browsers and Node.js never see TypeScript — the type information is erased at compile time.</p>
      <pre><code>// TypeScript source
function greet(name: string): string {
  return "Hello, " + name;
}

// Compiled JavaScript output — identical behavior, no types
function greet(name) {
  return "Hello, " + name;
}</code></pre>
      <div class="inline-quiz">
        <h4>⚡ Quick Check</h4>
        <p>What percentage of Airbnb production bugs would TypeScript have caught, according to their 2019 analysis?</p>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: The real number is higher than 10% — TypeScript catches a significant portion of bugs.')">10% — a small but meaningful improvement</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: Close! The actual figure from Airbnb was 38%.')">25% — about one in four bugs</button>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! Airbnb found that 38% of their production bugs would have been caught at compile time by TypeScript. This drove their full migration.')">38% — over a third of all production bugs</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: 80% would be impressive but the actual Airbnb finding was 38%.')">80% — nearly all bugs are type-related</button>
      </div>
      <div class="teach-it-back">
        <h4>🧠 Teach It Back</h4>
        <textarea placeholder="TypeScript prevents bugs that JavaScript misses because..."></textarea>
      </div>
    `
  },

  'ts1-2': {
    title: '1.2 Basic Types & Type Inference',
    xp: 50,
    content: `
      <div class="hook-story">
        <strong>✨ The magic of inference.</strong> New TypeScript developers think they have to annotate everything. They write <code>const name: string = "Alice"</code>. But TypeScript already knows it is a string — it can see the value. The real skill is knowing when TypeScript needs help and when it can figure things out on its own. Most of the time: it knows.
      </div>
      <div class="why-matters">
        <strong>Why this matters:</strong> Understanding inference means you write clean TypeScript without annotation noise. Understanding when to add types means you catch the right bugs without over-engineering.
      </div>
      <h3>Primitive types</h3>
      <pre><code>// Explicit annotations (when needed)
let age: number = 30;
let name: string = "Alice";
let active: boolean = true;
let nothing: null = null;
let missing: undefined = undefined;

// TypeScript infers these automatically — no annotation needed
let age = 30;          // TypeScript knows: number
let name = "Alice";    // TypeScript knows: string
let active = true;     // TypeScript knows: boolean</code></pre>
      <h3>Arrays and objects</h3>
      <pre><code>// Arrays
const ids: number[] = [1, 2, 3];
const tags: string[] = ["admin", "user"];
const mixed: (string | number)[] = ["Alice", 42];

// Tuples — fixed-length, typed positions
const point: [number, number] = [10, 20];
const entry: [string, number] = ["age", 30];

// Object types (inline)
const user: { name: string; age: number; email?: string } = {
  name: "Alice",
  age: 30
  // email is optional (?)
};</code></pre>
      <h3>Special types</h3>
      <pre><code>// any — escape hatch, disables type checking (avoid!)
let data: any = fetchSomething();

// unknown — like any but safe (must narrow before use)
let input: unknown = getInput();
if (typeof input === "string") {
  console.log(input.toUpperCase()); // Safe!
}

// never — a value that never occurs (exhaustive checks)
// void — function returns nothing</code></pre>
      <div class="inline-quiz">
        <h4>⚡ Quick Check</h4>
        <p>You write <code>const score = 100</code>. What type does TypeScript infer?</p>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: TypeScript infers the literal value 100 as a number type (or literal type 100 in const context).')">any — TypeScript cannot infer types from values</button>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! TypeScript sees the value 100 and infers the type as number (or the literal type 100 for const). No annotation needed.')">number — TypeScript infers it from the assigned value</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: integer is not a TypeScript type. TypeScript uses number for all numeric values.')">integer — TypeScript distinguishes integers from floats</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: unknown is a type you explicitly assign, not something TypeScript infers from a number literal.')">unknown — TypeScript is cautious about inferred types</button>
      </div>
      <div class="teach-it-back">
        <h4>🧠 Teach It Back</h4>
        <textarea placeholder="The difference between any and unknown in TypeScript is..."></textarea>
      </div>
    `
  },

  'ts1-3': {
    title: '1.3 Interfaces & Type Aliases',
    xp: 50,
    content: `
      <div class="hook-story">
        <strong>📋 The shape contract.</strong> Your API returns a user object. Your frontend receives it. Your database stores it. Your email service sends to it. Without a shared type definition, each part of your codebase has a slightly different idea of what a "user" looks like. Three months in, nobody is sure which fields are optional. Interfaces and Type Aliases solve this — one definition, used everywhere.
      </div>
      <div class="why-matters">
        <strong>Why this matters:</strong> Interfaces and types are how you define the shape of your data. They are the building blocks of type-safe code — used for API responses, function parameters, component props, database models.
      </div>
      <h3>Interface</h3>
      <pre><code>interface User {
  id: number;
  email: string;
  name: string;
  role: "admin" | "user" | "guest";  // String literal union
  createdAt: Date;
  avatar?: string;  // Optional property
  readonly apiKey: string;  // Cannot be changed after creation
}

// Usage
function sendWelcomeEmail(user: User): void {
  console.log("Welcome", user.name, "to", user.email);
}

// Extending interfaces
interface AdminUser extends User {
  permissions: string[];
  lastLogin: Date;
}</code></pre>
      <h3>Type Alias</h3>
      <pre><code>// Type aliases can do everything interfaces can + more
type UserId = number;
type UserRole = "admin" | "user" | "guest";

type User = {
  id: UserId;
  email: string;
  role: UserRole;
};

// Types can express things interfaces cannot
type StringOrNumber = string | number;
type ApiResponse<T> = { data: T; error: null } | { data: null; error: string };</code></pre>
      <h3>Interface vs Type — when to use which</h3>
      <ul>
        <li><strong>Interface</strong> — for object shapes, class contracts, when you expect extension (<code>extends</code>)</li>
        <li><strong>Type alias</strong> — for unions, intersections, primitives, utility type compositions</li>
        <li>In practice: both work for most cases. Pick one convention per codebase.</li>
      </ul>
      <div class="inline-quiz">
        <h4>⚡ Quick Check</h4>
        <p>Which can be used to define a union type like <code>string | number</code>?</p>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: Interfaces can only describe object shapes — they cannot represent unions.')">Only interface — it is the primary type definition tool</button>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! Only type aliases can represent union types, primitives, and other non-object shapes. Interfaces are limited to object/class shapes.')">Only type alias — interfaces cannot represent union types</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: Interfaces cannot express union types — this is one of the key differences.')">Both interface and type alias support union types</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: Union types are a core TypeScript feature, not a workaround.')">Neither — use any instead of union types</button>
      </div>
      <div class="teach-it-back">
        <h4>🧠 Teach It Back</h4>
        <textarea placeholder="I would choose a type alias over an interface when..."></textarea>
      </div>
    `
  },

  'ts1-4': {
    title: '1.4 Functions — Typed Parameters & Returns',
    xp: 75,
    content: `
      <div class="hook-story">
        <strong>🔧 The refactor that broke everything silently.</strong> A developer renames a function parameter from <code>userId</code> to <code>id</code>. In JavaScript, callers that used the old name still compile. In TypeScript with strict mode, every caller is checked. Change a return type? TypeScript shows every place in the codebase that relied on the old shape. This is why typed functions are the biggest win for large codebases.
      </div>
      <div class="why-matters">
        <strong>Why this matters:</strong> Typed function signatures are self-documenting contracts. They tell every caller exactly what to pass and what to expect back — without reading the implementation.
      </div>
      <h3>Function type annotations</h3>
      <pre><code>// Basic annotation
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function
const multiply = (x: number, y: number): number => x * y;

// Optional parameters (must come after required)
function greet(name: string, greeting?: string): string {
  return (greeting ?? "Hello") + ", " + name;
}

// Default parameters
function createUser(name: string, role: string = "user") {
  return { name, role };
}

// Rest parameters
function sum(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}

// Void — function returns nothing meaningful
function logEvent(event: string): void {
  console.log("[Event]", event);
}</code></pre>
      <h3>Function types as values</h3>
      <pre><code>// Type alias for a function signature
type Validator = (value: string) => boolean;

const isEmail: Validator = (value) => value.includes("@");
const isNotEmpty: Validator = (value) => value.length > 0;

// Functions as parameters (callbacks)
function processItems<T>(
  items: T[],
  transform: (item: T) => T
): T[] {
  return items.map(transform);
}

// Overloads — same function, different signatures
function format(value: string): string;
function format(value: number): string;
function format(value: string | number): string {
  return String(value).trim();
}</code></pre>
      <div class="inline-quiz">
        <h4>⚡ Quick Check</h4>
        <p>What is the return type of a function that does not explicitly return a value?</p>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: undefined is a value. void means the function is not expected to return a meaningful value — they are subtly different in TypeScript.')">undefined — functions always return undefined by default</button>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! void signals that the function does not return a useful value. It is the correct return type for side-effect functions like logging, event handlers, etc.')">void — indicates the function has no meaningful return value</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: never is for functions that never return at all — like functions that always throw or run infinite loops.')">never — the function never completes</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: null must be explicitly returned. A function that falls off the end returns undefined, typed as void.')">null — all functions return null if they have no return statement</button>
      </div>
      <div class="teach-it-back">
        <h4>🧠 Teach It Back</h4>
        <textarea placeholder="Typed function parameters help with refactoring because..."></textarea>
      </div>
    `
  },

  'ts1-5': {
    title: '1.5 Union & Intersection Types',
    xp: 75,
    content: `
      <div class="hook-story">
        <strong>🔀 "This field is either a string or null."</strong> Every API developer knows this scenario. Before TypeScript union types, you would add a code comment and hope callers remembered to check. With unions, TypeScript <em>forces</em> callers to handle both cases. Forget the null check? TypeScript error. Ship a bug? TypeScript prevented it.
      </div>
      <div class="why-matters">
        <strong>Why this matters:</strong> Union types model real-world data that can be one of several things. Discriminated unions make complex state machines type-safe. Intersection types let you compose types cleanly.
      </div>
      <h3>Union types</h3>
      <pre><code>// A value that can be one of several types
type Id = string | number;
type Status = "pending" | "active" | "closed";
type MaybeUser = User | null;

function getUser(id: Id): MaybeUser {
  // ...
}

const user = getUser(42);
// TypeScript forces you to handle null:
if (user !== null) {
  console.log(user.name);  // Safe!
}
user.name;  // Error: Object is possibly null</code></pre>
      <h3>Discriminated unions — the killer feature</h3>
      <pre><code>// Each variant has a discriminant field (kind/type/status)
type ApiResponse =
  | { status: "success"; data: User[] }
  | { status: "error"; message: string }
  | { status: "loading" };

function handleResponse(response: ApiResponse) {
  switch (response.status) {
    case "success":
      return renderUsers(response.data);  // TypeScript knows data exists
    case "error":
      return showError(response.message); // TypeScript knows message exists
    case "loading":
      return showSpinner();
  }
  // TypeScript warns if you forgot a case!
}</code></pre>
      <h3>Intersection types</h3>
      <pre><code>// Combine multiple types into one
type WithTimestamps = { createdAt: Date; updatedAt: Date };
type WithSoftDelete = { deletedAt: Date | null };

type AuditedUser = User & WithTimestamps & WithSoftDelete;
// Must have all properties from all three types</code></pre>
      <div class="inline-quiz">
        <h4>⚡ Quick Check</h4>
        <p>You have <code>type Shape = Circle | Square</code> where each has a <code>kind</code> field. Inside <code>if (shape.kind === "circle")</code>, what does TypeScript know?</p>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: TypeScript narrows the type inside the if block based on the discriminant check.')">Nothing — TypeScript cannot narrow union types inside if blocks</button>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! This is called a discriminated union. TypeScript narrows the type to Circle inside the if block, giving you access to Circle-specific properties safely.')">shape is narrowed to the Circle type — Circle-specific properties are accessible</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: TypeScript narrows to just Circle, not both types simultaneously.')">shape is both Circle and Square simultaneously</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: TypeScript handles discriminated unions natively — no casting needed.')">You must cast with as Circle to access Circle properties</button>
      </div>
      <div class="teach-it-back">
        <h4>🧠 Teach It Back</h4>
        <textarea placeholder="Discriminated unions are useful for modeling state because..."></textarea>
      </div>
    `
  },

  'ts2-1': {
    title: '2.1 Generics — Write Once, Use Anywhere',
    xp: 100,
    content: `
      <div class="hook-story">
        <strong>🔁 The problem with any.</strong> You write a function that wraps an API response. You type the return as <code>any</code> to avoid writing it multiple times. Now every caller loses type safety — autocomplete breaks, TypeScript cannot catch errors. <strong>Generics solve this</strong> — write the function once, preserve types for every caller.
      </div>
      <div class="why-matters">
        <strong>Why this matters:</strong> Generics are used everywhere in TypeScript — <code>Array&lt;T&gt;</code>, <code>Promise&lt;T&gt;</code>, <code>Map&lt;K,V&gt;</code>, <code>useState&lt;T&gt;</code>. Understanding generics lets you read and write real-world TypeScript.
      </div>
      <h3>The identity function — hello world of generics</h3>
      <pre><code>// Without generics: forced to use any
function identity(arg: any): any {
  return arg;
}
const result = identity("hello"); // result: any — type lost!

// With generics: type is preserved
function identity&lt;T&gt;(arg: T): T {
  return arg;
}
const result = identity("hello");     // result: string
const num = identity(42);             // num: number
const user = identity({ name: "Al" }); // user: { name: string }</code></pre>
      <h3>Practical generics</h3>
      <pre><code>// Generic API wrapper
async function fetchData&lt;T&gt;(url: string): Promise&lt;T&gt; {
  const res = await fetch(url);
  return res.json() as T;
}

const users = await fetchData&lt;User[]&gt;("/api/users");
// users is typed as User[] — full autocomplete!

// Generic with constraint (T must have an id property)
function findById&lt;T extends { id: number }&gt;(
  items: T[],
  id: number
): T | undefined {
  return items.find(item =&gt; item.id === id);
}

// Generic React state
const [user, setUser] = useState&lt;User | null&gt;(null);
const [count, setCount] = useState&lt;number&gt;(0);</code></pre>
      <div class="inline-quiz">
        <h4>⚡ Quick Check</h4>
        <p>What does <code>T extends { id: number }</code> mean in a generic function?</p>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: extends in generics means constraint, not inheritance — T just needs to have an id property.')">T must be a class that inherits from a base class with id</button>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! The extends keyword in generics is a constraint — it means T can be ANY type, as long as it has at least an id: number property. This prevents calling the function with types that have no id.')">T can be any type that has at least an id: number property — it constrains the generic</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: T extends { id: number } makes the generic more restrictive, not less.')">T becomes any type and the constraint is ignored</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: extends in generics constrains T, but does not fix it to only objects with id as the sole property.')">T must be exactly { id: number } with no other properties</button>
      </div>
      <div class="teach-it-back">
        <h4>🧠 Teach It Back</h4>
        <textarea placeholder="Generics are better than using any because..."></textarea>
      </div>
    `
  },

  'ts2-2': {
    title: '2.2 Utility Types — Partial, Pick, Omit, Record',
    xp: 100,
    content: `
      <div class="hook-story">
        <strong>🛠️ Stop copy-pasting type definitions.</strong> You have a <code>User</code> type with 10 fields. Your update endpoint only accepts 3 of them. Your public API response omits the password. Your form data has all fields optional. Without utility types, you write four near-identical interfaces and pray they stay in sync. With utility types, you derive all four from one source of truth.
      </div>
      <div class="why-matters">
        <strong>Why this matters:</strong> Utility types are used constantly in real TypeScript code. They keep your type definitions DRY and synchronized. Every senior TypeScript developer uses these daily.
      </div>
      <h3>The essential utility types</h3>
      <pre><code>interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: "admin" | "user";
  createdAt: Date;
}

// Partial&lt;T&gt; — all properties become optional (great for PATCH/update)
type UpdateUser = Partial&lt;User&gt;;
// { id?: number; email?: string; password?: string; ... }

// Pick&lt;T, K&gt; — select specific properties
type PublicUser = Pick&lt;User, "id" | "email" | "name" | "role"&gt;;
// No password in the response!

// Omit&lt;T, K&gt; — remove specific properties
type CreateUser = Omit&lt;User, "id" | "createdAt"&gt;;
// id and createdAt are generated by the DB

// Required&lt;T&gt; — all properties become required
type StrictUser = Required&lt;User&gt;;

// Readonly&lt;T&gt; — prevents mutation
type FrozenUser = Readonly&lt;User&gt;;

// Record&lt;K, V&gt; — object with specific key and value types
type RolePermissions = Record&lt;"admin" | "user" | "guest", string[]&gt;;
const permissions: RolePermissions = {
  admin: ["read", "write", "delete"],
  user: ["read", "write"],
  guest: ["read"],
};</code></pre>
      <pre><code>// Real CRUD example
async function updateUser(id: number, data: Partial&lt;Omit&lt;User, "id"&gt;&gt;) {
  // data can have any subset of User fields except id
}</code></pre>
      <div class="inline-quiz">
        <h4>⚡ Quick Check</h4>
        <p>You want a type for a PATCH request body — all User fields optional, no id. Which combination?</p>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: Pick selects fields, not removes them. You want Omit to remove id, then Partial to make everything optional.')">Pick&lt;User, "id"&gt;</button>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! Omit removes id from User, then Partial makes all remaining fields optional. This is the standard PATCH body type pattern.')">Partial&lt;Omit&lt;User, "id"&gt;&gt; — remove id first, then make everything optional</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: Required makes fields required, which is the opposite of what you want for a PATCH body.')">Required&lt;User&gt;</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: Readonly prevents mutation but does not make fields optional or remove id.')">Readonly&lt;User&gt;</button>
      </div>
      <div class="teach-it-back">
        <h4>🧠 Teach It Back</h4>
        <textarea placeholder="Utility types help avoid duplicating type definitions by..."></textarea>
      </div>
    `
  },

  'ts2-3': {
    title: '2.3 Type Guards & Narrowing',
    xp: 100,
    content: `
      <div class="hook-story">
        <strong>🎯 TypeScript is a detective.</strong> You have a value typed as <code>string | number | null</code>. TypeScript does not let you call <code>.toUpperCase()</code> on it — because what if it is a number or null? But inside an <code>if (typeof value === "string")</code> block, TypeScript knows it is a string and allows it. This narrowing is TypeScript being smart about your code, not just strict.
      </div>
      <div class="why-matters">
        <strong>Why this matters:</strong> Real-world code deals with values that can be multiple things. Narrowing lets you write safe code without casting — TypeScript helps you handle each case correctly.
      </div>
      <h3>Built-in narrowing</h3>
      <pre><code>function process(value: string | number | null) {
  // typeof narrowing
  if (typeof value === "string") {
    console.log(value.toUpperCase()); // string here
  } else if (typeof value === "number") {
    console.log(value.toFixed(2));    // number here
  } else {
    console.log("Got null");           // null here
  }
}

// Truthiness narrowing
function greet(name: string | null) {
  if (name) {
    console.log("Hello", name); // string (not null) here
  }
}

// instanceof narrowing
function handleError(err: Error | string) {
  if (err instanceof Error) {
    console.log(err.message); // Error here
  } else {
    console.log(err);          // string here
  }
}</code></pre>
      <h3>Custom type guards</h3>
      <pre><code>// is keyword — returns a type predicate
function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "email" in value
  );
}

const data: unknown = await fetchUser();
if (isUser(data)) {
  console.log(data.email); // TypeScript knows it is User here
}</code></pre>
      <div class="inline-quiz">
        <h4>⚡ Quick Check</h4>
        <p>After <code>if (typeof x === "string") { ... }</code>, what type does TypeScript assign to <code>x</code> inside the block?</p>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: TypeScript narrows the type inside the if block — it is no longer the full union.')">The original union type — TypeScript does not narrow inside if blocks</button>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! TypeScript performs control flow analysis and narrows x to string inside the if block. This is called type narrowing.')">string — TypeScript narrows the type based on the typeof check</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: unknown requires explicit narrowing — typeof checks produce specific types like string, number.')">unknown — TypeScript is still unsure inside if blocks</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: any disables type checking entirely. TypeScript narrows to the specific type, not any.')">any — the check converts to any for flexibility</button>
      </div>
      <div class="teach-it-back">
        <h4>🧠 Teach It Back</h4>
        <textarea placeholder="TypeScript narrowing works by..."></textarea>
      </div>
    `
  },

  'ts2-4': {
    title: '2.4 Const Assertions vs Enums',
    xp: 100,
    content: `
      <div class="hook-story">
        <strong>⚠️ The enum that surprised everyone at runtime.</strong> A developer uses TypeScript enums for HTTP status codes. In the compiled JavaScript, the enum becomes a bidirectional lookup object with both <code>200: "OK"</code> and <code>"OK": 200</code> entries. It shows up in bundle analysis as unexpected extra code. Modern TypeScript teams increasingly prefer <code>as const</code> — zero runtime cost, full type safety.
      </div>
      <div class="why-matters">
        <strong>Why this matters:</strong> Enums have surprising runtime behavior. <code>as const</code> is the modern alternative that gives you the same type safety with zero runtime overhead and better tree-shaking.
      </div>
      <h3>Traditional Enums</h3>
      <pre><code>// Numeric enum (default — avoid unless you need numbers)
enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right  // 3
}

// String enum (clearer, debuggable)
enum Status {
  Active = "ACTIVE",
  Paused = "PAUSED",
  Closed = "CLOSED"
}

// Usage
const myStatus: Status = Status.Active; // "ACTIVE"</code></pre>
      <h3>const assertion — the modern approach</h3>
      <pre><code>// as const — infers literal types, no runtime object
const STATUS = {
  Active: "ACTIVE",
  Paused: "PAUSED",
  Closed: "CLOSED",
} as const;

// Extract the union type of values
type StatusType = typeof STATUS[keyof typeof STATUS];
// "ACTIVE" | "PAUSED" | "CLOSED"

// Usage — identical to enum but zero runtime overhead
const myStatus: StatusType = STATUS.Active;

// Works great with discriminated unions
type Event =
  | { type: "USER_CREATED"; userId: number }
  | { type: "ORDER_PLACED"; orderId: number };</code></pre>
      <div class="inline-quiz">
        <h4>⚡ Quick Check</h4>
        <p>Why do many modern TypeScript projects prefer <code>as const</code> over enums?</p>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: as const has equivalent type safety to string enums — the difference is runtime behavior.')">as const is safer — enums have no type checking</button>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! as const is erased at compile time — zero runtime code. Enums compile to runtime JavaScript objects, adding bundle size. as const also plays better with JSON, APIs, and tree-shaking.')">as const compiles to zero runtime code — enums add a runtime lookup object to the bundle</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: Both work well in switch statements — the advantage of as const is about bundle size and runtime behavior.')">as const works in switch statements; enums do not</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: Both are TypeScript features — neither requires installing extra packages.')">as const requires no TypeScript version; enums need TypeScript 5+</button>
      </div>
      <div class="teach-it-back">
        <h4>🧠 Teach It Back</h4>
        <textarea placeholder="I prefer as const over enums because..."></textarea>
      </div>
    `
  },

  'ts2-5': {
    title: '2.5 TypeScript with React',
    xp: 125,
    content: `
      <div class="hook-story">
        <strong>⚛️ React + TypeScript = the industry standard.</strong> Every major React framework (Next.js, Remix, Vite) ships TypeScript-first. The React team rewrote the React docs with TypeScript examples. If you are building React apps professionally in 2025, you are using TypeScript. Knowing how they work together is not optional.
      </div>
      <div class="why-matters">
        <strong>Why this matters:</strong> React + TypeScript gives you typed props (no more passing wrong data to components), typed state, typed event handlers, and typed refs. Most React bugs are caught at compile time.
      </div>
      <h3>Typed component props</h3>
      <pre><code>// Define props interface
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  children?: React.ReactNode;
}

// Functional component
function Button({ label, onClick, variant = "primary", disabled }: ButtonProps) {
  return (
    &lt;button
      onClick={onClick}
      disabled={disabled}
      className={"btn btn-" + variant}
    &gt;
      {label}
    &lt;/button&gt;
  );
}

// TypeScript catches wrong usage
&lt;Button label="Save" onClick={handleSave} /&gt;     // OK
&lt;Button onClick={handleSave} /&gt;                  // Error: label is required
&lt;Button label="Save" variant="invalid" /&gt;        // Error: "invalid" not in union</code></pre>
      <h3>Typed state and events</h3>
      <pre><code>// useState with explicit type
const [user, setUser] = useState&lt;User | null&gt;(null);
const [count, setCount] = useState(0); // inferred as number

// Event handlers
function handleInput(e: React.ChangeEvent&lt;HTMLInputElement&gt;) {
  console.log(e.target.value); // string — fully typed
}

function handleSubmit(e: React.FormEvent&lt;HTMLFormElement&gt;) {
  e.preventDefault();
}

// useRef
const inputRef = useRef&lt;HTMLInputElement&gt;(null);
inputRef.current?.focus(); // optional chaining needed (could be null)</code></pre>
      <div class="inline-quiz">
        <h4>⚡ Quick Check</h4>
        <p>A component requires a <code>name: string</code> prop. You render it without passing <code>name</code>. What happens?</p>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: TypeScript catches missing required props at compile time — before the browser runs any code.')">A runtime error — the browser crashes when the component renders</button>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! TypeScript catches missing required props at compile time. You see a red squiggle in your editor immediately — no need to run the app.')">A TypeScript compile error — caught before the app runs</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: TypeScript does not silently pass undefined — it throws a compile error for missing required props.')">The prop is silently undefined at runtime</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: PropTypes is the old React runtime validation. TypeScript handles this at compile time, more efficiently.')">A PropTypes warning — only visible in the browser console</button>
      </div>
      <div class="teach-it-back">
        <h4>🧠 Teach It Back</h4>
        <textarea placeholder="TypeScript improves React development by..."></textarea>
      </div>
    `
  },

  'ts3-1': {
    title: '3.1 Zod — Runtime Type Safety for APIs',
    xp: 150,
    content: `
      <div class="hook-story">
        <strong>🛡️ TypeScript types disappear at runtime.</strong> You type your API response as <code>User</code>. The server sends back <code>{ name: null, age: "thirty" }</code>. TypeScript does not care — types are erased at compile time. Your app crashes at runtime. <strong>Zod</strong> validates the actual shape of data at runtime and infers the TypeScript type from the schema — one definition, both runtime safety and compile-time types.
      </div>
      <div class="why-matters">
        <strong>Why this matters:</strong> Zod is used by tRPC, React Hook Form, Next.js ecosystem, and millions of projects. It is the standard solution for validating API inputs, form data, and environment variables in TypeScript projects.
      </div>
      <h3>Zod basics</h3>
      <pre><code>import { z } from "zod";

// Define a schema
const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string().min(1).max(100),
  role: z.enum(["admin", "user", "guest"]),
  age: z.number().int().positive().optional(),
});

// Infer TypeScript type FROM the schema (single source of truth!)
type User = z.infer&lt;typeof UserSchema&gt;;
// No separate interface needed!

// Parse — throws on failure
const user = UserSchema.parse(apiResponse);

// Safe parse — returns success/error object
const result = UserSchema.safeParse(apiResponse);
if (result.success) {
  console.log(result.data.email); // Typed as User
} else {
  console.log(result.error.issues); // Detailed error messages
}</code></pre>
      <h3>Validating environment variables</h3>
      <pre><code>// Never have undefined env vars crash your app at runtime
const EnvSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(["development", "production", "test"]),
  JWT_SECRET: z.string().min(32),
});

export const env = EnvSchema.parse(process.env);
// env is fully typed — env.PORT is number, not string!</code></pre>
      <div class="inline-quiz">
        <h4>⚡ Quick Check</h4>
        <p>What does <code>z.infer&lt;typeof UserSchema&gt;</code> produce?</p>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: z.infer extracts a TypeScript type, not a JavaScript value.')">A JavaScript object with the default values from the schema</button>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! z.infer extracts the TypeScript type that corresponds to the schema. This means your schema and TypeScript type are always in sync — change the schema and the type updates automatically.')">The TypeScript type that matches the schema — User interface inferred automatically</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: z.infer is a compile-time operation — it produces a type, not a validation function.')">A runtime validation function</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: z.infer extracts the type from the schema. z.parse() validates data at runtime.')">A JSON Schema object for documentation</button>
      </div>
      <div class="teach-it-back">
        <h4>🧠 Teach It Back</h4>
        <textarea placeholder="Zod is needed even when using TypeScript because..."></textarea>
      </div>
    `
  },

  'ts3-2': {
    title: '3.2 Mapped Types & Template Literal Types',
    xp: 150,
    content: `
      <div class="hook-story">
        <strong>🗺️ Types that generate themselves.</strong> You have a <code>User</code> interface with 10 fields. You need an event type for every field change — <code>OnNameChange</code>, <code>OnEmailChange</code>, etc. Manually writing 10 event types is fragile. With mapped and template literal types, you generate them automatically from <code>User</code>. Add a field to User? The event types update for free.
      </div>
      <div class="why-matters">
        <strong>Why this matters:</strong> Mapped and template literal types power utility types like <code>Partial&lt;T&gt;</code>, <code>Record&lt;K,V&gt;</code>, and advanced patterns in libraries like tRPC and Prisma. Understanding them helps you read library code and write your own abstractions.
      </div>
      <h3>Mapped types</h3>
      <pre><code>// Iterate over keys of a type and transform
type Optional&lt;T&gt; = {
  [K in keyof T]?: T[K];  // Add ? to every property
};
// This is exactly how Partial&lt;T&gt; is implemented!

// Make all values strings
type Stringified&lt;T&gt; = {
  [K in keyof T]: string;
};

// Readonly implementation
type MyReadonly&lt;T&gt; = {
  readonly [K in keyof T]: T[K];
};

// Real usage: API response transformer
type ApiFields&lt;T&gt; = {
  [K in keyof T as K extends string ? K : never]: T[K] extends Date
    ? string   // Dates become strings in JSON
    : T[K];
};</code></pre>
      <h3>Template literal types</h3>
      <pre><code>// Generate string types from patterns
type EventName = "click" | "focus" | "blur";
type HandlerName = "onClick" | "onFocus" | "onBlur";
type HandlerName2 = "on" + Capitalize&lt;EventName&gt;;  // Same thing!

// Generate setter names from field names
interface User { name: string; email: string; age: number; }
type Setters = {
  [K in keyof User as "set" + Capitalize&lt;string &amp; K&gt;]: (value: User[K]) =&gt; void;
};
// { setName: (value: string) =&gt; void; setEmail: ...; setAge: ... }</code></pre>
      <div class="inline-quiz">
        <h4>⚡ Quick Check</h4>
        <p>What does <code>[K in keyof T]?: T[K]</code> produce?</p>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: in keyof T iterates over all keys of T, not filters them.')">Only the keys of T that are optional</button>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! This is a mapped type that iterates over all keys of T and makes each property optional (?). This is the exact implementation of the built-in Partial&lt;T&gt;.')">A new type with all the same properties as T but all made optional</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: This is a type expression, not runtime code — it does not modify T.')">It modifies T in place to make all properties optional</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: Mapped types always preserve all keys of T unless you filter them explicitly.')">A type with only the required properties of T</button>
      </div>
      <div class="teach-it-back">
        <h4>🧠 Teach It Back</h4>
        <textarea placeholder="Mapped types let you create new types from existing ones by..."></textarea>
      </div>
    `
  },

  'ts3-3': {
    title: '3.3 tsconfig & Strict Mode',
    xp: 175,
    content: `
      <div class="hook-story">
        <strong>⚙️ The config that changes everything.</strong> Two TypeScript projects. One has <code>"strict": false</code> — types are optional suggestions, null checks are skipped, implicit any is everywhere. The other has <code>"strict": true</code> — every null is handled, every any is explicit, every function is typed. The second project has 80% fewer runtime errors. The tsconfig is where that difference lives.
      </div>
      <div class="why-matters">
        <strong>Why this matters:</strong> The tsconfig controls how strict TypeScript is. Not knowing what these flags do means you are either over-restricting your project or leaving major bug-catching capability disabled.
      </div>
      <h3>Recommended tsconfig.json</h3>
      <pre><code>{
  "compilerOptions": {
    "target": "ES2022",           // Output JS version
    "module": "NodeNext",         // Module system (Node 18+)
    "moduleResolution": "NodeNext",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,               // Enables ALL strict checks

    // What strict: true enables:
    // "strictNullChecks": true        — null/undefined are not assignable to other types
    // "noImplicitAny": true           — error if type would be inferred as any
    // "strictFunctionTypes": true     — stricter function parameter checking
    // "alwaysStrict": true            — emit "use strict" in all files
    // "strictBindCallApply": true     — strict checking of bind/call/apply

    "noUnusedLocals": true,       // Error on unused variables
    "noUnusedParameters": true,   // Error on unused function params
    "noImplicitReturns": true,    // All code paths must return
    "exactOptionalPropertyTypes": true, // Stricter optional handling
    "skipLibCheck": true,         // Skip type checking of .d.ts files (faster)
    "esModuleInterop": true,      // Better CommonJS/ESM interop
    "resolveJsonModule": true     // Can import JSON files
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}</code></pre>
      <h3>The most impactful flag: strictNullChecks</h3>
      <pre><code>// Without strictNullChecks (dangerous!)
function getUser(id: number): User {
  // might return undefined — no error!
}
const name = getUser(1).name; // Runtime crash if user not found

// With strictNullChecks (safe!)
function getUser(id: number): User | undefined {
  // Must declare the possibility of undefined
}
const user = getUser(1);
const name = user?.name;      // Must use optional chaining
// or
if (user) { const name = user.name; }</code></pre>
      <div class="inline-quiz">
        <h4>⚡ Quick Check</h4>
        <p>What does <code>"strict": true</code> in tsconfig.json do?</p>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: strict: true enables a bundle of strict checks. The strictest single flag is strictNullChecks.')">Enables only strictNullChecks</button>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! strict: true is a shorthand that enables strictNullChecks, noImplicitAny, strictFunctionTypes, alwaysStrict, strictBindCallApply, and several others all at once.')">Enables a bundle of strict flags including strictNullChecks, noImplicitAny, and more</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: strict: true enables multiple flags together — setting strictNullChecks alone does not enable all of them.')">Does the same as setting strictNullChecks: true manually</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: strict: true adds type checking rules — it does not affect runtime performance.')">Makes TypeScript compilation faster by enabling optimizations</button>
      </div>
      <div class="teach-it-back">
        <h4>🧠 Teach It Back</h4>
        <textarea placeholder="The most important tsconfig options for a production TypeScript project are..."></textarea>
      </div>
    `
  },

};

const typescriptFlashcards = [
  { front: "What does TypeScript compile to?", back: "Plain JavaScript. All type information is erased at compile time — browsers and Node.js never see TypeScript types." },
  { front: "any vs unknown?", back: "any disables all type checking. unknown is safe — you must narrow it before using it. Prefer unknown when the type is truly unknown." },
  { front: "interface vs type alias?", back: "Both describe object shapes. Type aliases can also represent unions, primitives, and utility type compositions. Interfaces support declaration merging. Either works for most cases." },
  { front: "What is a discriminated union?", back: "A union where each variant has a common literal field (discriminant) like kind or type. TypeScript narrows the type inside switch/if blocks based on that field." },
  { front: "What are generics?", back: "Type parameters that let functions and types work over a variety of types while preserving type information. function identity<T>(arg: T): T is the hello world." },
  { front: "Partial<T> vs Required<T>?", back: "Partial<T> makes all properties optional. Required<T> makes all properties required. Both are built-in utility types implemented with mapped types." },
  { front: "What is a type guard?", back: "A function or expression that narrows a type. Built-in: typeof, instanceof, truthiness. Custom: function isUser(x): x is User — uses the is keyword." },
  { front: "Why prefer as const over enums?", back: "as const compiles to zero runtime code — enums compile to a bidirectional JavaScript object. as const plays better with tree-shaking, JSON, and has no runtime overhead." },
  { front: "What does z.infer<typeof Schema> do?", back: "Extracts the TypeScript type from a Zod schema. This means your runtime validation schema and TypeScript type are always in sync from one definition." },
  { front: "What is strictNullChecks?", back: "A tsconfig flag (included in strict: true) that prevents null/undefined from being assigned to other types. Forces explicit null handling — eliminates most null pointer errors." },
  { front: "What is a mapped type?", back: "A type that iterates over keys of another type and transforms them. [K in keyof T]?: T[K] is how Partial<T> is built. Enables powerful type transformations." },
  { front: "void vs never?", back: "void: function completes but returns nothing meaningful (logging, event handlers). never: function never completes at all (always throws, infinite loop, exhaustive checks)." },
];
