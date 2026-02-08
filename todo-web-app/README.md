# Todo Web App - Helm Chart

Kubernetes Helm chart for deploying the Todo Full-Stack Application with Next.js Frontend and FastAPI Backend.

## Prerequisites

- Kubernetes cluster (Minikube for local deployment)
- Helm 3.x
- Docker images built locally (`todo-frontend:latest` and `todo-backend:latest`)

## Quick Start - Local Minikube Deployment

### 1. Start Minikube

```bash
minikube start --driver=docker --memory=4096 --cpus=2
```

### 2. Load Docker Images into Minikube

```bash
minikube image load todo-backend:latest
minikube image load todo-frontend:latest
```

### 3. Deploy with Helm

```bash
# From the root directory
helm install todo-app ./todo-web-app --namespace default

# Or use the automated script
./deploy-to-minikube.sh
```

### 4. Verify Deployment

```bash
# Check pods
kubectl get pods -l app.kubernetes.io/name=todo-web-app

# Check services
kubectl get services -l app.kubernetes.io/name=todo-web-app
```

### 5. Access the Application

#### Frontend (NodePort)
```bash
# Get Minikube IP
minikube ip

# Access frontend at: http://<minikube-ip>:30080
```

#### Backend API (Port Forward)
```bash
# Forward backend port
kubectl port-forward svc/todo-app-todo-web-app-backend 8000:8000

# Access API docs at: http://localhost:8000/docs
```

## Configuration

### Default Values

The chart comes with default values optimized for local Minikube deployment:

```yaml
backend:
  image:
    repository: todo-backend
    tag: latest
    pullPolicy: Never  # Use local images

  service:
    type: ClusterIP
    port: 8000

frontend:
  image:
    repository: todo-frontend
    tag: latest
    pullPolicy: Never  # Use local images

  service:
    type: NodePort
    port: 3000
    nodePort: 30080
```

### Customizing Values

Create a custom values file:

```bash
# custom-values.yaml
backend:
  replicaCount: 2
  resources:
    limits:
      memory: "1Gi"

frontend:
  replicaCount: 2
```

Deploy with custom values:

```bash
helm upgrade --install todo-app ./todo-web-app -f custom-values.yaml
```

## Environment Variables

### Backend Environment Variables

Configured in `values.yaml`:

- `DATABASE_URL` - PostgreSQL connection string (Neon DB)
- `SECRET_KEY` - JWT secret key
- `ACCESS_TOKEN_EXPIRE_MINUTES` - Token expiration time
- `ALGORITHM` - JWT algorithm (HS256)
- `PROJECT_NAME` - Application name

### Frontend Environment Variables

- `NEXT_PUBLIC_API_URL` - Backend API URL (defaults to `http://todo-backend:8000`)

## Architecture

```
┌─────────────────────────────────────────┐
│          Kubernetes Cluster             │
│  ┌───────────────────────────────────┐  │
│  │  Frontend (NodePort :30080)       │  │
│  │  - Next.js 16                     │  │
│  │  - Port: 3000                     │  │
│  └───────────┬───────────────────────┘  │
│              │                           │
│              │ HTTP Requests             │
│              ▼                           │
│  ┌───────────────────────────────────┐  │
│  │  Backend (ClusterIP)              │  │
│  │  - FastAPI                        │  │
│  │  - Port: 8000                     │  │
│  │  - Connected to Neon PostgreSQL   │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

## Health Checks

Both services have liveness and readiness probes configured:

### Backend
- Liveness: `GET /docs` (port 8000)
- Readiness: `GET /docs` (port 8000)

### Frontend
- Liveness: `GET /` (port 3000)
- Readiness: `GET /` (port 3000)

## Resource Limits

Default resource allocations:

```yaml
resources:
  limits:
    cpu: 500m
    memory: 512Mi
  requests:
    cpu: 250m
    memory: 256Mi
```

## Troubleshooting

### Pods Not Starting

```bash
# Check pod status
kubectl describe pod <pod-name>

# View logs
kubectl logs <pod-name>
```

### Image Pull Errors

Ensure images are loaded into Minikube:

```bash
minikube image ls | grep todo
```

If not present:

```bash
minikube image load todo-backend:latest
minikube image load todo-frontend:latest
```

### Service Not Accessible

Check service endpoints:

```bash
kubectl get endpoints
```

### Database Connection Issues

Verify backend environment variables:

```bash
kubectl describe deployment todo-app-todo-web-app-backend
```

## Uninstall

```bash
# Uninstall the Helm release
helm uninstall todo-app

# Verify cleanup
kubectl get all -l app.kubernetes.io/name=todo-web-app
```

## Advanced Configuration

### Enable Ingress

```yaml
# values.yaml
ingress:
  enabled: true
  className: "nginx"
  hosts:
    - host: todo.local
      paths:
        - path: /
          pathType: Prefix
```

### Enable Autoscaling

```yaml
# values.yaml
autoscaling:
  enabled: true
  minReplicas: 2
  maxReplicas: 5
  targetCPUUtilizationPercentage: 70
```

## Production Deployment

For production deployments:

1. Change `imagePullPolicy` to `Always` or `IfNotPresent`
2. Push images to a container registry
3. Update `image.repository` with registry URL
4. Configure proper resource limits
5. Enable autoscaling
6. Set up ingress with TLS
7. Use secrets for sensitive data (DATABASE_URL, SECRET_KEY)

```bash
# Create secrets
kubectl create secret generic todo-secrets \
  --from-literal=database-url='your-db-url' \
  --from-literal=secret-key='your-secret-key'
```

## Support

For issues and questions, please refer to the main project documentation.
