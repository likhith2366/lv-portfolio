package config

import (
	"fmt"
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

// Config holds all configuration for the application
type Config struct {
	Database DatabaseConfig
}

// DatabaseConfig holds database configuration
type DatabaseConfig struct {
	Host     string
	Port     int
	Name     string
	User     string
	Password string
}

// Load loads configuration from environment variables
func Load() (*Config, error) {
	// Try to load .env file in development (ignore if it doesn't exist)
	_ = godotenv.Load()

	config := &Config{}

	// Load database configuration
	dbConfig, err := loadDatabaseConfig()
	if err != nil {
		return nil, fmt.Errorf("failed to load database config: %w", err)
	}
	config.Database = *dbConfig

	return config, nil
}

// loadDatabaseConfig loads database configuration from environment variables
func loadDatabaseConfig() (*DatabaseConfig, error) {
	config := &DatabaseConfig{}

	// Required environment variables
	requiredVars := map[string]*string{
		"DB_HOST":     &config.Host,
		"DB_USER":     &config.User,
		"DB_PASSWORD": &config.Password,
		"DB_NAME":     &config.Name,
	}

	// Load required string variables
	for envVar, target := range requiredVars {
		value := os.Getenv(envVar)
		if value == "" {
			return nil, fmt.Errorf("required environment variable %s is not set", envVar)
		}
		*target = value
	}

	// Load port (with default)
	portStr := os.Getenv("DB_PORT")
	if portStr == "" {
		config.Port = 5432 // default PostgreSQL port
	} else {
		port, err := strconv.Atoi(portStr)
		if err != nil {
			return nil, fmt.Errorf("invalid DB_PORT value '%s': %w", portStr, err)
		}
		config.Port = port
	}

	return config, nil
}

// DatabaseURL returns the PostgreSQL connection URL
func (c *Config) DatabaseURL() string {
	return fmt.Sprintf("postgres://%s:%s@%s:%d/%s?sslmode=disable",
		c.Database.User,
		c.Database.Password,
		c.Database.Host,
		c.Database.Port,
		c.Database.Name,
	)
}
