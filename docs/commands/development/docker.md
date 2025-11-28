---
title: docker - Docker Container Platform CLI
sidebar_label: docker
---

> **Command documentation sourced from the linux-command project**
> _This comprehensive command reference is part of the linux-command documentation project._

# docker - Docker Container Platform CLI

The `docker` command is a comprehensive container platform command-line interface that enables developers and system administrators to build, ship, and run applications in containers. Docker revolutionized software deployment by providing a lightweight, portable, and efficient way to package applications with their dependencies. The platform uses containerization technology to isolate applications from each other and the underlying infrastructure, ensuring consistency across different environments from development to production.

## History and Design Philosophy

Docker was first released in 2013 by dotCloud, Inc. (later renamed Docker, Inc.) and quickly became the de facto standard for containerization. The platform was designed to address the "it works on my machine" problem by creating a standardized way to package applications and their dependencies into portable containers that can run anywhere Docker is installed.

The core design philosophy of Docker includes:

- **Build Once, Run Anywhere**: Containers encapsulate everything needed to run an application
- **Lightweight Virtualization**: Containers share the host OS kernel, making them more efficient than VMs
- **Microservices Architecture**: Enables breaking down applications into smaller, manageable services
- **DevOps Integration**: Facilitates continuous integration and deployment (CI/CD) workflows
- **Ecosystem Compatibility**: Works seamlessly with various orchestration tools, registries, and cloud platforms

## Architecture Overview

Docker's architecture consists of several key components that work together to provide containerization services:

- **Docker Daemon (dockerd)**: The background service that manages containers, images, networks, and volumes
- **Docker Client (docker)**: The command-line interface used to interact with the daemon
- **Docker Registry**: A storage system for Docker images (Docker Hub, private registries)
- **Docker Images**: Read-only templates used to create containers
- **Docker Containers**: Runnable instances of Docker images
- **Dockerfile**: Text file that contains instructions for building Docker images

## Basic Syntax

```bash
docker [OPTIONS] COMMAND [ARGUMENTS]
```

## Container Runtime Types

### Core Docker Commands

The Docker CLI organizes commands into logical groups based on the objects they manage:

#### Container Operations
```bash
docker container <subcommand>
docker run <image> <command>
docker ps [OPTIONS]
docker stop <container>
docker start <container>
docker restart <container>
docker rm <container>
docker exec <container> <command>
docker logs <container>
docker stats <container>
```

#### Image Operations
```bash
docker image <subcommand>
docker build <path>
docker pull <image>
docker push <image>
docker images [OPTIONS]
docker rmi <image>
docker tag <source> <target>
docker history <image>
docker save <image>
docker load <image>
```

#### Volume Operations
```bash
docker volume <subcommand>
docker volume create <name>
docker volume ls
docker volume inspect <name>
docker volume rm <name>
docker volume prune
```

#### Network Operations
```bash
docker network <subcommand>
docker network create <name>
docker network ls
docker network inspect <name>
docker network connect <network> <container>
docker network disconnect <network> <container>
docker network rm <name>
docker network prune
```

## Common Options

### Global Options
- `--config <string>` - Location of client config files (default: `~/.docker`)
- `--context <string>` - Name of the context to use to connect to the daemon
- `-D, --debug` - Enable debug mode
- `-H, --host <list>` - Daemon socket(s) to connect to
- `-l, --log-level <string>` - Set the logging level (debug, info, warn, error, fatal)
- `--tls` - Use TLS
- `--tlscacert <string>` - Trust certs signed only by this CA
- `--tlscert <string>` - Path to TLS certificate file
- `--tlskey <string>` - Path to TLS key file
- `--tlsverify` - Use TLS and verify the remote
- `-v, --version` - Print version information and quit

### Container Run Options
- `-d, --detach` - Run container in background and print container ID
- `-e, --env <list>` - Set environment variables
- `--env-file <list>` - Read in a file of environment variables
- `-i, --interactive` - Keep STDIN open even if not attached
- `--name <string>` - Assign a name to the container
- `-p, --publish <list>` - Publish a container's port(s) to the host
- `-P, --publish-all` - Publish all exposed ports to random ports
- `--rm` - Automatically remove the container when it exits
- `-t, --tty` - Allocate a pseudo-TTY
- `-v, --volume <list>` - Bind mount a volume
- `--mount <mount>` - Attach a filesystem mount to the container
- `--network <network>` - Connect a container to a network
- `--cpus <decimal>` - Limit CPU usage
- `--memory <bytes>` - Limit memory usage
- `--restart <policy>` - Restart policy to apply when a container exits
- `--user <string>` - Set user and group for container
- `--workdir <string>` - Set working directory
- `--entrypoint <string>` - Override the default entrypoint
- `--health-cmd <command>` - Command to check container health
- `--health-interval <duration>` - Time between health checks
- `--health-retries <int>` - Consecutive failures needed to report unhealthy
- `--health-timeout <duration>` - Maximum time for health check
- `--read-only` - Mount the container's root filesystem as read-only
- `--tmpfs <list>` - Mount a tmpfs directory
- `--privileged` - Give extended privileges to this container
- `--cap-add <list>` - Add Linux capabilities
- `--cap-drop <list>` - Drop Linux capabilities
- `--security-opt <list>` - Security options
- `--label <list>` - Set metadata on the container
- `--label-file <file>` - Read labels from a file

### Image Build Options
- `-f, --file <string>` - Name of the Dockerfile (default: `PATH/Dockerfile`)
- `-t, --tag <list>` - Name and optionally a tag in the `name:tag` format
- `--build-arg <list>` - Set build-time variables
- `--no-cache` - Do not use cache when building the image
- `--pull` - Always attempt to pull a newer version of the image
- `--target <string>` - Set the target build stage to build
- `--platform <string>` - Set platform if server is multi-platform capable

### Network Options
- `--driver <string>` - Driver to manage the network (default: bridge)
- `--subnet <string>` - Subnet in CIDR format that represents a network segment
- `--gateway <string>` - IPv4 or IPv6 gateway for the master subnet
- `--ip-range <string>` - Allocate container IP from a sub-range
- `--aux-address <map>` - Auxiliary IPv4 or IPv6 addresses used by network driver
- `--internal` - Restrict external access to the network
- `--ipv6` - Enable IPv6 networking

## Usage Examples

### Basic Container Operations

#### Running Containers
```bash
# Run a simple container
docker run ubuntu echo "Hello World"

# Run container in background
docker run -d nginx

# Run container with name
docker run -d --name my-web-server nginx

# Run container with port mapping
docker run -d -p 8080:80 nginx

# Run container with volume mount
docker run -d -p 8080:80 -v /host/path:/container/path nginx

# Run container with environment variables
docker run -d -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=myapp mysql:8.0

# Run container interactively
docker run -it ubuntu /bin/bash

# Run container with resource limits
docker run -d --cpus="0.5" --memory="512m" nginx

# Run container with restart policy
docker run -d --restart unless-stopped nginx

# Run container and remove on exit
docker run --rm ubuntu echo "Temporary container"

# Run container with multiple port mappings
docker run -d -p 8080:80 -p 8443:443 nginx

# Run container with specific user
docker run -d --user 1000:1000 nginx

# Run container with working directory
docker run -d --workdir /app node:16 npm start

# Run container with read-only filesystem
docker run -d --read-only --tmpfs /var/run nginx

# Run container with health check
docker run -d \
  --name myapp \
  --health-cmd="curl -f http://localhost:80/health || exit 1" \
  --health-interval=30s \
  --health-timeout=10s \
  --health-retries=3 \
  nginx
```

#### Container Lifecycle Management
```bash
# Start stopped container
docker start my-container

# Stop running container gracefully
docker stop my-container

# Force stop container
docker kill my-container

# Restart container
docker restart my-container

# Pause container processes
docker pause my-container

# Unpause container processes
docker unpause my-container

# Remove stopped container
docker rm my-container

# Force remove running container
docker rm -f my-container

# Remove all stopped containers
docker container prune

# Remove multiple containers
docker rm container1 container2 container3

# Stop and remove all containers
docker stop $(docker ps -q) && docker rm $(docker ps -aq)
```

#### Container Inspection and Monitoring
```bash
# List running containers
docker ps

# List all containers (including stopped)
docker ps -a

# List containers with detailed format
docker ps -a --format "table {{.ID}}\t{{.Image}}\t{{.Status}}\t{{.Names}}"

# Inspect container details
docker inspect my-container

# Get container IP address
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' my-container

# Get container port mappings
docker port my-container

# View container logs
docker logs my-container

# Follow container logs in real-time
docker logs -f my-container

# View last 100 lines of logs
docker logs --tail 100 my-container

# View logs with timestamps
docker logs -t my-container

# View logs from specific time
docker logs --since="2023-01-01T00:00:00" my-container

# Display live container resource usage
docker stats

# Display stats for specific container
docker stats my-container

# Display stats with no stream (one-time output)
docker stats --no-stream

# View running processes in container
docker top my-container

# View file changes in container
docker diff my-container

# Show container events
docker events --filter container=my-container

# Check container health status
docker inspect --format='{{.State.Health.Status}}' my-container
```

### Image Management

#### Working with Images
```bash
# List available images
docker images

# List images with detailed format
docker images --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}\t{{.CreatedAt}}"

# Pull image from registry
docker pull ubuntu:20.04

# Pull latest version
docker pull nginx:latest

# Pull all tags for an image
docker pull --all-tags nginx

# Build image from Dockerfile
docker build -t myapp:1.0 .

# Build image with Dockerfile in specific path
docker build -f /path/to/Dockerfile -t myapp:1.0 /path/to/context

# Build image with build arguments
docker build --build-arg VERSION=1.0 -t myapp .

# Build image with multiple tags
docker build -t myapp:1.0 -t myapp:latest -t registry.com/myapp:1.0 .

# Build image with specific platform
docker build --platform linux/amd64 -t myapp:amd64 .

# Build without cache
docker build --no-cache -t myapp .

# Tag existing image
docker tag myapp:1.0 myregistry.com/myapp:1.0

# Push image to registry
docker push myregistry.com/myapp:1.0

# Push all tags for image
docker push --all-tags myregistry.com/myapp

# Remove image
docker rmi myapp:1.0

# Force remove image
docker rmi -f myapp:1.0

# Remove unused images
docker image prune

# Remove all unused images
docker image prune -a

# Remove all dangling images
docker rmi $(docker images -f "dangling=true" -q)

# Export image to tar file
docker save -o myapp.tar myapp:1.0

# Import image from tar file
docker load -i myapp.tar

# View image history
docker history myapp:1.0

# Inspect image details
docker inspect myapp:1.0
```

#### Building Custom Images
```bash
# Create a multi-stage Dockerfile
cat > Dockerfile << 'EOF'
# Build stage
FROM node:16-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM node:16-alpine AS production

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

WORKDIR /app

# Copy built application
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/package.json ./package.json

USER nodejs

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

EXPOSE 3000
CMD ["node", "dist/main.js"]
EOF

# Build with build arguments
docker build \
  --build-arg NODE_ENV=production \
  --build-arg VERSION=1.0.0 \
  -t myapp:production \
  .

# Build for specific platform
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t myapp:multiarch \
  --push \
  .
```

### Network Management

#### Working with Networks
```bash
# List networks
docker network ls

# Create bridge network
docker network create my-network

# Create network with subnet
docker network create --subnet=192.168.0.0/24 my-network

# Create network with gateway
docker network create --gateway=192.168.0.1 --subnet=192.168.0.0/24 my-network

# Create network with multiple subnets
docker network create \
  --driver bridge \
  --subnet=192.168.0.0/24 \
  --subnet=10.0.0.0/24 \
  my-multi-subnet

# Create overlay network for Docker Swarm
docker network create --driver overlay --attachable my-overlay

# Connect container to network
docker network connect my-network my-container

# Connect container with IP address
docker network connect --ip 192.168.0.100 my-network my-container

# Disconnect container from network
docker network disconnect my-network my-container

# Inspect network
docker network inspect my-network

# Get network IPAM configuration
docker network inspect -f '{{range .IPAM.Config}}{{.Subnet}}{{end}}' my-network

# Remove network
docker network rm my-network

# Remove unused networks
docker network prune

# Remove all custom networks
docker network prune -f
```

#### Advanced Network Configuration
```bash
# Create network with DNS configuration
docker network create \
  --driver bridge \
  --dns=8.8.8.8 \
  --dns=8.8.4.4 \
  --dns-search=example.com \
  my-network

# Create isolated network
docker network create --internal my-isolated-network

# Create network with labels
docker network create --label environment=production my-prod-network

# Create network with MTU setting
docker network create --opt com.docker.network.mtu=1500 my-network

# Connect multiple containers to network
docker run -d --name web1 --network my-network nginx
docker run -d --name web2 --network my-network nginx

# Test connectivity between containers
docker exec web1 ping web2
```

### Volume Management

#### Working with Volumes
```bash
# List volumes
docker volume ls

# Create named volume
docker volume create my-data

# Create volume with options
docker volume create \
  --driver local \
  --opt type=tmpfs \
  --opt device=tmpfs \
  --opt o=size=100m,uid=1000 \
  my-tmpfs-volume

# Create volume with labels
docker volume create --label environment=dev my-dev-data

# Inspect volume
docker volume inspect my-data

# Remove volume
docker volume rm my-data

# Remove unused volumes
docker volume prune

# Remove all unused volumes
docker volume prune -f

# Create bind mount
docker run -d -v /host/path:/container/path nginx

# Create read-only bind mount
docker run -d -v /host/path:/container/path:ro nginx

# Create tmpfs mount
docker run -d --tmpfs /tmp nginx

# Create multiple mounts
docker run -d \
  -v app-data:/var/lib/app \
  -v /host/config:/etc/app:ro \
  --tmpfs /tmp \
  nginx

# Use named volume
docker run -d -v my-data:/data nginx

# Use volume driver
docker run -d -v my-nfs:/data:rw docker.io/vieux/sshfs

# Copy data to volume
docker run --rm -v my-data:/target -v /host/data:/source alpine cp -r /source/* /target/
```

#### Volume Backup and Restore
```bash
# Backup volume to tar file
docker run --rm \
  -v my-volume:/source \
  -v $(pwd):/backup \
  alpine tar czf /backup/my-volume-backup.tar.gz -C /source .

# Restore volume from tar file
docker run --rm \
  -v my-volume:/target \
  -v $(pwd):/backup \
  alpine tar xzf /backup/my-volume-backup.tar.gz -C /target

# Backup volume with compression
docker run --rm \
  -v my-volume:/data \
  -v $(pwd):/backup \
  alpine sh -c "cd /data && tar -czf /backup/my-volume-$(date +%Y%m%d).tar.gz ."

# Clone volume
docker run --rm \
  -v source-volume:/from \
  -v target-volume:/to \
  alpine cp -r /from/* /to/
```

## Advanced Docker Usage

### Multi-Container Applications

#### Docker Compose Integration
```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DB_HOST=db
      - REDIS_HOST=redis
    depends_on:
      - db
      - redis
    volumes:
      - app_data:/app/uploads
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: myapp
    volumes:
      - mysql_data:/var/lib/mysql
      - ./init:/docker-entrypoint-initdb.d
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 30s
      timeout: 10s
      retries: 3

  redis:
    image: redis:alpine
    volumes:
      - redis_data:/data
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 30s
      timeout: 10s
      retries: 3

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - app
    restart: unless-stopped

volumes:
  mysql_data:
  redis_data:
  app_data:
```

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Scale services
docker-compose up -d --scale app=3

# Run commands in service
docker-compose exec app npm run migrate

# View resource usage
docker-compose top

# Update services
docker-compose up -d --force-recreate

# Remove all containers and networks
docker-compose down --remove-orphans
```

#### Service Discovery
```bash
# Create custom network for service discovery
docker network create app-network

# Run database service
docker run -d \
  --name app-db \
  --network app-network \
  -e MYSQL_ROOT_PASSWORD=password \
  -e MYSQL_DATABASE=myapp \
  -v mysql_data:/var/lib/mysql \
  mysql:8.0

# Run application service
docker run -d \
  --name app-server \
  --network app-network \
  -p 3000:3000 \
  -e DB_HOST=app-db \
  -e DB_NAME=myapp \
  myapp:1.0

# Run reverse proxy
docker run -d \
  --name app-proxy \
  --network app-network \
  -p 80:80 \
  -v $(pwd)/nginx.conf:/etc/nginx/nginx.conf:ro \
  nginx

# Test service discovery
docker exec app-server ping app-db
docker exec app-proxy curl http://app-server:3000
```

### Production Deployment

#### Security Best Practices
```bash
# Run as non-root user
docker run -d \
  --user 1000:1000 \
  myapp

# Use read-only filesystem
docker run -d \
  --read-only \
  --tmpfs /tmp \
  --tmpfs /var/run \
  nginx

# Drop all capabilities
docker run -d \
  --cap-drop ALL \
  --cap-add CHOWN \
  --cap-add SETGID \
  --cap-add SETUID \
  myapp

# Use security profiles
docker run -d \
  --security-opt no-new-privileges \
  --security-opt seccomp=/path/to/seccomp/profile.json \
  myapp

# Set resource limits
docker run -d \
  --cpus="1.5" \
  --memory="2g" \
  --memory-swap="3g" \
  --pids-limit=100 \
  myapp

# Use AppArmor/SELinux
docker run -d \
  --security-opt apparmor:myprofile \
  myapp

# Encrypt environment variables
docker run -d \
  --env-file <(gpg --decrypt secrets.env.gpg) \
  myapp
```

#### Production Monitoring
```bash
# Enable container logging
docker run -d \
  --log-driver json-file \
  --log-opt max-size=10m \
  --log-opt max-file=3 \
  myapp

# Use syslog driver
docker run -d \
  --log-driver syslog \
  --log-opt syslog-address=tcp://logserver:514 \
  --log-opt syslog-facility=daemon \
  myapp

# Set up log rotation
docker run -d \
  --log-driver json-file \
  --log-opt max-size=100m \
  --log-opt max-file=5 \
  --log-opt labels=environment,service \
  myapp

# Health checks with detailed output
docker run -d \
  --name myapp \
  --health-cmd="curl -f http://localhost:3000/health || exit 1" \
  --health-interval=30s \
  --health-timeout=10s \
  --health-retries=3 \
  --health-start-period=60s \
  myapp

# Monitor container health
docker inspect --format='{{.State.Health.Status}}' myapp
docker inspect --format='{{json .State.Health}}' myapp

# Set up performance monitoring
docker run -d \
  --name cadvisor \
  -p 8080:8080 \
  -v /:/rootfs:ro \
  -v /var/run:/var/run:ro \
  -v /sys:/sys:ro \
  -v /var/lib/docker/:/var/lib/docker:ro \
  gcr.io/cadvisor/cadvisor
```

### Development Workflow

#### Local Development Setup
```bash
# Create development environment
docker network create dev-network

# Run development database
docker run -d \
  --name dev-db \
  --network dev-network \
  -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=devpass \
  -e MYSQL_DATABASE=dev_db \
  -v mysql_dev_data:/var/lib/mysql \
  mysql:8.0

# Run Redis cache
docker run -d \
  --name dev-redis \
  --network dev-network \
  -p 6379:6379 \
  redis:alpine

# Run application in development mode
docker run -d \
  --name dev-app \
  --network dev-network \
  -p 3000:3000 \
  -v $(pwd):/app \
  -v /app/node_modules \
  -e NODE_ENV=development \
  -e CHOKIDAR_USEPOLLING=true \
  node:16-alpine npm run dev

# Run tests with database
docker run --rm \
  --network dev-network \
  -v $(pwd):/app \
  -w /app \
  -e DB_HOST=dev-db \
  node:16-alpine npm run test:integration

# Run linting and formatting
docker run --rm \
  -v $(pwd):/app \
  -w /app \
  node:16-alpine npm run lint

docker run --rm \
  -v $(pwd):/app \
  -w /app \
  node:16-alpine npm run format
```

#### CI/CD Pipeline Integration
```bash
# Build and test in CI
docker build --target builder -t myapp:builder .
docker run --rm -v $(pwd):/app myapp:builder npm test
docker build -t myapp:${CI_COMMIT_SHA} .

# Security scanning
docker run --rm \
  -v /var/run/docker.sock:/var/run/docker.sock \
  aquasec/trivy image myapp:${CI_COMMIT_SHA}

# Push to registry
docker tag myapp:${CI_COMMIT_SHA} registry.com/myapp:${CI_COMMIT_SHA}
docker push registry.com/myapp:${CI_COMMIT_SHA}

# Deploy to staging
docker pull registry.com/myapp:${CI_COMMIT_SHA}
docker stop staging-app || true
docker rm staging-app || true
docker run -d \
  --name staging-app \
  --network staging-network \
  -p 3000:3000 \
  registry.com/myapp:${CI_COMMIT_SHA}
```

## Performance Optimization

### Resource Management

#### CPU and Memory Optimization
```bash
# Set CPU limits
docker run -d --cpus="1.5" nginx
docker run -d --cpus="0.5" --cpu-period=100000 --cpu-quota=50000 nginx

# Set memory limits
docker run -d --memory="512m" nginx
docker run -d --memory="1g" --memory-swap="2g" nginx

# Set reservation (guaranteed resources)
docker run -d \
  --cpus="0.5" \
  --memory-reservation="256m" \
  nginx

# Optimize for performance
docker run -d \
  --cpus="2.0" \
  --memory="4g" \
  --memory-swap="8g" \
  --ulimit nofile=65536 \
  nginx

# Monitor resource usage
docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}\t{{.BlockIO}}"
```

#### Storage Optimization
```bash
# Use tmpfs for temporary files
docker run -d --tmpfs /tmp nginx

# Use overlay2 storage driver optimizations
docker daemon \
  --storage-driver overlay2 \
  --storage-opt overlay2.override_kernel_check=true \
  --storage-opt overlay2.size=10G

# Optimize layer caching
docker build --cache-from myapp:previous -t myapp:new .

# Use .dockerignore to exclude unnecessary files
cat > .dockerignore << EOF
node_modules
.git
*.log
coverage
.env
.DS_Store
npm-debug.log*
.nyc_output
.cache
dist
build
EOF

# Minimize image layers
docker build --squash -t myapp:minimal .

# Use multi-stage builds to reduce final image size
docker build --target production -t myapp:optimized .

# Clean up build cache
docker builder prune -f
```

### Advanced Building Techniques

#### BuildKit Optimization
```bash
# Enable BuildKit for parallel builds
export DOCKER_BUILDKIT=1

# Use BuildKit features
docker build \
  --secret id=gpg,src=$HOME/.gnupg/private.key \
  --ssh default \
  -t myapp:secure \
  .

# Multi-platform builds
docker buildx build \
  --platform linux/amd64,linux/arm64,linux/arm/v7 \
  -t myapp:multiarch \
  --push \
  .

# Cache management
docker build \
  --cache-from myapp:cache \
  --cache-to type=registry,ref=myapp:cache,mode=max \
  -t myapp:latest \
  .
```

#### Custom Network Drivers
```bash
# Use macvlan networks
docker network create -d macvlan \
  --subnet=192.168.1.0/24 \
  --gateway=192.168.1.1 \
  -o parent=eth0 \
  macnet

# Use overlay networks for Swarm
docker network create -d overlay \
  --subnet=10.0.0.0/24 \
  overlay-network
```

## Troubleshooting

### Common Issues and Solutions

#### Container Startup Problems
```bash
# Check container logs for errors
docker logs my-container

# Inspect container configuration
docker inspect my-container

# Check image exists and is accessible
docker images | grep myapp
docker history myapp:latest

# Run container in debug mode
docker run --rm -it --entrypoint /bin/sh myapp

# Test container entrypoint
docker run --rm --entrypoint /bin/sh myapp -c "echo 'Entry point works'"

# Check port conflicts
netstat -tulpn | grep :8080
docker ps --format "table {{.Names}}\t{{.Ports}}"

# Validate volume mounts
docker run --rm -v /host/path:/test alpine ls -la /test

# Check network connectivity
docker exec my-container ping google.com
docker network inspect bridge
```

#### Performance Issues
```bash
# Monitor container resource usage
docker stats my-container

# Check system resource usage
docker system df
docker system events

# Analyze image size
docker history --human myapp:latest
docker images --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}"

# Check disk usage by container
docker ps -q | xargs docker inspect --format='{{.Name}}: {{.SizeRw}}'

# Profile container performance
docker run --rm \
  --cap-add SYS_PTRACE \
  -v /usr/bin/perf:/usr/bin/perf \
  myapp perf record -g -- /path/to/myapp
```

#### Network Issues
```bash
# Check container network configuration
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' my-container
docker exec my-container ip addr show

# Test network connectivity
docker exec my-container ping -c 3 8.8.8.8
docker exec my-container nslookup google.com

# Check port accessibility
docker port my-container
docker exec my-container netstat -tulpn

# Inspect network configuration
docker network inspect my-network

# Test DNS resolution
docker exec my-container cat /etc/resolv.conf
docker exec my-container nslookup my-network
```

#### Storage Issues
```bash
# Check volume mount points
docker inspect -f '{{range .Mounts}}{{.Source}}:{{.Destination}} {{end}}' my-container

# Verify volume permissions
docker exec my-container ls -la /data
docker exec my-container id

# Check disk space
docker system df
df -h
docker exec my-container df -h

# Clean up unused resources
docker system prune -af
docker volume prune -f
docker image prune -af
```

### Debugging Tools

#### Interactive Debugging
```bash
# Execute shell in running container
docker exec -it my-container /bin/bash

# Run container with shell access
docker run -it --rm myapp /bin/bash

# Debug with networking tools
docker run -it --rm \
  --network container:my-container \
  nicolaka/netshoot

# Monitor container events
docker events --filter container=my-container

# Check container health
docker inspect --format='{{.State.Health.Status}}' my-container
docker inspect --format='{{json .State.Health}}' my-container

# Debug build issues
docker build --no-cache -t debug-build .
docker run -it --rm debug-build /bin/bash
```

#### System Diagnostics
```bash
# Check Docker daemon status
docker info
docker version

# System-wide diagnostics
docker system events --since 1h
docker system df

# Container resource analysis
docker stats --no-stream --format "json" | jq '.'
docker top my-container

# Network diagnostics
docker network ls
docker network inspect bridge
docker exec my-container ss -tulpn
```

## Integration and Automation

### Shell Scripts

#### Automated Container Management
```bash
#!/bin/bash
# Advanced container management script

CONTAINER_NAME="myapp"
IMAGE_NAME="myapp:latest"
PORT_MAPPING="3000:3000"
NETWORK_NAME="app-network"

# Function to start container
start_container() {
    if ! docker ps -a --format "{{.Names}}" | grep -q "^${CONTAINER_NAME}$"; then
        echo "Starting new container..."
        docker run -d \
            --name ${CONTAINER_NAME} \
            --network ${NETWORK_NAME} \
            -p ${PORT_MAPPING} \
            --restart unless-stopped \
            ${IMAGE_NAME}
    else
        echo "Container exists, starting..."
        docker start ${CONTAINER_NAME}
    fi
}

# Function to stop container
stop_container() {
    if docker ps --format "{{.Names}}" | grep -q "^${CONTAINER_NAME}$"; then
        echo "Stopping container..."
        docker stop ${CONTAINER_NAME}
    else
        echo "Container is not running"
    fi
}

# Function to update container
update_container() {
    echo "Pulling latest image..."
    docker pull ${IMAGE_NAME}

    echo "Stopping old container..."
    stop_container

    echo "Removing old container..."
    docker rm ${CONTAINER_NAME}

    echo "Starting new container..."
    start_container

    echo "Cleaning up old images..."
    docker image prune -f
}

# Function to backup container data
backup_container() {
    BACKUP_DIR="/backup/$(date +%Y%m%d)"
    mkdir -p ${BACKUP_DIR}

    # Backup volumes
    docker inspect ${CONTAINER_NAME} --format='{{range .Mounts}}{{.Source}} {{end}}' | \
    while read volume; do
        if [ -n "$volume" ]; then
            echo "Backing up volume: $volume"
            cp -r "$volume" "${BACKUP_DIR}/"
        fi
    done

    # Export image
    docker save ${IMAGE_NAME} | gzip > "${BACKUP_DIR}/${CONTAINER_NAME}-image.tar.gz"

    echo "Backup completed: ${BACKUP_DIR}"
}

# Main script logic
case "${1:-}" in
    start)
        start_container
        ;;
    stop)
        stop_container
        ;;
    restart)
        stop_container
        sleep 2
        start_container
        ;;
    update)
        update_container
        ;;
    backup)
        backup_container
        ;;
    status)
        docker ps -a --filter name=${CONTAINER_NAME} --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
        ;;
    logs)
        docker logs -f ${CONTAINER_NAME}
        ;;
    *)
        echo "Usage: $0 {start|stop|restart|update|backup|status|logs}"
        exit 1
        ;;
esac
```

#### Development Environment Script
```bash
#!/bin/bash
# Development environment setup

PROJECT_NAME="myproject"
NETWORK_NAME="${PROJECT_NAME}-dev"
MYSQL_CONTAINER="${PROJECT_NAME}-mysql"
REDIS_CONTAINER="${PROJECT_NAME}-redis"
APP_CONTAINER="${PROJECT_NAME}-app"

# Create development network
create_network() {
    if ! docker network ls --format "{{.Name}}" | grep -q "^${NETWORK_NAME}$"; then
        echo "Creating development network..."
        docker network create ${NETWORK_NAME}
    fi
}

# Start development database
start_database() {
    if ! docker ps --format "{{.Names}}" | grep -q "^${MYSQL_CONTAINER}$"; then
        echo "Starting MySQL database..."
        docker run -d \
            --name ${MYSQL_CONTAINER} \
            --network ${NETWORK_NAME} \
            -e MYSQL_ROOT_PASSWORD=devpass \
            -e MYSQL_DATABASE=dev_db \
            -e MYSQL_USER=dev \
            -e MYSQL_PASSWORD=devpass \
            -v mysql_dev_data:/var/lib/mysql \
            -p 3306:3306 \
            mysql:8.0
    fi
}

# Start Redis cache
start_redis() {
    if ! docker ps --format "{{.Names}}" | grep -q "^${REDIS_CONTAINER}$"; then
        echo "Starting Redis cache..."
        docker run -d \
            --name ${REDIS_CONTAINER} \
            --network ${NETWORK_NAME} \
            -p 6379:6379 \
            redis:alpine
    fi
}

# Start development application
start_app() {
    echo "Starting development application..."
    docker run -d \
        --name ${APP_CONTAINER} \
        --network ${NETWORK_NAME} \
        -p 3000:3000 \
        -v $(pwd):/app \
        -v /app/node_modules \
        -e NODE_ENV=development \
        -e DB_HOST=${MYSQL_CONTAINER} \
        -e REDIS_HOST=${REDIS_CONTAINER} \
        -e DB_USER=dev \
        -e DB_PASSWORD=devpass \
        -e DB_NAME=dev_db \
        node:16-alpine npm run dev
}

# Setup development environment
setup_dev_env() {
    echo "Setting up development environment..."
    create_network
    start_database
    start_redis
    sleep 5
    start_app

    echo "Development environment is ready!"
    echo "Application: http://localhost:3000"
    echo "MySQL: localhost:3306 (user: dev, password: devpass)"
    echo "Redis: localhost:6379"
}

# Cleanup development environment
cleanup_dev_env() {
    echo "Cleaning up development environment..."
    docker stop ${APP_CONTAINER} ${REDIS_CONTAINER} ${MYSQL_CONTAINER} 2>/dev/null || true
    docker rm ${APP_CONTAINER} ${REDIS_CONTAINER} ${MYSQL_CONTAINER} 2>/dev/null || true
    docker network rm ${NETWORK_NAME} 2>/dev/null || true
}

# Run tests
run_tests() {
    echo "Running tests..."
    docker run --rm \
        --network ${NETWORK_NAME} \
        -v $(pwd):/app \
        -w /app \
        -e DB_HOST=${MYSQL_CONTAINER} \
        -e REDIS_HOST=${REDIS_CONTAINER} \
        node:16-alpine npm test
}

case "${1:-}" in
    setup)
        setup_dev_env
        ;;
    cleanup)
        cleanup_dev_env
        ;;
    test)
        run_tests
        ;;
    logs)
        docker logs -f ${APP_CONTAINER}
        ;;
    *)
        echo "Usage: $0 {setup|cleanup|test|logs}"
        exit 1
        ;;
esac
```

#### Monitoring and Alerting Script
```bash
#!/bin/bash
# Container monitoring script

ALERT_EMAIL="admin@example.com"
LOG_FILE="/var/log/docker-monitor.log"
CPU_THRESHOLD=80
MEMORY_THRESHOLD=80

# Function to send alert
send_alert() {
    local message=$1
    echo "$(date): $message" | tee -a $LOG_FILE
    echo "$message" | mail -s "Docker Alert" $ALERT_EMAIL
}

# Function to check container health
check_container_health() {
    local container=$1

    # Check if container is running
    if ! docker ps --format "{{.Names}}" | grep -q "^${container}$"; then
        send_alert "Container $container is not running!"
        return 1
    fi

    # Check container health status
    local health=$(docker inspect --format='{{.State.Health.Status}}' $container 2>/dev/null)
    if [ "$health" = "unhealthy" ]; then
        send_alert "Container $container is unhealthy!"
        return 1
    fi

    return 0
}

# Function to check resource usage
check_resource_usage() {
    local container=$1
    local stats=$(docker stats --no-stream --format "{{.CPUPerc}}\t{{.MemPerc}}" $container)

    IFS=$'\t' read -r cpu_usage mem_usage <<< "$stats"

    # Remove % sign and convert to integer
    cpu_int=$(echo $cpu_usage | sed 's/%//')
    mem_int=$(echo $mem_usage | sed 's/%//')

    if [ "$cpu_int" -gt "$CPU_THRESHOLD" ]; then
        send_alert "Container $container CPU usage is high: $cpu_usage"
    fi

    if [ "$mem_int" -gt "$MEMORY_THRESHOLD" ]; then
        send_alert "Container $container memory usage is high: $mem_usage"
    fi
}

# Function to check disk space
check_disk_space() {
    local disk_usage=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')

    if [ "$disk_usage" -gt 85 ]; then
        send_alert "Disk usage is high: ${disk_usage}%"
    fi
}

# Function to check Docker daemon
check_docker_daemon() {
    if ! docker info >/dev/null 2>&1; then
        send_alert "Docker daemon is not responding!"
        return 1
    fi

    return 0
}

# Main monitoring function
monitor_containers() {
    local containers=("webapp" "database" "cache")

    # Check Docker daemon
    check_docker_daemon || return 1

    # Check disk space
    check_disk_space

    # Monitor each container
    for container in "${containers[@]}"; do
        if docker ps --format "{{.Names}}" | grep -q "^${container}$"; then
            check_container_health "$container"
            check_resource_usage "$container"
        else
            send_alert "Container $container is not running!"
        fi
    done
}

# Run monitoring
monitor_containers
```

## Related Commands

- [`docker-compose`](/docs/commands/development/docker-compose) - Multi-container orchestration
- [`docker-machine`](/docs/commands/development/docker-machine) - Machine management
- [`docker-swarm`](/docs/commands/development/docker-swarm) - Cluster management
- [`kubernetes`](/docs/commands/orchestration/kubectl) - Container orchestration
- [`podman`](/docs/commands/development/podman) - Pod-based container engine
- [`buildah`](/docs/commands/development/buildah) - Image building
- [`skopeo`](/docs/commands/development/skopeo) - Image operations
- [`crictl`](/docs/commands/development/crictl) - CRI container management
- [`nerdctl`](/docs/commands/development/nerdctl) - Containerd CLI

## Best Practices

1. **Use Specific Image Versions**: Pin exact image versions instead of using `latest`
2. **Minimal Base Images**: Use minimal base images like Alpine or distroless
3. **Multi-Stage Builds**: Separate build and runtime environments
4. **Resource Limits**: Set CPU and memory limits for production containers
5. **Health Checks**: Implement proper health checks for containers
6. **Security**: Run containers as non-root users and drop unnecessary capabilities
7. **Persistence**: Use named volumes for persistent data storage
8. **Networking**: Use user-defined networks for container communication
9. **Logging**: Implement centralized logging solutions
10. **Monitoring**: Set up monitoring and alerting for container health
11. **Regular Updates**: Keep base images and dependencies updated
12. **Environment Variables**: Use environment variables for configuration
13. **Restart Policies**: Set appropriate restart policies for production containers
14. **Clean Up**: Regularly clean up unused containers, images, and volumes
15. **Secrets Management**: Use Docker secrets or external secret management systems
16. **Image Scanning**: Regularly scan images for vulnerabilities
17. **Backup Strategies**: Implement regular backup strategies for volumes

## Performance Tips

1. **Use .dockerignore**: Exclude unnecessary files from build context
2. **Layer Caching**: Order Dockerfile operations to maximize layer cache usage
3. **Parallel Builds**: Use BuildKit for parallel build operations
4. **Image Squashing**: Reduce image layers using `--squash` flag
5. **Resource Allocation**: Properly allocate CPU and memory resources
6. **Storage Drivers**: Use appropriate storage drivers for your workloads
7. **Network Optimization**: Use overlay networks for better performance
8. **Volume Types**: Choose appropriate volume types (bind vs named)
9. **Health Check Frequency**: Balance health check frequency with performance
10. **Log Management**: Implement log rotation to prevent disk space issues
11. **Multi-stage Builds**: Optimize final image size with multi-stage builds
12. **Base Image Selection**: Choose appropriate base images for your use case
13. **Container Start-up**: Minimize container start-up time for faster scaling
14. **Resource Monitoring**: Continuously monitor resource usage patterns
15. **Caching Strategies**: Implement caching layers for applications where appropriate

The `docker` command provides a comprehensive container platform that has fundamentally changed how applications are developed, deployed, and managed. Its ecosystem of tools and extensive community support make it an essential technology for modern software development and operations.
