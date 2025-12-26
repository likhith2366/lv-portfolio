-- Seed data for tracks table

INSERT INTO tracks (title, artist, src, cover, duration_seconds, tags) VALUES
(
    'Oka Maru Kalisina Andam',
    'SenSongs',
    '/Assets/Song/Oka Maru Kalisina Andam - SenSongsMp3.Co.mp3',
    '/Assets/Song/Oka Maru Kalisina Andam - SenSongsMp3.Co.jpg',
    240, -- 4 minutes (placeholder duration)
    ARRAY['telugu', 'movie', 'south-indian', 'bollywood-inspired']
);
