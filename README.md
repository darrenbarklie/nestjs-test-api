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

# Build container (on Mac M1, targeting AMD64)
docker buildx build --platform linux/amd64 -t nestjs-test-api:v0.3.0 .

# Run local container, port 3000
docker run -it --env NODE_ENV=staging -p 3000:3000 nestjs-test-api:v0.3.0

```

## Deploy

```bash

# Tag for GCP Artifact Registry
docker tag nestjs-test-api:v0.3.0 europe-west2-docker.pkg.dev/cloudpayroll-dev/nestjs-test/nestjs-test-api:v0.3.0

# Push to GCP Artifact Registry
docker push europe-west2-docker.pkg.dev/cloudpayroll-dev/nestjs-test/nestjs-test-api:v0.3.0

```

## Database Connection

### Local

For local development, run through the Cloud SQL Proxy secure tunnel. Note that you must be signed in on [gcloud CLI](https://cloud.google.com/sdk/gcloud).

```bash
# Install TypeORM bindings for PostgreSQL
npm install @nestjs/typeorm typeorm pg

# Run Cloud SQL Proxy, connect hosted Cloud SQL, via localhost:1234
# Note: Must be signed in on gcloud CLI
# Note: Scripted to `npm run proxy`
./cloud_sql_proxy -instances=cloudpayroll-dev:europe-west2:nestjs-test-db=tcp:0.0.0.0:1234

# Configure use of dotenv
npm i --save @nestjs/config

```

## Misc

Use cross-env to standardise use of env vars across Unix, macOS, Windows. Install with `npm install cross-env`
