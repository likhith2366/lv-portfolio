CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE tracks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    artist TEXT NOT NULL,
    src TEXT NOT NULL,
    cover TEXT,
    duration_seconds INTEGER,
    tags TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create an index on created_at for efficient ordering
CREATE INDEX idx_tracks_created_at ON tracks(created_at DESC);

-- Create an index on artist for efficient filtering
CREATE INDEX idx_tracks_artist ON tracks(artist);
