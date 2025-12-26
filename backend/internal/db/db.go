package db

import (
	"context"
	"fmt"
	"log"

	"github.com/jackc/pgx/v5/pgxpool"
	"portfolio-backend/internal/config"
)

// Connect establishes a connection to the PostgreSQL database using pgxpool
func Connect(ctx context.Context, cfg *config.Config) (*pgxpool.Pool, error) {
	// Parse the database URL
	dbURL := cfg.DatabaseURL()

	// Create a new pool configuration
	config, err := pgxpool.ParseConfig(dbURL)
	if err != nil {
		return nil, fmt.Errorf("failed to parse database URL: %w", err)
	}

	// Set connection pool settings
	config.MaxConns = 10
	config.MinConns = 2

	// Create the pool
	pool, err := pgxpool.NewWithConfig(ctx, config)
	if err != nil {
		return nil, fmt.Errorf("failed to create connection pool: %w", err)
	}

	// Test the connection
	if err := pool.Ping(ctx); err != nil {
		pool.Close()
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	log.Println("Successfully connected to PostgreSQL database")
	return pool, nil
}

// Close gracefully closes the database connection pool
func Close(pool *pgxpool.Pool) {
	if pool != nil {
		log.Println("Closing database connection pool")
		pool.Close()
	}
}
