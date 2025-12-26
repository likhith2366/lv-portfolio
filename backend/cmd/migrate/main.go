package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"path/filepath"

	"github.com/jackc/pgx/v5/pgxpool"
	"portfolio-backend/internal/config"
	"portfolio-backend/internal/db"
)

func main() {
	ctx := context.Background()

	// Load configuration
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("Failed to load configuration: %v", err)
	}

	// Connect to database
	pool, err := db.Connect(ctx, cfg)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer db.Close(pool)

	// Get the working directory
	wd, err := os.Getwd()
	if err != nil {
		log.Fatalf("Failed to get working directory: %v", err)
	}

	// Migration files to execute in order
	migrationFiles := []string{
		filepath.Join(wd, "db", "migrations", "001_init.sql"),
		filepath.Join(wd, "db", "seed", "seed.sql"),
	}

	// Execute each migration file
	for _, migrationFile := range migrationFiles {
		if err := executeSQLFile(ctx, pool, migrationFile); err != nil {
			log.Fatalf("Failed to execute migration file %s: %v", migrationFile, err)
		}
		log.Printf("Successfully executed migration file: %s", filepath.Base(migrationFile))
	}

	log.Println("All migrations completed successfully!")
}

// executeSQLFile reads and executes a SQL file
func executeSQLFile(ctx context.Context, pool *pgxpool.Pool, filePath string) error {
	// Read the SQL file
	sqlBytes, err := os.ReadFile(filePath)
	if err != nil {
		return fmt.Errorf("failed to read SQL file: %w", err)
	}

	sqlContent := string(sqlBytes)

	// Execute the SQL
	_, err = pool.Exec(ctx, sqlContent)
	if err != nil {
		return fmt.Errorf("failed to execute SQL: %w", err)
	}

	return nil
}
