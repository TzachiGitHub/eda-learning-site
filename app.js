// EDA Learning Site - Interactive Course
// ADHD-Optimized with bite-sized lessons and immediate feedback

const STORAGE_KEYS = {
    completedLessons: 'eda_completed_lessons',
    totalXP: 'eda_total_xp',
    streak: 'eda_streak',
    lastVisit: 'eda_last_visit'
};

let currentLesson = null;

// Lesson Content Database
const lessons = {
    '1-1': {
        title: '1.1 What is Event-Driven Architecture?',
        xp: 50,
        content: `
<div class="hook-story">🚀 <strong>Real World:</strong> Uber processes over 1 million events per second — driver location updates, ride requests, surge pricing calculations, payment confirmations. None of it is possible without Event-Driven Architecture. Today you'll understand how.</div>
<div class="why-matters">💡 <strong>Why this matters:</strong> Every major tech company — Netflix, Slack, Uber, Airbnb — runs on EDA. Understanding it is the difference between junior and senior engineer thinking.</div>
                        <h3>🎯 What You'll Learn</h3>
            <p>By the end of this 5-minute lesson, you'll understand what Event-Driven Architecture is and why it's revolutionary.</p>

            <h3>📖 The Core Concept</h3>
            <p><strong>Event-Driven Architecture (EDA)</strong> is a software design pattern where system components communicate by producing and responding to <em>events</em>.</p>

            <p><strong>Think of it like this:</strong> Instead of your code constantly asking "Did something happen? Did something happen?" (polling), components simply announce when something happens, and whoever cares can listen and react.</p>

            <h3>🌟 Real-World Analogy</h3>
            <p><strong>Traditional Programming:</strong> Imagine you're waiting for a pizza delivery. You keep opening the door every 30 seconds to check if the delivery person is there. Exhausting!</p>

            <p><strong>Event-Driven:</strong> Instead, you have a doorbell. When the pizza arrives, the delivery person rings the bell (publishes an event), and you respond (handle the event). You weren't constantly checking — you reacted when something actually happened.</p>

            <h3>🔑 Three Key Terms</h3>
            <ul>
                <li><strong>Event:</strong> Something that happened (e.g., "user clicked button", "payment processed", "email sent")</li>
                <li><strong>Publisher (Producer):</strong> The component that announces the event ("Pizza has arrived!")</li>
                <li><strong>Subscriber (Consumer):</strong> The component that listens for and responds to events ("I'll get the pizza!")</li>
            </ul>

            <h3>💡 Why It Matters</h3>
            <p><strong>Decoupling:</strong> Components don't need to know about each other. The pizza delivery person doesn't need to know who's home — they just ring the bell.</p>

            <p><strong>Scalability:</strong> Multiple subscribers can listen to the same event. Your roommate, your dog, and your security camera can all react to the doorbell.</p>

            <p><strong>Real-time:</strong> Things happen immediately when events occur, not when you remember to check.</p>

            <h3>✅ Quick Check</h3>
            <p>Can you think of an event-driven system in your daily life? (Hint: phone notifications, smart home devices, chat apps — they all use events!)</p>

            <h3>🎯 Key Takeaway</h3>
            <p><strong>EDA = React to things happening, instead of constantly checking if they happened.</strong></p>

            <p>Ready to see how this is different from traditional programming? Click "Mark Complete" and move to the next lesson!</p>
        `
    },
    '1-2': {
        title: '1.2 Traditional vs Event-Driven',
        xp: 50,
        content: `
<div class="hook-story">🚀 <strong>Real World:</strong> When Twitter switched from a monolithic to event-driven architecture, their system went from crashing during peak traffic (remember the "Fail Whale"?) to handling 500M+ tweets/day. The difference? Events.</div>
<div class="why-matters">💡 <strong>Why this matters:</strong> Understanding the contrast makes the benefits concrete — you'll be able to spot opportunities to apply EDA in any system you work on.</div>
                        <h3>🎯 What You'll Learn</h3>
            <p>See the concrete difference between traditional and event-driven approaches with real code examples.</p>

            <h3>📊 Scenario: User Registration System</h3>
            <p>When a user registers, you need to:</p>
            <ol>
                <li>Save user to database</li>
                <li>Send welcome email</li>
                <li>Create user profile</li>
                <li>Log analytics</li>
                <li>Notify admin</li>
            </ol>

            <h3>❌ Traditional Approach (Tightly Coupled)</h3>
            <pre><code>function registerUser(userData) {
    // Step 1: Save user
    const user = database.save(userData);

    // Step 2: Send email
    emailService.sendWelcome(user.email);

    // Step 3: Create profile
    profileService.create(user.id);

    // Step 4: Log analytics
    analytics.track('user_registered', user);

    // Step 5: Notify admin
    adminNotifier.notify(user);

    return user;
}</code></pre>

            <h3>⚠️ Problems with Traditional Approach</h3>
            <ul>
                <li><strong>Tight Coupling:</strong> Registration function knows about ALL these services</li>
                <li><strong>Single Point of Failure:</strong> If email service is down, registration fails</li>
                <li><strong>Hard to Extend:</strong> Want to add SMS notification? Gotta modify this function</li>
                <li><strong>Synchronous:</strong> User waits for ALL steps to complete (slow!)</li>
                <li><strong>Hard to Test:</strong> Must mock all 5 services to test registration</li>
            </ul>

            <h3>✅ Event-Driven Approach (Loosely Coupled)</h3>
            <pre><code>function registerUser(userData) {
    // Step 1: Save user
    const user = database.save(userData);

    // Step 2: Publish event
    eventBus.publish('user.registered', user);

    return user; // Done! Fast!
}

// Elsewhere: Services subscribe to the event
eventBus.subscribe('user.registered', (user) => {
    emailService.sendWelcome(user.email);
});

eventBus.subscribe('user.registered', (user) => {
    profileService.create(user.id);
});

eventBus.subscribe('user.registered', (user) => {
    analytics.track('user_registered', user);
});

eventBus.subscribe('user.registered', (user) => {
    adminNotifier.notify(user);
});</code></pre>

            <h3>🌟 Benefits of Event-Driven Approach</h3>
            <ul>
                <li><strong>Loose Coupling:</strong> Registration doesn't know about email, analytics, etc.</li>
                <li><strong>Resilient:</strong> If email service is down, registration still succeeds</li>
                <li><strong>Easy to Extend:</strong> Want SMS? Just add another subscriber. No changes to registration code!</li>
                <li><strong>Asynchronous:</strong> User gets immediate response. Other tasks happen in background</li>
                <li><strong>Easy to Test:</strong> Test registration in isolation. Test each subscriber separately</li>
                <li><strong>Scalable:</strong> Can process events in parallel across multiple servers</li>
            </ul>

            <h3>📈 Real Numbers</h3>
            <p><strong>Traditional:</strong> User waits ~2-5 seconds for all steps to complete</p>
            <p><strong>Event-Driven:</strong> User gets response in ~200ms. Other tasks happen in background</p>

            <h3>🎯 Key Takeaway</h3>
            <p><strong>Traditional = "Do everything now in sequence"</strong></p>
            <p><strong>Event-Driven = "Announce what happened, let others react independently"</strong></p>

            <p>Next lesson: Learn the three building blocks in detail!</p>

            <div class="inline-quiz">
                <h4>🧠 Quick Check</h4>
                <p><strong>What is the main advantage of Event-Driven over Traditional when adding new features?</strong></p>
                <button class="quiz-option" onclick="checkQuiz(this,'wrong','Not quite — EDA can be faster, but that\'s not the main advantage here.')">It\'s always faster</button>
                <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! With EDA you just add a new subscriber — no need to modify existing code.')">You can add features without touching existing code</button>
                <button class="quiz-option" onclick="checkQuiz(this,'wrong','Not quite — EDA actually adds some complexity. The benefit is decoupling.')">It\'s simpler to code</button>
                <div class="quiz-feedback" id="qf-1-2-1"></div>
            </div>
            <div class="teach-it-back">
                <h4>🧠 Teach It Back</h4>
                <p style="font-size:13px;margin-bottom:8px">In your own words, what was the main thing you learned? (No one sees this — writing it locks it in)</p>
                <textarea placeholder="Type your takeaway here..."></textarea>
            </div>
        `
    },
    '1-3': {
        title: '1.3 Core Components: Events, Publishers, Subscribers',
        xp: 75,
        content: `
<div class="hook-story">🚀 <strong>Real World:</strong> When you tap "Request Uber", at least 12 different services receive that single event — dispatch, pricing, ETA calculation, driver notification, analytics, fraud detection, and more. You're about to meet the three components that make this possible.</div>
<div class="why-matters">💡 <strong>Why this matters:</strong> Publishers, Subscribers, and Events are the atoms of every EDA system. Once you know these, you can understand any event-driven codebase.</div>
                        <h3>🎯 What You'll Learn</h3>
            <p>Deep dive into the three essential components of every event-driven system.</p>

            <h3>1️⃣ Events</h3>
            <p>An <strong>event</strong> is a record of something that happened. Events are immutable (can't be changed after they occur).</p>

            <h3>📋 Event Structure</h3>
            <pre><code>{
    "eventType": "user.registered",
    "eventId": "evt_123abc",
    "timestamp": "2026-02-27T14:30:00Z",
    "data": {
        "userId": "usr_456def",
        "email": "user@example.com",
        "name": "John Doe"
    },
    "metadata": {
        "source": "user-service",
        "version": "1.0"
    }
}</code></pre>

            <h3>🏷️ Event Naming Conventions</h3>
            <p>Use <strong>past tense</strong> because events describe what already happened:</p>
            <ul>
                <li>✅ <code>user.registered</code> (not user.register)</li>
                <li>✅ <code>order.placed</code> (not order.place)</li>
                <li>✅ <code>payment.processed</code> (not payment.process)</li>
                <li>✅ <code>email.sent</code> (not email.send)</li>
            </ul>

            <h3>2️⃣ Publishers (Producers)</h3>
            <p>A <strong>publisher</strong> is a component that creates and emits events when something significant happens.</p>

            <pre><code>class UserService {
    register(userData) {
        const user = this.saveToDatabase(userData);

        // Publish event
        eventBus.publish({
            eventType: 'user.registered',
            eventId: generateId(),
            timestamp: new Date().toISOString(),
            data: user
        });

        return user;
    }
}</code></pre>

            <h3>📢 Publisher Responsibilities</h3>
            <ul>
                <li>Detect when significant events occur</li>
                <li>Create well-formed event objects</li>
                <li>Publish events to the event bus/broker</li>
                <li><strong>Don't care</strong> who listens or what they do</li>
            </ul>

            <h3>3️⃣ Subscribers (Consumers)</h3>
            <p>A <strong>subscriber</strong> listens for specific events and reacts when they occur.</p>

            <pre><code>class EmailService {
    constructor(eventBus) {
        // Subscribe to user registration events
        eventBus.subscribe('user.registered', this.handleUserRegistered);
    }

    handleUserRegistered(event) {
        const { email, name } = event.data;
        this.sendWelcomeEmail(email, name);
    }
}</code></pre>

            <h3>👂 Subscriber Responsibilities</h3>
            <ul>
                <li>Register interest in specific event types</li>
                <li>Handle events when they arrive</li>
                <li>Process events idempotently (same event twice = same result)</li>
                <li><strong>Don't care</strong> who published the event</li>
            </ul>

            <h3>🔄 The Event Flow</h3>
            <pre><code>
┌─────────────┐     Event      ┌──────────────┐     Event      ┌──────────────┐
│  Publisher  │───────────────>│  Event Bus   │───────────────>│ Subscriber 1 │
│             │                │              │                └──────────────┘
│ User Service│                │ (Broker/Hub) │     Event      ┌──────────────┐
│             │                │              │───────────────>│ Subscriber 2 │
└─────────────┘                └──────────────┘                └──────────────┘
                                                    Event      ┌──────────────┐
                                                  ───────────> │ Subscriber 3 │
                                                                └──────────────┘
            </code></pre>

            <h3>💡 Key Principles</h3>
            <ul>
                <li><strong>Fire and Forget:</strong> Publishers don't wait for responses</li>
                <li><strong>One-to-Many:</strong> One event can trigger multiple subscribers</li>
                <li><strong>Temporal Decoupling:</strong> Publisher and subscriber don't need to be active at same time</li>
                <li><strong>Location Decoupling:</strong> Can be on different servers/processes</li>
            </ul>

            <h3>🎯 Key Takeaway</h3>
            <p><strong>Events</strong> describe what happened (past tense)</p>
            <p><strong>Publishers</strong> announce events (fire and forget)</p>
            <p><strong>Subscribers</strong> react to events (independent handlers)</p>

            <p>Next: Build your first event system!</p>

            <div class="teach-it-back">
                <h4>🧠 Teach It Back</h4>
                <p style="font-size:13px;margin-bottom:8px">In your own words, what was the main thing you learned? (No one sees this — writing it locks it in)</p>
                <textarea placeholder="Type your takeaway here..."></textarea>
            </div>
        `
    },
    '1-4': {
        title: '1.4 Your First Event Flow',
        xp: 100,
        content: `
<div class="hook-story">🚀 <strong>Real World:</strong> Discord uses this exact pattern — EventEmitter — to broadcast messages to thousands of connected clients instantly. You're about to build the same thing from scratch.</div>
<div class="why-matters">💡 <strong>Why this matters:</strong> Hands-on building locks in concepts that reading can't. After this lesson, you'll have real working code to show.</div>
                        <h3>🎯 What You'll Build</h3>
            <p>A simple notification system using Node.js EventEmitter (in-memory events).</p>

            <h3>📦 Setup (Copy this code)</h3>
            <pre><code>// notification-system.js
const EventEmitter = require('events');

// Create event bus
const eventBus = new EventEmitter();

// Publisher: Notification Creator
class NotificationService {
    createNotification(userId, message) {
        console.log(\`📢 Creating notification for user \${userId}\`);

        // Publish event
        eventBus.emit('notification.created', {
            userId,
            message,
            timestamp: new Date().toISOString()
        });

        console.log('✅ Event published!');
    }
}

// Subscriber 1: Email Handler
class EmailHandler {
    constructor() {
        eventBus.on('notification.created', this.handleNotification.bind(this));
    }

    handleNotification(event) {
        console.log(\`📧 Email Handler: Sending email to user \${event.userId}\`);
        console.log(\`   Message: \${event.message}\`);
    }
}

// Subscriber 2: SMS Handler
class SMSHandler {
    constructor() {
        eventBus.on('notification.created', this.handleNotification.bind(this));
    }

    handleNotification(event) {
        console.log(\`📱 SMS Handler: Sending SMS to user \${event.userId}\`);
        console.log(\`   Message: \${event.message}\`);
    }
}

// Subscriber 3: Push Notification Handler
class PushHandler {
    constructor() {
        eventBus.on('notification.created', this.handleNotification.bind(this));
    }

    handleNotification(event) {
        console.log(\`🔔 Push Handler: Sending push to user \${event.userId}\`);
        console.log(\`   Message: \${event.message}\`);
    }
}

// Initialize all handlers (subscribers)
const emailHandler = new EmailHandler();
const smsHandler = new SMSHandler();
const pushHandler = new PushHandler();

// Initialize notification service (publisher)
const notificationService = new NotificationService();

// Test it!
console.log('\\n🚀 Testing Event-Driven Notification System\\n');
notificationService.createNotification('user123', 'Welcome to our platform!');
</code></pre>

            <h3>▶️ Run It</h3>
            <pre><code>node notification-system.js</code></pre>

            <h3>📤 Expected Output</h3>
            <pre><code>🚀 Testing Event-Driven Notification System

📢 Creating notification for user user123
✅ Event published!
📧 Email Handler: Sending email to user user123
   Message: Welcome to our platform!
📱 SMS Handler: Sending SMS to user user123
   Message: Welcome to our platform!
🔔 Push Handler: Sending push to user user123
   Message: Welcome to our platform!</code></pre>

            <h3>🔍 What Just Happened?</h3>
            <ol>
                <li><strong>Publisher</strong> (NotificationService) emitted <code>notification.created</code> event</li>
                <li><strong>Event Bus</strong> (EventEmitter) received the event</li>
                <li><strong>Three Subscribers</strong> independently handled the same event</li>
                <li>All happened <strong>automatically</strong> — publisher didn't call them directly!</li>
            </ol>

            <h3>🎮 Try This Challenge</h3>
            <p>Add a 4th subscriber that logs notifications to a database:</p>
            <pre><code>class DatabaseLogger {
    constructor() {
        eventBus.on('notification.created', this.handleNotification.bind(this));
    }

    handleNotification(event) {
        console.log(\`💾 Database Logger: Saving notification to DB\`);
        console.log(\`   User: \${event.userId}, Time: \${event.timestamp}\`);
    }
}

const dbLogger = new DatabaseLogger();</code></pre>

            <h3>💡 Notice What You DIDN'T Have to Do</h3>
            <ul>
                <li>Didn't modify NotificationService to add the logger</li>
                <li>Didn't import DatabaseLogger into NotificationService</li>
                <li>Just created the subscriber and it started working!</li>
            </ul>

            <h3>🎯 Key Takeaway</h3>
            <p><strong>Adding new functionality = Add new subscribers. No changes to existing code!</strong></p>
            <p>This is the power of loose coupling.</p>

            <p>Next: Test your understanding with a quiz!</p>
        `
    },
    '1-5': {
        title: '1.5 Quiz: Foundations Check',
        xp: 150,
        content: `
            <h3>🎯 Test Your Understanding</h3>
            <p>Answer these 5 questions to check your grasp of EDA foundations.</p>

            <h3>Question 1</h3>
            <p><strong>What is the main benefit of Event-Driven Architecture?</strong></p>
            <p>A) Faster code execution<br>
            B) Loose coupling between components<br>
            C) Smaller file sizes<br>
            D) Better variable names</p>
            <p><em>Correct Answer: B</em></p>

            <h3>Question 2</h3>
            <p><strong>Events should be named in:</strong></p>
            <p>A) Future tense (user.will.register)<br>
            B) Present tense (user.registers)<br>
            C) Past tense (user.registered)<br>
            D) Doesn't matter</p>
            <p><em>Correct Answer: C - Events describe what already happened</em></p>

            <h3>Question 3</h3>
            <p><strong>In EDA, the publisher:</strong></p>
            <p>A) Knows exactly which subscribers will handle the event<br>
            B) Waits for subscribers to finish processing<br>
            C) Doesn't know or care who handles the event<br>
            D) Must manually call each subscriber</p>
            <p><em>Correct Answer: C - Fire and forget principle</em></p>

            <h3>Question 4</h3>
            <p><strong>What happens if you add a new subscriber to an existing event?</strong></p>
            <p>A) You must modify the publisher code<br>
            B) The event won't work anymore<br>
            C) Nothing - the subscriber automatically starts receiving events<br>
            D) You need to restart the entire application</p>
            <p><em>Correct Answer: C - That's the beauty of loose coupling!</em></p>

            <h3>Question 5</h3>
            <p><strong>Compared to traditional synchronous code, EDA is better for:</strong></p>
            <p>A) Simple, small applications<br>
            B) Systems where components need to be independent<br>
            C) Applications with only one function<br>
            D) Static websites with no logic</p>
            <p><em>Correct Answer: B - EDA shines with independent, scalable components</em></p>

            <h3>✅ Scoring</h3>
            <ul>
                <li><strong>5/5:</strong> 🌟 Perfect! You're ready for Module 2!</li>
                <li><strong>3-4/5:</strong> 👍 Good! Review the lessons you missed</li>
                <li><strong>0-2/5:</strong> 📚 Go back and review Module 1 lessons</li>
            </ul>

            <h3>🎯 Module 1 Complete!</h3>
            <p>Congratulations! You now understand:</p>
            <ul>
                <li>✅ What Event-Driven Architecture is</li>
                <li>✅ How it differs from traditional programming</li>
                <li>✅ The three core components (Events, Publishers, Subscribers)</li>
                <li>✅ How to build a simple event system</li>
            </ul>

            <p><strong>Next:</strong> Module 2 - Learn powerful EDA patterns like Pub/Sub, Event Sourcing, and CQRS!</p>
        `
    },
    '2-1': {
        title: '2.1 Pub/Sub Pattern',
        xp: 100,
        content: `
<div class="hook-story">🚀 <strong>Real World:</strong> YouTube notifies 50 million subscribers the instant a creator uploads a video. They don't call each subscriber individually — they publish to a topic and subscribers receive it. That's Pub/Sub at planetary scale.</div>
<div class="why-matters">💡 <strong>Why this matters:</strong> Pub/Sub is the most widely used EDA pattern. It's in every major platform — Kafka, Google Cloud Pub/Sub, AWS SNS, Redis.</div>
                        <h3>🎯 What You'll Learn</h3>
            <p>The Publish-Subscribe pattern is the foundation of most event-driven systems.</p>

            <h3>📖 What is Pub/Sub?</h3>
            <p><strong>Pub/Sub</strong> (Publish-Subscribe) is a messaging pattern where publishers send messages to topics/channels, and subscribers receive messages from topics they're interested in.</p>

            <h3>🔑 Key Concepts</h3>
            <ul>
                <li><strong>Topic/Channel:</strong> A named stream of events (e.g., "orders", "notifications")</li>
                <li><strong>Publisher:</strong> Sends messages to a topic</li>
                <li><strong>Subscriber:</strong> Listens to a topic</li>
                <li><strong>Message Broker:</strong> Manages topics and delivers messages (Redis, RabbitMQ, Kafka)</li>
            </ul>

            <h3>🎯 Real-World Example: YouTube</h3>
            <p><strong>Without Pub/Sub:</strong> You'd have to visit every channel's page to check for new videos</p>
            <p><strong>With Pub/Sub:</strong> You subscribe to channels, YouTube notifies you when they publish</p>

            <h3>🔄 Message Flow</h3>
            <pre><code>
Publisher 1 ──┐
              │
Publisher 2 ──┼──> Topic: "user.events" ──┬──> Subscriber 1
              │                            │
Publisher 3 ──┘                            ├──> Subscriber 2
                                           │
                                           └──> Subscriber 3
            </code></pre>

            <h3>💡 Benefits</h3>
            <ul>
                <li><strong>Decoupling:</strong> Publishers don't know subscribers</li>
                <li><strong>Scalability:</strong> Add subscribers without changing publishers</li>
                <li><strong>Flexibility:</strong> Same message can go to multiple subscribers</li>
                <li><strong>Filtering:</strong> Subscribers only get what they want</li>
            </ul>

            <h3>🎯 Key Takeaway</h3>
            <p><strong>Pub/Sub = Topic-based message distribution</strong></p>
            <p>Publishers post to topics. Subscribers listen to topics. Broker handles delivery.</p>
        `
    },
    '2-2': {
        title: '2.2 Event Sourcing',
        xp: 100,
        content: `
<div class="hook-story">🚀 <strong>Real World:</strong> Your bank account doesn't store "balance: $500". It stores every single transaction that ever happened — deposits, withdrawals, transfers — and calculates your balance by replaying them. That's Event Sourcing. It's why banks can show your complete history and never "lose" your money.</div>
<div class="why-matters">💡 <strong>Why this matters:</strong> Event Sourcing gives you time travel — you can reconstruct the exact state of your system at any point in the past. Priceless for debugging and compliance.</div>
                        <h3>🎯 What You'll Learn</h3>
            <p>Event Sourcing is a powerful pattern where you store every state change as an event.</p>

            <h3>📖 The Problem with Traditional Storage</h3>
            <p><strong>Traditional:</strong> You only store the current state</p>
            <pre><code>// Database: users table
{
    id: 123,
    name: "John Doe",
    email: "john@example.com",
    balance: 500
}</code></pre>

            <p><strong>Problem:</strong> You lost the history! How did the balance become 500? You don't know.</p>

            <h3>✅ Event Sourcing Solution</h3>
            <p><strong>Instead of storing current state, store all events that led to that state:</strong></p>

            <pre><code>// Event Store
[
    { type: 'AccountCreated', userId: 123, balance: 0, timestamp: '...' },
    { type: 'MoneyDeposited', userId: 123, amount: 1000, timestamp: '...' },
    { type: 'MoneyWithdrawn', userId: 123, amount: 300, timestamp: '...' },
    { type: 'MoneyWithdrawn', userId: 123, amount: 200, timestamp: '...' }
]

// Current state = Replay all events
// 0 + 1000 - 300 - 200 = 500</code></pre>

            <h3>🔑 Key Concepts</h3>
            <ul>
                <li><strong>Events are immutable:</strong> Once written, never changed</li>
                <li><strong>Events are append-only:</strong> Always add new events, never modify old ones</li>
                <li><strong>State is derived:</strong> Current state = replay all events</li>
                <li><strong>Complete audit trail:</strong> Know exactly what happened when</li>
            </ul>

            <h3>💡 Benefits</h3>
            <ul>
                <li><strong>Time Travel:</strong> Reconstruct state at any point in history</li>
                <li><strong>Audit Trail:</strong> Perfect compliance and debugging</li>
                <li><strong>Business Insights:</strong> Analyze how things changed over time</li>
                <li><strong>Bug Recovery:</strong> Fix bugs by replaying events with corrected logic</li>
            </ul>

            <h3>⚠️ Challenges</h3>
            <ul>
                <li><strong>Storage:</strong> Events grow over time (use snapshots)</li>
                <li><strong>Complexity:</strong> More complex than CRUD</li>
                <li><strong>Eventual Consistency:</strong> Rebuilding state takes time</li>
            </ul>

            <h3>🎯 When to Use Event Sourcing</h3>
            <p>✅ Financial systems (need audit trail)</p>
            <p>✅ Collaboration tools (need history/undo)</p>
            <p>✅ Analytics (need to analyze changes)</p>
            <p>❌ Simple CRUD apps (overkill)</p>

            <h3>🎯 Key Takeaway</h3>
            <p><strong>Event Sourcing = Store events, not just current state</strong></p>
        `
    },
    '2-3': {
        title: '2.3 CQRS (Command Query Responsibility Segregation)',
        xp: 125,
        content: `
<div class="hook-story">🚀 <strong>Real World:</strong> Amazon's product pages load in under 200ms despite billions of products and millions of simultaneous users. Their secret: the system that handles orders (writes) is completely separate from the system that displays products (reads). That's CQRS.</div>
<div class="why-matters">💡 <strong>Why this matters:</strong> Reads and writes have completely different performance requirements. CQRS lets you optimize each independently without compromise.</div>
                        <h3>🎯 What You'll Learn</h3>
            <p>CQRS separates reads and writes into different models for better performance and scalability.</p>

            <h3>📖 The Traditional Approach</h3>
            <p><strong>One model for everything:</strong></p>
            <pre><code>class UserService {
    createUser(data) { /* write */ }
    updateUser(id, data) { /* write */ }
    deleteUser(id) { /* write */ }
    getUser(id) { /* read */ }
    listUsers(filter) { /* read */ }
    getUserStats() { /* read */ }
}</code></pre>

            <p><strong>Problem:</strong> Read and write needs are different!</p>
            <ul>
                <li>Writes: Simple, focused, validate, store</li>
                <li>Reads: Complex queries, joins, aggregations, fast access</li>
            </ul>

            <h3>✅ CQRS Solution</h3>
            <p><strong>Separate models for Commands (writes) and Queries (reads):</strong></p>

            <pre><code>// COMMAND SIDE (Writes)
class UserCommands {
    createUser(data) {
        // Validate
        // Publish UserCreated event
    }

    updateUser(id, data) {
        // Validate
        // Publish UserUpdated event
    }
}

// QUERY SIDE (Reads)
class UserQueries {
    getUser(id) {
        // Read from optimized read database
    }

    searchUsers(criteria) {
        // Read from search index (Elasticsearch)
    }

    getUserStats() {
        // Read from pre-computed statistics table
    }
}</code></pre>

            <h3>🔄 How It Works</h3>
            <pre><code>
Command → Validate → Event → Write DB
                       ↓
                   Event Handler
                       ↓
                   Update Read DB (optimized for queries)
                       ↓
Query → Read DB → Return data
            </code></pre>

            <h3>💡 Benefits</h3>
            <ul>
                <li><strong>Performance:</strong> Optimize reads and writes independently</li>
                <li><strong>Scalability:</strong> Scale read and write databases separately</li>
                <li><strong>Flexibility:</strong> Multiple read models for different use cases</li>
                <li><strong>Simplicity:</strong> Each side is simpler on its own</li>
            </ul>

            <h3>🎯 Real-World Example</h3>
            <p><strong>E-commerce system:</strong></p>
            <ul>
                <li><strong>Write side:</strong> Process orders (PostgreSQL)</li>
                <li><strong>Read side #1:</strong> Product search (Elasticsearch)</li>
                <li><strong>Read side #2:</strong> Order history (MongoDB)</li>
                <li><strong>Read side #3:</strong> Analytics dashboard (Data warehouse)</li>
            </ul>

            <h3>⚠️ Challenges</h3>
            <ul>
                <li><strong>Eventual Consistency:</strong> Read side updated asynchronously</li>
                <li><strong>Complexity:</strong> More moving parts</li>
                <li><strong>Data Sync:</strong> Must keep read models in sync</li>
            </ul>

            <h3>🎯 When to Use CQRS</h3>
            <p>✅ Complex queries + simple writes</p>
            <p>✅ Need to scale reads independently</p>
            <p>✅ Different read models for different purposes</p>
            <p>❌ Simple CRUD apps (not worth the complexity)</p>

            <h3>🎯 Key Takeaway</h3>
            <p><strong>CQRS = Separate read and write models for optimal performance</strong></p>
        `
    },
    '2-4': {
        title: '2.4 Event Streaming',
        xp: 100,
        content: `
<div class="hook-story">🚀 <strong>Real World:</strong> Spotify processes 600,000 events per second from listeners worldwide — song plays, skips, searches, playlist changes. They use Kafka (event streaming) to process all of it in real-time for recommendations, royalty calculations, and analytics.</div>
<div class="why-matters">💡 <strong>Why this matters:</strong> Event Streaming (Kafka) is the backbone of real-time data pipelines at Netflix, LinkedIn, Uber, and thousands of other companies.</div>
                        <h3>🎯 What You'll Learn</h3>
            <p>Event streaming processes continuous flows of events in real-time.</p>

            <h3>📖 Pub/Sub vs Event Streaming</h3>
            <p><strong>Pub/Sub:</strong> Fire-and-forget messages</p>
            <ul>
                <li>Message delivered to active subscribers</li>
                <li>Message deleted after delivery</li>
                <li>Can't replay old messages</li>
            </ul>

            <p><strong>Event Streaming:</strong> Persistent, replayable event logs</p>
            <ul>
                <li>Events stored in ordered log</li>
                <li>Consumers read at their own pace</li>
                <li>Can replay from any point in history</li>
            </ul>

            <h3>🔑 Apache Kafka - Event Streaming Platform</h3>
            <pre><code>
Producer 1 ──┐
             │
Producer 2 ──┼──> Topic: "orders" (Persistent Log)
             │     [Event1][Event2][Event3][Event4]...
Producer 3 ──┘              ↓         ↓         ↓
                      Consumer A  Consumer B  Consumer C
                      (offset:1)  (offset:3)  (offset:2)
            </code></pre>

            <h3>💡 Key Concepts</h3>
            <ul>
                <li><strong>Topic:</strong> Named stream of events (like "orders", "payments")</li>
                <li><strong>Partition:</strong> Topic divided for parallelism</li>
                <li><strong>Offset:</strong> Position in the stream (like a bookmark)</li>
                <li><strong>Consumer Group:</strong> Multiple consumers share the load</li>
                <li><strong>Retention:</strong> How long to keep events (hours, days, forever)</li>
            </ul>

            <h3>🎯 Real-World Use Cases</h3>

            <p><strong>1. Activity Tracking (Website Analytics)</strong></p>
            <pre><code>User clicks → Stream → [Real-time Dashboard]
                              → [ML Model Training]
                              → [Data Warehouse]</code></pre>

            <p><strong>2. Log Aggregation</strong></p>
            <pre><code>100 Servers → Stream → [Central Logging]
                              → [Alert System]
                              → [Analytics]</code></pre>

            <p><strong>3. Data Pipeline</strong></p>
            <pre><code>Database Changes → Stream → [Search Index Update]
                                   → [Cache Invalidation]
                                   → [Analytics DB]</code></pre>

            <h3>✅ Benefits</h3>
            <ul>
                <li><strong>Replay:</strong> Reprocess events if logic changes</li>
                <li><strong>Multiple Consumers:</strong> Different teams use same data</li>
                <li><strong>Fault Tolerance:</strong> Events persisted, can recover</li>
                <li><strong>Scalability:</strong> Partitions enable massive throughput</li>
            </ul>

            <h3>⚙️ Quick Example with Kafka-like API</h3>
            <pre><code>// Producer
producer.send('orders', {
    orderId: 123,
    amount: 99.99,
    timestamp: Date.now()
});

// Consumer
consumer.subscribe(['orders']);
consumer.poll((events) => {
    events.forEach(event => {
        processOrder(event);
        consumer.commit(event.offset); // Save progress
    });
});</code></pre>

            <h3>🎯 Key Takeaway</h3>
            <p><strong>Event Streaming = Persistent, replayable event logs for real-time data pipelines</strong></p>
        `
    },
    '2-5': {
        title: '2.5 Choreography vs Orchestration',
        xp: 100,
        content: `
<div class="hook-story">🚀 <strong>Real World:</strong> When you book an Airbnb, at least 6 things happen — booking confirmed, payment charged, host notified, calendar blocked, review triggered, analytics logged. How do these all coordinate? Two patterns exist: Choreography (each reacts on its own) and Orchestration (one controller directs everything). Both are used at Airbnb.</div>
<div class="why-matters">💡 <strong>Why this matters:</strong> Choosing the wrong coordination pattern causes spaghetti systems. This lesson gives you the mental model to choose correctly.</div>
                        <h3>🎯 What You'll Learn</h3>
            <p>Two patterns for coordinating multiple services in event-driven systems.</p>

            <h3>🎭 Choreography (Decentralized)</h3>
            <p><strong>Services react to events independently, no central controller</strong></p>

            <pre><code>Order Service: "Order Placed" event published
    ↓ (listens)
Payment Service: Processes payment → "Payment Processed" event
    ↓ (listens)
Inventory Service: Reserves items → "Items Reserved" event
    ↓ (listens)
Shipping Service: Creates shipment → "Shipment Created" event
    ↓ (listens)
Notification Service: Sends confirmation email</code></pre>

            <p><strong>Code Example:</strong></p>
            <pre><code>// Order Service
placeOrder(orderData) {
    const order = saveOrder(orderData);
    eventBus.publish('order.placed', order);
}

// Payment Service (listening)
eventBus.on('order.placed', (order) => {
    processPayment(order);
    eventBus.publish('payment.processed', { orderId: order.id });
});

// Inventory Service (listening)
eventBus.on('payment.processed', (data) => {
    reserveItems(data.orderId);
    eventBus.publish('items.reserved', data);
});

// Each service knows what to listen for
// No central coordinator!</code></pre>

            <h3>✅ Choreography Benefits</h3>
            <ul>
                <li><strong>Loose coupling:</strong> Services don't know about each other</li>
                <li><strong>Scalable:</strong> Add/remove services easily</li>
                <li><strong>Resilient:</strong> No single point of failure</li>
            </ul>

            <h3>⚠️ Choreography Challenges</h3>
            <ul>
                <li><strong>Hard to visualize:</strong> Workflow spread across services</li>
                <li><strong>Difficult to debug:</strong> No single place to see flow</li>
                <li><strong>Cyclic dependencies:</strong> Can create event loops</li>
            </ul>

            <h3>🎯 Orchestration (Centralized)</h3>
            <p><strong>Central orchestrator controls the workflow</strong></p>

            <pre><code>Order Orchestrator:
1. Call Payment Service → wait for response
2. Call Inventory Service → wait for response
3. Call Shipping Service → wait for response
4. Call Notification Service → done</code></pre>

            <p><strong>Code Example:</strong></p>
            <pre><code>// Order Orchestrator
async placeOrder(orderData) {
    const order = await orderService.create(orderData);

    try {
        // Step 1: Process payment
        const payment = await paymentService.process(order);

        // Step 2: Reserve inventory
        const reservation = await inventoryService.reserve(order);

        // Step 3: Create shipment
        const shipment = await shippingService.create(order);

        // Step 4: Notify customer
        await notificationService.send(order);

        return { success: true, order };
    } catch (error) {
        // Rollback/compensation logic
        await this.handleFailure(order, error);
    }
}</code></pre>

            <h3>✅ Orchestration Benefits</h3>
            <ul>
                <li><strong>Clear workflow:</strong> All logic in one place</li>
                <li><strong>Easy to debug:</strong> Central point to monitor</li>
                <li><strong>Error handling:</strong> Orchestrator manages failures</li>
                <li><strong>Explicit order:</strong> Steps execute in defined sequence</li>
            </ul>

            <h3>⚠️ Orchestration Challenges</h3>
            <ul>
                <li><strong>Tight coupling:</strong> Orchestrator knows all services</li>
                <li><strong>Single point of failure:</strong> If orchestrator fails, everything stops</li>
                <li><strong>Bottleneck:</strong> All requests go through orchestrator</li>
            </ul>

            <h3>📊 When to Use Which?</h3>

            <p><strong>Use Choreography when:</strong></p>
            <ul>
                <li>Simple workflows</li>
                <li>Services are truly independent</li>
                <li>Need maximum scalability</li>
                <li>No complex error handling needed</li>
            </ul>

            <p><strong>Use Orchestration when:</strong></p>
            <ul>
                <li>Complex workflows with many steps</li>
                <li>Need transactional guarantees</li>
                <li>Require visibility into workflow state</li>
                <li>Complex error handling/rollbacks</li>
            </ul>

            <h3>🎯 Key Takeaway</h3>
            <p><strong>Choreography</strong> = Services react to events (decentralized)</p>
            <p><strong>Orchestration</strong> = Central controller manages workflow (centralized)</p>
        `
    },
    '2-6': {
        title: '2.6 Quiz: Pattern Recognition',
        xp: 150,
        content: `
            <h3>🎯 Test Your Understanding</h3>
            <p>Match the pattern to the use case!</p>

            <h3>Question 1: Which pattern stores all state changes as events?</h3>
            <p>A) Pub/Sub<br>
            B) Event Sourcing<br>
            C) CQRS<br>
            D) Choreography</p>
            <p><em>Correct Answer: B - Event Sourcing stores every event that led to current state</em></p>

            <h3>Question 2: You need to optimize reads independently from writes. Which pattern?</h3>
            <p>A) Event Streaming<br>
            B) Pub/Sub<br>
            C) CQRS<br>
            D) Orchestration</p>
            <p><em>Correct Answer: C - CQRS separates read and write models</em></p>

            <h3>Question 3: You want to replay events from 3 days ago. Which pattern?</h3>
            <p>A) Simple Pub/Sub<br>
            B) Event Streaming (Kafka)<br>
            C) Orchestration<br>
            D) None of the above</p>
            <p><em>Correct Answer: B - Event Streaming persists events for replay</em></p>

            <h3>Question 4: Multiple services react independently to "OrderPlaced" event. What pattern?</h3>
            <p>A) Orchestration<br>
            B) Choreography<br>
            C) CQRS<br>
            D) Event Sourcing</p>
            <p><em>Correct Answer: B - Choreography = services react to events independently</em></p>

            <h3>Question 5: Central workflow manager calls services in sequence. What pattern?</h3>
            <p>A) Pub/Sub<br>
            B) Choreography<br>
            C) Orchestration<br>
            D) Event Streaming</p>
            <p><em>Correct Answer: C - Orchestration = central controller manages flow</em></p>

            <h3>Scenario Question 6:</h3>
            <p><strong>Banking app needs:</strong></p>
            <ul>
                <li>Complete audit trail of all transactions</li>
                <li>Ability to reconstruct account state at any point in time</li>
                <li>Regulatory compliance</li>
            </ul>
            <p><strong>Best pattern?</strong><br>
            A) Simple Pub/Sub<br>
            B) Event Sourcing<br>
            C) Orchestration<br>
            D) Choreography</p>
            <p><em>Correct Answer: B - Event Sourcing provides complete history and audit trail</em></p>

            <h3>✅ How Did You Do?</h3>
            <ul>
                <li><strong>6/6:</strong> 🌟 Pattern Master! Ready for Module 3!</li>
                <li><strong>4-5/6:</strong> 👍 Great! Review the missed patterns</li>
                <li><strong>0-3/6:</strong> 📚 Review Module 2 lessons again</li>
            </ul>

            <h3>🎯 Module 2 Complete!</h3>
            <p>You now understand:</p>
            <ul>
                <li>✅ Pub/Sub pattern</li>
                <li>✅ Event Sourcing (store events, not state)</li>
                <li>✅ CQRS (separate reads and writes)</li>
                <li>✅ Event Streaming (Kafka-style)</li>
                <li>✅ Choreography vs Orchestration</li>
            </ul>

            <p><strong>Next:</strong> Module 3 - Build real systems with code!</p>
        `
    }
};

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    loadProgress();
    updateUI();
    checkStreak();
});

// Load progress from localStorage
function loadProgress() {
    const completed = JSON.parse(localStorage.getItem(STORAGE_KEYS.completedLessons) || '[]');

    completed.forEach(lessonId => {
        const card = document.querySelector(`[data-lesson="${lessonId}"]`);
        if (card) {
            card.classList.add('completed');
            const btn = card.querySelector('.btn-start');
            btn.textContent = 'Review';
        }
    });
}

// Update UI stats
function updateUI() {
    const completed = JSON.parse(localStorage.getItem(STORAGE_KEYS.completedLessons) || '[]');
    const xp = parseInt(localStorage.getItem(STORAGE_KEYS.totalXP) || '0');
    const streak = parseInt(localStorage.getItem(STORAGE_KEYS.streak) || '0');

    document.getElementById('lessons-completed').textContent = completed.length;
    document.getElementById('total-xp').textContent = xp;
    document.getElementById('streak-count').textContent = streak;
    updateTopProgressBar();
    updateXPTitle(xp);
    showResumeButton();

    // Update module progress
    updateModuleProgress(1, completed.filter(id => id.startsWith('1-')).length, 5);
    updateModuleProgress(2, completed.filter(id => id.startsWith('2-')).length, 6);
    updateModuleProgress(3, completed.filter(id => id.startsWith('3-')).length, 5);
    updateModuleProgress(4, completed.filter(id => id.startsWith('4-')).length, 4);
}

// Update module progress display
function updateModuleProgress(moduleNum, completed, total) {
    const element = document.getElementById(`module-${moduleNum}-progress`);
    if (element) {
        element.textContent = `${completed}/${total} Complete`;
    }
}

// Check and update streak
function checkStreak() {
    const lastVisit = localStorage.getItem(STORAGE_KEYS.lastVisit);
    const today = new Date().toDateString();

    if (lastVisit) {
        const lastDate = new Date(lastVisit).toDateString();

        if (lastDate !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toDateString();

            if (lastDate === yesterdayStr) {
                // Consecutive day
                const currentStreak = parseInt(localStorage.getItem(STORAGE_KEYS.streak) || '0');
                localStorage.setItem(STORAGE_KEYS.streak, (currentStreak + 1).toString());
            } else if (lastDate < yesterdayStr) {
                // Missed a day - show forgiveness notice if only 1 day ago
                const twoDaysAgo = new Date();
                twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
                if (new Date(lastVisit) > twoDaysAgo) {
                    // Only missed yesterday - pause not reset
                    const notice = document.getElementById('streak-forgiveness-notice');
                    if (notice) notice.style.display = 'block';
                } else {
                    localStorage.setItem(STORAGE_KEYS.streak, '1');
                }
            }
        }
    } else {
        localStorage.setItem(STORAGE_KEYS.streak, '1');
    }

    localStorage.setItem(STORAGE_KEYS.lastVisit, today);
    updateUI();
}

// Start lesson
function startLesson(lessonId) {
    currentLesson = lessonId;
    const lesson = lessons[lessonId];

    if (!lesson) {
        alert('This lesson content is coming soon! Check back later.');
        return;
    }

    // Show modal
    const modal = document.getElementById('lesson-modal');
    document.getElementById('lesson-title').textContent = lesson.title;
    document.getElementById('lesson-content').innerHTML = lesson.content;
    modal.classList.add('active');

    // Check if already completed
    const completed = JSON.parse(localStorage.getItem(STORAGE_KEYS.completedLessons) || '[]');
    const btn = document.getElementById('btn-complete');

    if (completed.includes(lessonId)) {
        btn.textContent = 'Already Completed ✓';
        btn.disabled = true;
    } else {
        btn.textContent = `Mark Complete & Earn ${lesson.xp} XP`;
        btn.disabled = false;
    }
}

// Close lesson
function closeLesson() {
    const modal = document.getElementById('lesson-modal');
    modal.classList.remove('active');
    currentLesson = null;
}

// Complete lesson
function completeLesson() {
    if (!currentLesson) return;

    const lesson = lessons[currentLesson];
    const completed = JSON.parse(localStorage.getItem(STORAGE_KEYS.completedLessons) || '[]');

    // Check if already completed
    if (completed.includes(currentLesson)) {
        closeLesson();
        return;
    }

    // Add to completed
    completed.push(currentLesson);
    localStorage.setItem(STORAGE_KEYS.completedLessons, JSON.stringify(completed));

    // Add XP
    const currentXP = parseInt(localStorage.getItem(STORAGE_KEYS.totalXP) || '0');
    localStorage.setItem(STORAGE_KEYS.totalXP, (currentXP + lesson.xp).toString());

    // Update card
    const card = document.querySelector(`[data-lesson="${currentLesson}"]`);
    if (card) {
        card.classList.add('completed');
        const btn = card.querySelector('.btn-start');
        btn.textContent = 'Review';
    }

    // Update UI
    updateUI();
    updateTopProgressBar();
    updateXPTitle(currentXP + lesson.xp);
    
    // Track last lesson for resume
    localStorage.setItem('eda_last_lesson', currentLesson);
    showResumeButton();

    // Show confetti celebration
    launchConfetti();
    showXPPopup(lesson.xp, currentXP + lesson.xp);

    setTimeout(() => closeLesson(), 2500);
}

// Close modal on background click
document.getElementById('lesson-modal').addEventListener('click', (e) => {
    if (e.target.id === 'lesson-modal') {
        closeLesson();
    }
});

// Expose for debugging
window.edaApp = {
    resetProgress: () => {
        if (confirm('Reset all progress?')) {
            localStorage.removeItem(STORAGE_KEYS.completedLessons);
            localStorage.removeItem(STORAGE_KEYS.totalXP);
            location.reload();
        }
    }
};

// ============================================================
// PHASE 1: UX IMPROVEMENTS
// ============================================================

// Top progress bar
function updateTopProgressBar() {
    const completed = JSON.parse(localStorage.getItem(STORAGE_KEYS.completedLessons) || '[]');
    const total = 20;
    const pct = Math.round((completed.length / total) * 100);
    const bar = document.getElementById('top-progress-bar');
    const label = document.getElementById('top-progress-label');
    if (bar) bar.style.width = pct + '%';
    if (label) label.textContent = pct + '% Complete';
}

// XP Title system
const XP_TITLES = [
    { min: 0,    emoji: '🌱', title: 'Event Newbie' },
    { min: 200,  emoji: '👀', title: 'Event Observer' },
    { min: 500,  emoji: '📢', title: 'Event Publisher' },
    { min: 1000, emoji: '🏗️', title: 'Event Architect' },
    { min: 2000, emoji: '🎓', title: 'EDA Master' }
];

function updateXPTitle(xp) {
    const level = [...XP_TITLES].reverse().find(l => xp >= l.min) || XP_TITLES[0];
    const el = document.getElementById('xp-title');
    const label = document.getElementById('xp-title-label');
    if (el) el.textContent = level.emoji;
    if (label) label.textContent = level.title;
}

// Resume Learning
function showResumeButton() {
    const lastLesson = localStorage.getItem('eda_last_lesson');
    const section = document.getElementById('resume-section');
    const btn = document.getElementById('resume-btn');
    if (lastLesson && section && btn) {
        section.style.display = 'block';
        const lesson = lessons[lastLesson];
        if (lesson) btn.textContent = `▶️ Resume: ${lesson.title.substring(0, 30)}...`;
    }
}

function resumeLearning() {
    const lastLesson = localStorage.getItem('eda_last_lesson');
    if (lastLesson) startLesson(lastLesson);
}

// Next lesson
function goToNextLesson() {
    if (!currentLesson) return;
    const allLessons = ['1-1','1-2','1-3','1-4','1-5','2-1','2-2','2-3','2-4','2-5','2-6','3-1','3-2','3-3','3-4','3-5','4-1','4-2','4-3','4-4'];
    const idx = allLessons.indexOf(currentLesson);
    if (idx >= 0 && idx < allLessons.length - 1) {
        closeLesson();
        setTimeout(() => startLesson(allLessons[idx + 1]), 300);
    }
}

// Show Next Lesson button after lesson opens
const origStartLesson = startLesson;
// Patch: show Next Lesson btn
document.addEventListener('DOMContentLoaded', () => {
    // Show next lesson button logic is handled in startLesson
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('lesson-modal');
        if (e.key === 'Escape' && modal.classList.contains('active')) closeLesson();
        if ((e.key === ' ' || e.key === 'Enter') && !modal.classList.contains('active')) {
            e.preventDefault();
            resumeLearning();
        }
    });
});

// Dark Mode
function toggleDarkMode() {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('eda_dark_mode', isDark ? 'light' : 'dark');
    document.getElementById('dark-mode-toggle').textContent = isDark ? '🌙' : '☀️';
}

// Font Size
function changeFontSize(delta) {
    const current = parseFloat(localStorage.getItem('eda_font_size') || '16');
    const next = Math.max(12, Math.min(22, current + delta));
    document.documentElement.style.fontSize = next + 'px';
    localStorage.setItem('eda_font_size', next);
}

// Focus Mode
function toggleFocusMode() {
    const nav = document.getElementById('module-nav');
    const header = document.getElementById('main-header');
    const btn = document.getElementById('focus-mode-btn');
    const isFocus = nav.classList.toggle('focus-hidden');
    header.classList.toggle('focus-dimmed', isFocus);
    btn.textContent = isFocus ? '👁️' : '🎯';
}

// Share Progress
function shareProgress() {
    const xp = parseInt(localStorage.getItem(STORAGE_KEYS.totalXP) || '0');
    const completed = JSON.parse(localStorage.getItem(STORAGE_KEYS.completedLessons) || '[]');
    const level = [...XP_TITLES].reverse().find(l => xp >= l.min) || XP_TITLES[0];
    const text = `I'm a ${level.title} ${level.emoji} | ${xp} XP | ${completed.length}/20 lessons complete on EDA Learning! 🚀\nhttps://tzachigithub.github.io/eda-learning-site/`;
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
        showToast('Progress copied to clipboard! 📋');
    } else {
        alert(text);
    }
}

// ============================================================
// PHASE 4: GAMIFICATION
// ============================================================

// Confetti
function launchConfetti() {
    const container = document.getElementById('confetti-container');
    if (!container) return;
    const colors = ['#ff6b6b','#ffd93d','#6bcb77','#4d96ff','#c77dff'];
    for (let i = 0; i < 50; i++) {
        const dot = document.createElement('div');
        dot.className = 'confetti-dot';
        dot.style.cssText = `
            position:fixed;
            width:${6+Math.random()*8}px;
            height:${6+Math.random()*8}px;
            border-radius:50%;
            background:${colors[Math.floor(Math.random()*colors.length)]};
            left:${Math.random()*100}vw;
            top:-10px;
            pointer-events:none;
            z-index:9999;
            animation: confettiFall ${1+Math.random()*2}s ease-in forwards;
            animation-delay:${Math.random()*0.5}s;
        `;
        container.appendChild(dot);
    }
    setTimeout(() => { container.innerHTML = ''; }, 3500);
}

// XP Popup
function showXPPopup(earned, total) {
    const popup = document.createElement('div');
    popup.style.cssText = `
        position:fixed; top:50%; left:50%; transform:translate(-50%,-50%);
        background:#1a1a2e; color:#ffd93d; padding:24px 40px;
        border-radius:16px; font-size:24px; font-weight:bold;
        z-index:10000; text-align:center; box-shadow:0 8px 32px rgba(0,0,0,0.4);
        animation: popIn 0.3s ease;
    `;
    popup.innerHTML = `🎉 Lesson Complete!<br><span style="font-size:36px">+${earned} XP</span><br><small style="font-size:14px;opacity:0.8">Total: ${total} XP</small>`;
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 2400);
}

// Toast notification
function showToast(msg) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position:fixed; bottom:24px; left:50%; transform:translateX(-50%);
        background:#333; color:#fff; padding:12px 24px; border-radius:8px;
        z-index:10000; font-size:14px; animation: popIn 0.3s ease;
    `;
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
}

// Daily Challenge
const DAILY_CHALLENGES = [
    { q: "What does EDA stand for?", a: "Event-Driven Architecture", hint: "Think: what kind of 'architecture' reacts to things happening?" },
    { q: "In EDA, what is a 'Publisher'?", a: "A component that emits/announces events", hint: "Think: who rings the doorbell?" },
    { q: "What pattern stores every state change as an event?", a: "Event Sourcing", hint: "Think: your bank stores every transaction, not just the balance" },
    { q: "What does CQRS stand for?", a: "Command Query Responsibility Segregation", hint: "It separates reading from writing" },
    { q: "In Pub/Sub, what does a Subscriber do?", a: "Listens for and reacts to events", hint: "Think: YouTube notification bell" },
    { q: "What's the difference between Choreography and Orchestration?", a: "Choreography = services react independently; Orchestration = central controller directs flow", hint: "Flash mob vs conductor" },
    { q: "Why are events named in past tense? (e.g. user.registered)", a: "Because events describe something that already happened", hint: "Events are facts, not commands" },
];

function openDailyChallenge() {
    const today = new Date().toDateString();
    const lastChallenge = localStorage.getItem('eda_last_challenge');
    if (lastChallenge === today) {
        showToast('You already did today\'s challenge! Come back tomorrow 🌟');
        return;
    }
    const idx = Math.floor(Date.now() / 86400000) % DAILY_CHALLENGES.length;
    const challenge = DAILY_CHALLENGES[idx];
    const modal = document.getElementById('challenge-modal');
    document.getElementById('challenge-content').innerHTML = `
        <div style="padding:16px">
            <p style="font-size:18px;font-weight:bold;margin-bottom:16px">❓ ${challenge.q}</p>
            <div id="challenge-hint" style="display:none;background:#fff3cd;padding:12px;border-radius:8px;margin-bottom:12px">
                💡 Hint: ${challenge.hint}
            </div>
            <textarea id="challenge-answer" placeholder="Type your answer..." style="width:100%;min-height:80px;padding:12px;border-radius:8px;border:1px solid #ddd;font-size:14px;box-sizing:border-box"></textarea>
            <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">
                <button onclick="document.getElementById('challenge-hint').style.display='block'" 
                    style="padding:8px 16px;background:#f0f0f0;border:none;border-radius:6px;cursor:pointer">💡 Show Hint</button>
                <button onclick="revealChallengeAnswer('${challenge.a.replace(/'/g, "\\'")}')"
                    style="padding:8px 16px;background:#4d96ff;color:white;border:none;border-radius:6px;cursor:pointer">✅ Reveal Answer (+25 XP)</button>
            </div>
        </div>
    `;
    modal.classList.add('active');
}

function revealChallengeAnswer(answer) {
    const content = document.getElementById('challenge-content');
    const today = new Date().toDateString();
    localStorage.setItem('eda_last_challenge', today);
    const xp = parseInt(localStorage.getItem(STORAGE_KEYS.totalXP) || '0') + 25;
    localStorage.setItem(STORAGE_KEYS.totalXP, xp);
    updateUI();
    content.innerHTML = `
        <div style="padding:16px;text-align:center">
            <div style="font-size:48px">✅</div>
            <p style="font-size:16px;font-weight:bold;margin:12px 0">Answer:</p>
            <p style="background:#e8f5e9;padding:12px;border-radius:8px">${answer}</p>
            <p style="color:#4caf50;font-weight:bold;margin-top:12px">+25 XP earned! Come back tomorrow for another challenge 🌟</p>
        </div>
    `;
}

function closeDailyChallenge() {
    document.getElementById('challenge-modal').classList.remove('active');
}

// ============================================================
// PHASE 5: FLASHCARDS
// ============================================================

const FLASHCARDS = [
    { term: 'Event', def: 'A record of something that happened (immutable, past tense). E.g. "user.registered", "payment.processed"' },
    { term: 'Publisher (Producer)', def: 'A component that detects significant occurrences and emits events. It does not know who is listening.' },
    { term: 'Subscriber (Consumer)', def: 'A component that listens for specific event types and reacts when they occur. Independent of the publisher.' },
    { term: 'Event Broker / Bus', def: 'Middleware that receives events from publishers and routes them to subscribers. E.g. Kafka, RabbitMQ.' },
    { term: 'Pub/Sub Pattern', def: 'Publishers send events to topics; subscribers receive events from topics. Publishers and subscribers are decoupled.' },
    { term: 'Event Sourcing', def: 'Store every state change as an event. Reconstruct state by replaying events. Provides complete audit trail.' },
    { term: 'CQRS', def: 'Command Query Responsibility Segregation — separate read (query) model from write (command) model for independent optimization.' },
    { term: 'Event Streaming', def: 'Events stored in persistent, replayable logs (e.g. Kafka). Unlike Pub/Sub, events are retained and can be replayed.' },
    { term: 'Choreography', def: 'Services react to events independently — no central controller. Like a flash mob where everyone knows their part.' },
    { term: 'Orchestration', def: 'A central controller directs the workflow, calling services in sequence. Like a conductor leading an orchestra.' },
    { term: 'Dead Letter Queue (DLQ)', def: 'A queue where failed/unprocessable events are sent for later inspection. Prevents data loss on processing errors.' },
    { term: 'Idempotency', def: 'Processing the same event multiple times produces the same result as processing it once. Essential for reliable event handling.' },
];

let currentCardIndex = 0;
let isFlipped = false;

function openFlashcardReview() {
    currentCardIndex = 0;
    isFlipped = false;
    document.getElementById('flashcard-modal').classList.add('active');
    renderCard();
}

function closeFlashcards() {
    document.getElementById('flashcard-modal').classList.remove('active');
}

function renderCard() {
    const card = FLASHCARDS[currentCardIndex];
    document.getElementById('flashcard-front').textContent = card.term;
    document.getElementById('flashcard-back').textContent = card.def;
    document.getElementById('flashcard-progress').textContent = `Card ${currentCardIndex + 1} of ${FLASHCARDS.length}`;
    const fc = document.getElementById('flashcard');
    fc.classList.remove('flipped');
    isFlipped = false;
}

function flipCard() {
    const fc = document.getElementById('flashcard');
    isFlipped = !isFlipped;
    fc.classList.toggle('flipped', isFlipped);
}

function nextCard() {
    if (currentCardIndex < FLASHCARDS.length - 1) {
        currentCardIndex++;
        renderCard();
    }
}

function prevCard() {
    if (currentCardIndex > 0) {
        currentCardIndex--;
        renderCard();
    }
}

// ============================================================
// PHASE 1: POMODORO TIMER
// ============================================================

let pomodoroInterval = null;
let pomodoroSeconds = 15 * 60;
let pomodoroRunning = false;

function togglePomodoro() {
    const panel = document.getElementById('pomodoro-panel');
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
}

function startPomodoro() {
    if (pomodoroRunning) return;
    pomodoroRunning = true;
    pomodoroInterval = setInterval(() => {
        pomodoroSeconds--;
        updatePomodoroDisplay();
        if (pomodoroSeconds <= 0) {
            clearInterval(pomodoroInterval);
            pomodoroRunning = false;
            showToast('🍅 Pomodoro complete! Take a 5 min break 🎉');
            pomodoroSeconds = 15 * 60;
            updatePomodoroDisplay();
        }
    }, 1000);
}

function pausePomodoro() {
    clearInterval(pomodoroInterval);
    pomodoroRunning = false;
}

function resetPomodoro() {
    clearInterval(pomodoroInterval);
    pomodoroRunning = false;
    pomodoroSeconds = 15 * 60;
    updatePomodoroDisplay();
}

function updatePomodoroDisplay() {
    const m = Math.floor(pomodoroSeconds / 60).toString().padStart(2, '0');
    const s = (pomodoroSeconds % 60).toString().padStart(2, '0');
    const el = document.getElementById('pomodoro-display');
    if (el) el.textContent = `${m}:${s}`;
}

// ============================================================
// INIT: Apply saved preferences on load
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    // Apply dark mode
    const theme = localStorage.getItem('eda_dark_mode');
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        const btn = document.getElementById('dark-mode-toggle');
        if (btn) btn.textContent = '☀️';
    }
    // Apply font size
    const fontSize = localStorage.getItem('eda_font_size');
    if (fontSize) document.documentElement.style.fontSize = fontSize + 'px';

    // Update full UI
    updateTopProgressBar();
    const xp = parseInt(localStorage.getItem(STORAGE_KEYS.totalXP) || '0');
    updateXPTitle(xp);
    showResumeButton();
});

// Inline quiz handler
function checkQuiz(btn, result, feedback) {
    const parent = btn.closest('.inline-quiz');
    const buttons = parent.querySelectorAll('.quiz-option');
    const feedbackEl = parent.querySelector('.quiz-feedback');
    buttons.forEach(b => b.disabled = true);
    btn.classList.add(result);
    if (feedbackEl) {
        feedbackEl.textContent = feedback;
        feedbackEl.className = `quiz-feedback ${result}`;
    }
}
