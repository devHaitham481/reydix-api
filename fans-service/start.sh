#!/bin/sh
# fans-service/start.sh

set -e

echo "--- Environment Variables for Fans Service ---"
env
echo "------------------------------------------"

# Wait for Redis (if applicable for microservice connection)
echo "Waiting for Redis to be reachable..."
# ping -c 1 redis || { echo "Redis not reachable, retrying..."; sleep 1; ping -c 1 redis; } # Basic check

# Simple wait loop for the database
echo "Waiting for fans-db to be ready..."
/usr/bin/env sh -c "until pg_isready -h fans-db -p 5432 -U fans_user; do echo >&2 'fans-db is unavailable - sleeping'; sleep 1; done"
echo "fans-db is ready."

echo "Starting NestJS Fans Service..."
exec node dist/main
