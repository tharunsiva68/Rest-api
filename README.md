# Simple REST API (Node.js + Express)

A basic REST API for managing "notes". Data is stored in an in-memory array,
so no database setup is required (data resets when the server restarts).

## Setup

```bash
npm install
npm start
```

The server runs at `http://localhost:3000`.

## Endpoints

| Method | Endpoint      | Description              | Body (JSON)                          |
|--------|---------------|---------------------------|----------------------------------------|
| GET    | /notes        | Get all notes             | —                                       |
| GET    | /notes/:id    | Get a single note         | —                                       |
| POST   | /notes        | Create a new note         | `{ "title": "...", "content": "..." }` |
| PUT    | /notes/:id    | Update an existing note   | `{ "title": "...", "content": "..." }` |
| DELETE | /notes/:id    | Delete a note             | —                                       |

## Testing with Postman (or curl)

1. **Get all notes**
   ```bash
   curl http://localhost:3000/notes
   ```

2. **Create a note**
   ```bash
   curl -X POST http://localhost:3000/notes \
     -H "Content-Type: application/json" \
     -d '{"title":"Groceries","content":"Milk, eggs, bread"}'
   ```

3. **Get a single note**
   ```bash
   curl http://localhost:3000/notes/1
   ```

4. **Update a note**
   ```bash
   curl -X PUT http://localhost:3000/notes/1 \
     -H "Content-Type: application/json" \
     -d '{"title":"Groceries (updated)"}'
   ```

5. **Delete a note**
   ```bash
   curl -X DELETE http://localhost:3000/notes/1
   ```

In Postman: import each request manually, set the method + URL from the table
above, and for POST/PUT set the Body tab to **raw → JSON** with the example
payloads shown.
