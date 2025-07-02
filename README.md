# Reydix API

This is the Reydix API - a fun little project that helps you find relevant fans for music events based on the artist that is performing there. It's built with NestJS and follows a microservices domain-driven archtiecture.

## The Architecture

We've got three main services playing together:

- **API Gateway** (port 3000) - The API gateway that handles authentication and orchestrates everything
- **Events Service** (port 3001) - Manages events and artists data
- **Fans Service** (port 3002) - Handles fan and their connections to artists

Plus some supporting cast: PostgreSQL databases for each service, Redis for caching, and SuperTokens for authentication.

## Getting Started

### 1. Environment Setup

- First, copy the example environment file:

```bash
cp .env.example .env
```

The default values should work fine for local development, but feel free to tweak them if you need to.

### 2. Running Everything

#### Option A: Docker (Recommended)

If you want everything to just work without thinking about it:

```bash
docker-compose up --build
```

This will spin up all services, databases, and dependencies. Grab a coffee while it builds - first time takes a few minutes.

#### Option B: Local Development

OR if you prefer running things locally (you'll need PostgreSQL and Redis running): --Recommended

```bash
# Install dependencies
pnpm install

# Start each service in separate terminals
cd apps/api-gateway && pnpm run start:dev
cd apps/events-service && pnpm run start:dev
cd apps/fans-service && pnpm run start:dev
```

### 3. Seed Some Data

The services need some sample data to be useful. you can first up the database services in docker compose, then go into each service and run the seed script:

```bash
docker compose up -d events-db fans-db reydix-db
cd apps/events-service && pnpm run seed
cd apps/fans-service && pnpm run seed
cd apps/api-gateway && pnpm run seed
```

This creates sample users, events, artists, fans, and the relationships between them. Pretty neat that it all works together!

## How Authentication Works

We're using SuperTokens for authentication - it's a simple, open source, third-party authentication solution.

1. **Sign up first**: `POST /auth/signup`
2. **Or sign in**: `POST /auth/signin`
3. **Get a session cookie**: SuperTokens handles this automatically
4. **Use the cookie**: Include it in your requests to protected endpoints

The authentication is session-based with cookies, not JWT tokens in headers. Much more secure for web applications.

### Creating an Account

```bash
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "formFields": [
      {"id": "email", "value": "test@example.com"},
      {"id": "password", "value": "password123"}
    ]
  }'
```

### Signing In

```bash
curl -X POST http://localhost:3000/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "formFields": [
      {"id": "email", "value": "test@example.com"},
      {"id": "password", "value": "password123"}
    ]
  }' \
  -c cookies.txt
```

The `-c cookies.txt` saves the session cookie to a file.

You can alternatively copy it from the `set-cookie` header in the response.

## The Main Event: Finding Relevant Fans

Once you're authenticated, you can find fans who are interested in the artists performing at your event.

### The Endpoint

```
GET /events/{eventId}/relevant-fans
```

### Example Request

```bash
# Using the saved cookie from sign-in
curl -X GET http://localhost:3000/events/your-event-id-here/relevant-fans \
  -H "Content-Type: application/json" \
  -b "Cookie" # Use the cookie saved you got from sign-in
```

### Example Response

```json
{
  "event": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "title": "Summer Music Fest",
    "description": "An amazing outdoor festival",
    "date": "2024-08-15T19:00:00.000Z",
    "location": "Central Park",
    "artists": [
      {
        "id": "456e7890-e89b-12d3-a456-426614174000",
        "name": "The Cool Band",
        "genre": "Rock"
      }
    ]
  },
  "relevantFans": {
    "fans": [
      {
        "id": "789e0123-e89b-12d3-a456-426614174000",
        "username": "musiclover42",
        "email": "fan@example.com"
      }
    ],
    "total": 1,
    "eventId": "123e4567-e89b-12d3-a456-426614174000"
  }
}
```

## Other Useful Endpoints

### Events Service

- `GET /events` - List all events
- `GET /events/{id}` - Get specific event
- `GET /events/artists` - List all artists

### Fans Service

- `GET /fans` - List all fans
- `GET /fans/{eventId}/relevant-fans` - Find relevant fans

## Troubleshooting

### Authentication not working

Double-check you're including the session cookie in your requests. The API uses cookie-based auth, not Authorization headers.

### Services won't start

Check if ports 3000, 3001, 3002, 5432, 5433, 6379, and 3567 are available.

### No relevant fans found

Make sure you've seeded the databases. The services need sample data to find relationships between fans and artists.

