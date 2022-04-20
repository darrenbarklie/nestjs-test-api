# NestJS Test API

## Installation

```bash
# Install NPM packages
npm install

# Install Cloud SQL Proxy
curl -o cloud_sql_proxy https://dl.google.com/cloudsql/cloud_sql_proxy.darwin.arm64

chmod +x cloud_sql_proxy

```

## Run

```bash

# Run local dev instance with hot reload, port 3000
npm run start:dev

# Build container (on Mac M1, targeting AMD 64)
docker buildx build --platform linux/amd64 -t nestjs-test-api:v0.1.0 .

# Run local container, port 3000
docker run -it -p 3000:3000 nestjs-test-api:v0.1.0

```

## Deploy

```bash

# Tag for GCP Artifact Registry
docker tag nestjs-test-api:v0.1.0 europe-west2-docker.pkg.dev/cloudpayroll-dev/nestjs-test/nestjs-test-api:v0.1.0

# Push to GCP Artifact Registry
docker push europe-west2-docker.pkg.dev/cloudpayroll-dev/nestjs-test/nestjs-test-api:v0.1.0

```
