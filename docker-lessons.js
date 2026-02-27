const dockerLessons = {
    'd1-1': { title: '1.1 What is Docker?', xp: 50, content: `
        <div class="hook-story">🚀 <strong>Real World:</strong> "It works on my machine!" — the most dreaded phrase in software development. When Spotify deploys to production, code runs in the exact same environment it ran in development. No surprises. No "but it worked locally!" Docker is why.</div>
        <div class="why-matters">💡 <strong>Why this matters:</strong> Docker is on every job description. Every modern backend runs in containers. Understanding Docker is non-negotiable for any developer in 2025.</div>
        <h3>🐳 What is Docker?</h3>
        <p>Docker is an open platform that packages your application and ALL its dependencies into a <strong>container</strong> — a standardized unit that runs identically everywhere.</p>
        <ul>
            <li>📦 <strong>Container</strong>: your app + its runtime + its libraries, all bundled together</li>
            <li>🔒 <strong>Isolated</strong>: doesn't affect the host machine or other containers</li>
            <li>⚡ <strong>Lightweight</strong>: shares host OS kernel (unlike VMs which need a full OS each)</li>
            <li>🌍 <strong>Portable</strong>: runs the same on laptop, server, or cloud</li>
        </ul>
        <h3>🆚 Containers vs Virtual Machines</h3>
        <table style="width:100%;border-collapse:collapse;font-size:13px">
            <tr style="background:#4d96ff;color:white"><th style="padding:8px">Property</th><th style="padding:8px">Container</th><th style="padding:8px">Virtual Machine</th></tr>
            <tr style="background:#f8f9fa"><td style="padding:8px">Startup time</td><td style="padding:8px">Milliseconds</td><td style="padding:8px">Minutes</td></tr>
            <tr><td style="padding:8px">Size</td><td style="padding:8px">MBs</td><td style="padding:8px">GBs</td></tr>
            <tr style="background:#f8f9fa"><td style="padding:8px">OS</td><td style="padding:8px">Shares host kernel</td><td style="padding:8px">Full OS per VM</td></tr>
            <tr><td style="padding:8px">Isolation</td><td style="padding:8px">Process-level</td><td style="padding:8px">Hardware-level</td></tr>
        </table>
        <div class="inline-quiz"><h4>🧠 Quick Check</h4><p><strong>What problem does Docker primarily solve?</strong></p>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! Docker ensures code runs the same everywhere — development, staging, production.')">Environment inconsistency ("works on my machine")</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Docker isn\'t primarily about speed — it\'s about consistency and portability.')">Making code run faster</button>
        <div class="quiz-feedback"></div></div>
        <div class="teach-it-back"><h4>🧠 Teach It Back</h4><p style="font-size:13px;margin-bottom:8px">Explain Docker in one sentence to a non-developer.</p><textarea placeholder="Docker is..."></textarea></div>
    `},
    'd1-2': { title: '1.2 Images vs Containers', xp: 50, content: `
        <div class="lesson-recap">🔄 <strong>Last lesson:</strong> Docker solves "works on my machine" by bundling app + dependencies into a container. Lighter and faster than VMs.</div>
        <div class="hook-story">🚀 <strong>Real World:</strong> Netflix runs 100,000+ containers simultaneously in production. Each container is created from an image. When they need to scale — say a hit show drops — they spin up 1,000 new containers from the same image in seconds.</div>
        <div class="why-matters">💡 <strong>Why this matters:</strong> Understanding images vs containers is the foundation of everything in Docker. Get this wrong and nothing else makes sense.</div>
        <h3>🖼️ Image = Blueprint. Container = Running Instance.</h3>
        <ul>
            <li><strong>Image</strong>: read-only template. Like a class in OOP. Can create many containers from one image.</li>
            <li><strong>Container</strong>: a running instance of an image. Like an object instantiated from a class.</li>
            <li><strong>Layered</strong>: images are built in layers. Change one line of Dockerfile = only that layer rebuilds.</li>
        </ul>
        <pre><code># Pull image from Docker Hub
docker pull nginx:latest

# Create + run a container from the image
docker run -d -p 8080:80 nginx:latest

# List running containers
docker ps

# Stop a container
docker stop [container-id]

# List all images
docker images</code></pre>
        <div class="who-uses"><h4>🏢 Who uses Docker images?</h4><div class="company-list"><span class="company">Netflix</span><span class="company">Spotify</span><span class="company">PayPal</span><span class="company">GitHub</span></div><p class="company-note">Docker Hub has 100,000+ public images. Every major database, web server, and language runtime has an official image.</p></div>
        <div class="inline-quiz"><h4>🧠 Quick Check</h4><p><strong>What is the relationship between an image and a container?</strong></p>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! Image = blueprint (class). Container = running instance (object). Many containers can run from one image.')">An image is a blueprint; a container is a running instance of that image</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','It\'s the opposite — images are read-only templates, containers are the running instances.')">A container is a blueprint; an image is a running instance</button>
        <div class="quiz-feedback"></div></div>
        <div class="teach-it-back"><h4>🧠 Teach It Back</h4><p style="font-size:13px;margin-bottom:8px">What is the difference between a Docker image and a Docker container?</p><textarea placeholder="An image is... A container is..."></textarea></div>
    `},
    'd1-3': { title: '1.3 Your First Dockerfile', xp: 75, content: `
        <div class="lesson-recap">🔄 <strong>Last lesson:</strong> Image = blueprint (read-only). Container = running instance. Many containers from one image.</div>
        <div class="hook-story">🚀 <strong>Real World:</strong> PayPal reduced their build times from 5 hours to 40 minutes by containerizing their apps with Docker. A Dockerfile is the recipe — it defines exactly what goes into your container, so builds are repeatable and fast.</div>
        <div class="why-matters">💡 <strong>Why this matters:</strong> The Dockerfile is how you build your own images. Every production Docker deployment starts here.</div>
        <h3>📝 Anatomy of a Dockerfile</h3>
        <pre><code># Start from an official base image
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy dependency files FIRST (layer caching optimization!)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Tell Docker which port the app uses (documentation only)
EXPOSE 3000

# Command to run when container starts
CMD ["node", "server.js"]</code></pre>
        <h3>🔑 Key Instructions</h3>
        <ul>
            <li><code>FROM</code>: base image to start from</li>
            <li><code>WORKDIR</code>: set working directory</li>
            <li><code>COPY</code>: copy files from host to container</li>
            <li><code>RUN</code>: execute command during build</li>
            <li><code>CMD</code>: default command when container starts</li>
            <li><code>EXPOSE</code>: document which port app listens on</li>
        </ul>
        <h3>⚡ Layer Caching Trick</h3>
        <p>Copy <code>package.json</code> before copying your app code. If your code changes but dependencies don't, Docker reuses the cached <code>npm install</code> layer. Builds go from 3 min → 10 seconds.</p>
        <pre><code># Build your image
docker build -t my-app:latest .

# Run it
docker run -p 3000:3000 my-app:latest</code></pre>
        <div class="inline-quiz"><h4>🧠 Quick Check</h4><p><strong>Why should you COPY package.json before COPY . . in a Dockerfile?</strong></p>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! Docker caches each layer. Copying package.json first means npm install is only re-run when dependencies change, not on every code change.')">Layer caching — npm install only re-runs when dependencies change, not on every code change</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Node.js doesn\'t require this — it\'s a Docker optimization for build speed.')">Node.js requires package.json before source files</button>
        <div class="quiz-feedback"></div></div>
        <div class="teach-it-back"><h4>🧠 Teach It Back</h4><p style="font-size:13px;margin-bottom:8px">What does each of these do: FROM, RUN, COPY, CMD?</p><textarea placeholder="FROM: ... RUN: ... COPY: ... CMD: ..."></textarea></div>
    `},
    'd1-4': { title: '1.4 Core Docker Commands', xp: 100, content: `
        <div class="lesson-recap">🔄 <strong>Last lesson:</strong> Dockerfile = recipe to build an image. Key: COPY package.json first for layer caching. Build with docker build, run with docker run.</div>
        <div class="hook-story">🚀 <strong>Real World:</strong> Every developer working with Docker uses these 10 commands daily. From Spotify engineers to GitHub developers — the CLI is universal.</div>
        <div class="why-matters">💡 <strong>Why this matters:</strong> These commands are your daily toolkit. Know them and you can work with any Docker setup.</div>
        <h3>📋 Essential Docker Commands</h3>
        <pre><code># IMAGES
docker pull nginx:latest          # Download image from registry
docker images                     # List local images
docker rmi nginx:latest           # Remove an image
docker build -t my-app:1.0 .      # Build image from Dockerfile

# CONTAINERS
docker run -d -p 8080:80 nginx    # Run detached, map ports
docker run -it ubuntu bash        # Run interactive shell
docker ps                         # List running containers
docker ps -a                      # List ALL containers (incl. stopped)
docker stop [id]                  # Stop container gracefully
docker rm [id]                    # Remove stopped container
docker logs [id]                  # View container logs
docker logs -f [id]               # Follow logs (like tail -f)
docker exec -it [id] bash         # Shell into running container

# CLEANUP
docker system prune               # Remove all unused resources
docker volume ls                  # List volumes</code></pre>
        <h3>🔑 Port Mapping</h3>
        <p><code>-p 8080:80</code> means: <strong>host port 8080</strong> → <strong>container port 80</strong>. Your app inside the container listens on 80. You access it from outside on 8080.</p>
        <div class="inline-quiz"><h4>🧠 Quick Check</h4><p><strong>What does docker run -p 3000:8080 mean?</strong></p>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','It\'s the other way — host:container. So 3000 is on your machine, 8080 is inside the container.')">The container listens on 3000, accessible on host port 8080</button>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! Format is host:container. Your browser hits localhost:3000 which maps to port 8080 inside the container.')">Your machine port 3000 maps to container port 8080</button>
        <div class="quiz-feedback"></div></div>
        <div class="teach-it-back"><h4>🧠 Teach It Back</h4><p style="font-size:13px;margin-bottom:8px">What command would you use to see the logs of a running container?</p><textarea placeholder="I would use..."></textarea></div>
    `},
    'd1-5': { title: '1.5 Volumes & Persistence', xp: 100, content: `
        <div class="lesson-recap">🔄 <strong>Last lesson:</strong> Core commands — docker run, docker ps, docker logs, docker exec. Port mapping: host:container.</div>
        <div class="hook-story">🚀 <strong>Real World:</strong> A startup ran their PostgreSQL database in Docker with no volumes. Their server restarted — all data gone. Containers are ephemeral by default. Volumes are how Docker persists data across container restarts and deletions.</div>
        <div class="why-matters">💡 <strong>Why this matters:</strong> Without volumes, every container restart loses all data. This is critical for databases and any stateful service.</div>
        <h3>💾 Two Ways to Persist Data</h3>
        <h4>1. Named Volumes (recommended for databases)</h4>
        <pre><code># Create a named volume
docker volume create postgres-data

# Run PostgreSQL with the volume
docker run -d \
  -e POSTGRES_PASSWORD=secret \
  -v postgres-data:/var/lib/postgresql/data \
  postgres:15

# Data persists even if container is deleted!</code></pre>
        <h4>2. Bind Mounts (best for development)</h4>
        <pre><code># Mount your local directory into container
docker run -d \
  -p 3000:3000 \
  -v $(pwd):/app \
  my-node-app

# Now local code changes appear inside container immediately!
# Great for development hot-reload</code></pre>
        <div class="inline-quiz"><h4>🧠 Quick Check</h4><p><strong>You're running a MySQL database in Docker for production. What do you need?</strong></p>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! Without a volume, all database data is lost when the container stops or restarts. Always use volumes for stateful services.')">A named volume to persist data across container restarts</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Port mapping exposes the database but doesn\'t persist data. You still need a volume.')">Just port mapping (-p 3306:3306)</button>
        <div class="quiz-feedback"></div></div>
        <div class="teach-it-back"><h4>🧠 Teach It Back</h4><p style="font-size:13px;margin-bottom:8px">When would you use a named volume vs a bind mount?</p><textarea placeholder="Named volume: ... Bind mount: ..."></textarea></div>
    `},
    'd2-1': { title: '2.1 Docker Compose', xp: 100, content: `
        <div class="lesson-recap">🔄 <strong>Module 1 complete!</strong> Images = blueprints. Containers = running instances. Dockerfile = recipe. Core commands. Volumes = persistence.</div>
        <div class="hook-story">🚀 <strong>Real World:</strong> A typical web app needs: Node.js server + PostgreSQL + Redis + Nginx. Without Docker Compose, you'd run 4 separate docker run commands with 10 flags each, in the right order, every time. Compose does it all in one command: docker compose up.</div>
        <div class="why-matters">💡 <strong>Why this matters:</strong> Docker Compose is the standard way to run multi-container applications. Every team uses it for local development.</div>
        <h3>📄 docker-compose.yml</h3>
        <pre><code>version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/myapp
      - REDIS_URL=redis://cache:6379
    depends_on:
      - db
      - cache
    volumes:
      - .:/app  # hot reload in dev

  db:
    image: postgres:15
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: myapp
    volumes:
      - postgres-data:/var/lib/postgresql/data

  cache:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres-data:</code></pre>
        <pre><code>docker compose up -d        # Start all services
docker compose down         # Stop all services
docker compose logs -f app  # Follow app logs
docker compose ps           # List service status</code></pre>
        <div class="inline-quiz"><h4>🧠 Quick Check</h4><p><strong>In Docker Compose, what does depends_on do?</strong></p>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! depends_on ensures db and cache containers START before app. Note: it doesn\'t wait for them to be ready, just started.')">Ensures those services start before this service</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','depends_on controls start order, not networking. All services in Compose can communicate by service name.')">Links the network between services</button>
        <div class="quiz-feedback"></div></div>
        <div class="teach-it-back"><h4>🧠 Teach It Back</h4><p style="font-size:13px;margin-bottom:8px">What problem does Docker Compose solve?</p><textarea placeholder="Without Compose..."></textarea></div>
    `},
    'd2-2': { title: '2.2 Docker Networking', xp: 100, content: `
        <div class="lesson-recap">🔄 <strong>Last lesson:</strong> Docker Compose — one YAML file defines all services. docker compose up starts everything. Services communicate by name.</div>
        <div class="hook-story">🚀 <strong>Real World:</strong> In a Docker Compose setup, your Node app talks to PostgreSQL using db:5432 — not localhost:5432. Docker creates an internal DNS so containers find each other by service name. This is how microservices communicate at every company.</div>
        <div class="why-matters">💡 <strong>Why this matters:</strong> Understanding Docker networking explains why localhost doesn't work between containers — and how to fix it.</div>
        <h3>🌐 Docker Network Types</h3>
        <ul>
            <li><strong>bridge</strong> (default): isolated network. Containers on same bridge can communicate by name.</li>
            <li><strong>host</strong>: container uses host's network directly. No isolation.</li>
            <li><strong>none</strong>: no networking. Completely isolated.</li>
        </ul>
        <pre><code># Compose automatically creates a bridge network
# Services communicate by SERVICE NAME, not localhost!

# In your Node app:
# ✅ CORRECT: postgres://db:5432/myapp
# ❌ WRONG:   postgres://localhost:5432/myapp (won't work!)

# Create a custom network
docker network create my-network

# Run containers on same network
docker run -d --network my-network --name api my-api
docker run -d --network my-network --name db postgres</code></pre>
        <div class="inline-quiz"><h4>🧠 Quick Check</h4><p><strong>Your Node.js container can't connect to postgres://localhost:5432. Why?</strong></p>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! localhost inside a container refers to the container itself, not the host. Use the service name (db) instead.')">localhost refers to the container itself, not other containers. Use the service name instead.</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','PostgreSQL default port is 5432 — the port isn\'t the problem here.')">Wrong port — PostgreSQL uses port 3306</button>
        <div class="quiz-feedback"></div></div>
        <div class="teach-it-back"><h4>🧠 Teach It Back</h4><p style="font-size:13px;margin-bottom:8px">Why can't containers use localhost to communicate with each other?</p><textarea placeholder="localhost inside a container means..."></textarea></div>
    `},
    'd2-3': { title: '2.3 Environment Variables & Secrets', xp: 100, content: `
        <div class="lesson-recap">🔄 <strong>Last lesson:</strong> Docker networking — use service names not localhost. bridge network = default Compose network.</div>
        <div class="hook-story">🚀 <strong>Real World:</strong> A developer accidentally committed their database password in a Dockerfile. It was scraped from GitHub within minutes by bots. Environment variables keep secrets out of your code and image layers.</div>
        <div class="why-matters">💡 <strong>Why this matters:</strong> Hardcoding secrets in Dockerfiles or code is a security disaster. Env vars are the standard solution.</div>
        <h3>🔐 Environment Variables in Docker</h3>
        <pre><code># Option 1: inline (only for non-secrets)
docker run -e NODE_ENV=production my-app

# Option 2: .env file (add to .gitignore!)
# .env file:
DATABASE_URL=postgres://user:secret@db:5432/myapp
JWT_SECRET=my-very-secret-key

# docker-compose.yml:
services:
  app:
    env_file:
      - .env</code></pre>
        <h3>⚠️ Never Do This</h3>
        <pre><code># ❌ WRONG — secret baked into image layer, visible in docker history!
RUN npm install
ENV DATABASE_PASSWORD=mysecret

# ✅ CORRECT — pass at runtime
docker run -e DATABASE_PASSWORD=$DATABASE_PASSWORD my-app</code></pre>
        <div class="inline-quiz"><h4>🧠 Quick Check</h4><p><strong>Why shouldn't you put secrets directly in your Dockerfile with ENV?</strong></p>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! ENV values are baked into image layers and visible via docker history. Anyone with access to the image can read them.')">Secrets are baked into the image and visible via docker history</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Docker does support ENV — that\'s not the reason to avoid it for secrets.')">Docker doesn\'t support ENV for secrets</button>
        <div class="quiz-feedback"></div></div>
        <div class="teach-it-back"><h4>🧠 Teach It Back</h4><p style="font-size:13px;margin-bottom:8px">What is the safest way to pass secrets to a Docker container?</p><textarea placeholder="The safest approach is..."></textarea></div>
    `},
    'd2-4': { title: '2.4 Docker Hub & Registries', xp: 75, content: `
        <div class="lesson-recap">🔄 <strong>Last lesson:</strong> Never hardcode secrets in Dockerfile. Use .env files or runtime env vars passed with -e.</div>
        <div class="hook-story">🚀 <strong>Real World:</strong> When you deploy to AWS ECS, Kubernetes, or any cloud platform, it pulls your image from a registry. Docker Hub is the public one. Companies use private registries (AWS ECR, GitHub Container Registry) so their proprietary images aren't public.</div>
        <div class="why-matters">💡 <strong>Why this matters:</strong> Pushing to a registry is how you ship your containerized app to any environment.</div>
        <pre><code># Login to Docker Hub
docker login

# Tag your image for Docker Hub
docker tag my-app:latest yourusername/my-app:latest

# Push to Docker Hub
docker push yourusername/my-app:latest

# Pull from Docker Hub (anyone can now)
docker pull yourusername/my-app:latest

# GitHub Container Registry (private)
docker tag my-app ghcr.io/yourusername/my-app:v1.0
docker push ghcr.io/yourusername/my-app:v1.0</code></pre>
        <div class="inline-quiz"><h4>🧠 Quick Check</h4><p><strong>What does docker push do?</strong></p>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! docker push uploads your local image to a registry so it can be pulled and run on any machine.')">Uploads your local image to a registry</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','docker push uploads TO a registry. docker pull downloads FROM a registry.')">Downloads an image from a registry</button>
        <div class="quiz-feedback"></div></div>
        <div class="teach-it-back"><h4>🧠 Teach It Back</h4><p style="font-size:13px;margin-bottom:8px">What are the steps to share your Docker image with a colleague?</p><textarea placeholder="I would..."></textarea></div>
    `},
    'd2-5': { title: '2.5 Multi-Stage Builds', xp: 125, content: `
        <div class="lesson-recap">🔄 <strong>Last lesson:</strong> Registries store images. docker push uploads, docker pull downloads. Docker Hub = public, ECR/GHCR = private.</div>
        <div class="hook-story">🚀 <strong>Real World:</strong> A Node.js app naively Dockerized was 1.2GB. After multi-stage build: 85MB. That's 14x smaller. Smaller images = faster pulls, faster deployments, less attack surface. Spotify-scale means millions of image pulls — every MB matters.</div>
        <div class="why-matters">💡 <strong>Why this matters:</strong> Multi-stage builds are production best practice. They separate build dependencies from runtime — your final image contains only what it needs to run.</div>
        <h3>🏗️ Multi-Stage Build Pattern</h3>
        <pre><code># Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build  # Compile TypeScript, bundle, etc.

# Stage 2: Production (only what we need to RUN)
FROM node:20-alpine AS production
WORKDIR /app
# Only copy built output + production deps
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm ci --production  # No devDependencies!
EXPOSE 3000
CMD ["node", "dist/server.js"]

# Result: dev tools, TypeScript compiler, test libs = NOT in final image</code></pre>
        <div class="inline-quiz"><h4>🧠 Quick Check</h4><p><strong>What is the main benefit of a multi-stage Docker build?</strong></p>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! Build tools (compilers, dev deps) are only in intermediate stages. The final image only contains what\'s needed to RUN the app — much smaller.')">Smaller final image — build tools are excluded from the production image</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Multi-stage builds don\'t specifically speed up the build process — they reduce final image size.')">Faster build times</button>
        <div class="quiz-feedback"></div></div>
        <div class="teach-it-back"><h4>🧠 Teach It Back</h4><p style="font-size:13px;margin-bottom:8px">Why does a multi-stage build result in a smaller image?</p><textarea placeholder="In a multi-stage build..."></textarea></div>
    `},
    'd2-6': { title: '2.6 Quiz: Docker Patterns', xp: 150, content: `
        <div class="lesson-recap">🔄 <strong>Module 2 summary:</strong> Compose (multi-container), Networking (use service names), Secrets (env vars, not Dockerfile), Registries (push/pull), Multi-stage (smaller images).</div>
        <h3>📝 Pattern Quiz</h3>
        <div class="inline-quiz"><h4>Q1</h4><p><strong>Your app can't connect to postgres://localhost:5432 inside Docker Compose. Fix?</strong></p>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Use the service name! In Compose, services find each other by name on the internal bridge network.')">Change to postgres://db:5432 (use service name)</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','The port is correct for PostgreSQL. The hostname is the issue.')">Change port to 3306</button>
        <div class="quiz-feedback"></div></div>
        <div class="inline-quiz"><h4>Q2</h4><p><strong>Your Node.js Docker image is 1.4GB. Best fix?</strong></p>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Deleting logs helps slightly but won\'t reduce image size from 1.4GB to something reasonable.')">Delete log files</button>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Multi-stage build removes build tools and devDependencies. Plus switch to alpine base image. Can reduce 1.4GB → 80MB.')">Multi-stage build + alpine base image</button>
        <div class="quiz-feedback"></div></div>
        <div class="inline-quiz"><h4>Q3</h4><p><strong>You need your Dockerfile to use a DB password. Safest approach?</strong></p>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','ENV in Dockerfile bakes the secret into the image — visible in docker history. Never do this.')">ENV DB_PASSWORD=mypassword in Dockerfile</button>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Pass at runtime with -e or via .env file (add to .gitignore). Never bake secrets into images.')">Pass via -e flag at runtime or env_file in Compose</button>
        <div class="quiz-feedback"></div></div>
        <h3>✅ Module 2 Complete! Next: Build real systems.</h3>
    `},
    'd3-1': { title: '3.1 Containerize a Node.js App', xp: 150, content: `
        <div class="lesson-recap">🔄 <strong>Module 2 complete!</strong> Compose, networking, secrets, registries, multi-stage builds. Now let's build.</div>
        <div class="hook-story">🚀 <strong>Real World:</strong> This is the exact pattern every Node.js backend at GitHub, Shopify, and Stripe uses to containerize their services.</div>
        <h3>💻 Full Node.js + Express Dockerized</h3>
        <pre><code># server.js
const express = require('express');
const app = express();
app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.listen(3000);</code></pre>
        <pre><code># .dockerignore (like .gitignore for Docker)
node_modules
.env
.git
*.log
dist</code></pre>
        <pre><code># Dockerfile (multi-stage, production-ready)
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-alpine AS production
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
EXPOSE 3000
CMD ["node", "server.js"]</code></pre>
        <pre><code>docker build -t node-app .
docker run -p 3000:3000 node-app
curl http://localhost:3000/health</code></pre>
        <div class="teach-it-back"><h4>🧠 Teach It Back</h4><p style="font-size:13px;margin-bottom:8px">What does .dockerignore do and why is it important?</p><textarea placeholder=".dockerignore..."></textarea></div>
    `},
    'd3-2': { title: '3.2 Build: Full Stack with Compose', xp: 150, content: `
        <div class="lesson-recap">🔄 <strong>Last lesson:</strong> Containerized Node.js app with .dockerignore, multi-stage build, and non-root user for security.</div>
        <div class="hook-story">🚀 <strong>Real World:</strong> Every developer joining a team that uses Docker can get the full stack running with one command: docker compose up. No "install Postgres", no "configure Redis". Just works.</div>
        <h3>💻 Full Stack: Node + Postgres + Redis</h3>
        <pre><code>version: '3.8'
services:
  app:
    build: .
    ports: ["3000:3000"]
    environment:
      DATABASE_URL: postgres://user:pass@db:5432/myapp
      REDIS_URL: redis://cache:6379
    depends_on: [db, cache]
    volumes: [.:/app, /app/node_modules]

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: myapp
    volumes: [pgdata:/var/lib/postgresql/data]
    ports: ["5432:5432"]

  cache:
    image: redis:7-alpine
    ports: ["6379:6379"]

volumes:
  pgdata:</code></pre>
        <pre><code>docker compose up -d   # Start everything
docker compose logs -f app  # Watch logs
docker compose exec app bash  # Shell into app container</code></pre>
        <div class="teach-it-back"><h4>🧠 Teach It Back</h4><p style="font-size:13px;margin-bottom:8px">What's the advantage of the volume .:/app in development?</p><textarea placeholder="The .:/app volume..."></textarea></div>
    `},
    'd3-3': { title: '3.3 Build: CI/CD with Docker', xp: 200, content: `
        <div class="lesson-recap">🔄 <strong>Last lesson:</strong> Full-stack docker compose — one command runs everything. Volumes for hot-reload in dev.</div>
        <div class="hook-story">🚀 <strong>Real World:</strong> GitHub Actions + Docker = the most common CI/CD pipeline in 2025. Push code → GitHub builds Docker image → pushes to registry → deploys. This is the pipeline used by millions of projects.</div>
        <h3>💻 GitHub Actions CI/CD Pipeline</h3>
        <pre><code># .github/workflows/deploy.yml
name: Build and Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Login to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Build and push image
        uses: docker/build-push-action@v5
        with:
          push: true
          tags: ghcr.io/${{ github.repository }}:latest
          cache-from: type=gha     # GitHub Actions cache
          cache-to: type=gha,mode=max</code></pre>
        <div class="teach-it-back"><h4>🧠 Teach It Back</h4><p style="font-size:13px;margin-bottom:8px">What happens automatically when you push to main with this pipeline?</p><textarea placeholder="When I push to main..."></textarea></div>
    `},
    'd4-1': { title: '4.1 Docker Security Best Practices', xp: 125, content: `
        <div class="lesson-recap">🔄 <strong>Module 3 complete!</strong> Built containerized Node app, full-stack Compose, CI/CD pipeline. Now: production hardening.</div>
        <div class="hook-story">🚀 <strong>Real World:</strong> A container running as root has full control of the host if it escapes. Every major security breach involving Docker was running containers as root. One change prevents most container escape attacks.</div>
        <div class="why-matters">💡 <strong>Why this matters:</strong> Docker security is not optional in production. These are the 5 rules every security-conscious team follows.</div>
        <h3>🔒 5 Docker Security Rules</h3>
        <pre><code># 1. Never run as root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# 2. Use specific image tags (not :latest)
FROM node:20.11.0-alpine  # ✅ pinned
# FROM node:latest         # ❌ unpredictable

# 3. Scan images for vulnerabilities
docker scout cves my-app:latest

# 4. Read-only filesystem when possible
docker run --read-only my-app

# 5. Limit resources
docker run --memory=512m --cpus=0.5 my-app</code></pre>
        <div class="inline-quiz"><h4>🧠 Quick Check</h4><p><strong>Why should you use a specific image tag (node:20.11.0) instead of node:latest?</strong></p>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Correct! :latest changes over time. Your image built today might differ from one built next month, causing unexpected breakages.')">:latest changes — your builds become unpredictable and unreproducible</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Specific tags don\'t automatically update — that\'s actually the point. You control when to upgrade.')">Specific tags auto-update with security patches</button>
        <div class="quiz-feedback"></div></div>
        <div class="teach-it-back"><h4>🧠 Teach It Back</h4><p style="font-size:13px;margin-bottom:8px">Name 3 Docker security practices and why each matters.</p><textarea placeholder="1. Non-root user: ... 2. Pinned tags: ... 3. ..."></textarea></div>
    `},
    'd4-2': { title: '4.2 Docker in Production', xp: 125, content: `
        <div class="lesson-recap">🔄 <strong>Last lesson:</strong> Security — non-root user, pinned tags, image scanning, read-only filesystem, resource limits.</div>
        <div class="hook-story">🚀 <strong>Real World:</strong> Single containers don't run in production at scale. Kubernetes (K8s) orchestrates thousands of containers across hundreds of servers. But you need to understand Docker before K8s makes sense.</div>
        <h3>🚀 Production Considerations</h3>
        <ul>
            <li><strong>Health checks</strong>: tell the orchestrator when your container is ready</li>
            <li><strong>Restart policies</strong>: automatically restart on crash</li>
            <li><strong>Resource limits</strong>: prevent one container from starving others</li>
            <li><strong>Logging</strong>: send logs to centralized logging (not just docker logs)</li>
        </ul>
        <pre><code># Health check in Dockerfile
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:3000/health || exit 1

# Restart policy in Compose
services:
  app:
    restart: unless-stopped   # Restart on crash, but not on manual stop
    deploy:
      resources:
        limits:
          memory: 512M
          cpus: '0.5'</code></pre>
        <h3>🔄 From Docker → Kubernetes</h3>
        <p>Docker Compose = local dev. Kubernetes = production at scale. K8s uses the same Docker images but orchestrates them across a cluster. Learning Docker is step 1 of the K8s learning path.</p>
        <div class="teach-it-back"><h4>🧠 Teach It Back</h4><p style="font-size:13px;margin-bottom:8px">What does a health check do and why is it important in production?</p><textarea placeholder="A health check..."></textarea></div>
    `},
    'd4-3': { title: '4.3 Final Assessment', xp: 250, content: `
        <h3>🏆 Docker Final Assessment</h3>
        <div class="inline-quiz"><h4>Q1</h4><p><strong>What is the correct command to build an image tagged "myapp:v2"?</strong></p>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','docker run runs a container from an existing image. docker build creates the image.')">docker run -t myapp:v2 .</button>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ docker build with -t flag tags the image. The . is the build context (current directory).')">docker build -t myapp:v2 .</button>
        <div class="quiz-feedback"></div></div>
        <div class="inline-quiz"><h4>Q2</h4><p><strong>Your database container loses data on restart. Fix?</strong></p>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Volumes persist data outside the container lifecycle. Named volumes survive container deletion.')">Add a named volume in docker-compose.yml</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Restart policies restart the container but don\'t persist data inside it.')">Add restart: always to Compose</button>
        <div class="quiz-feedback"></div></div>
        <div class="inline-quiz"><h4>Q3</h4><p><strong>Why use multi-stage builds?</strong></p>
        <button class="quiz-option" onclick="checkQuiz(this,'correct','✅ Build tools (TypeScript compiler, webpack, etc.) stay in the builder stage. The production image only contains what\'s needed to RUN.')">Keep build tools out of the production image — smaller and more secure</button>
        <button class="quiz-option" onclick="checkQuiz(this,'wrong','Multi-stage doesn\'t speed up the build itself — it reduces final image size.')">Build the app faster</button>
        <div class="quiz-feedback"></div></div>
        <h3>🎓 Docker Course Complete!</h3>
        <ul>
            <li>✅ Containers vs VMs — what Docker actually is</li>
            <li>✅ Images, containers, layers, layer caching</li>
            <li>✅ Dockerfile — FROM, COPY, RUN, CMD, EXPOSE</li>
            <li>✅ Volumes — persistence for stateful services</li>
            <li>✅ Docker Compose — multi-container apps</li>
            <li>✅ Networking — service names, not localhost</li>
            <li>✅ Multi-stage builds — production-size images</li>
            <li>✅ Security — non-root, pinned tags, scanning</li>
            <li>✅ CI/CD pipeline with GitHub Actions</li>
        </ul>
    `}
};

const dockerFlashcards = [
    { term: 'Docker Image', def: 'Read-only blueprint for creating containers. Built from a Dockerfile. Stored in registries. Multiple containers can run from one image.' },
    { term: 'Docker Container', def: 'A running instance of an image. Isolated process with its own filesystem, networking, and process space.' },
    { term: 'Dockerfile', def: 'Recipe for building a Docker image. Instructions: FROM, WORKDIR, COPY, RUN, EXPOSE, CMD.' },
    { term: 'docker build -t name .', def: 'Build an image from the Dockerfile in the current directory, tagged with "name".' },
    { term: 'docker run -d -p 8080:80 image', def: 'Run a container detached (-d), mapping host port 8080 to container port 80.' },
    { term: 'Volume', def: 'Persistent storage that survives container restarts/deletion. Named volumes for databases. Bind mounts for development.' },
    { term: 'Docker Compose', def: 'Tool for defining and running multi-container apps. One docker-compose.yml, one "docker compose up" command.' },
    { term: 'Layer Caching', def: 'Docker reuses cached layers that haven\'t changed. COPY package.json before COPY . . to cache npm install.' },
    { term: 'Multi-Stage Build', def: 'Use multiple FROM stages. Build tools in stage 1; only runtime artifacts copied to final production stage.' },
    { term: '.dockerignore', def: 'Like .gitignore for Docker. Excludes node_modules, .env, .git from build context — faster builds, smaller images.' },
    { term: 'docker exec -it [id] bash', def: 'Open an interactive shell inside a running container for debugging.' },
    { term: 'Service Name (Compose)', def: 'In Docker Compose, containers find each other by SERVICE NAME, not localhost. e.g., postgres://db:5432' },
];
