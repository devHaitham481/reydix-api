FROM node:20-alpine

WORKDIR /usr/src/app

# Install necessary tools for start.sh (pg_isready, curl, netcat-openbsd)
RUN apk add --no-cache postgresql-client curl netcat-openbsd

RUN apk add --no-cache redis

# Copy root package.json and pnpm-lock.yaml
COPY pnpm-lock.yaml ./
COPY package.json ./

# Copy individual service package.json files
COPY api-gateway/package.json ./api-gateway/package.json
COPY events-service/package.json ./events-service/package.json
COPY fans-service/package.json ./fans-service/package.json

# Install pnpm globally
RUN npm install -g pnpm

# Install all dependencies for the entire workspace
RUN pnpm install --frozen-lockfile --shamefully-hoist

# Copy the rest of the application code (monorepo root to /usr/src/app)
COPY . .

# Build the specific service within the workspace
WORKDIR /usr/src/app/fans-service
RUN pnpm run build

# Copy the start script for this service and make it executable
COPY fans-service/start.sh ./start.sh
RUN chmod +x ./start.sh

# Expose the application port
EXPOSE 3002

# Use the start script as ENTRYPOINT
ENTRYPOINT ["./start.sh"]
# CMD is now optional as ENTRYPOINT handles the main process.
# You can remove the CMD line, or keep it empty: CMD []
CMD [] # Keep this if you want to allow overriding ENTRYPOINT more easily
