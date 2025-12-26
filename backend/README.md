# Portfolio Backend

A Go backend server with GraphQL API and PostgreSQL integration for the portfolio website.

## Features

- GraphQL API endpoints
- PostgreSQL database integration
- REST API fallback
- Static file serving for React frontend
- Environment-based configuration
- CORS support for development

## Prerequisites

- Go 1.21+
- PostgreSQL (required for full functionality)

## Database Setup

1. Install and start PostgreSQL
2. Create a database for the application:
   ```sql
   CREATE DATABASE lvdb;
   CREATE USER lv WITH PASSWORD 'lvpass';
   GRANT ALL PRIVILEGES ON DATABASE lvdb TO lv;
   ```

## Environment Setup

1. Copy the environment template:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your PostgreSQL credentials:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=lvdb
   DB_USER=lv
   DB_PASSWORD=lvpass
   ```

3. The application will fail fast if required environment variables are missing.

## Database Migration

Run the database migrations and seed data:

```bash
go run ./cmd/migrate
```

This will:
- Create the necessary tables and indexes
- Insert seed data with the music track

## Database Setup (Optional)

If you have PostgreSQL running, create the database:

```sql
CREATE DATABASE lvdb;
CREATE USER lv WITH PASSWORD 'lvpass';
GRANT ALL PRIVILEGES ON DATABASE lvdb TO lv;
```

The application will work with dummy data if the database is not available.

## Running the Application

1. Install dependencies:
   ```bash
   go mod tidy
   ```

2. Create and configure your environment file:
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

3. Run database migrations:
   ```bash
   go run ./cmd/migrate
   ```

4. Run the server:
   ```bash
   go run main.go
   ```

5. The server will start on port 8080 by default

## API Endpoints

### GraphQL
- `POST /graphql` - GraphQL endpoint (with GraphiQL interface at GET /graphql)

### REST (Fallback)
- `GET /api/profile` - Get profile information

## GraphQL Queries

```graphql
# Get single profile
query {
  profile {
    id
    name
    title
    description
  }
}

# Get all profiles
query {
  profiles {
    id
    name
    title
    description
  }
}
```

## Building for Production

```bash
go build -o portfolio-server main.go
```

Then run the binary:
```bash
./portfolio-server
```

## Configuration

The application uses environment variables for configuration:

- `DB_HOST`: PostgreSQL host (default: localhost)
- `DB_PORT`: PostgreSQL port (default: 5432)
- `DB_NAME`: Database name (required)
- `DB_USER`: Database user (required)
- `DB_PASSWORD`: Database password (required)
- `PORT`: Server port (default: 8080)

## Development

- `.env` files are loaded automatically in development using `godotenv`
- Environment variables take precedence over `.env` file values
- The application fails fast with clear error messages for missing required config

