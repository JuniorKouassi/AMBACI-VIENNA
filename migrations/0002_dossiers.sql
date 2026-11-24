-- Consular document pre-submission ("dossiers").
-- Files live in the private R2 bucket bound as DOSSIERS; this schema holds the metadata.

CREATE TABLE dossiers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  reference TEXT NOT NULL UNIQUE,
  token_hash TEXT NOT NULL UNIQUE,          -- SHA-256 of the personal link token (the token itself is never stored)
  link_version INTEGER NOT NULL DEFAULT 1,  -- the token is derived from (reference, version); recovering a link bumps it
  service TEXT NOT NULL,                    -- passeport_premiere | passeport_renouvellement | passeport_urgence | carte_consulaire | visa
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT '',
  lang TEXT NOT NULL DEFAULT 'fr',
  status TEXT NOT NULL DEFAULT 'draft',     -- draft | submitted | needs_fix | validated | purged
  booking_reference TEXT,                   -- set when the appointment is booked with this dossier
  ip_hash TEXT,                             -- salted hash, only used to limit abuse
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  submitted_at TEXT,
  validated_at TEXT,
  validated_by TEXT,
  delete_after TEXT NOT NULL                -- files and personal data are erased after this date
);

CREATE TABLE dossier_docs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  dossier_id INTEGER NOT NULL REFERENCES dossiers(id),
  doc_key TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'missing',   -- missing | received | validated | needs_fix
  comment TEXT,                             -- reason shown to the citizen when a correction is requested
  reviewed_by TEXT,
  reviewed_at TEXT,
  UNIQUE (dossier_id, doc_key)
);

CREATE TABLE dossier_files (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  dossier_id INTEGER NOT NULL REFERENCES dossiers(id),
  doc_key TEXT NOT NULL,
  r2_key TEXT NOT NULL UNIQUE,
  mime TEXT NOT NULL,
  size INTEGER NOT NULL,
  original_name TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Who did what, and when (no document contents).
CREATE TABLE dossier_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  dossier_id INTEGER NOT NULL REFERENCES dossiers(id),
  actor TEXT NOT NULL,                      -- 'citizen' | 'system' | agent e-mail
  action TEXT NOT NULL,
  detail TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_dossiers_status ON dossiers (status, submitted_at);
CREATE INDEX idx_dossiers_email ON dossiers (email, created_at);
CREATE INDEX idx_dossiers_ip ON dossiers (ip_hash, created_at);
CREATE INDEX idx_dossiers_delete ON dossiers (delete_after);
CREATE INDEX idx_dossier_files_dossier ON dossier_files (dossier_id, doc_key);
CREATE INDEX idx_dossier_events_dossier ON dossier_events (dossier_id, created_at);
