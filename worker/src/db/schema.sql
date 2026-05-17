-- Alarmu D1 Schema
-- Run: wrangler d1 execute alarmu-db --file=src/db/schema.sql

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    slug        TEXT NOT NULL UNIQUE,
    label       TEXT NOT NULL,
    icon        TEXT NOT NULL DEFAULT 'mdi:music-note',
    color       TEXT NOT NULL DEFAULT '#7A9D00',
    description TEXT NOT NULL DEFAULT '',
    sort_order  INTEGER NOT NULL DEFAULT 0,
    created_at  TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Ringtones table
CREATE TABLE IF NOT EXISTS ringtones (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    slug            TEXT NOT NULL UNIQUE,
    title           TEXT NOT NULL,
    category_slug   TEXT NOT NULL,
    description     TEXT NOT NULL DEFAULT '',
    duration        TEXT NOT NULL DEFAULT '0:00',
    duration_ms     INTEGER NOT NULL DEFAULT 0,
    downloads       INTEGER NOT NULL DEFAULT 0,
    rating          REAL NOT NULL DEFAULT 0.0,
    audio_filename  TEXT NOT NULL,
    audio_url       TEXT NOT NULL DEFAULT '',
    file_size       INTEGER NOT NULL DEFAULT 0,
    mime_type       TEXT NOT NULL DEFAULT 'audio/mpeg',
    is_featured     INTEGER NOT NULL DEFAULT 0,
    is_trending     INTEGER NOT NULL DEFAULT 0,
    is_premium      INTEGER NOT NULL DEFAULT 0,
    affiliate_url   TEXT NOT NULL DEFAULT '',
    status          TEXT NOT NULL DEFAULT 'published',
    created_at      TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at      TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (category_slug) REFERENCES categories(slug) ON UPDATE CASCADE
);

-- Tags table (many-to-many)
CREATE TABLE IF NOT EXISTS tags (
    id   INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS ringtone_tags (
    ringtone_slug TEXT NOT NULL,
    tag_id        INTEGER NOT NULL,
    PRIMARY KEY (ringtone_slug, tag_id),
    FOREIGN KEY (ringtone_slug) REFERENCES ringtones(slug) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- Performance indexes
CREATE INDEX IF NOT EXISTS idx_ringtones_category ON ringtones(category_slug);
CREATE INDEX IF NOT EXISTS idx_ringtones_status ON ringtones(status);
CREATE INDEX IF NOT EXISTS idx_ringtones_featured ON ringtones(is_featured) WHERE is_featured = 1;
CREATE INDEX IF NOT EXISTS idx_ringtones_trending ON ringtones(is_trending) WHERE is_trending = 1;
CREATE INDEX IF NOT EXISTS idx_ringtones_downloads ON ringtones(downloads DESC);
CREATE INDEX IF NOT EXISTS idx_ringtones_rating ON ringtones(rating DESC);
CREATE INDEX IF NOT EXISTS idx_ringtones_created ON ringtones(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tags_name ON tags(name);
