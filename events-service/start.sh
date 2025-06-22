#!/bin/sh

set -e

echo "--- Environment Variables for Events Service ---"
env
echo "----------------------------------------------"

# Wait for Redis (if applicable for microservice connection)
echo "Waiting for Redis to be reachable..."

echo "Waiting for events-db to be ready..."
/usr/bin/env sh -c "until pg_isready -h events-db -p 5432 -U events_user; do echo >&2 'events-db is unavailable - sleeping'; sleep 1; done"
echo "events-db is ready."

echo "Starting NestJS Events Service..."
exec node dist/main
