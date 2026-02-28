// Kubernetes Lessons
// Research sources: kubernetes.io/docs, helm.sh/docs, learnk8s.io — Feb 2026

const kubernetesLessons = {

  'k1-1': {
    title: '1.1 What is Kubernetes?',
    xp: 50,
    content: `
      <div class="hook-story">
        <strong>🎮 July 2016 — Pokémon GO launches.</strong> Within hours, traffic is <strong>50x</strong> the expected load. Servers at any normal company would have collapsed. But Niantic ran on Google Container Engine (powered by Kubernetes). K8s auto-scaled from a handful of nodes to hundreds — automatically, without a single engineer manually provisioning a server. The game survived. <em>That's</em> what Kubernetes does.
      </div>
      <div class="why-matters">
        <strong>Why this matters:</strong> Docker lets you package your app into a container. But who restarts it when it crashes? Who scales it when traffic spikes? Who distributes containers across 50 servers? Kubernetes does all of that — it's the operating system for your infrastructure.
      </div>
      <h3>What is Kubernetes?</h3>
      <p>Kubernetes (K8s) is an open-source platform for <strong>managing containerized workloads at scale</strong>. It was created by Google, based on 15+ years of running their internal system called <strong>Borg</strong> — which runs billions of containers per week. Google open-sourced it in June 2014.</p>
      <p>The name comes from Greek: <em>kubernetes</em> = helmsman or ship pilot. <strong>K8s</strong> is shorthand — count the 8 letters between K and s.</p>
      <h3>What Kubernetes gives you</h3>
      <ul>
        <li><strong>Self-healing</strong> — crashed container? K8s restarts it automatically</li>
        <li><strong>Auto-scaling</strong> — traffic spike? K8s adds more Pods</li>
        <li><strong>Load balancing</strong> — distributes traffic across healthy instances</li>
        <li><strong>Rolling deployments</strong> — deploy new versions with zero downtime</li>
        <li><strong>Secret management</strong> — store passwords and tokens safely</li>
        <li><strong>Storage orchestration</strong> — mount cloud storage, local disks, etc.</li>
      </ul>
      <h3>What Kubernetes is NOT</h3>
      <p>K8s does not build your code, provide logging solutions, or operate at the hardware level. It sits between your containers and your infrastructure.</p>
      <div class="who-uses">
        <h4>🏢 Who runs Kubernetes in production?</h4>
        <div class="company-list">
          <span class="company">Netflix</span>
          <span class="company">Spotify</span>
          <span class="company">Airbnb</span>
          <span class="company">GitHub</span>
          <span class="company">Pinterest</span>
        </div>
        <p class="company-note">Netflix runs 100,000+ containers on K8s. Spotify migrated and cut provisioning time from days to seconds.</p>
      </div>
      <div class="inline-quiz">
        <h4>⚡ Quick Check</h4>
        <p>What problem does Kubernetes primarily solve?</p>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: Docker handles packaging. K8s manages what happens AFTER containers are created.')">Packaging applications into containers</button>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! K8s orchestrates containers across servers — auto-healing, scaling, load balancing — so you do not manage infrastructure manually.')">Orchestrating and managing containers across servers automatically</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: K8s is not a build tool. It manages containers that are already built.')">Compiling and building application code</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: K8s does not replace databases — it can run them in containers though.')">Replacing databases with a distributed key-value store</button>
      </div>
      <div class="teach-it-back">
        <h4>🧠 Teach It Back</h4>
        <p style="font-size:13px;margin-bottom:8px">Explain Kubernetes to someone who only knows Docker. What does K8s add that Docker alone cannot do?</p>
        <textarea placeholder="Docker lets you run one container. Kubernetes..."></textarea>
      </div>
    `
  },

  'k1-2': {
    title: '1.2 Pods — The Smallest Unit',
    xp: 50,
    content: `
      <div class="hook-story">
        <strong>🐳 Common mistake:</strong> Engineers new to K8s try to manage containers directly — like they do with Docker. But K8s does not manage containers. It manages <strong>Pods</strong>. A Pod is a wrapper around one or more containers that share the same network and storage. Understanding this distinction is what separates K8s beginners from practitioners.
      </div>
      <div class="why-matters">
        <strong>Why this matters:</strong> If you try to deploy a container directly, K8s will reject it. You must define a Pod (usually via a Deployment). Everything in K8s runs inside a Pod — every service, every job, every app.
      </div>
      <h3>What is a Pod?</h3>
      <p>A Pod is the <strong>smallest deployable unit</strong> in Kubernetes. It is a group of one or more containers that:</p>
      <ul>
        <li>Share the same <strong>network namespace</strong> (same IP address, same ports)</li>
        <li>Share the same <strong>storage volumes</strong></li>
        <li>Are always <strong>co-scheduled</strong> on the same node</li>
      </ul>
      <p>Most Pods run a single container. Multi-container Pods (sidecar pattern) are advanced — for example, running an app container + a logging sidecar that ships logs to Elasticsearch.</p>
      <h3>Pods are ephemeral</h3>
      <p><strong>Key insight:</strong> Pods are designed to die. When a node fails, the Pod is gone. A Deployment detects this and creates a new Pod on a healthy node. You should never assume a Pod has a stable IP or long life.</p>
      <p>From the K8s docs: <em>"A Pod is not a process, but an environment for running containers. A Pod persists until it is deleted."</em></p>
      <h3>A minimal Pod definition</h3>
      <pre><code>apiVersion: v1
kind: Pod
metadata:
  name: my-app
  labels:
    app: my-app
spec:
  containers:
  - name: my-app
    image: nginx:1.25
    ports:
    - containerPort: 80
    resources:
      requests:
        memory: "64Mi"
        cpu: "250m"
      limits:
        memory: "128Mi"
        cpu: "500m"</code></pre>
      <p>In practice, you almost never create Pods directly. You use a <strong>Deployment</strong>, which manages Pods for you. See lesson 1.3.</p>
      <div class="inline-quiz">
        <h4>⚡ Quick Check</h4>
        <p>You have a Pod with two containers: an app and a sidecar logger. What IP address does each container have?</p>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: Containers in the same Pod share a network namespace — meaning they share an IP.')">Each container gets its own unique IP address</button>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! Containers in the same Pod share one IP. They communicate via localhost and must use different ports.')">Both containers share the same IP address — they use localhost to talk to each other</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: Pods always have an IP. The question is whether each container gets one or they share.')">Pods do not have IP addresses — only Services do</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: K8s assigns IPs from the cluster CIDR range, not the node IP.')">Both containers share the node IP address</button>
      </div>
      <div class="teach-it-back">
        <h4>🧠 Teach It Back</h4>
        <textarea placeholder="A Pod is different from a container because..."></textarea>
      </div>
    `
  },

  'k1-3': {
    title: '1.3 Deployments & ReplicaSets',
    xp: 75,
    content: `
      <div class="hook-story">
        <strong>🔴 The problem with raw Pods:</strong> You manually create a Pod for your API. It runs fine. Then the node it lives on crashes at 2am. The Pod is gone. Your API is down. Nobody recreates it until someone notices in the morning. <strong>This is why you never run raw Pods in production.</strong> A Deployment watches your Pods and ensures the right number are always running — automatically.
      </div>
      <div class="why-matters">
        <strong>Why this matters:</strong> Deployments are the standard way to run stateless applications in K8s. They give you self-healing, rolling updates, and easy rollbacks. 95% of what you deploy to K8s will be a Deployment.
      </div>
      <h3>Deployment → ReplicaSet → Pods</h3>
      <p>The hierarchy works like this:</p>
      <ul>
        <li><strong>Deployment</strong> — you define desired state ("3 replicas of my-app v2")</li>
        <li><strong>ReplicaSet</strong> — ensures exactly N Pods are running at all times (created/managed by Deployment)</li>
        <li><strong>Pods</strong> — the actual running containers</li>
      </ul>
      <p>You rarely interact with ReplicaSets directly. The Deployment manages them for you during rolling updates.</p>
      <h3>A real Deployment</h3>
      <pre><code>apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-server
spec:
  replicas: 3           # Always keep 3 Pods running
  selector:
    matchLabels:
      app: api-server
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1       # Add 1 extra Pod during update
      maxUnavailable: 0 # Never drop below 3 healthy Pods
  template:
    metadata:
      labels:
        app: api-server
    spec:
      containers:
      - name: api-server
        image: myrepo/api-server:v2.1.0
        ports:
        - containerPort: 3000</code></pre>
      <h3>Rolling updates</h3>
      <p>When you update the image version, the Deployment performs a <strong>rolling update</strong>: it creates new Pods with the new version while keeping old ones running. Zero downtime.</p>
      <pre><code># Update the image — triggers rolling update
kubectl set image deployment/api-server api-server=myrepo/api-server:v2.2.0

# Watch it roll out
kubectl rollout status deployment/api-server

# Something wrong? Roll back instantly
kubectl rollout undo deployment/api-server</code></pre>
      <div class="inline-quiz">
        <h4>⚡ Quick Check</h4>
        <p>Your Deployment has <code>replicas: 3</code>. One node crashes, taking 1 Pod with it. What happens next?</p>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: The Deployment controller detects the missing Pod automatically — no human needed.')">Nothing — you must manually create a replacement Pod</button>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! The ReplicaSet controller detects only 2 of 3 Pods are running and schedules a new Pod on a healthy node automatically.')">The ReplicaSet automatically schedules a replacement Pod on a healthy node</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: The Deployment scales back up, not down. It maintains the desired replica count.')">The Deployment scales down to 2 replicas to match reality</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: K8s does not restart nodes — it works around failed nodes by rescheduling Pods.')">K8s automatically restarts the failed node</button>
      </div>
      <div class="teach-it-back">
        <h4>🧠 Teach It Back</h4>
        <textarea placeholder="The difference between a Deployment and a raw Pod is..."></textarea>
      </div>
    `
  },

  'k1-4': {
    title: '1.4 Services — Stable Networking',
    xp: 75,
    content: `
      <div class="hook-story">
        <strong>🌐 The IP problem:</strong> Your frontend needs to talk to your backend API. You know the backend Pod IP — it is 10.1.4.23. You hardcode it. The next morning, the backend Pod crashes and gets recreated. New IP: 10.1.4.87. Your frontend is broken. <strong>This is exactly the problem a Service solves.</strong> A Service gives your set of Pods a stable IP and DNS name that never changes, even as Pods come and go.
      </div>
      <div class="why-matters">
        <strong>Why this matters:</strong> Without Services, you cannot reliably connect components in K8s. Services are the networking glue that makes microservices work — they handle load balancing and stable endpoints automatically.
      </div>
      <h3>How Services work</h3>
      <p>A Service uses a <strong>label selector</strong> to find matching Pods. It maintains a stable IP and DNS name. Traffic to the Service is load-balanced across all healthy matching Pods.</p>
      <h3>Service types</h3>
      <ul>
        <li><strong>ClusterIP</strong> (default) — internal only, accessible within the cluster</li>
        <li><strong>NodePort</strong> — exposes a port on every node IP (useful for development)</li>
        <li><strong>LoadBalancer</strong> — provisions a cloud load balancer (AWS ALB, GCP LB, etc.)</li>
        <li><strong>ExternalName</strong> — maps to an external DNS name</li>
      </ul>
      <pre><code>apiVersion: v1
kind: Service
metadata:
  name: api-service
spec:
  selector:
    app: api-server      # Matches Pods with this label
  type: ClusterIP        # Internal only
  ports:
  - port: 80             # Service port
    targetPort: 3000     # Pod container port</code></pre>
      <p>Now other apps in the cluster can reach your API at <code>http://api-service</code> or <code>http://api-service.default.svc.cluster.local</code> — regardless of how many Pods exist or what their IPs are.</p>
      <h3>Ingress vs Service</h3>
      <p>An <strong>Ingress</strong> is NOT a Service type. It is a layer on top that routes external HTTP/HTTPS traffic to Services based on rules (host, path). Think of it as an nginx config manager for K8s.</p>
      <div class="inline-quiz">
        <h4>⚡ Quick Check</h4>
        <p>Which Service type would you use to expose a web app to the public internet on a cloud provider?</p>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: ClusterIP is internal only — external traffic cannot reach it.')">ClusterIP — it provides a stable internal cluster address</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: NodePort works but is not ideal for production — it exposes a raw node port.')">NodePort — it opens a port on every node</button>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! LoadBalancer provisions a cloud load balancer (AWS ALB, GCP LB) with a public IP automatically.')">LoadBalancer — it provisions a cloud load balancer with a public IP</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: ExternalName maps to an external DNS name — it does not expose Pods to the internet.')">ExternalName — it maps the service to an external DNS name</button>
      </div>
      <div class="teach-it-back">
        <h4>🧠 Teach It Back</h4>
        <textarea placeholder="A Service solves the Pod IP problem by..."></textarea>
      </div>
    `
  },

  'k1-5': {
    title: '1.5 ConfigMaps & Secrets',
    xp: 75,
    content: `
      <div class="hook-story">
        <strong>🔑 The leaked API key disaster:</strong> A developer hardcodes a database password into their Docker image, pushes it to a public registry, and does not notice for 3 days. The image is pulled 847 times. The database is compromised. This happens constantly. <strong>ConfigMaps and Secrets exist so you never bake configuration or credentials into an image.</strong>
      </div>
      <div class="why-matters">
        <strong>Why this matters:</strong> Your app needs different database URLs in dev vs production, different API keys, different feature flags. ConfigMaps and Secrets decouple configuration from code — change them without rebuilding your image.
      </div>
      <h3>ConfigMap — non-sensitive config</h3>
      <pre><code>apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  APP_ENV: "production"
  LOG_LEVEL: "info"
  MAX_CONNECTIONS: "100"</code></pre>
      <h3>Secret — sensitive config</h3>
      <pre><code>apiVersion: v1
kind: Secret
metadata:
  name: db-secret
type: Opaque
stringData:             # K8s base64-encodes automatically
  DATABASE_URL: "postgresql://user:pass@postgres:5432/mydb"
  JWT_SECRET: "super-secret-jwt-key"</code></pre>
      <p><strong>Important:</strong> Secrets are base64-encoded, NOT encrypted. Anyone with cluster access can decode them. For real security, use external secret managers (AWS Secrets Manager, HashiCorp Vault) and tools like External Secrets Operator.</p>
      <h3>Using them in a Deployment</h3>
      <pre><code>spec:
  containers:
  - name: api
    image: myrepo/api:v1
    envFrom:
    - configMapRef:
        name: app-config     # Loads all keys as env vars
    - secretRef:
        name: db-secret      # Same for secrets</code></pre>
      <div class="inline-quiz">
        <h4>⚡ Quick Check</h4>
        <p>Are Kubernetes Secrets encrypted at rest by default?</p>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: Secrets ARE protected from being shown in kubectl describe by default, but the data itself is only base64-encoded, not encrypted.')">Yes — Secrets are fully encrypted and only decryptable by authorized Pods</button>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! Secrets are only base64-encoded by default — not encrypted. Enable etcd encryption or use an external vault for real security.')">No — Secrets are only base64-encoded, not encrypted. Extra steps are needed for real encryption.</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: K8s does store Secrets in etcd — just not encrypted by default.')">Secrets are never stored in etcd — they live only in memory</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: base64 is NOT a form of encryption — it is trivially reversible by anyone.')">Secrets use AES-256 encryption automatically</button>
      </div>
      <div class="teach-it-back">
        <h4>🧠 Teach It Back</h4>
        <textarea placeholder="The difference between a ConfigMap and a Secret is..."></textarea>
      </div>
    `
  },

  'k2-1': {
    title: '2.1 kubectl — Your K8s CLI',
    xp: 100,
    content: `
      <div class="hook-story">
        <strong>🛠️ kubectl is your steering wheel.</strong> The name means "Kube Control". Every K8s engineer spends hours every day in kubectl — checking Pod status, reading logs, exec-ing into containers, applying configs. Knowing it fluently is the difference between troubleshooting in 2 minutes vs 2 hours.
      </div>
      <div class="why-matters">
        <strong>Why this matters:</strong> kubectl is the primary interface to your cluster. Whether you are deploying apps, debugging crashes, or scaling services, every action goes through kubectl.
      </div>
      <h3>Essential commands</h3>
      <pre><code># Get resources
kubectl get pods                          # List all pods in current namespace
kubectl get pods -n kube-system           # List pods in kube-system namespace
kubectl get pods -o wide                  # Show node and IP info
kubectl get all                           # List pods, services, deployments, etc.

# Inspect a resource
kubectl describe pod my-pod               # Full details + events (great for debugging)
kubectl describe deployment my-app

# Logs
kubectl logs my-pod                       # Print logs
kubectl logs my-pod -f                    # Follow/stream logs
kubectl logs my-pod --previous            # Logs from crashed previous instance

# Exec into a running container
kubectl exec -it my-pod -- /bin/sh

# Apply/delete configs
kubectl apply -f deployment.yaml          # Create or update
kubectl delete -f deployment.yaml         # Delete
kubectl delete pod my-pod                 # Delete specific pod (Deployment recreates it)

# Scaling
kubectl scale deployment my-app --replicas=5

# Rolling updates
kubectl set image deployment/my-app my-app=myrepo/my-app:v2
kubectl rollout status deployment/my-app
kubectl rollout undo deployment/my-app    # Rollback</code></pre>
      <h3>Debugging crashed Pods</h3>
      <pre><code># Pod stuck in CrashLoopBackOff?
kubectl describe pod my-pod    # Look at Events section at the bottom
kubectl logs my-pod --previous # What did it print before crashing?

# Pod in Pending state?
kubectl describe pod my-pod    # Usually shows "Insufficient cpu" or "No nodes available"</code></pre>
      <div class="inline-quiz">
        <h4>⚡ Quick Check</h4>
        <p>A Pod is in <strong>CrashLoopBackOff</strong>. What is your first debugging step?</p>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: Deleting and recreating will not fix a bug — it will just keep crashing.')">Delete the Pod and recreate it</button>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! kubectl logs --previous shows what the container printed before it crashed — usually reveals the error.')">Run kubectl logs my-pod --previous to see what the container printed before crashing</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: kubectl get pods only shows status, not the cause of the crash.')">Run kubectl get pods to check the status</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: Scaling up more replicas of a crashing Pod just gives you more crashes.')">Scale the Deployment to 0 then back to 3</button>
      </div>
      <div class="teach-it-back">
        <h4>🧠 Teach It Back</h4>
        <textarea placeholder="If a Pod is crashing, the steps I would take to debug it are..."></textarea>
      </div>
    `
  },

  'k2-2': {
    title: '2.2 Namespaces & RBAC',
    xp: 100,
    content: `
      <div class="hook-story">
        <strong>💥 The accidental prod delete:</strong> A developer runs <code>kubectl delete deployment my-app</code>. They forgot they were connected to the production cluster. The production API goes down for 12 minutes. This is a real scenario that happens at companies without proper RBAC. <strong>Namespaces and RBAC are how you prevent this.</strong>
      </div>
      <div class="why-matters">
        <strong>Why this matters:</strong> As teams grow, you need isolation between environments (dev, staging, prod) and access control so developers cannot accidentally (or maliciously) touch production resources.
      </div>
      <h3>Namespaces</h3>
      <p>Namespaces are virtual clusters within a cluster. They isolate resources by name.</p>
      <pre><code># Create namespaces
kubectl create namespace development
kubectl create namespace staging
kubectl create namespace production

# Work within a namespace
kubectl get pods -n production
kubectl apply -f deploy.yaml -n production

# Set default namespace for your session
kubectl config set-context --current --namespace=development</code></pre>
      <h3>RBAC — Role-Based Access Control</h3>
      <p>RBAC controls who can do what to which resources. The key objects:</p>
      <ul>
        <li><strong>Role</strong> — permissions within a namespace</li>
        <li><strong>ClusterRole</strong> — permissions cluster-wide</li>
        <li><strong>RoleBinding</strong> — grants a Role to a user/group/serviceaccount</li>
      </ul>
      <pre><code># Role: read-only access to pods in "development"
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: development
  name: pod-reader
rules:
- apiGroups: [""]
  resources: ["pods", "pods/log"]
  verbs: ["get", "list", "watch"]
---
# Bind the role to a user
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  namespace: development
  name: read-pods
subjects:
- kind: User
  name: alice
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io</code></pre>
      <div class="inline-quiz">
        <h4>⚡ Quick Check</h4>
        <p>What is the difference between a Role and a ClusterRole?</p>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! A Role is scoped to a single namespace. A ClusterRole applies across the entire cluster and can be bound in specific namespaces or cluster-wide.')">A Role is scoped to one namespace; a ClusterRole applies across all namespaces</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: ClusterRoles are not more powerful within a namespace — the difference is scope, not permission level.')">A ClusterRole has more permissions than a Role within the same namespace</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: Both Roles and ClusterRoles are used for human users AND service accounts.')">ClusterRoles are for service accounts; Roles are for human users</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: Both are part of RBAC. ClusterRole is just a Role with cluster-wide scope.')">A ClusterRole bypasses RBAC and grants admin access</button>
      </div>
      <div class="teach-it-back">
        <h4>🧠 Teach It Back</h4>
        <textarea placeholder="Namespaces and RBAC work together to protect production because..."></textarea>
      </div>
    `
  },

  'k2-3': {
    title: '2.3 Persistent Volumes',
    xp: 100,
    content: `
      <div class="hook-story">
        <strong>💾 The disappearing data problem:</strong> You run PostgreSQL in a Pod. It works great — until the Pod restarts after a crash. When it comes back up, all the database data is gone. Pods are ephemeral — their local storage dies with them. <strong>Persistent Volumes exist so your stateful apps survive Pod restarts.</strong>
      </div>
      <div class="why-matters">
        <strong>Why this matters:</strong> Databases, file uploads, message queue data — anything that must survive Pod restarts needs a PersistentVolume. Without this, every restart wipes your data.
      </div>
      <h3>The storage chain</h3>
      <ul>
        <li><strong>PersistentVolume (PV)</strong> — a piece of storage provisioned in the cluster (cloud disk, NFS, etc.)</li>
        <li><strong>PersistentVolumeClaim (PVC)</strong> — a request for storage by a user ("I need 10Gi of fast SSD")</li>
        <li><strong>StorageClass</strong> — describes the type/quality of storage (fast SSD vs cheap HDD)</li>
      </ul>
      <pre><code># PersistentVolumeClaim — request storage
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: postgres-data
spec:
  accessModes:
  - ReadWriteOnce       # One node can read/write at a time
  storageClassName: fast-ssd
  resources:
    requests:
      storage: 50Gi

---
# Use the PVC in a Pod
spec:
  containers:
  - name: postgres
    image: postgres:16
    volumeMounts:
    - name: data
      mountPath: /var/lib/postgresql/data
  volumes:
  - name: data
    persistentVolumeClaim:
      claimName: postgres-data    # Reference the PVC</code></pre>
      <p>Now when the Pod restarts, K8s remounts the same PVC — data is safe.</p>
      <div class="inline-quiz">
        <h4>⚡ Quick Check</h4>
        <p>A Pod using a PersistentVolumeClaim crashes and is restarted by K8s. What happens to the data on the PVC?</p>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: The PVC persists independently of Pod lifecycle — that is the whole point.')">The data is lost — PVCs are deleted when a Pod crashes</button>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! PVCs have a lifecycle independent of Pods. When the new Pod starts, K8s remounts the same PVC with all data intact.')">The data is safe — the PVC persists and is remounted to the new Pod</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: PVCs do not take snapshots automatically — you need Velero or cloud snapshots for that.')">The data is automatically backed up to a snapshot</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: K8s handles remounting PVCs automatically — no manual intervention needed.')">You must manually remount the PVC to the new Pod</button>
      </div>
      <div class="teach-it-back">
        <h4>🧠 Teach It Back</h4>
        <textarea placeholder="Persistent Volumes solve the stateful app problem in K8s by..."></textarea>
      </div>
    `
  },

  'k2-4': {
    title: '2.4 Ingress Controllers',
    xp: 100,
    content: `
      <div class="hook-story">
        <strong>🌐 50 microservices, 50 load balancers?</strong> You have 50 services. Without Ingress, you need 50 cloud load balancers. On AWS, each LoadBalancer Service costs money and takes minutes to provision. Ingress lets you use <strong>one</strong> load balancer for all services, routing based on URL paths and hostnames. Companies save thousands per month this way.
      </div>
      <div class="why-matters">
        <strong>Why this matters:</strong> Every production K8s cluster uses an Ingress Controller. It is the front door for all HTTP/HTTPS traffic — handling SSL termination, routing, rate limiting, and more.
      </div>
      <h3>How Ingress works</h3>
      <p>An <strong>Ingress Controller</strong> (nginx, Traefik, AWS ALB Ingress) runs as Pods in your cluster. You define <strong>Ingress rules</strong> that tell it how to route traffic. The controller watches for these rules and reconfigures itself automatically.</p>
      <pre><code>apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress
  annotations:
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
spec:
  ingressClassName: nginx
  tls:
  - hosts:
    - api.myapp.com
    secretName: tls-secret        # SSL certificate stored as a Secret
  rules:
  - host: api.myapp.com
    http:
      paths:
      - path: /users
        pathType: Prefix
        backend:
          service:
            name: users-service
            port:
              number: 80
      - path: /orders
        pathType: Prefix
        backend:
          service:
            name: orders-service
            port:
              number: 80</code></pre>
      <p>Now <code>api.myapp.com/users</code> routes to the users microservice and <code>api.myapp.com/orders</code> routes to the orders microservice — through one load balancer.</p>
      <div class="inline-quiz">
        <h4>⚡ Quick Check</h4>
        <p>What is the main advantage of using an Ingress instead of a LoadBalancer Service for each microservice?</p>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: Ingress is for HTTP/HTTPS routing — it does not make traffic faster at the network level.')">Ingress makes network traffic significantly faster</button>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! One Ingress Controller uses one cloud load balancer for all services, saving cost and simplifying TLS/SSL management.')">One cloud load balancer handles all services — massive cost savings and centralized SSL</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: Ingress works at Layer 7 (HTTP/HTTPS). For TCP/UDP you still need LoadBalancer Services.')">Ingress handles all traffic types including TCP, UDP, and WebSockets natively</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: Ingress is an additional component — it does not replace Services, it routes to them.')">Ingress replaces Services entirely so you do not need them anymore</button>
      </div>
      <div class="teach-it-back">
        <h4>🧠 Teach It Back</h4>
        <textarea placeholder="An Ingress Controller is better than multiple LoadBalancer Services because..."></textarea>
      </div>
    `
  },

  'k2-5': {
    title: '2.5 Liveness & Readiness Probes',
    xp: 125,
    content: `
      <div class="hook-story">
        <strong>🧟 The zombie process:</strong> Your Node.js API is running. The process is alive. But it has a memory leak and is now deadlocked — it accepts connections but never responds. K8s thinks it is healthy because the process is running. Users get timeouts. Without a <strong>liveness probe</strong>, K8s has no way to know the app is broken. With one, K8s detects the deadlock and restarts the container automatically.
      </div>
      <div class="why-matters">
        <strong>Why this matters:</strong> Without probes, K8s sends traffic to containers that are not ready yet (causing errors on startup) or keeps sending traffic to containers that are stuck (causing failures). Probes are essential for production reliability.
      </div>
      <h3>Three types of probes</h3>
      <ul>
        <li><strong>Liveness probe</strong> — "Is the app still alive?" If it fails, K8s <em>restarts</em> the container</li>
        <li><strong>Readiness probe</strong> — "Is the app ready for traffic?" If it fails, K8s <em>removes</em> the Pod from the Service (no restart)</li>
        <li><strong>Startup probe</strong> — "Has the app finished starting?" Disables liveness/readiness until it passes (for slow-starting apps)</li>
      </ul>
      <pre><code>spec:
  containers:
  - name: api
    image: myrepo/api:v1
    
    startupProbe:             # Give the app 60s to start
      httpGet:
        path: /healthz
        port: 3000
      failureThreshold: 12    # 12 failures * 5s = 60s max startup time
      periodSeconds: 5

    livenessProbe:            # Restart if unhealthy
      httpGet:
        path: /healthz
        port: 3000
      initialDelaySeconds: 0
      periodSeconds: 10
      failureThreshold: 3

    readinessProbe:           # Remove from Service if not ready
      httpGet:
        path: /ready          # Different endpoint - checks DB connection etc.
        port: 3000
      periodSeconds: 5
      failureThreshold: 2</code></pre>
      <p>From the K8s docs: <em>"Incorrect implementation of liveness probes can lead to cascading failures."</em> A liveness probe that is too aggressive will restart healthy pods under load. Keep them simple and cheap to compute.</p>
      <div class="inline-quiz">
        <h4>⚡ Quick Check</h4>
        <p>Your app starts up in 45 seconds before it can serve traffic. Your liveness probe has <code>initialDelaySeconds: 10</code>. What happens?</p>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! The liveness probe starts checking at 10s. The app is not ready until 45s. K8s sees failures and keeps restarting — a CrashLoopBackOff caused by misconfigured probes. Use a startupProbe to prevent this.')">K8s keeps restarting the container — the liveness probe fails before the app is ready, causing a crash loop</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: K8s does not know the app needs 45s — it just checks at 10s and sees failure.')">K8s waits for the app to signal it is ready before starting the probe</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: The probe checks at 10s — the app is not ready. K8s will restart it.')">The app starts fine — the liveness probe is lenient about startup time</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: The readiness probe also needs correct configuration, but the liveness probe is the one causing restarts here.')">Only the readiness probe is affected — liveness probes ignore startup time</button>
      </div>
      <div class="teach-it-back">
        <h4>🧠 Teach It Back</h4>
        <textarea placeholder="The difference between a liveness and readiness probe is..."></textarea>
      </div>
    `
  },

  'k3-1': {
    title: '3.1 Horizontal Pod Autoscaler',
    xp: 150,
    content: `
      <div class="hook-story">
        <strong>🎮 Back to Pokémon GO:</strong> When the game launched with 50x expected traffic, engineers did not manually log into the cluster and type <code>kubectl scale deployment --replicas=500</code>. The <strong>Horizontal Pod Autoscaler (HPA)</strong> detected CPU usage climbing and automatically added more Pods — within seconds, not minutes. That is the power of HPA.
      </div>
      <div class="why-matters">
        <strong>Why this matters:</strong> Manual scaling is too slow for traffic spikes. HPA responds in seconds based on real metrics. It also scales down during quiet periods, saving money automatically.
      </div>
      <h3>How HPA works</h3>
      <p>HPA watches metrics (CPU, memory, custom metrics) and adjusts the replica count of a Deployment. It checks every 15 seconds by default.</p>
      <pre><code>apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: api-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: api-server
  minReplicas: 2       # Never go below 2 (for availability)
  maxReplicas: 50      # Never exceed 50 (cost control)
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70  # Scale up when avg CPU > 70%</code></pre>
      <pre><code># Check HPA status
kubectl get hpa
# NAME      REFERENCE          TARGETS   MINPODS  MAXPODS  REPLICAS
# api-hpa   Deployment/api     45%/70%   2        50       3</code></pre>
      <p><strong>Requirements:</strong> Resource requests must be set on the containers (HPA calculates percentage based on requested CPU). Metrics Server must be installed in the cluster.</p>
      <div class="inline-quiz">
        <h4>⚡ Quick Check</h4>
        <p>Your HPA has <code>minReplicas: 2, maxReplicas: 20, averageUtilization: 70</code>. At 3am with zero traffic, how many Pods will be running?</p>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: HPA scales down when idle — but only to minReplicas, not zero.')">0 — HPA scales to zero when there is no traffic</button>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! HPA will scale down to minReplicas (2) during quiet periods. It never goes below the minimum, ensuring availability.')">2 — HPA scales down to minReplicas but never below it</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: HPA scales down, not up, during low traffic. 20 would only be reached at peak load.')">20 — HPA maintains maximum replicas for availability</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: HPA does not maintain the initial replica count — it actively adjusts based on metrics.')">3 — HPA keeps the initial replica count unchanged</button>
      </div>
      <div class="teach-it-back">
        <h4>🧠 Teach It Back</h4>
        <textarea placeholder="The Horizontal Pod Autoscaler automatically scales by..."></textarea>
      </div>
    `
  },

  'k3-2': {
    title: '3.2 Helm — Package Manager for K8s',
    xp: 150,
    content: `
      <div class="hook-story">
        <strong>📦 Deploying Prometheus without Helm:</strong> 15+ YAML files, 2000+ lines of configuration, ClusterRoles, ServiceAccounts, ConfigMaps, Deployments, Services, and StatefulSets. All manually written and applied in the right order. <strong>With Helm:</strong> one command — <code>helm install prometheus prometheus-community/kube-prometheus-stack</code>. Done in 30 seconds.
      </div>
      <div class="why-matters">
        <strong>Why this matters:</strong> Almost every production K8s cluster uses Helm. Databases, monitoring stacks, ingress controllers, cert managers — they all ship as Helm charts. You will use Helm constantly.
      </div>
      <h3>Helm's three concepts</h3>
      <ul>
        <li><strong>Chart</strong> — a Helm package (templates + default values). Like a Homebrew formula.</li>
        <li><strong>Repository</strong> — a place to publish and share charts (like npm registry)</li>
        <li><strong>Release</strong> — an installed instance of a chart. Install the same chart twice = two releases.</li>
      </ul>
      <pre><code># Add a repository
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

# Search for charts
helm search repo prometheus

# Install a chart
helm install my-prometheus prometheus-community/kube-prometheus-stack

# Install with custom values
helm install my-prometheus prometheus-community/kube-prometheus-stack \
  --set grafana.enabled=true \
  --set prometheus.retention=30d \
  --namespace monitoring

# Upgrade a release
helm upgrade my-prometheus prometheus-community/kube-prometheus-stack

# Rollback to previous version
helm rollback my-prometheus 1

# Uninstall
helm uninstall my-prometheus</code></pre>
      <p>Helm 4 is the current version (2025). Most charts in the wild still target Helm 3 syntax — both are compatible for most use cases.</p>
      <div class="inline-quiz">
        <h4>⚡ Quick Check</h4>
        <p>You install the same nginx chart twice with different names. How many Helm releases do you have?</p>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: You installed the same chart twice — that creates two separate releases.')">1 — one chart = one release</button>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! Each helm install creates a new release. You can run the same chart multiple times with different configurations — each is its own release.')">2 — each helm install creates a new release regardless of which chart</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: Helm tracks releases by name, not by chart. Two installs = two releases.')">0 — you cannot install the same chart twice</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: Releases are counted per helm install invocation, not per value file.')">It depends on how many --values files you pass</button>
      </div>
      <div class="teach-it-back">
        <h4>🧠 Teach It Back</h4>
        <textarea placeholder="Helm makes deploying complex K8s applications easier by..."></textarea>
      </div>
    `
  },

  'k3-3': {
    title: '3.3 Monitoring with Prometheus & Grafana',
    xp: 175,
    content: `
      <div class="hook-story">
        <strong>📊 "We found out from Twitter."</strong> This is how companies without monitoring discover outages — users tweet before alerts fire. <strong>Prometheus + Grafana</strong> is the de facto observability stack for K8s. Prometheus scrapes metrics from every Pod. Grafana visualizes them. Alertmanager fires Slack/PagerDuty alerts before users notice anything is wrong.
      </div>
      <div class="why-matters">
        <strong>Why this matters:</strong> Flying blind in production is how incidents turn into disasters. Every production K8s cluster needs metrics — CPU, memory, error rates, latency, pod restarts. Prometheus + Grafana is the standard answer.
      </div>
      <h3>How Prometheus works</h3>
      <p>Prometheus uses a <strong>pull model</strong> — it periodically scrapes an HTTP endpoint (<code>/metrics</code>) on each Pod. Apps expose metrics in Prometheus format (plain text key-value). Prometheus stores them as time-series data.</p>
      <pre><code># Install the full stack with Helm
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install monitoring prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --create-namespace \
  --set grafana.adminPassword=your-secure-password</code></pre>
      <h3>Key metrics to watch</h3>
      <ul>
        <li><code>container_cpu_usage_seconds_total</code> — CPU per container</li>
        <li><code>container_memory_working_set_bytes</code> — memory usage</li>
        <li><code>kube_pod_container_status_restarts_total</code> — pod restart count (high = problem)</li>
        <li><code>http_requests_total</code> — request rate (from your app)</li>
        <li><code>http_request_duration_seconds</code> — latency (p50, p95, p99)</li>
      </ul>
      <h3>PromQL basics</h3>
      <pre><code># Request rate per second over last 5 minutes
rate(http_requests_total[5m])

# 95th percentile latency
histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))

# Pods restarting more than 5 times in last hour
increase(kube_pod_container_status_restarts_total[1h]) > 5</code></pre>
      <div class="inline-quiz">
        <h4>⚡ Quick Check</h4>
        <p>Does Prometheus push or pull metrics from your applications?</p>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: Prometheus uses a pull/scrape model — applications expose a /metrics endpoint and Prometheus fetches it.')">Push — applications send metrics to Prometheus on every event</button>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! Prometheus pulls (scrapes) metrics from a /metrics HTTP endpoint on each target at regular intervals — usually every 15-30 seconds.')">Pull — Prometheus scrapes a /metrics endpoint on each target periodically</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: Prometheus does not use a message queue — it makes direct HTTP scrape requests.')">Both — Prometheus uses a message queue to buffer metrics</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Almost! Hint: Prometheus does not use WebSockets — it makes standard HTTP GET requests to /metrics.')">Push via WebSocket — apps stream metrics in real time</button>
      </div>
      <div class="teach-it-back">
        <h4>🧠 Teach It Back</h4>
        <textarea placeholder="Prometheus monitors a K8s cluster by..."></textarea>
      </div>
    `
  },

};

const kubernetesFlashcards = [
  { front: 'What is a Pod in Kubernetes?', back: 'The smallest deployable unit — a wrapper around one or more containers sharing the same network (IP) and storage. Pods are ephemeral and managed by Deployments.' },
  { front: 'What does a Deployment do?', back: 'Manages ReplicaSets which ensure a desired number of Pod replicas are always running. Handles rolling updates and rollbacks automatically.' },
  { front: 'What is a Kubernetes Service?', back: 'Provides a stable IP address and DNS name for a set of Pods. Load-balances traffic across healthy matching Pods. Types: ClusterIP, NodePort, LoadBalancer.' },
  { front: 'ClusterIP vs LoadBalancer Service?', back: 'ClusterIP: internal-only, accessible within the cluster. LoadBalancer: provisions a cloud load balancer with a public IP for external access.' },
  { front: 'What is a ConfigMap?', back: 'Stores non-sensitive configuration as key-value pairs (env vars, config files). Decouples config from container images.' },
  { front: 'Are Kubernetes Secrets encrypted?', back: 'No — by default Secrets are only base64-encoded (not encrypted). Enable etcd encryption or use Vault/External Secrets Operator for real security.' },
  { front: 'Liveness vs Readiness probe?', back: 'Liveness: is the container still alive? Failure = container restart. Readiness: is the container ready for traffic? Failure = removed from Service endpoints (no restart).' },
  { front: 'What is an HPA?', back: 'Horizontal Pod Autoscaler — automatically scales Pod replicas based on CPU/memory/custom metrics. Checks every 15s, respects minReplicas and maxReplicas.' },
  { front: 'What is a PersistentVolumeClaim?', back: 'A request for storage by a user. K8s binds it to a PersistentVolume. Data survives Pod restarts and rescheduling.' },
  { front: 'What is Helm?', back: 'Package manager for Kubernetes. Charts = packages, Repository = chart registry, Release = installed instance. helm install/upgrade/rollback.' },
  { front: 'What is an Ingress Controller?', back: 'Manages HTTP/HTTPS routing into the cluster. One cloud load balancer handles all services based on host/path rules. Common: nginx, Traefik, AWS ALB.' },
  { front: 'What does kubectl rollout undo do?', back: 'Rolls back a Deployment to its previous revision. K8s keeps a history of ReplicaSets, making rollbacks instant.' },
];
