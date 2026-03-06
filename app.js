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
<div class="lesson-recap">🔄 <strong>Last lesson:</strong> You learned that EDA means reacting to events instead of constantly checking — like a doorbell vs. opening the door every 30 seconds.</div>
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
<div class="lesson-recap">🔄 <strong>Last lesson:</strong> You saw how event-driven systems decouple services — registerUser() just publishes an event, and each service reacts independently. Result: 200ms response instead of 2-5 seconds.</div>
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

            
            <div class="eda-diagram">
                <h4>📊 The Event Flow (Interactive)</h4>
                <div class="flow-simulator">
                    <div class="flow-node publisher-node">
                        <div class="node-icon">📢</div>
                        <div class="node-label">Publisher</div>
                        <div class="node-sub">User Service</div>
                    </div>
                    <div class="flow-arrow" id="arrow-1">
                        <div class="arrow-line"></div>
                        <div class="arrow-event" id="event-dot">📨</div>
                        <div class="arrow-label">user.registered</div>
                    </div>
                    <div class="flow-node broker-node">
                        <div class="node-icon">🔀</div>
                        <div class="node-label">Event Broker</div>
                        <div class="node-sub">Event Bus</div>
                    </div>
                    <div class="flow-arrows-split">
                        <div class="split-arrow">
                            <div class="flow-node subscriber-node">
                                <div class="node-icon">📧</div>
                                <div class="node-label">Subscriber 1</div>
                                <div class="node-sub">Email Service</div>
                            </div>
                        </div>
                        <div class="split-arrow">
                            <div class="flow-node subscriber-node">
                                <div class="node-icon">📊</div>
                                <div class="node-label">Subscriber 2</div>
                                <div class="node-sub">Analytics</div>
                            </div>
                        </div>
                        <div class="split-arrow">
                            <div class="flow-node subscriber-node">
                                <div class="node-icon">👤</div>
                                <div class="node-label">Subscriber 3</div>
                                <div class="node-sub">Profile Service</div>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="btn-simulate" onclick="runSimulation()">▶ Publish Event!</button>
                <div class="simulation-log" id="sim-log"></div>
            </div>

            <div class="drag-drop-quiz">
                <h4>🎯 Match the Concept</h4>
                <p style="font-size:13px;margin-bottom:12px">Drag each term to its correct definition:</p>
                <div class="dd-container">
                    <div class="dd-terms">
                        <div class="dd-term" draggable="true" data-term="Publisher" ondragstart="dragStart(event)">📢 Publisher</div>
                        <div class="dd-term" draggable="true" data-term="Subscriber" ondragstart="dragStart(event)">👂 Subscriber</div>
                        <div class="dd-term" draggable="true" data-term="Event" ondragstart="dragStart(event)">📨 Event</div>
                        <div class="dd-term" draggable="true" data-term="Broker" ondragstart="dragStart(event)">🔀 Broker</div>
                    </div>
                    <div class="dd-definitions">
                        <div class="dd-def" data-answer="Event" ondragover="dragOver(event)" ondrop="dropTerm(event)">
                            <div class="dd-placeholder">Drop here</div>
                            <div class="dd-text">A record of something that happened (immutable, past tense)</div>
                        </div>
                        <div class="dd-def" data-answer="Publisher" ondragover="dragOver(event)" ondrop="dropTerm(event)">
                            <div class="dd-placeholder">Drop here</div>
                            <div class="dd-text">Announces/emits events when something happens</div>
                        </div>
                        <div class="dd-def" data-answer="Subscriber" ondragover="dragOver(event)" ondrop="dropTerm(event)">
                            <div class="dd-placeholder">Drop here</div>
                            <div class="dd-text">Listens for specific events and reacts to them</div>
                        </div>
                        <div class="dd-def" data-answer="Broker" ondragover="dragOver(event)" ondrop="dropTerm(event)">
                            <div class="dd-placeholder">Drop here</div>
                            <div class="dd-text">Middleware that routes events from publishers to subscribers</div>
                        </div>
                    </div>
                </div>
                <div id="dd-result" style="margin-top:10px;font-weight:bold;"></div>
            </div>
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
<div class="lesson-recap">🔄 <strong>Last lesson:</strong> You met the three building blocks — Events (records of what happened), Publishers (announce events), Subscribers (react to events). They never need to know about each other.</div>
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
<div class="lesson-recap">🔄 <strong>Last lesson:</strong> You built a real notification system with Node.js EventEmitter — the same pattern Discord uses for message broadcasting.</div>
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
<div class="lesson-recap">🔄 <strong>Module 1 complete!</strong> You know what EDA is, how it differs from traditional architecture, the three core components, and built your first event system. Now let's learn the patterns.</div>
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
            <div class="who-uses"><h4>🏢 Who uses Pub/Sub?</h4><div class="company-list"><span class="company">YouTube</span><span class="company">Slack</span><span class="company">Google Cloud</span><span class="company">AWS SNS</span><span class="company">Redis</span></div><p class="company-note">YouTube uses Pub/Sub to instantly notify millions of subscribers when a creator uploads.</p></div>
        `
    },
    '2-2': {
        title: '2.2 Event Sourcing',
        xp: 100,
        content: `
<div class="lesson-recap">🔄 <strong>Last lesson:</strong> Pub/Sub — Publishers send to topics, Subscribers receive from topics. YouTube uses this to notify 50M subscribers instantly. Publishers and subscribers never know each other.</div>
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
            <div class="callout-warning"><strong>Warning:</strong> Event Sourcing adds significant complexity. Don't use it for simple CRUD apps — the overhead of maintaining an event store, handling schema evolution, and managing snapshots is only worth it when you genuinely need a full audit trail or time-travel debugging.</div>
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
            <div class="who-uses"><h4>🏢 Who uses Event Sourcing?</h4><div class="company-list"><span class="company">Every Bank</span><span class="company">Netflix</span><span class="company">GitHub</span><span class="company">LinkedIn</span></div><p class="company-note">Banks store every transaction as an event — that's why they can show your complete history and reconstruct any balance at any point in time.</p></div>
        `
    },
    '2-3': {
        title: '2.3 CQRS (Command Query Responsibility Segregation)',
        xp: 125,
        content: `
<div class="lesson-recap">🔄 <strong>Last lesson:</strong> Event Sourcing — store every change as an event, reconstruct state by replaying them. Banks use this for complete transaction history and audit trails.</div>
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
            <div class="who-uses"><h4>🏢 Who uses CQRS?</h4><div class="company-list"><span class="company">Amazon</span><span class="company">Microsoft</span><span class="company">Zalando</span><span class="company">Stack Overflow</span></div><p class="company-note">Amazon separates the system that processes orders from the system that displays product pages — each optimized for its job.</p></div>
        `
    },
    '2-4': {
        title: '2.4 Event Streaming',
        xp: 100,
        content: `
<div class="lesson-recap">🔄 <strong>Last lesson:</strong> CQRS — separate your read model from your write model. Amazon loads product pages in &lt;200ms because reads and writes are completely independent systems.</div>
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
            <div class="who-uses"><h4>🏢 Who uses Event Streaming (Kafka)?</h4><div class="company-list"><span class="company">Netflix</span><span class="company">Uber</span><span class="company">Spotify</span><span class="company">LinkedIn</span><span class="company">Twitter</span></div><p class="company-note">LinkedIn created Kafka. Spotify processes 600,000 events/second with it. Netflix uses it for real-time recommendations.</p></div>
        `
    },
    '2-5': {
        title: '2.5 Choreography vs Orchestration',
        xp: 100,
        content: `
<div class="lesson-recap">🔄 <strong>Last lesson:</strong> Event Streaming (Kafka) — events stored in persistent, replayable logs. Spotify processes 600K events/second this way. Unlike Pub/Sub, you can replay old events anytime.</div>
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
            <div class="who-uses"><h4>🏢 Real examples</h4><div class="company-list"><span class="company">Airbnb (Choreography)</span><span class="company">Netflix (Orchestration)</span><span class="company">Uber (Both)</span></div><p class="company-note">Airbnb uses choreography for booking flows. Netflix uses orchestration for its complex streaming pipeline coordination.</p></div>
        `
    },
    '2-6': {
        title: '2.6 Quiz: Pattern Recognition',
        xp: 150,
        content: `
<div class="lesson-recap">🔄 <strong>Last lesson:</strong> Choreography vs Orchestration — services react independently (flash mob) vs. a central controller directs flow (conductor). Both have their place.</div>
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

// Module Review gate content
const MODULE_REVIEWS = {
    '2': {
        gate: ['1-1','1-2','1-3','1-4','1-5'],
        title: '📚 Module 1 Review — Before You Continue',
        content: `<p>Great work finishing Module 1! Quick recap before Module 2:</p>
            <ul>
                <li>✅ <strong>EDA</strong> = react to events, don't poll constantly</li>
                <li>✅ <strong>Traditional vs EDA</strong>: tightly coupled vs loosely coupled services</li>
                <li>✅ <strong>3 Components</strong>: Publisher → Broker → Subscriber</li>
                <li>✅ <strong>Events</strong> are immutable records in past tense (user.registered)</li>
            </ul>
            <p>Ready for the patterns? Let's go! 🚀</p>`
    }
};

// Start lesson
function startLesson(lessonId) {
    currentLesson = lessonId;
    const lesson = lessons[lessonId];

    if (!lesson) {
        alert('This lesson content is coming soon! Check back later.');
        return;
    }

    // Module Review gate: show review when starting module 2 for the first time
    const moduleNum = lessonId.split('-')[0];
    const review = MODULE_REVIEWS[moduleNum];
    if (review) {
        const completed = JSON.parse(localStorage.getItem(STORAGE_KEYS.completedLessons) || '[]');
        const gateKey = `eda_module_review_${moduleNum}_shown`;
        const allPrevDone = review.gate.every(id => completed.includes(id));
        const alreadyShown = localStorage.getItem(gateKey);
        if (allPrevDone && !alreadyShown) {
            localStorage.setItem(gateKey, '1');
            showModuleReview(review, lessonId);
            return;
        }
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

// ============================================================
// EVENT FLOW SIMULATOR
// ============================================================
function runSimulation() {
    const log = document.getElementById('sim-log');
    if (!log) return;
    log.innerHTML = '';
    const steps = [
        { delay: 0,    text: '📢 Publisher: User registered! Publishing event...', color: '#4d96ff' },
        { delay: 600,  text: '📨 Event "user.registered" sent to broker', color: '#ffd93d' },
        { delay: 1200, text: '🔀 Broker routing event to 3 subscribers...', color: '#c77dff' },
        { delay: 1800, text: '📧 Subscriber 1 (Email Service): Sending welcome email...', color: '#6bcb77' },
        { delay: 2100, text: '📊 Subscriber 2 (Analytics): Tracking registration event...', color: '#6bcb77' },
        { delay: 2400, text: '👤 Subscriber 3 (Profile Service): Creating user profile...', color: '#6bcb77' },
        { delay: 3000, text: '✅ All done! Publisher never waited for any of this.', color: '#ff6b6b' },
    ];
    steps.forEach(({ delay, text, color }) => {
        setTimeout(() => {
            const line = document.createElement('div');
            line.style.cssText = `color:${color};padding:4px 0;font-size:13px;animation:fadeIn 0.3s ease`;
            line.textContent = text;
            log.appendChild(line);
            log.scrollTop = log.scrollHeight;
        }, delay);
    });
}

// ============================================================
// DRAG AND DROP QUIZ
// ============================================================
let draggingTerm = null;

function dragStart(e) {
    draggingTerm = e.target.dataset.term;
    e.target.style.opacity = '0.5';
    e.dataTransfer.effectAllowed = 'move';
}

function dragOver(e) {
    e.preventDefault();
    e.currentTarget.style.background = '#e8f0ff';
}

function dropTerm(e) {
    e.preventDefault();
    const def = e.currentTarget;
    def.style.background = '';
    const placeholder = def.querySelector('.dd-placeholder');
    const correct = def.dataset.answer;
    if (draggingTerm === correct) {
        placeholder.textContent = draggingTerm;
        placeholder.style.cssText = 'background:#e8f5e9;color:#2e7d32;border-color:#4caf50;font-weight:bold';
        // Hide the dragged term
        document.querySelectorAll('.dd-term').forEach(t => {
            if (t.dataset.term === draggingTerm) t.style.visibility = 'hidden';
        });
    } else {
        placeholder.textContent = '❌ Try again';
        placeholder.style.background = '#ffebee';
        setTimeout(() => {
            placeholder.textContent = 'Drop here';
            placeholder.style.background = '';
        }, 1000);
    }
    // Check if all matched
    const allDefs = document.querySelectorAll('.dd-def');
    const allDone = [...allDefs].every(d => d.querySelector('.dd-placeholder').textContent !== 'Drop here' && !d.querySelector('.dd-placeholder').textContent.includes('❌'));
    if (allDone) {
        const result = document.getElementById('dd-result');
        if (result) {
            result.textContent = '🎉 Perfect match! You know your EDA components!';
            result.style.color = '#4caf50';
        }
    }
    draggingTerm = null;
    document.querySelectorAll('.dd-term').forEach(t => t.style.opacity = '1');
}

// Module Review modal
function showModuleReview(review, nextLessonId) {
    const modal = document.getElementById('lesson-modal');
    document.getElementById('lesson-title').textContent = review.title;
    document.getElementById('lesson-content').innerHTML = review.content;
    document.getElementById('btn-complete').style.display = 'none';
    const nextBtn = document.getElementById('btn-next-lesson');
    nextBtn.style.display = 'inline-block';
    nextBtn.textContent = 'Continue to Lesson →';
    nextBtn.onclick = () => {
        closeLesson();
        document.getElementById('btn-complete').style.display = '';
        nextBtn.onclick = goToNextLesson;
        setTimeout(() => startLesson(nextLessonId), 300);
    };
    modal.classList.add('active');
}

// ============================================================
// SUBJECT SWITCHER
// ============================================================

let currentSubject = localStorage.getItem('eda_subject') || 'eda';

const SUBJECT_CONFIG = {
    eda: {
        title: '🎯 Event-Driven Architecture',
        subtitle: 'Master EDA with ADHD-Friendly Bite-Sized Lessons',
        storagePrefix: 'eda_',
        lessons: () => lessons,
        flashcards: () => FLASHCARDS,
        totalLessons: 20,
        moduleMap: { 1: 5, 2: 6, 3: 5, 4: 4 },
        modulePrefix: ''
    },
    redis: {
        title: '🔴 Redis',
        subtitle: 'Master Redis with ADHD-Friendly Bite-Sized Lessons',
        storagePrefix: 'redis_',
        lessons: () => redisLessons,
        flashcards: () => redisFlashcards,
        totalLessons: 20,
        moduleMap: { 1: 5, 2: 6, 3: 5, 4: 4 },
        modulePrefix: 'redis-'
    }
};

const SUBJECT_STORAGE = {
    eda: {
        completedLessons: 'eda_completed_lessons',
        totalXP: 'eda_total_xp',
        streak: 'eda_streak',
        lastVisit: 'eda_last_visit',
        lastLesson: 'eda_last_lesson'
    },
    redis: {
        completedLessons: 'redis_completed_lessons',
        totalXP: 'redis_total_xp',
        streak: 'redis_streak',
        lastVisit: 'redis_last_visit',
        lastLesson: 'redis_last_lesson'
    }
};

function switchSubject(subject) {
    currentSubject = subject;
    localStorage.setItem('eda_subject', subject);

    // Update tabs
    document.querySelectorAll('.subject-tab').forEach(t => t.classList.remove('active'));
    document.getElementById('tab-' + subject)?.classList.add('active');

    // Show/hide content
    ['eda','redis','docker','graphql','rq'].forEach(s => {
        const el = document.getElementById(s + '-content');
        if (el) el.style.display = s === subject ? '' : 'none';
    });

    // Update title
    const config = SUBJECT_CONFIG[subject];
    const titleEl = document.getElementById('site-title');
    const subtitleEl = document.getElementById('site-subtitle');
    if (titleEl) titleEl.textContent = config.title;
    if (subtitleEl) subtitleEl.textContent = config.subtitle;

    // Update STORAGE_KEYS to point to current subject
    const store = SUBJECT_STORAGE[subject];
    STORAGE_KEYS.completedLessons = store.completedLessons;
    STORAGE_KEYS.totalXP = store.totalXP;
    STORAGE_KEYS.streak = store.streak;
    STORAGE_KEYS.lastVisit = store.lastVisit;

    // Reload progress for this subject
    loadProgressForSubject(subject);
    updateUI();
    updateTopProgressBar();
    const xp = parseInt(localStorage.getItem(STORAGE_KEYS.totalXP) || '0');
    updateXPTitle(xp);
    showResumeButtonForSubject(subject);

    // Scroll to top
    window.scrollTo(0, 0);
}

function loadProgressForSubject(subject) {
    const config = SUBJECT_CONFIG[subject];
    const store = SUBJECT_STORAGE[subject];
    const completed = JSON.parse(localStorage.getItem(store.completedLessons) || '[]');

    // Reset all cards first
    document.querySelectorAll('.lesson-card').forEach(card => {
        const btn = card.querySelector('.btn-start');
        if (btn) btn.textContent = btn.textContent.includes('Quiz') || btn.textContent.includes('Assessment') || btn.textContent.includes('Project') ? btn.getAttribute('data-original') || btn.textContent : 'Start Lesson';
        card.classList.remove('completed');
    });

    // Mark completed
    completed.forEach(lessonId => {
        const card = document.querySelector(`[data-lesson="${lessonId}"]`);
        if (card) {
            card.classList.add('completed');
            const btn = card.querySelector('.btn-start');
            if (btn) btn.textContent = 'Review';
        }
    });
}

function showResumeButtonForSubject(subject) {
    const lastLesson = localStorage.getItem(SUBJECT_STORAGE[subject].lastLesson);
    const section = document.getElementById('resume-section');
    const btn = document.getElementById('resume-btn');
    if (lastLesson && section && btn) {
        const allLessons = SUBJECT_CONFIG[subject].lessons();
        const lesson = allLessons[lastLesson];
        if (lesson) {
            section.style.display = 'block';
            btn.textContent = `▶️ Resume: ${lesson.title.substring(0, 30)}...`;
            btn.onclick = () => startLesson(lastLesson);
        }
    }
}

// Patch startLesson to save to subject-specific storage
const _origStartLesson = startLesson;
// Override completeLesson to save to subject-specific storage
const _origCompleteLesson = completeLesson;
window._completeSubjectLesson = function() {
    const subject = currentSubject;
    const store = SUBJECT_STORAGE[subject];
    const lesson = SUBJECT_CONFIG[subject].lessons()[currentLesson];
    if (!lesson || !currentLesson) return;
    
    const completed = JSON.parse(localStorage.getItem(store.completedLessons) || '[]');
    if (completed.includes(currentLesson)) { closeLesson(); return; }
    
    completed.push(currentLesson);
    localStorage.setItem(store.completedLessons, JSON.stringify(completed));
    
    const currentXP = parseInt(localStorage.getItem(store.totalXP) || '0');
    localStorage.setItem(store.totalXP, (currentXP + lesson.xp).toString());
    localStorage.setItem(store.lastLesson, currentLesson);
    
    STORAGE_KEYS.completedLessons = store.completedLessons;
    STORAGE_KEYS.totalXP = store.totalXP;
    
    const card = document.querySelector(`[data-lesson="${currentLesson}"]`);
    if (card) {
        card.classList.add('completed');
        const btn = card.querySelector('.btn-start');
        if (btn) btn.textContent = 'Review';
    }
    
    updateUI();
    updateTopProgressBar();
    updateXPTitle(currentXP + lesson.xp);
    showResumeButtonForSubject(subject);
    launchConfetti();
    showXPPopup(lesson.xp, currentXP + lesson.xp);
    setTimeout(() => closeLesson(), 2500);
};

// Patch startLesson to use current subject's lessons
const __origStart = startLesson;
startLesson = function(lessonId) {
    currentLesson = lessonId;
    const allLessons = SUBJECT_CONFIG[currentSubject].lessons();
    const lesson = allLessons[lessonId];
    if (!lesson) { alert('Lesson coming soon!'); return; }
    
    const store = SUBJECT_STORAGE[currentSubject];
    const completed = JSON.parse(localStorage.getItem(store.completedLessons) || '[]');
    
    document.getElementById('lesson-title').textContent = lesson.title;
    document.getElementById('lesson-content').innerHTML = lesson.content;
    
    const btn = document.getElementById('btn-complete');
    if (completed.includes(lessonId)) {
        btn.textContent = 'Already Completed ✓';
        btn.disabled = true;
    } else {
        btn.textContent = `Mark Complete & Earn ${lesson.xp} XP`;
        btn.disabled = false;
        btn.onclick = window._completeSubjectLesson;
    }
    
    document.getElementById('lesson-modal').classList.add('active');
    localStorage.setItem(store.lastLesson, lessonId);
};

// Update updateUI to work per subject
const _origUpdateUI = updateUI;
updateUI = function() {
    const store = SUBJECT_STORAGE[currentSubject] || STORAGE_KEYS;
    const completed = JSON.parse(localStorage.getItem(store.completedLessons || STORAGE_KEYS.completedLessons) || '[]');
    const xp = parseInt(localStorage.getItem(store.totalXP || STORAGE_KEYS.totalXP) || '0');
    const streak = parseInt(localStorage.getItem(store.streak || STORAGE_KEYS.streak) || '0');

    document.getElementById('lessons-completed').textContent = completed.length;
    document.getElementById('total-xp').textContent = xp;
    document.getElementById('streak-count').textContent = streak;

    if (currentSubject === 'eda') {
        updateModuleProgress(1, completed.filter(id => id.startsWith('1-')).length, 5);
        updateModuleProgress(2, completed.filter(id => id.startsWith('2-')).length, 6);
        updateModuleProgress(3, completed.filter(id => id.startsWith('3-')).length, 5);
        updateModuleProgress(4, completed.filter(id => id.startsWith('4-')).length, 4);
    } else {
        updateModuleProgress('redis-module-1', completed.filter(id => id.startsWith('r1-')).length, 5);
        updateModuleProgress('redis-module-2', completed.filter(id => id.startsWith('r2-')).length, 6);
        updateModuleProgress('redis-module-3', completed.filter(id => id.startsWith('r3-')).length, 5);
        updateModuleProgress('redis-module-4', completed.filter(id => id.startsWith('r4-')).length, 4);
    }
    updateTopProgressBar();
    updateXPTitle(xp);
};

// Update top progress bar to use current subject
const _origBar = updateTopProgressBar;
updateTopProgressBar = function() {
    const store = SUBJECT_STORAGE[currentSubject];
    if (!store) return;
    const completed = JSON.parse(localStorage.getItem(store.completedLessons) || '[]');
    const total = SUBJECT_CONFIG[currentSubject].totalLessons;
    const pct = Math.round((completed.length / total) * 100);
    const bar = document.getElementById('top-progress-bar');
    const label = document.getElementById('top-progress-label');
    if (bar) bar.style.width = pct + '%';
    if (label) label.textContent = pct + '% Complete';
};

// Update flashcard open to use current subject's flashcards
const _origFlashcard = openFlashcardReview;
openFlashcardReview = function() {
    const cards = SUBJECT_CONFIG[currentSubject].flashcards();
    FLASHCARDS.length = 0;
    cards.forEach(c => FLASHCARDS.push(c));
    currentCardIndex = 0;
    isFlipped = false;
    document.getElementById('flashcard-modal').classList.add('active');
    renderCard();
};

// Update module progress for redis
const _origModuleProgress = updateModuleProgress;
updateModuleProgress = function(moduleNum, completed, total) {
    let elementId;
    if (typeof moduleNum === 'string' && moduleNum.startsWith('redis-')) {
        elementId = `${moduleNum}-progress`;
    } else {
        elementId = `module-${moduleNum}-progress`;
    }
    const element = document.getElementById(elementId);
    if (element) element.textContent = `${completed}/${total} Complete`;
};

// Init on load
document.addEventListener('DOMContentLoaded', () => {
    // Apply saved subject
    const saved = localStorage.getItem('eda_subject') || 'eda';
    if (saved !== 'eda') {
        switchSubject(saved);
    } else {
        STORAGE_KEYS.completedLessons = SUBJECT_STORAGE.eda.completedLessons;
        STORAGE_KEYS.totalXP = SUBJECT_STORAGE.eda.totalXP;
    }
});

// ============================================================
// EXTEND SUBJECT CONFIG for Docker, GraphQL, React Query
// ============================================================
Object.assign(SUBJECT_CONFIG, {
    docker: {
        title: '🐳 Docker',
        subtitle: 'Master Docker with ADHD-Friendly Bite-Sized Lessons',
        storagePrefix: 'docker_',
        lessons: () => dockerLessons,
        flashcards: () => dockerFlashcards,
        totalLessons: 13,
        modulePrefix: 'docker-'
    },
    graphql: {
        title: '🔮 GraphQL',
        subtitle: 'Master GraphQL with ADHD-Friendly Bite-Sized Lessons',
        storagePrefix: 'graphql_',
        lessons: () => graphqlLessons,
        flashcards: () => graphqlFlashcards,
        totalLessons: 11,
        modulePrefix: 'graphql-'
    },
    rq: {
        title: '⚡ React Query',
        subtitle: 'Master React Query (TanStack) with ADHD-Friendly Bite-Sized Lessons',
        storagePrefix: 'rq_',
        lessons: () => rqLessons,
        flashcards: () => rqFlashcards,
        totalLessons: 10,
        modulePrefix: 'rq-'
    }
});

Object.assign(SUBJECT_STORAGE, {
    docker: { completedLessons: 'docker_completed_lessons', totalXP: 'docker_total_xp', streak: 'docker_streak', lastVisit: 'docker_last_visit', lastLesson: 'docker_last_lesson' },
    graphql: { completedLessons: 'graphql_completed_lessons', totalXP: 'graphql_total_xp', streak: 'graphql_streak', lastVisit: 'graphql_last_visit', lastLesson: 'graphql_last_lesson' },
    rq: { completedLessons: 'rq_completed_lessons', totalXP: 'rq_total_xp', streak: 'rq_streak', lastVisit: 'rq_last_visit', lastLesson: 'rq_last_lesson' }
});

// Patch switchSubject to handle all content panels
const _origSwitch = switchSubject;
switchSubject = function(subject) {
    currentSubject = subject;
    localStorage.setItem('eda_subject', subject);

    document.querySelectorAll('.subject-tab').forEach(t => t.classList.remove('active'));
    const activeTab = document.getElementById('tab-' + subject);
    if (activeTab) activeTab.classList.add('active');

    // Hide all subject content
    const allContents = ['redis-content', 'docker-content', 'graphql-content', 'rq-content'];
    // (handled by base switchSubject)
    allContents.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });
    const targetContent = document.getElementById(subject + '-content');
    if (targetContent) targetContent.style.display = '';

    // Update title
    const config = SUBJECT_CONFIG[subject];
    if (config) {
        const titleEl = document.getElementById('site-title');
        const subtitleEl = document.getElementById('site-subtitle');
        if (titleEl) titleEl.textContent = config.title;
        if (subtitleEl) subtitleEl.textContent = config.subtitle;
    }

    // Update storage keys
    const store = SUBJECT_STORAGE[subject];
    if (store) {
        STORAGE_KEYS.completedLessons = store.completedLessons;
        STORAGE_KEYS.totalXP = store.totalXP;
        STORAGE_KEYS.streak = store.streak;
        STORAGE_KEYS.lastVisit = store.lastVisit;
    }

    loadProgressForSubject(subject);
    updateUI();
    updateTopProgressBar();
    const xp = parseInt(localStorage.getItem(STORAGE_KEYS.totalXP) || '0');
    updateXPTitle(xp);
    showResumeButtonForSubject(subject);
    window.scrollTo(0, 0);
};

// ============================================================
// UI/UX REDESIGN — New functionality
// ============================================================

// Sidebar toggle (mobile)
function toggleSidebar() {
    const sidebar = document.getElementById('subject-sidebar');
    const overlay = document.getElementById('sidebar-overlay') || createOverlay();
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
}
function createOverlay() {
    const o = document.createElement('div');
    o.className = 'sidebar-overlay';
    o.id = 'sidebar-overlay';
    o.onclick = toggleSidebar;
    document.body.appendChild(o);
    return o;
}

// Reading progress bar (M3.2)
function initReadingProgress() {
    const body = document.getElementById('modal-body-scroll');
    const fill = document.getElementById('modal-reading-fill');
    if (!body || !fill) return;
    body.addEventListener('scroll', () => {
        const max = body.scrollHeight - body.clientHeight;
        const pct = max > 0 ? (body.scrollTop / max) * 100 : 100;
        fill.style.width = pct + '%';
    });
}

// Breadcrumb updater (M3.1)
function updateBreadcrumb(lessonId) {
    const subjectNames = { eda: 'EDA', redis: 'Redis', docker: 'Docker', graphql: 'GraphQL', rq: 'React Query' };
    const subEl = document.getElementById('breadcrumb-subject');
    const modEl = document.getElementById('breadcrumb-module');
    const lesEl = document.getElementById('breadcrumb-lesson');
    if (subEl) subEl.textContent = subjectNames[currentSubject] || 'EDA';

    const parts = lessonId.replace(/[a-z]+/i, '').split('-');
    const modNum = parts[0] || '1';
    const lesNum = parts[1] || '1';
    if (modEl) modEl.textContent = `Module ${modNum}`;
    if (lesEl) lesEl.textContent = `Lesson ${modNum}.${lesNum}`;
}

// Sidebar progress counters (N1.4)
function updateSidebarProgress() {
    const subjects = ['eda', 'redis', 'docker', 'graphql', 'rq'];
    const totals = { eda: 20, redis: 20, docker: 13, graphql: 11, rq: 10 };
    subjects.forEach(s => {
        const store = SUBJECT_STORAGE[s];
        if (!store) return;
        const completed = JSON.parse(localStorage.getItem(store.completedLessons) || '[]');
        const el = document.getElementById('nav-progress-' + s);
        if (el) el.textContent = `${completed.length}/${totals[s]}`;
    });
}

// Mobile bottom nav active state
function updateMobileNav(subject) {
    document.querySelectorAll('.mob-nav-item').forEach(b => b.classList.remove('active'));
    const mob = document.getElementById('mobtab-' + subject);
    if (mob) mob.classList.add('active');
}

// Today's Path (L3.1)
function buildTodaysPath(subject) {
    const store = SUBJECT_STORAGE[subject];
    if (!store) return;
    const completed = JSON.parse(localStorage.getItem(store.completedLessons) || '[]');
    const allLessons = SUBJECT_CONFIG[subject]?.lessons() || {};
    const section = document.getElementById('todays-path');
    const container = document.getElementById('todays-path-lessons');
    if (!section || !container) return;

    // Find up to 3 incomplete lessons
    const incomplete = Object.entries(allLessons)
        .filter(([id]) => !completed.includes(id))
        .slice(0, 3);

    if (incomplete.length === 0) { section.style.display = 'none'; return; }

    section.style.display = 'block';
    container.innerHTML = '';
    incomplete.forEach(([id, lesson]) => {
        const card = document.createElement('button');
        card.className = 'todays-path-card';
        card.innerHTML = `▶ ${lesson.title.substring(0, 40)} <span style="color:var(--accent);font-size:11px">+${lesson.xp} XP</span>`;
        card.onclick = () => startLesson(id);
        container.appendChild(card);
    });
}

// Keyboard navigation in modal (M3.6)
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('lesson-modal');
    if (!modal?.classList.contains('active')) return;
    if (e.key === 'Escape') closeLesson();
    if (e.key === 'ArrowRight' && !e.target.matches('input, textarea')) goToNextLesson();
});

// Pomodoro — circular ring (P4.4)
const POMODORO_TOTAL = 15 * 60;
function updatePomodoroRing() {
    const ring = document.getElementById('pomodoro-ring-fill');
    if (!ring) return;
    const pct = pomodoroSeconds / POMODORO_TOTAL;
    const circumference = 283;
    ring.style.strokeDashoffset = circumference * (1 - pct);
}

// Override updatePomodoroDisplay to also update ring
const _origPomodoroDisplay = updatePomodoroDisplay;
updatePomodoroDisplay = function() {
    _origPomodoroDisplay();
    updatePomodoroRing();
};

// Patch switchSubject to update all new UI
const __prevSwitch = switchSubject;
switchSubject = function(subject) {
    __prevSwitch(subject);
    updateSidebarProgress();
    updateMobileNav(subject);
    buildTodaysPath(subject);
    // Close sidebar on mobile after switch
    const sidebar = document.getElementById('subject-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar?.classList.contains('open')) {
        sidebar.classList.remove('open');
        overlay?.classList.remove('active');
    }
};

// Patch startLesson for breadcrumb + reading progress
const ___origStart = startLesson;
startLesson = function(lessonId) {
    ___origStart(lessonId);
    updateBreadcrumb(lessonId);
    // Reset reading progress
    const fill = document.getElementById('modal-reading-fill');
    if (fill) fill.style.width = '0%';
    const body = document.getElementById('modal-body-scroll');
    if (body) body.scrollTop = 0;
};

// Init all new features on load
document.addEventListener('DOMContentLoaded', () => {
    initReadingProgress();
    updateSidebarProgress();
    updateMobileNav(currentSubject || 'eda');
    buildTodaysPath(currentSubject || 'eda');
    createOverlay(); // pre-create sidebar overlay
});

// ============================================================
// REMAINING UI/UX ITEMS
// ============================================================

// C2.5 — Recommended card highlight (first incomplete in each module)
function highlightRecommendedCards() {
    document.querySelectorAll('.recommended-card').forEach(c => c.classList.remove('recommended-card'));
    const store = SUBJECT_STORAGE[currentSubject];
    if (!store) return;
    const completed = JSON.parse(localStorage.getItem(store.completedLessons) || '[]');

    // Find first incomplete card per module section
    document.querySelectorAll('.module').forEach(module => {
        const cards = module.querySelectorAll('.lesson-card:not(.completed)');
        if (cards.length > 0) {
            cards[0].classList.add('recommended-card');
        }
    });
}

// L3.2 — Streak calendar (last 7 days)
function buildStreakCalendar() {
    const container = document.getElementById('streak-calendar');
    if (!container) return;
    const visits = JSON.parse(localStorage.getItem('eda_visit_history') || '[]');
    const today = new Date();
    container.innerHTML = '';
    for (let i = 6; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const dateStr = d.toDateString();
        const active = visits.includes(dateStr);
        const day = document.createElement('div');
        day.className = `cal-day ${active ? 'cal-active' : ''}`;
        day.title = dateStr;
        day.innerHTML = `<span>${['Su','Mo','Tu','We','Th','Fr','Sa'][d.getDay()]}</span>`;
        container.appendChild(day);
    }
    // Record today
    if (!visits.includes(today.toDateString())) {
        visits.push(today.toDateString());
        if (visits.length > 30) visits.shift();
        localStorage.setItem('eda_visit_history', JSON.stringify(visits));
    }
}

// L3.3 — "You're on a roll!" after 2 consecutive lessons
let lessonsThisSession = 0;
const _origXPPopup = showXPPopup;
showXPPopup = function(earned, total) {
    _origXPPopup(earned, total);
    lessonsThisSession++;
    if (lessonsThisSession === 2) {
        setTimeout(() => showToast("🔥 You're on a roll! 2 lessons in a row!"), 2600);
    } else if (lessonsThisSession >= 3) {
        setTimeout(() => showToast(`⚡ ${lessonsThisSession} lessons in one session! Keep going!`), 2600);
    }
};

// L3.4 — "Due for review" badge
function markReviewDue() {
    const store = SUBJECT_STORAGE[currentSubject];
    if (!store) return;
    const completionTimes = JSON.parse(localStorage.getItem((store.completedLessons || '') + '_times') || '{}');
    const now = Date.now();
    const THREE_DAYS = 3 * 24 * 60 * 60 * 1000;
    Object.entries(completionTimes).forEach(([id, time]) => {
        if (now - time > THREE_DAYS) {
            const card = document.querySelector(`[data-lesson="${id}"]`);
            if (card && !card.querySelector('.review-due-badge')) {
                const badge = document.createElement('div');
                badge.className = 'review-due-badge';
                badge.textContent = '🔔 Review Due';
                card.appendChild(badge);
            }
        }
    });
}

// Store completion timestamps
const _origCompleteForTimestamp = window._completeSubjectLesson;
window._completeSubjectLesson = function() {
    const store = SUBJECT_STORAGE[currentSubject];
    if (store && currentLesson) {
        const times = JSON.parse(localStorage.getItem((store.completedLessons || '') + '_times') || '{}');
        times[currentLesson] = Date.now();
        localStorage.setItem((store.completedLessons || '') + '_times', JSON.stringify(times));
    }
    if (_origCompleteForTimestamp) _origCompleteForTimestamp();
};

// L3.6 — Subject completion celebration
function checkSubjectCompletion() {
    const store = SUBJECT_STORAGE[currentSubject];
    const config = SUBJECT_CONFIG[currentSubject];
    if (!store || !config) return;
    const completed = JSON.parse(localStorage.getItem(store.completedLessons) || '[]');
    if (completed.length >= config.totalLessons) {
        setTimeout(() => showCompletionCertificate(), 3000);
    }
}

function showCompletionCertificate() {
    const cert = document.createElement('div');
    cert.style.cssText = `position:fixed;inset:0;background:rgba(0,0,0,0.8);z-index:10001;display:flex;align-items:center;justify-content:center;padding:20px;`;
    cert.innerHTML = `
        <div style="background:linear-gradient(135deg,#1a1d2e,#2d2f6b);color:white;border-radius:20px;padding:48px;text-align:center;max-width:480px;border:2px solid #fbbf24;box-shadow:0 24px 64px rgba(0,0,0,0.5)">
            <div style="font-size:64px;margin-bottom:16px">🎓</div>
            <h2 style="font-size:28px;font-weight:800;color:#fbbf24;margin-bottom:8px">Course Complete!</h2>
            <p style="font-size:18px;opacity:0.8;margin-bottom:24px">You've mastered ${SUBJECT_CONFIG[currentSubject]?.title}</p>
            <p style="font-size:14px;opacity:0.6;margin-bottom:32px">Every lesson completed · All XP earned · You're ready for production</p>
            <button onclick="this.closest('[style*=inset]').remove()" style="background:#fbbf24;color:#1a1d2e;border:none;padding:14px 32px;border-radius:10px;font-size:16px;font-weight:800;cursor:pointer">Continue Learning 🚀</button>
        </div>`;
    document.body.appendChild(cert);
    launchConfetti();
}

// L3.7 — First-time onboarding
function checkFirstTimeOnboarding() {
    if (localStorage.getItem('eda_onboarded')) return;
    const overlay = document.createElement('div');
    overlay.style.cssText = `position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:10002;display:flex;align-items:center;justify-content:center;padding:20px;`;
    overlay.innerHTML = `
        <div style="background:var(--surface,#fff);border-radius:20px;padding:40px;text-align:center;max-width:460px;box-shadow:0 24px 64px rgba(0,0,0,0.4)">
            <div style="font-size:52px;margin-bottom:16px">⚡</div>
            <h2 style="font-size:24px;font-weight:800;margin-bottom:10px;color:var(--text,#1a1d2e)">Welcome to DevLearn!</h2>
            <p style="font-size:15px;color:var(--text-muted,#666);margin-bottom:24px;line-height:1.6">Bite-sized, ADHD-friendly lessons for developers. Each lesson = 5–15 min. Start anywhere.</p>
            <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:28px;text-align:left">
                <div style="background:var(--surface-2,#f5f5f5);padding:12px 16px;border-radius:10px;font-size:14px">🎯 <strong>EDA</strong> — Event-Driven Architecture</div>
                <div style="background:var(--surface-2,#f5f5f5);padding:12px 16px;border-radius:10px;font-size:14px">🔴 <strong>Redis</strong> — In-memory speed layer</div>
                <div style="background:var(--surface-2,#f5f5f5);padding:12px 16px;border-radius:10px;font-size:14px">🐳 <strong>Docker</strong> — Containers & deployment</div>
                <div style="background:var(--surface-2,#f5f5f5);padding:12px 16px;border-radius:10px;font-size:14px">🔮 <strong>GraphQL</strong> + <strong>⚡ React Query</strong></div>
            </div>
            <button onclick="dismissOnboarding(this)" style="background:#4361ee;color:white;border:none;padding:14px 36px;border-radius:10px;font-size:16px;font-weight:800;cursor:pointer;width:100%">Start Learning →</button>
        </div>`;
    document.body.appendChild(overlay);
}

function dismissOnboarding(btn) {
    localStorage.setItem('eda_onboarded', '1');
    btn.closest('[style*=inset]').remove();
}

// M3.5 — Pulse animation on correct quiz answer
const _origCheckQuiz = checkQuiz;
checkQuiz = function(btn, result, feedback) {
    _origCheckQuiz(btn, result, feedback);
    if (result === 'correct') {
        btn.style.animation = 'correctPulse 0.4s ease';
        setTimeout(() => btn.style.animation = '', 400);
    }
};

// P4.6 — Favicon (inline SVG as data URL)
function setFavicon() {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#4361ee"/><text x="16" y="22" text-anchor="middle" font-size="20" fill="white">⚡</text></svg>`;
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/svg+xml';
    link.rel = 'icon';
    link.href = 'data:image/svg+xml,' + encodeURIComponent(svg);
    document.head.appendChild(link);
}

// Patch updateUI to run new features
const ___origUpdateUI = updateUI;
updateUI = function() {
    ___origUpdateUI();
    highlightRecommendedCards();
    buildStreakCalendar();
    markReviewDue();
    updateSidebarProgress();
};

// Init on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    setFavicon();
    checkFirstTimeOnboarding();
    buildStreakCalendar();
    highlightRecommendedCards();
    markReviewDue();
});

// Run after lesson completion
const ___prevComplete = window._completeSubjectLesson;
window._completeSubjectLesson = function() {
    ___prevComplete?.();
    setTimeout(() => {
        highlightRecommendedCards();
        markReviewDue();
        checkSubjectCompletion();
    }, 100);
};

// ============================================================
// NEW SUBJECTS: Kubernetes, PostgreSQL, TypeScript
// ============================================================
Object.assign(SUBJECT_CONFIG, {
    kubernetes: {
        title: 'Kubernetes',
        subtitle: 'Container Orchestration at Scale',
        color: '#326CE5',
        totalLessons: 13,
        lessons: () => kubernetesLessons,
        flashcards: () => kubernetesFlashcards,
    },
    postgres: {
        title: 'PostgreSQL',
        subtitle: "The World's Most Advanced Open Source Database",
        color: '#336791',
        totalLessons: 13,
        lessons: () => postgresLessons,
        flashcards: () => postgresFlashcards,
    },
    typescript: {
        title: 'TypeScript',
        subtitle: 'JavaScript That Scales',
        color: '#3178C6',
        totalLessons: 13,
        lessons: () => typescriptLessons,
        flashcards: () => typescriptFlashcards,
    },
});

Object.assign(SUBJECT_STORAGE, {
    kubernetes: { completedLessons: 'k8s_completedLessons', totalXP: 'k8s_totalXP', streak: 'k8s_streak', lastVisit: 'k8s_lastVisit' },
    postgres: { completedLessons: 'pg_completedLessons', totalXP: 'pg_totalXP', streak: 'pg_streak', lastVisit: 'pg_lastVisit' },
    typescript: { completedLessons: 'ts_completedLessons', totalXP: 'ts_totalXP', streak: 'ts_streak', lastVisit: 'ts_lastVisit' },
});

// Patch subject list for display toggling
const ALL_SUBJECTS = ['eda','redis','docker','graphql','rq','kubernetes','postgres','typescript'];
const _baseSwitch = switchSubject;
switchSubject = function(subject) {
    ALL_SUBJECTS.forEach(s => {
        const el = document.getElementById(s + '-content');
        if (el) el.style.display = s === subject ? '' : 'none';
    });
    // Update active tab
    document.querySelectorAll('.sidebar-item').forEach(b => b.classList.remove('active'));
    const tab = document.getElementById('tab-' + subject);
    if (tab) tab.classList.add('active');
    // Update mobile nav
    document.querySelectorAll('.mob-nav-item').forEach(b => b.classList.remove('active'));
    const mob = document.getElementById('mobtab-' + subject);
    if (mob) mob.classList.add('active');

    currentSubject = subject;
    updateUI();
    updateSidebarProgress();
    buildTodaysPath(subject);

    const config = SUBJECT_CONFIG[subject];
    if (config) {
        const titleEl = document.getElementById('site-title');
        const subEl = document.getElementById('site-subtitle');
        if (titleEl) titleEl.textContent = config.title;
        if (subEl) subEl.textContent = config.subtitle || '';
        document.documentElement.style.setProperty('--accent', config.color || '#4361ee');
    }
    const sidebar = document.getElementById('subject-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar?.classList.contains('open')) {
        sidebar.classList.remove('open');
        overlay?.classList.remove('active');
    }
};

// Patch sidebar progress totals
const _origSidebarProgress = updateSidebarProgress;
updateSidebarProgress = function() {
    const subjects = ['eda','redis','docker','graphql','rq','kubernetes','postgres','typescript'];
    const totals = { eda: 20, redis: 20, docker: 13, graphql: 11, rq: 10, kubernetes: 13, postgres: 13, typescript: 13 };
    subjects.forEach(s => {
        const store = SUBJECT_STORAGE[s];
        if (!store) return;
        const completed = JSON.parse(localStorage.getItem(store.completedLessons) || '[]');
        const el = document.getElementById('nav-progress-' + s);
        if (el) el.textContent = completed.length + '/' + (totals[s] || '?');
    });
};

// ============================================================
// CRITICAL FIX: startLesson must look up lesson from current subject
// ============================================================
(function() {
    const _base = startLesson;
    startLesson = function(lessonId) {
        currentLesson = lessonId;

        // Get lesson from current subject's config
        const config = SUBJECT_CONFIG[currentSubject];
        const subjectLessons = config ? config.lessons() : {};
        const lesson = subjectLessons[lessonId];

        if (!lesson) {
            // Fall back to EDA lessons for EDA IDs
            _base(lessonId);
            return;
        }

        // Show modal directly (bypass EDA-only lookup)
        const modal = document.getElementById('lesson-modal');
        if (!modal) return;

        document.getElementById('lesson-title').textContent = lesson.title;
        document.getElementById('lesson-content').innerHTML = lesson.content;
        modal.classList.add('active');

        // Update breadcrumb
        if (typeof updateBreadcrumb === 'function') updateBreadcrumb(lessonId);

        // Reset reading progress
        const fill = document.getElementById('modal-reading-fill');
        if (fill) fill.style.width = '0%';
        const body = document.getElementById('modal-body-scroll');
        if (body) body.scrollTop = 0;

        // Check completion state
        const store = SUBJECT_STORAGE[currentSubject];
        const storageKey = store ? store.completedLessons : 'eda_completedLessons';
        const completed = JSON.parse(localStorage.getItem(storageKey) || '[]');
        const btn = document.getElementById('btn-complete');
        if (btn) {
            if (completed.includes(lessonId)) {
                btn.textContent = 'Already Completed ✓';
                btn.disabled = true;
            } else {
                btn.textContent = 'Mark Complete & Earn ' + lesson.xp + ' XP';
                btn.disabled = false;
            }
        }

        // Next lesson button
        const nextBtn = document.getElementById('btn-next-lesson');
        if (nextBtn) nextBtn.style.display = 'none';
    };
})();

// CRITICAL FIX: completeLesson must save to subject-specific storage
(function() {
    const _baseComplete = completeLesson;
    completeLesson = function() {
        const subject = currentSubject;
        const store = SUBJECT_STORAGE[subject];
        const config = SUBJECT_CONFIG[subject];

        // If it's EDA or no config found, use base
        if (!store || !config || subject === 'eda') {
            _baseComplete();
            return;
        }

        const subjectLessons = config.lessons();
        const lesson = subjectLessons[currentLesson];
        if (!lesson) { _baseComplete(); return; }

        const completed = JSON.parse(localStorage.getItem(store.completedLessons) || '[]');
        if (completed.includes(currentLesson)) {
            closeLesson();
            return;
        }

        completed.push(currentLesson);
        localStorage.setItem(store.completedLessons, JSON.stringify(completed));

        const currentXP = parseInt(localStorage.getItem(store.totalXP) || '0');
        const newXP = currentXP + lesson.xp;
        localStorage.setItem(store.totalXP, newXP.toString());
        localStorage.setItem(store.lastVisit, Date.now().toString());

        // Mark card as completed
        const card = document.querySelector('[data-lesson="' + currentLesson + '"]');
        if (card) {
            card.classList.add('completed');
            const btn = card.querySelector('.btn-start');
            if (btn) btn.textContent = 'Review';
        }

        // XP popup
        if (typeof showXPPopup === 'function') showXPPopup(lesson.xp, newXP);
        if (typeof launchConfetti === 'function') launchConfetti();

        // Update sidebar progress
        if (typeof updateSidebarProgress === 'function') updateSidebarProgress();

        // Show next lesson button
        const nextBtn = document.getElementById('btn-next-lesson');
        if (nextBtn) nextBtn.style.display = 'inline-flex';

        closeLesson();
    };
})();

// ============================================================
// FEATURE 1: ACHIEVEMENT / BADGE SYSTEM
// ============================================================

const BADGE_DEFS = [
    { id: 'first_step',       emoji: '🌱', name: 'First Step',      desc: 'Complete your first lesson' },
    { id: 'on_fire',          emoji: '🔥', name: 'On Fire',         desc: '3-day streak' },
    { id: 'speed_learner',    emoji: '⚡', name: 'Speed Learner',   desc: 'Complete 5 lessons in one day' },
    { id: 'module_master',    emoji: '🎯', name: 'Module Master',   desc: 'Complete all lessons in any module' },
    { id: 'century',          emoji: '💯', name: 'Century',         desc: 'Earn 100 XP total' },
    { id: 'xp_rocket',        emoji: '🚀', name: 'XP Rocket',       desc: 'Earn 500 XP total' },
    { id: 'quiz_ace',         emoji: '🧠', name: 'Quiz Ace',        desc: 'Score 100% on any quiz' },
    { id: 'course_complete',  emoji: '🏆', name: 'Course Complete', desc: 'Finish all lessons in a subject' },
    { id: 'night_owl',        emoji: '🌙', name: 'Night Owl',       desc: 'Complete a lesson after 10pm' },
    { id: 'scholar',          emoji: '📚', name: 'Scholar',         desc: 'Complete 20 lessons total' },
];

function getEarnedBadges() {
    return JSON.parse(localStorage.getItem('eda_badges') || '[]');
}

function awardBadge(id) {
    const earned = getEarnedBadges();
    if (earned.find(b => b.id === id)) return; // Already earned
    const def = BADGE_DEFS.find(b => b.id === id);
    if (!def) return;
    const newBadge = { id, earnedAt: new Date().toISOString() };
    earned.push(newBadge);
    localStorage.setItem('eda_badges', JSON.stringify(earned));
    showAchievementToast(def.emoji + ' Achievement unlocked: ' + def.name);
    launchConfetti();
}

function showAchievementToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'achievement-toast';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3600);
}

function checkBadgesAfterLesson() {
    // Gather cross-subject data
    const allSubjects = ['eda','redis','docker','graphql','rq','kubernetes','postgres','typescript'];
    let totalCompleted = 0;
    let totalXpAll = 0;
    allSubjects.forEach(s => {
        const store = SUBJECT_STORAGE[s];
        if (!store) return;
        const comp = JSON.parse(localStorage.getItem(store.completedLessons) || '[]');
        totalCompleted += comp.length;
        totalXpAll += parseInt(localStorage.getItem(store.totalXP) || '0');
    });

    // First Step
    if (totalCompleted >= 1) awardBadge('first_step');

    // Scholar: 20 lessons total
    if (totalCompleted >= 20) awardBadge('scholar');

    // Century: 100 XP total
    if (totalXpAll >= 100) awardBadge('century');

    // XP Rocket: 500 XP total
    if (totalXpAll >= 500) awardBadge('xp_rocket');

    // On Fire: streak >= 3
    const streak = parseInt(localStorage.getItem('eda_streak') || '0');
    if (streak >= 3) awardBadge('on_fire');

    // Night Owl: current hour >= 22
    if (new Date().getHours() >= 22) awardBadge('night_owl');

    // Speed Learner: 5 lessons today
    const todayKey = 'eda_lessons_today_' + new Date().toDateString();
    const todayCount = parseInt(localStorage.getItem(todayKey) || '0') + 1;
    localStorage.setItem(todayKey, todayCount);
    if (todayCount >= 5) awardBadge('speed_learner');

    // Module Master: check if all lessons in any module are done
    checkModuleMasterBadge();

    // Course Complete: check if all lessons in any subject are done
    checkCourseCompleteBadge();
}

function checkModuleMasterBadge() {
    // EDA modules
    const edaStore = SUBJECT_STORAGE.eda;
    if (edaStore) {
        const comp = JSON.parse(localStorage.getItem(edaStore.completedLessons) || '[]');
        const m1 = ['1-1','1-2','1-3','1-4','1-5'].every(id => comp.includes(id));
        const m2 = ['2-1','2-2','2-3','2-4','2-5','2-6'].every(id => comp.includes(id));
        const m3 = ['3-1','3-2','3-3','3-4','3-5'].every(id => comp.includes(id));
        const m4 = ['4-1','4-2','4-3','4-4'].every(id => comp.includes(id));
        if (m1 || m2 || m3 || m4) awardBadge('module_master');
    }
}

function checkCourseCompleteBadge() {
    const allSubjects = ['eda','redis','docker','graphql','rq','kubernetes','postgres','typescript'];
    allSubjects.forEach(s => {
        const store = SUBJECT_STORAGE[s];
        const config = SUBJECT_CONFIG[s];
        if (!store || !config) return;
        const comp = JSON.parse(localStorage.getItem(store.completedLessons) || '[]');
        if (comp.length >= config.totalLessons) awardBadge('course_complete');
    });
}

function openAchievementsModal() {
    const modal = document.getElementById('achievements-modal');
    const content = document.getElementById('achievements-content');
    const earned = getEarnedBadges();
    const earnedMap = {};
    earned.forEach(b => earnedMap[b.id] = b);

    content.innerHTML = '<div class="badges-grid">' +
        BADGE_DEFS.map(def => {
            const earnedBadge = earnedMap[def.id];
            const isUnlocked = !!earnedBadge;
            const dateStr = isUnlocked ? new Date(earnedBadge.earnedAt).toLocaleDateString() : '';
            return `<div class="badge-card ${isUnlocked ? 'unlocked' : 'locked'}">
                <span class="badge-emoji">${def.emoji}</span>
                <div class="badge-name">${def.name}</div>
                <div class="badge-desc">${def.desc}</div>
                ${isUnlocked ? `<div class="badge-date">Earned ${dateStr}</div>` : ''}
            </div>`;
        }).join('') + '</div>';

    modal.classList.add('active');
}

function closeAchievementsModal() {
    document.getElementById('achievements-modal').classList.remove('active');
}

document.getElementById('achievements-modal').addEventListener('click', e => {
    if (e.target.id === 'achievements-modal') closeAchievementsModal();
});

// Patch _completeSubjectLesson to check badges
(function() {
    const _prev = window._completeSubjectLesson;
    window._completeSubjectLesson = function() {
        if (_prev) _prev();
        setTimeout(() => checkBadgesAfterLesson(), 200);
    };
})();

// Also patch the eda completeLesson (original)
(function() {
    const _prev = completeLesson;
    completeLesson = function() {
        _prev();
        setTimeout(() => checkBadgesAfterLesson(), 200);
    };
})();


// ============================================================
// FEATURE 2: GLOBAL LESSON SEARCH
// ============================================================

let lessonIndex = null; // built lazily

function buildLessonIndex() {
    if (lessonIndex) return lessonIndex;
    lessonIndex = [];
    const subjectMeta = {
        eda:        { icon: '🎯', name: 'EDA' },
        redis:      { icon: '🔴', name: 'Redis' },
        docker:     { icon: '🐳', name: 'Docker' },
        graphql:    { icon: '🔮', name: 'GraphQL' },
        rq:         { icon: '⚡', name: 'React Query' },
        kubernetes: { icon: '☸️', name: 'Kubernetes' },
        postgres:   { icon: '🐘', name: 'PostgreSQL' },
        typescript: { icon: '🔷', name: 'TypeScript' },
    };

    // Build from DOM lesson cards (captures all content)
    document.querySelectorAll('.subject-content').forEach(container => {
        const subjectId = container.id.replace('-content', '');
        const meta = subjectMeta[subjectId] || { icon: '📚', name: subjectId };
        container.querySelectorAll('.lesson-card[data-lesson]').forEach(card => {
            const lessonId = card.dataset.lesson;
            const title = card.querySelector('h3')?.textContent?.trim() || '';
            const desc = card.querySelector('p')?.textContent?.trim() || '';
            lessonIndex.push({ lessonId, subjectId, title, desc, icon: meta.icon, subjectName: meta.name });
        });
    });

    return lessonIndex;
}

function openSearch() {
    const overlay = document.getElementById('search-overlay');
    overlay.style.display = 'block';
    const input = document.getElementById('search-input');
    input.value = '';
    document.getElementById('search-results').innerHTML = '';
    input.focus();
    buildLessonIndex();
}

function closeSearch() {
    document.getElementById('search-overlay').style.display = 'none';
}

function handleSearchInput(query) {
    const resultsEl = document.getElementById('search-results');
    if (!query.trim()) { resultsEl.innerHTML = ''; return; }
    const q = query.toLowerCase();
    const index = buildLessonIndex();
    const matches = index.filter(item =>
        item.title.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q)
    ).slice(0, 12);

    if (matches.length === 0) {
        resultsEl.innerHTML = '<div class="search-no-results">No lessons found for "' + query + '"</div>';
        return;
    }

    resultsEl.innerHTML = matches.map((item, i) =>
        `<div class="search-result-item" data-idx="${i}" onclick="jumpToLesson('${item.subjectId}','${item.lessonId}')">
            <span class="search-result-icon">${item.icon}</span>
            <span class="search-result-title">${item.title}</span>
            <span class="search-result-subject">${item.subjectName}</span>
        </div>`
    ).join('');
}

function jumpToLesson(subjectId, lessonId) {
    closeSearch();
    if (currentSubject !== subjectId) switchSubject(subjectId);
    setTimeout(() => startLesson(lessonId), 100);
}

document.getElementById('search-input').addEventListener('input', function() {
    handleSearchInput(this.value);
});

// Close search on outside click
document.getElementById('search-overlay').addEventListener('click', function(e) {
    if (e.target === this) closeSearch();
});


// ============================================================
// FEATURE 3: DASHBOARD HOME TAB
// ============================================================

const ACTIVITY_LOG_KEY = 'eda_activity_log';

function logActivity(subjectId, lessonId, lessonTitle) {
    const log = JSON.parse(localStorage.getItem(ACTIVITY_LOG_KEY) || '[]');
    log.unshift({ subjectId, lessonId, lessonTitle, timestamp: Date.now() });
    if (log.length > 50) log.length = 50;
    localStorage.setItem(ACTIVITY_LOG_KEY, JSON.stringify(log));
}

// Patch _completeSubjectLesson to log activity
(function() {
    const _prev = window._completeSubjectLesson;
    window._completeSubjectLesson = function() {
        const subjectId = currentSubject;
        const lessonId = currentLesson;
        const config = SUBJECT_CONFIG[subjectId];
        const lessonTitle = config ? (config.lessons()[lessonId]?.title || lessonId) : lessonId;
        if (_prev) _prev();
        logActivity(subjectId, lessonId, lessonTitle);
    };
})();

function showHomeDashboard() {
    // Mark Home tab active
    document.querySelectorAll('.sidebar-item').forEach(b => b.classList.remove('active'));
    document.getElementById('tab-home')?.classList.add('active');

    // Hide all subject content
    const allSubjects = ['eda','redis','docker','graphql','rq','kubernetes','postgres','typescript'];
    allSubjects.forEach(s => {
        const el = document.getElementById(s + '-content');
        if (el) el.style.display = 'none';
    });

    // Show or create home-content
    let homeEl = document.getElementById('home-content');
    if (!homeEl) {
        homeEl = document.createElement('div');
        homeEl.id = 'home-content';
        homeEl.className = 'container';
        document.getElementById('main-content').appendChild(homeEl);
    }
    homeEl.style.display = 'block';
    renderHomeDashboard(homeEl);
    window.scrollTo(0, 0);
}

function renderHomeDashboard(container) {
    const allSubjects = ['eda','redis','docker','graphql','rq','kubernetes','postgres','typescript'];
    const subjectMeta = [
        { id: 'eda',        icon: '🎯', name: 'EDA',          total: 20 },
        { id: 'redis',      icon: '🔴', name: 'Redis',        total: 20 },
        { id: 'docker',     icon: '🐳', name: 'Docker',       total: 13 },
        { id: 'graphql',    icon: '🔮', name: 'GraphQL',      total: 11 },
        { id: 'rq',         icon: '⚡', name: 'React Query',  total: 10 },
        { id: 'kubernetes', icon: '☸️', name: 'Kubernetes',   total: 13 },
        { id: 'postgres',   icon: '🐘', name: 'PostgreSQL',   total: 13 },
        { id: 'typescript', icon: '🔷', name: 'TypeScript',   total: 13 },
    ];

    // Compute stats
    let totalLessons = 0;
    let totalXP = 0;
    allSubjects.forEach(s => {
        const store = SUBJECT_STORAGE[s];
        if (!store) return;
        totalLessons += JSON.parse(localStorage.getItem(store.completedLessons) || '[]').length;
        totalXP += parseInt(localStorage.getItem(store.totalXP) || '0');
    });
    const streak = parseInt(localStorage.getItem('eda_streak') || '0');
    const badgesEarned = getEarnedBadges().length;

    // Recent activity
    const activityLog = JSON.parse(localStorage.getItem(ACTIVITY_LOG_KEY) || '[]').slice(0, 3);

    // Render
    container.innerHTML = `
        <h2 style="font-size:22px;font-weight:900;margin-bottom:20px;color:var(--text)">🏠 Dashboard</h2>

        <!-- Hero stats -->
        <div class="home-hero">
            <div class="home-stat-card">
                <span class="home-stat-num">${totalXP}</span>
                <div class="home-stat-label">Total XP</div>
            </div>
            <div class="home-stat-card">
                <span class="home-stat-num">${totalLessons}</span>
                <div class="home-stat-label">Lessons Done</div>
            </div>
            <div class="home-stat-card">
                <span class="home-stat-num">${streak}</span>
                <div class="home-stat-label">🔥 Day Streak</div>
            </div>
            <div class="home-stat-card">
                <span class="home-stat-num">${badgesEarned}</span>
                <div class="home-stat-label">🏆 Badges</div>
            </div>
        </div>

        <!-- Course progress -->
        <div class="home-section-title">📚 Course Progress</div>
        <div class="courses-grid">
            ${subjectMeta.map(s => {
                const store = SUBJECT_STORAGE[s.id];
                const done = store ? JSON.parse(localStorage.getItem(store.completedLessons) || '[]').length : 0;
                const pct = Math.round((done / s.total) * 100);
                return `<div class="course-progress-card" onclick="switchSubject('${s.id}')">
                    <div class="course-card-header">
                        <span class="course-card-icon">${s.icon}</span>
                        <span class="course-card-name">${s.name}</span>
                    </div>
                    <div class="course-card-bar-track">
                        <div class="course-card-bar-fill" style="width:${pct}%"></div>
                    </div>
                    <div class="course-card-stats">
                        <span>${done}/${s.total} lessons</span>
                        <span style="color:var(--accent);font-weight:700">${pct}%</span>
                    </div>
                </div>`;
            }).join('')}
        </div>

        <!-- Recent activity -->
        <div class="home-section-title">⏱️ Recent Activity</div>
        <div class="activity-list">
            ${activityLog.length === 0
                ? '<div class="no-activity">No activity yet — start a lesson!</div>'
                : activityLog.map(item => {
                    const subjectMeIcon = subjectMeta.find(s => s.id === item.subjectId)?.icon || '📚';
                    const ago = timeAgo(item.timestamp);
                    return `<div class="activity-item">
                        <span class="activity-item-icon">${subjectMeIcon}</span>
                        <span class="activity-item-title">${item.lessonTitle || item.lessonId}</span>
                        <span class="activity-item-time">${ago}</span>
                    </div>`;
                }).join('')
            }
        </div>
    `;
}

function timeAgo(ts) {
    const diff = Date.now() - ts;
    const m = Math.floor(diff / 60000);
    if (m < 1) return 'just now';
    if (m < 60) return m + 'm ago';
    const h = Math.floor(m / 60);
    if (h < 24) return h + 'h ago';
    const d = Math.floor(h / 24);
    return d + 'd ago';
}

// Patch switchSubject to hide home-content
(function() {
    const _prev = switchSubject;
    switchSubject = function(subject) {
        const homeEl = document.getElementById('home-content');
        if (homeEl) homeEl.style.display = 'none';
        document.getElementById('tab-home')?.classList.remove('active');
        _prev(subject);
    };
})();


// ============================================================
// FEATURE 4: KEYBOARD SHORTCUTS
// ============================================================

document.addEventListener('keydown', function(e) {
    // Don't fire when typing in inputs/textareas (except Escape)
    const inInput = e.target.matches('input, textarea, [contenteditable]');

    // / — open search
    if (e.key === '/' && !inInput) {
        e.preventDefault();
        openSearch();
        return;
    }

    // Escape — close any open modal or search
    if (e.key === 'Escape') {
        if (document.getElementById('search-overlay').style.display !== 'none') {
            closeSearch(); return;
        }
        if (document.getElementById('achievements-modal')?.classList.contains('active')) {
            closeAchievementsModal(); return;
        }
        if (document.getElementById('lesson-modal')?.classList.contains('active')) {
            closeLesson(); return;
        }
        if (document.getElementById('flashcard-modal')?.classList.contains('active')) {
            closeFlashcards(); return;
        }
        if (document.getElementById('challenge-modal')?.classList.contains('active')) {
            closeDailyChallenge(); return;
        }
    }

    // Flashcard shortcuts (only when flashcard modal is open)
    if (document.getElementById('flashcard-modal')?.classList.contains('active')) {
        if (e.key === 'ArrowRight') { nextCard(); return; }
        if (e.key === 'ArrowLeft') { prevCard(); return; }
        if (e.key === ' ') { e.preventDefault(); flipCard(); return; }
    }

    // n — next lesson (when lesson modal is open)
    if (e.key === 'n' && !inInput) {
        if (document.getElementById('lesson-modal')?.classList.contains('active')) {
            const nextBtn = document.getElementById('btn-next-lesson');
            if (nextBtn && nextBtn.style.display !== 'none') goToNextLesson();
            return;
        }
    }
});

// ============================================================
// SPRINT 1: UI/UX ENHANCEMENTS
// ============================================================

// --- S1: Ordered lesson list per subject ---
function getSubjectLessonOrder() {
    const config = SUBJECT_CONFIG[currentSubject];
    if (!config) return [];
    const allLessons = config.lessons();
    return Object.keys(allLessons);
}

// --- S1: Module name lookup ---
function getModuleNameForLesson(lessonId) {
    // Try to find the module section that contains this lesson card
    const card = document.querySelector('[data-lesson="' + lessonId + '"]');
    if (card) {
        const module = card.closest('.module');
        if (module) {
            const h2 = module.querySelector('.module-header h2');
            if (h2) return h2.textContent.replace(/^[^\s]+\s*/, '').trim();
        }
    }
    // Fallback: derive from lesson ID
    const modNum = lessonId.replace(/[a-z]/gi, '').split('-')[0];
    return 'Module ' + modNum;
}

// --- S1.1: Copy buttons on code blocks ---
function addCopyButtons() {
    const modal = document.getElementById('lesson-content');
    if (!modal) return;
    modal.querySelectorAll('pre').forEach(pre => {
        if (pre.parentElement.classList.contains('code-wrapper')) return;
        const wrapper = document.createElement('div');
        wrapper.className = 'code-wrapper';
        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);

        const btn = document.createElement('button');
        btn.className = 'copy-btn';
        btn.textContent = 'Copy';
        btn.addEventListener('click', () => {
            const code = pre.querySelector('code');
            const text = (code || pre).textContent;
            navigator.clipboard.writeText(text).then(() => {
                btn.textContent = '\u2713 Copied';
                btn.classList.add('copied');
                setTimeout(() => {
                    btn.textContent = 'Copy';
                    btn.classList.remove('copied');
                }, 2000);
            });
        });
        wrapper.appendChild(btn);
    });
}

// --- S1.5: Estimate reading time from content ---
function estimateReadingTime(content) {
    if (!content) return 3;
    const text = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const words = text.split(' ').length;
    return Math.max(3, Math.round(words / 200));
}

// --- S1.2/S1.3: Task checkboxes + counter + gate ---
function injectTaskChecklist(lessonId) {
    const modalContent = document.getElementById('lesson-modal')?.querySelector('.modal-content');
    if (!modalContent) return;

    // Remove existing checklist
    const existing = modalContent.querySelector('.task-checklist');
    if (existing) existing.remove();

    const completed = JSON.parse(localStorage.getItem(
        (SUBJECT_STORAGE[currentSubject]?.completedLessons || STORAGE_KEYS.completedLessons)
    ) || '[]');
    if (completed.includes(lessonId)) return; // Already completed, no gate needed

    const tasks = [
        'I understand the core concept',
        'I can explain this to someone else',
        'I know when to apply this pattern'
    ];

    const saved = JSON.parse(localStorage.getItem(lessonId + '_tasks') || '[]');

    const checklist = document.createElement('div');
    checklist.className = 'task-checklist';
    checklist.innerHTML = '<div class="task-checklist-title">Self-Check</div>';

    tasks.forEach((task, i) => {
        const item = document.createElement('label');
        item.className = 'task-check-item' + (saved[i] ? ' checked' : '');
        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.checked = !!saved[i];
        cb.addEventListener('change', () => {
            const state = [];
            checklist.querySelectorAll('input[type="checkbox"]').forEach(c => state.push(c.checked));
            localStorage.setItem(lessonId + '_tasks', JSON.stringify(state));
            item.classList.toggle('checked', cb.checked);
            updateTaskCounter(checklist);
            updateCompleteButtonGate();
        });
        const lbl = document.createElement('label');
        lbl.textContent = task;
        item.appendChild(cb);
        item.appendChild(lbl);
        checklist.appendChild(item);
    });

    // Counter
    const counter = document.createElement('div');
    counter.className = 'task-counter';
    checklist.appendChild(counter);

    // Insert before the footer
    const footer = modalContent.querySelector('.modal-footer');
    if (footer) {
        modalContent.insertBefore(checklist, footer);
    } else {
        modalContent.appendChild(checklist);
    }

    updateTaskCounter(checklist);
    updateCompleteButtonGate();
}

function updateTaskCounter(checklist) {
    const cbs = checklist.querySelectorAll('input[type="checkbox"]');
    const checked = [...cbs].filter(c => c.checked).length;
    const total = cbs.length;
    const counter = checklist.querySelector('.task-counter');
    if (!counter) return;
    if (checked === total) {
        counter.textContent = '\u2713 All tasks done \u2014 ready to complete!';
        counter.classList.add('all-done');
    } else {
        counter.textContent = checked + ' of ' + total + ' tasks done';
        counter.classList.remove('all-done');
    }
}

function updateCompleteButtonGate() {
    const btn = document.getElementById('btn-complete');
    if (!btn || btn.disabled) return; // Already completed state
    const checklist = document.querySelector('.task-checklist');
    if (!checklist) { return; }
    const cbs = checklist.querySelectorAll('input[type="checkbox"]');
    const allChecked = [...cbs].every(c => c.checked);
    btn.disabled = !allChecked;
    if (!allChecked) {
        btn.title = 'Complete all self-check tasks first';
    } else {
        btn.title = '';
    }
}

// --- S1.4: Lesson position indicator ---
function injectLessonPosition(lessonId) {
    const modalContent = document.getElementById('lesson-modal')?.querySelector('.modal-content');
    if (!modalContent) return;

    // Remove existing
    const existing = modalContent.querySelector('.lesson-position');
    if (existing) existing.remove();

    const order = getSubjectLessonOrder();
    const idx = order.indexOf(lessonId);
    if (idx < 0) return;

    const moduleName = getModuleNameForLesson(lessonId);

    const pos = document.createElement('div');
    pos.className = 'lesson-position';
    pos.innerHTML = 'Lesson ' + (idx + 1) + ' of ' + order.length +
        ' <span class="sep">\u00b7</span> ' + moduleName;

    // Insert after the header
    const header = modalContent.querySelector('.modal-header');
    if (header && header.nextSibling) {
        modalContent.insertBefore(pos, header.nextSibling);
    }
}

// --- S1.5: Time estimate in modal ---
function injectModalTimeEstimate(lessonId) {
    const modalContent = document.getElementById('lesson-modal')?.querySelector('.modal-content');
    if (!modalContent) return;

    // Remove existing
    const existing = modalContent.querySelector('.modal-time-badge');
    if (existing) existing.remove();

    const config = SUBJECT_CONFIG[currentSubject];
    const subjectLessons = config ? config.lessons() : {};
    const lesson = subjectLessons[lessonId];
    if (!lesson) return;

    const mins = estimateReadingTime(lesson.content);
    const badge = document.createElement('span');
    badge.className = 'modal-time-badge';
    badge.textContent = '\u23f1 ' + mins + 'min';

    // Add to header
    const header = modalContent.querySelector('.modal-header');
    if (header) {
        const closeBtn = header.querySelector('.btn-close');
        if (closeBtn) {
            header.insertBefore(badge, closeBtn);
        } else {
            header.appendChild(badge);
        }
    }
}

// --- S1.6: Confetti (canvas-confetti library) ---
(function() {
    const _prevLaunch = launchConfetti;
    launchConfetti = function() {
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 120,
                spread: 80,
                origin: { y: 0.6 },
                colors: ['#ff6b6b','#ffd93d','#6bcb77','#4d96ff','#c77dff']
            });
        } else {
            _prevLaunch();
        }
    };
})();

// --- S1.8: Prev/Next navigation in modal ---
function injectPrevNextNav(lessonId) {
    const modalContent = document.getElementById('lesson-modal')?.querySelector('.modal-content');
    if (!modalContent) return;

    // Remove existing navs
    modalContent.querySelectorAll('.lesson-nav-bar, .modal-bottom-nav').forEach(el => el.remove());

    const order = getSubjectLessonOrder();
    const idx = order.indexOf(lessonId);
    if (idx < 0) return;

    const config = SUBJECT_CONFIG[currentSubject];
    const subjectLessons = config ? config.lessons() : {};

    const prevId = idx > 0 ? order[idx - 1] : null;
    const nextId = idx < order.length - 1 ? order[idx + 1] : null;
    const prevLesson = prevId ? subjectLessons[prevId] : null;
    const nextLesson = nextId ? subjectLessons[nextId] : null;

    // Top nav bar
    const topNav = document.createElement('div');
    topNav.className = 'lesson-nav-bar';

    const prevBtn = document.createElement('button');
    prevBtn.className = 'lesson-nav-link';
    if (prevLesson) {
        prevBtn.textContent = '\u2190 ' + prevLesson.title.replace(/^\d+\.\d+\s*/, '');
        prevBtn.addEventListener('click', () => navigateToLesson(prevId));
    } else {
        prevBtn.textContent = '\u2190';
        prevBtn.disabled = true;
    }

    const center = document.createElement('span');
    center.className = 'lesson-nav-center';
    center.textContent = 'Lesson ' + (idx + 1) + ' of ' + order.length;

    const nextBtn = document.createElement('button');
    nextBtn.className = 'lesson-nav-link';
    if (nextLesson) {
        nextBtn.textContent = nextLesson.title.replace(/^\d+\.\d+\s*/, '') + ' \u2192';
        nextBtn.addEventListener('click', () => navigateToLesson(nextId));
    } else {
        nextBtn.textContent = '\u2192';
        nextBtn.disabled = true;
    }

    topNav.appendChild(prevBtn);
    topNav.appendChild(center);
    topNav.appendChild(nextBtn);

    // Insert after position indicator or after header
    const posEl = modalContent.querySelector('.lesson-position');
    const insertAfter = posEl || modalContent.querySelector('.modal-header');
    if (insertAfter && insertAfter.nextSibling) {
        modalContent.insertBefore(topNav, insertAfter.nextSibling);
    }

    // Bottom nav
    const bottomNav = document.createElement('div');
    bottomNav.className = 'modal-bottom-nav';

    const botPrev = document.createElement('button');
    botPrev.textContent = '\u2190 Previous';
    if (prevLesson) {
        botPrev.addEventListener('click', () => navigateToLesson(prevId));
    } else {
        botPrev.disabled = true;
    }

    const botNext = document.createElement('button');
    botNext.textContent = 'Next \u2192';
    if (nextLesson) {
        botNext.addEventListener('click', () => navigateToLesson(nextId));
    } else {
        botNext.disabled = true;
    }

    bottomNav.appendChild(botPrev);
    bottomNav.appendChild(botNext);
    modalContent.appendChild(bottomNav);
}

function navigateToLesson(lessonId) {
    // Navigate without closing — reload modal content in place
    startLesson(lessonId);
}

// --- S1.9: XP floating animation ---
function showXPFloat(xpAmount) {
    const el = document.createElement('div');
    el.className = 'xp-float';
    el.textContent = '+' + xpAmount + ' XP \u26a1';
    el.style.left = (window.innerWidth / 2 - 40) + 'px';
    el.style.top = (window.innerHeight / 2 - 20) + 'px';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1500);
}

// --- Patch showXPPopup to also show floating XP ---
(function() {
    const _prev = showXPPopup;
    showXPPopup = function(earned, total) {
        _prev(earned, total);
        showXPFloat(earned);
    };
})();

// --- Patch startLesson to inject Sprint 1 features ---
(function() {
    const _prevStart = startLesson;
    startLesson = function(lessonId) {
        _prevStart(lessonId);

        // Only inject if modal is now active
        const modal = document.getElementById('lesson-modal');
        if (!modal || !modal.classList.contains('active')) return;

        // S1.1: Copy buttons
        addCopyButtons();

        // S1.4: Lesson position indicator
        injectLessonPosition(lessonId);

        // S1.5: Time estimate
        injectModalTimeEstimate(lessonId);

        // S1.8: Prev/Next nav
        injectPrevNextNav(lessonId);

        // S1.2/S1.3: Task checkboxes (after nav so it appears before footer)
        injectTaskChecklist(lessonId);
    };
})();

// --- S1: Arrow key prev/next in modal ---
document.addEventListener('keydown', function(e) {
    const modal = document.getElementById('lesson-modal');
    if (!modal?.classList.contains('active')) return;
    if (e.target.matches('input, textarea, [contenteditable]')) return;
    if (e.key === 'ArrowLeft') {
        const order = getSubjectLessonOrder();
        const idx = order.indexOf(currentLesson);
        if (idx > 0) navigateToLesson(order[idx - 1]);
    }
});

// ============================================================
// SPRINT 2: UI/UX ENHANCEMENTS
// ============================================================

// --- S2.1: Build connected-node sidebar TOC ---
function buildSidebarTOC(subject) {
    const config = SUBJECT_CONFIG[subject];
    if (!config) return;
    const allLessons = config.lessons();
    const completed = JSON.parse(localStorage.getItem(
        (SUBJECT_STORAGE[subject]?.completedLessons) || '[]') || '[]');

    // Find the subject content pane - look for module sections
    const contentEl = document.getElementById(subject + '-content');
    if (!contentEl) return;

    // Find existing sidebar nav for this subject — build inside the sidebar
    // We insert a TOC list below the active sidebar item
    let tocEl = document.getElementById('sidebar-toc-' + subject);
    if (!tocEl) {
        tocEl = document.createElement('div');
        tocEl.id = 'sidebar-toc-' + subject;
        tocEl.className = 'sidebar-toc';
        const tabBtn = document.getElementById('tab-' + subject);
        if (tabBtn && tabBtn.parentNode) {
            tabBtn.parentNode.insertBefore(tocEl, tabBtn.nextSibling);
        }
    }
    tocEl.innerHTML = '';

    // Group lessons by module
    const modules = {};
    contentEl.querySelectorAll('.module').forEach(mod => {
        const h2 = mod.querySelector('.module-header h2');
        const modName = h2 ? h2.textContent.trim() : 'Module';
        const lessonCards = mod.querySelectorAll('.lesson-card[data-lesson]');
        const lessonIds = [...lessonCards].map(c => c.dataset.lesson);
        modules[modName] = lessonIds;
    });

    Object.entries(modules).forEach(([modName, lessonIds]) => {
        const modWrap = document.createElement('div');
        modWrap.className = 'toc-module';

        const modNode = document.createElement('span');
        modNode.className = 'toc-module-node';
        const modLabel = document.createElement('span');
        modLabel.className = 'toc-module-label';
        modLabel.textContent = modName.replace(/^[^\s]+\s*/, '').trim();

        modWrap.appendChild(modNode);
        modWrap.appendChild(modLabel);

        lessonIds.forEach(lid => {
            const lesson = allLessons[lid];
            if (!lesson) return;
            const lessonWrap = document.createElement('div');
            lessonWrap.className = 'toc-lesson';
            lessonWrap.dataset.lessonId = lid;
            if (completed.includes(lid)) lessonWrap.classList.add('completed');
            if (lid === currentLesson) lessonWrap.classList.add('current');

            const node = document.createElement('span');
            node.className = 'toc-lesson-node';
            const btn = document.createElement('button');
            btn.className = 'toc-lesson-btn';
            btn.textContent = lesson.title.replace(/^\d+\.\d+\s*/, '');
            btn.title = lesson.title;
            btn.addEventListener('click', () => startLesson(lid));

            lessonWrap.appendChild(node);
            lessonWrap.appendChild(btn);
            modWrap.appendChild(lessonWrap);
        });

        tocEl.appendChild(modWrap);
    });
}

function updateSidebarTOCState(subject, currentLessonId) {
    const tocEl = document.getElementById('sidebar-toc-' + subject);
    if (!tocEl) return;
    const completed = JSON.parse(localStorage.getItem(
        (SUBJECT_STORAGE[subject]?.completedLessons) || '[]') || '[]');
    tocEl.querySelectorAll('.toc-lesson').forEach(el => {
        const lid = el.dataset.lessonId;
        el.classList.toggle('current', lid === currentLessonId);
        el.classList.toggle('completed', completed.includes(lid));
    });
}

// --- S2.2: 'What you'll learn' callout ---
function injectWhatYoullLearn(lessonContent, lessonId) {
    const contentEl = document.getElementById('lesson-content');
    if (!contentEl) return;

    // Remove existing
    const existing = contentEl.querySelector('.callout-learn');
    if (existing) existing.remove();

    // Extract bullets from h3 headings or first sentences of paragraphs
    const tmp = document.createElement('div');
    tmp.innerHTML = lessonContent;
    const headings = [...tmp.querySelectorAll('h3')].slice(0, 5);
    let bullets = headings.map(h => h.textContent.replace(/^[^\w]+/, '').trim()).filter(Boolean);

    // If few headings, fall back to first sentence of paragraphs
    if (bullets.length < 3) {
        const paras = [...tmp.querySelectorAll('p')].slice(0, 5);
        bullets = paras.map(p => {
            const txt = p.textContent.trim();
            const sent = txt.split(/[.!?]/)[0].trim();
            return sent.length > 20 && sent.length < 90 ? sent : null;
        }).filter(Boolean).slice(0, 5);
    }

    if (!bullets.length) return;

    const callout = document.createElement('div');
    callout.className = 'callout-learn';
    callout.innerHTML = '<strong>In this lesson:</strong><ul>' +
        bullets.map(b => '<li>' + b + '</li>').join('') + '</ul>';

    contentEl.insertBefore(callout, contentEl.firstChild);
}

// --- S2.4: Language label on code blocks ---
function addLanguageLabels() {
    const contentEl = document.getElementById('lesson-content');
    if (!contentEl) return;

    contentEl.querySelectorAll('.code-wrapper').forEach(wrapper => {
        if (wrapper.querySelector('.code-lang-badge')) return;
        const pre = wrapper.querySelector('pre');
        if (!pre) return;

        // Detect language from class or content
        let lang = 'code';
        const code = pre.querySelector('code');
        const cls = (code?.className || pre.className || '');
        const match = cls.match(/language-(\w+)/);
        if (match) {
            lang = match[1];
        } else {
            const text = (code || pre).textContent.trim();
            if (text.startsWith('{') || text.startsWith('[')) lang = 'json';
            else if (text.includes('kubectl') || text.includes('docker ') || text.includes('$ ')) lang = 'bash';
            else if (text.includes('SELECT ') || text.includes('INSERT ') || text.includes('CREATE TABLE')) lang = 'sql';
            else if (text.includes('apiVersion:') || text.includes('kind:')) lang = 'yaml';
            else if (text.includes('interface ') || text.includes(': string') || text.includes(': number')) lang = 'ts';
            else if (text.includes('function') || text.includes('const ') || text.includes('=>')) lang = 'js';
        }

        const badge = document.createElement('span');
        badge.className = 'code-lang-badge';
        badge.textContent = lang;
        wrapper.appendChild(badge);
    });
}

// --- S2.5: Author credit below modal header ---
function injectAuthorCredit(lessonId) {
    const modalContent = document.getElementById('lesson-modal')?.querySelector('.modal-content');
    if (!modalContent) return;
    const existing = modalContent.querySelector('.lesson-author-credit');
    if (existing) existing.remove();

    const config = SUBJECT_CONFIG[currentSubject];
    const lesson = config?.lessons()[lessonId];
    const mins = lesson ? estimateReadingTime(lesson.content) : 5;

    const credit = document.createElement('div');
    credit.className = 'lesson-author-credit';
    credit.innerHTML = '<span>by <strong>DevLearn</strong></span><span class="sep">·</span><span>' + mins + ' min read</span>';

    const posEl = modalContent.querySelector('.lesson-position');
    const navBar = modalContent.querySelector('.lesson-nav-bar');
    const insertAfter = navBar || posEl || modalContent.querySelector('.modal-header');
    if (insertAfter?.nextSibling) {
        modalContent.insertBefore(credit, insertAfter.nextSibling);
    }
}

// --- S2.6: Upgrade modal bottom nav to cards ---
function upgradeNavToCards(lessonId) {
    const modalContent = document.getElementById('lesson-modal')?.querySelector('.modal-content');
    if (!modalContent) return;

    // Remove old bottom nav
    const oldNav = modalContent.querySelector('.modal-bottom-nav');
    if (oldNav) oldNav.remove();

    const order = getSubjectLessonOrder();
    const idx = order.indexOf(lessonId);
    if (idx < 0) return;

    const config = SUBJECT_CONFIG[currentSubject];
    const subjectLessons = config ? config.lessons() : {};
    const prevId = idx > 0 ? order[idx - 1] : null;
    const nextId = idx < order.length - 1 ? order[idx + 1] : null;
    const prevLesson = prevId ? subjectLessons[prevId] : null;
    const nextLesson = nextId ? subjectLessons[nextId] : null;

    const container = document.createElement('div');
    container.className = 'nav-cards-container';

    const prevCard = document.createElement('button');
    prevCard.className = 'nav-card';
    if (prevLesson) {
        prevCard.innerHTML = '<span class="nav-card-direction">← Previous</span>' +
            '<span class="nav-card-title">' + prevLesson.title.replace(/^\d+\.\d+\s*/, '') + '</span>';
        prevCard.addEventListener('click', () => navigateToLesson(prevId));
    } else {
        prevCard.innerHTML = '<span class="nav-card-direction">← Previous</span><span class="nav-card-title">—</span>';
        prevCard.disabled = true;
    }

    const nextCard = document.createElement('button');
    nextCard.className = 'nav-card nav-card-next';
    if (nextLesson) {
        nextCard.innerHTML = '<span class="nav-card-direction">Next →</span>' +
            '<span class="nav-card-title">' + nextLesson.title.replace(/^\d+\.\d+\s*/, '') + '</span>';
        nextCard.addEventListener('click', () => navigateToLesson(nextId));
    } else {
        nextCard.innerHTML = '<span class="nav-card-direction">Next →</span><span class="nav-card-title">—</span>';
        nextCard.disabled = true;
    }

    container.appendChild(prevCard);
    container.appendChild(nextCard);
    modalContent.appendChild(container);
}

// --- S2.7: Schema collapsible panel ---
const SUBJECT_SCHEMAS = {
    postgres: `-- Example tables used in this lesson
CREATE TABLE users (
  id       SERIAL PRIMARY KEY,
  name     VARCHAR(100) NOT NULL,
  email    VARCHAR(255) UNIQUE,
  created  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE orders (
  id         SERIAL PRIMARY KEY,
  user_id    INTEGER REFERENCES users(id),
  total      NUMERIC(10,2),
  status     VARCHAR(50)
);`,
    redis: `# Key/Value
SET user:1001:name "Alice"
GET user:1001:name   → "Alice"

# Hash
HSET user:1001 name "Alice" age 30 city "Tel Aviv"
HGETALL user:1001

# List
RPUSH messages "msg1" "msg2"
LRANGE messages 0 -1

# Set / Sorted Set
SADD tags "nodejs" "redis"
ZADD leaderboard 100 "alice" 85 "bob"`
};

function injectSchemaPanel(subject, lessonId) {
    const schema = SUBJECT_SCHEMAS[subject];
    if (!schema) return;

    const contentEl = document.getElementById('lesson-content');
    if (!contentEl) return;
    if (contentEl.querySelector('.schema-panel')) return;

    const details = document.createElement('details');
    details.className = 'schema-panel';
    details.innerHTML = '<summary>📋 Data Schema</summary>' +
        '<div class="schema-content">' + schema + '</div>';

    // Insert at top, after the callout-learn if it exists
    const learnCallout = contentEl.querySelector('.callout-learn');
    if (learnCallout) {
        learnCallout.insertAdjacentElement('afterend', details);
    } else {
        contentEl.insertBefore(details, contentEl.firstChild);
    }
}

// --- S2.9: 'On this page' anchor nav ---
function injectOnThisPage() {
    const contentEl = document.getElementById('lesson-content');
    if (!contentEl) return;
    contentEl.querySelector('.on-this-page')?.remove();

    const headings = [...contentEl.querySelectorAll('h2, h3')];
    if (headings.length < 3) return; // Only for long lessons

    // Add IDs to headings
    headings.forEach((h, i) => {
        if (!h.id) h.id = 'section-' + i;
    });

    const nav = document.createElement('div');
    nav.className = 'on-this-page';
    nav.innerHTML = '<div class="on-this-page-title">On this page</div>' +
        headings.map(h => '<a href="#' + h.id + '">' + h.textContent.replace(/^[^\w]+/, '').trim() + '</a>').join('');

    nav.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            const target = contentEl.querySelector(a.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    contentEl.insertBefore(nav, contentEl.firstChild);
}

// --- Patch startLesson to inject all Sprint 2 features ---
(function() {
    const _prevS1 = startLesson;
    startLesson = function(lessonId) {
        _prevS1(lessonId);

        const modal = document.getElementById('lesson-modal');
        if (!modal || !modal.classList.contains('active')) return;

        // Get lesson content
        const config = SUBJECT_CONFIG[currentSubject];
        const lesson = config?.lessons()[lessonId];

        // S2.2: What you'll learn callout
        if (lesson) injectWhatYoullLearn(lesson.content, lessonId);

        // S2.4: Language labels (after copy buttons from Sprint 1)
        addLanguageLabels();

        // S2.5: Author credit
        injectAuthorCredit(lessonId);

        // S2.6: Upgrade bottom nav to cards
        upgradeNavToCards(lessonId);

        // S2.7: Schema panel for relevant subjects
        injectSchemaPanel(currentSubject, lessonId);

        // S2.9: On this page nav
        injectOnThisPage();

        // S2.1: Update TOC state
        updateSidebarTOCState(currentSubject, lessonId);
    };
})();

// --- Patch switchSubject to build TOC ---
(function() {
    const _prevSwitch = switchSubject;
    switchSubject = function(subject) {
        _prevSwitch(subject);
        // Hide all TOCs
        document.querySelectorAll('[id^="sidebar-toc-"]').forEach(el => el.style.display = 'none');
        // Show/build for current subject
        setTimeout(() => {
            buildSidebarTOC(subject);
            const tocEl = document.getElementById('sidebar-toc-' + subject);
            if (tocEl) tocEl.style.display = '';
        }, 100);
    };
})();

// Build TOC for default subject on load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (currentSubject) buildSidebarTOC(currentSubject);
    }, 300);
});

// ============================================================
