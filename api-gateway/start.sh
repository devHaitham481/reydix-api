#!/bin/sh
# api-gateway/start.sh

set -e

echo "--- Environment Variables for API Gateway ---"
env
echo "-----------------------------------------"

# Wait for Redis
echo "Waiting for Redis to be reachable..."
/usr/bin/env sh -c "until redis-cli -h redis -p 6379 PING; do echo >&2 'Redis is unavailable - sleeping'; sleep 1; done"
echo "Redis is ready."

# Wait for fans-db
echo "Waiting for fans-db to be ready..."
/usr/bin/env sh -c "until pg_isready -h fans-db -p 5432 -U fans_user; do echo >&2 'fans-db is unavailable - sleeping'; sleep 1; done"
echo "fans-db is ready."

# Wait for microservices health endpoints - Make these more persistent
echo "Waiting for Events Service (HTTP health) to be healthy..."
# Loop indefinitely until curl is successful
while ! curl -sS http://events-service:3001/health >/dev/null; do
  echo >&2 'Events Service HTTP health check failed - sleeping'
  sleep 2 # Wait a bit longer
done
echo "Events Service HTTP health endpoint is ready."

echo "Waiting for Fans Service (HTTP health) to be healthy..."
while ! curl -sS http://fans-service:3002/health >/dev/null; do
  echo >&2 'Fans Service HTTP health check failed - sleeping'
  sleep 2 # Wait a bit longer
done
echo "Fans Service HTTP health endpoint is ready."

echo "Starting NestJS API Gateway..."
exec node dist/main
