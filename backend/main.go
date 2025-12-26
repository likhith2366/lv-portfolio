package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/graphql-go/graphql"
	"github.com/graphql-go/handler"
	"github.com/jackc/pgx/v5/pgxpool"
	"portfolio-backend/internal/config"
	"portfolio-backend/internal/db"
)

type Profile struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Title       string `json:"title"`
	Description string `json:"description"`
}

var dbPool *pgxpool.Pool

// GraphQL schema
var profileType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Profile",
	Fields: graphql.Fields{
		"id": &graphql.Field{
			Type: graphql.Int,
		},
		"name": &graphql.Field{
			Type: graphql.String,
		},
		"title": &graphql.Field{
			Type: graphql.String,
		},
		"description": &graphql.Field{
			Type: graphql.String,
		},
	},
})

var queryType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Query",
	Fields: graphql.Fields{
		"profile": &graphql.Field{
			Type: profileType,
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				if dbPool == nil {
					// Return dummy data if no database connection
					return Profile{
						ID:          1,
						Name:        "Likhith Vardhan",
						Title:       "Software Developer",
						Description: "Passionate about creating innovative solutions with cutting-edge technology.",
					}, nil
				}

				ctx := context.Background()
				var profile Profile
				err := dbPool.QueryRow(ctx, "SELECT id, name, title, description FROM profiles WHERE id = 1").Scan(
					&profile.ID, &profile.Name, &profile.Title, &profile.Description)
				if err != nil {
					return nil, err
				}
				return profile, nil
			},
		},
		"profiles": &graphql.Field{
			Type: graphql.NewList(profileType),
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				if dbPool == nil {
					// Return dummy data if no database connection
					return []Profile{
						{
							ID:          1,
							Name:        "Likhith Vardhan",
							Title:       "Software Developer",
							Description: "Passionate about creating innovative solutions with cutting-edge technology.",
						},
					}, nil
				}

				ctx := context.Background()
				rows, err := dbPool.Query(ctx, "SELECT id, name, title, description FROM profiles")
				if err != nil {
					return nil, err
				}
				defer rows.Close()

				var profiles []Profile
				for rows.Next() {
					var profile Profile
					err := rows.Scan(&profile.ID, &profile.Name, &profile.Title, &profile.Description)
					if err != nil {
						return nil, err
					}
					profiles = append(profiles, profile)
				}
				return profiles, nil
			},
		},
	},
})

var schema, _ = graphql.NewSchema(graphql.SchemaConfig{
	Query: queryType,
})

func initDB() {
	ctx := context.Background()

	// Load configuration
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("Failed to load configuration: %v", err)
	}

	// Connect to database using pgxpool
	dbPool, err = db.Connect(ctx, cfg)
	if err != nil {
		log.Printf("Warning: Could not connect to PostgreSQL: %v", err)
		log.Println("Continuing with dummy data...")
		return
	}

	log.Println("Connected to PostgreSQL successfully!")
}

func main() {
	fmt.Println("🚀 Starting main function...")

	// Initialize database connection
	initDB()

	// Get the current working directory
	wd, err := os.Getwd()
	if err != nil {
		log.Fatal(err)
	}

	// Path to the frontend build directory
	frontendPath := filepath.Join(wd, "../frontend/build")

	// GraphQL handler
	h := handler.New(&handler.Config{
		Schema:   &schema,
		Pretty:   true,
		GraphiQL: true, // Enable GraphiQL interface
	})

	// GraphQL endpoint
	http.Handle("/graphql", h)

	// REST API fallback
	http.HandleFunc("/api/profile", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		profile := Profile{
			ID:          1,
			Name:        "Likhith Vardhan",
			Title:       "Software Developer",
			Description: "Passionate about creating innovative solutions with cutting-edge technology.",
		}

		json.NewEncoder(w).Encode(profile)
	})

	// Welcome page route
	http.HandleFunc("/welcome", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/html")
		html := `
		<!DOCTYPE html>
		<html>
		<head>
			<title>Welcome - Likhith Vardhan</title>
			<style>
				body {
					font-family: Arial, sans-serif;
					background: linear-gradient(135deg, #1a1a1a, #000000);
					color: white;
					text-align: center;
					padding: 50px;
					min-height: 100vh;
					margin: 0;
				}
				.container {
					max-width: 800px;
					margin: 0 auto;
				}
				h1 {
					font-size: 3rem;
					margin-bottom: 20px;
					background: linear-gradient(45deg, #00ff88, #00aaff);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
				}
				p {
					font-size: 1.2rem;
					line-height: 1.6;
					margin-bottom: 30px;
				}
				.back-btn {
					display: inline-block;
					padding: 15px 30px;
					background: linear-gradient(45deg, #00ff88, #00aaff);
					color: black;
					text-decoration: none;
					border-radius: 25px;
					font-weight: bold;
					transition: transform 0.3s ease;
				}
				.back-btn:hover {
					transform: scale(1.05);
				}
			</style>
		</head>
		<body>
			<div class="container">
				<h1>Welcome to My Portfolio!</h1>
				<p>
					Hello! I'm Likhith Vardhan, a passionate software developer creating innovative solutions
					with cutting-edge technology. This is a dummy welcome page that we can customize later.
				</p>
				<p>
					Feel free to explore my portfolio and get in touch!
				</p>
				<a href="/" class="back-btn">← Back to Portfolio</a>
			</div>
		</body>
		</html>`
		fmt.Fprint(w, html)
	})

	// Serve static files from frontend build directory
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path == "/" {
			w.Header().Set("Content-Type", "text/plain")
			fmt.Fprint(w, "Server is running!")
			return
		}

		// Check if the requested file exists in the frontend build
		requestedPath := filepath.Join(frontendPath, r.URL.Path)
		if _, err := os.Stat(requestedPath); err == nil && !os.IsNotExist(err) {
			http.ServeFile(w, r, requestedPath)
			return
		}

		// Serve index.html for SPA routing
		http.ServeFile(w, r, filepath.Join(frontendPath, "index.html"))
	})

	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("🚀 Server starting on port %s", port)
	log.Printf("📁 Serving frontend from: %s", frontendPath)
	log.Printf("🔗 GraphQL endpoint: http://localhost:%s/graphql", port)
	log.Printf("📄 Welcome page: http://localhost:%s/welcome", port)

	log.Fatal(http.ListenAndServe(":"+port, nil))
}
