import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 4000;

app.disable('x-powered-by');
app.use(helmet());

const allowedOrigins = [
  process.env.ALLOWED_ORIGIN,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://localhost:5173',
  'https://127.0.0.1:5173',
  'http://localhost:4000',
  'http://127.0.0.1:4000',
  'https://localhost:4000',
  'https://127.0.0.1:4000',
].filter(Boolean);
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error(`Origin not allowed by CORS: ${origin}`));
    },
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

const db = await open({
  filename: './database.sqlite',
  driver: sqlite3.Database,
});

await db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    service TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

app.post('/api/messages', async (req, res) => {
  const { name, email, service, message } = req.body;
  if (!name || !email || !service || !message) {
    return res.status(400).json({ error: 'Tous les champs sont requis.' });
  }

  try {
    const result = await db.run(
      'INSERT INTO messages (name, email, service, message) VALUES (?, ?, ?, ?)',
      name,
      email,
      service,
      message
    );
    res.status(201).json({ id: result.lastID });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
});

app.get('/api/messages', async (req, res) => {
  const messages = await db.all('SELECT * FROM messages ORDER BY created_at DESC');
  res.json(messages);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
