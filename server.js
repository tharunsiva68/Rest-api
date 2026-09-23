// server.js
// A simple REST API for managing "notes" using Node.js + Express.
// Storage: in-memory array (resets on server restart). No database required.

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// In-memory "database" — just an array of note objects
// Each note: { id, title, content, createdAt }
let notes = [
  { id: 1, title: 'Welcome', content: 'This is your first note!', createdAt: new Date().toISOString() }
];
let nextId = 2; // simple auto-increment counter for new note IDs

// Root route — quick sanity check that the API is running
app.get('/', (req, res) => {
  res.send('Simple REST API is running. Try GET /notes');
});

// GET /notes — return all notes
app.get('/notes', (req, res) => {
  res.status(200).json(notes);
});

// GET /notes/:id — return a single note by id
app.get('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const note = notes.find(n => n.id === id);

  if (!note) {
    return res.status(404).json({ error: `Note with id ${id} not found` });
  }
  res.status(200).json(note);
});

// POST /notes — create a new note
// Body: { "title": "string", "content": "string" }
app.post('/notes', (req, res) => {
  const { title, content } = req.body;

  // Basic validation
  if (!title || !content) {
    return res.status(400).json({ error: 'Both "title" and "content" are required.' });
  }

  const newNote = {
    id: nextId++,
    title,
    content,
    createdAt: new Date().toISOString()
  };

  notes.push(newNote);
  res.status(201).json(newNote);
});

// PUT /notes/:id — update an existing note (title and/or content)
// Body: { "title": "string", "content": "string" }
app.put('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const note = notes.find(n => n.id === id);

  if (!note) {
    return res.status(404).json({ error: `Note with id ${id} not found` });
  }

  const { title, content } = req.body;
  if (title !== undefined) note.title = title;
  if (content !== undefined) note.content = content;

  res.status(200).json(note);
});

// DELETE /notes/:id — delete a note by id
app.delete('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = notes.findIndex(n => n.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `Note with id ${id} not found` });
  }

  const deleted = notes.splice(index, 1)[0];
  res.status(200).json({ message: 'Note deleted', note: deleted });
});

// Fallback for unmatched routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Try: GET http://localhost:${PORT}/notes`);
});
