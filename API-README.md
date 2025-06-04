# Vretta Violations API Server

This API server captures and manages security violations from the Vretta Soft Lock assessment platform.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

The server will run on `http://localhost:3000` by default.

## API Endpoints

### POST /api/violations
Logs a new security violation.

**Request Body:**
```json
{
  "id": 1640995200000,
  "type": "focus",
  "message": "User switched away from assessment window",
  "timestamp": "2021-12-31T12:00:00.000Z",
  "details": {},
  "icon": "👁️",
  "sessionId": "vretta_1640995200000_abc123",
  "studentId": "student123",
  "url": "http://localhost:3000"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Violation logged successfully",
  "violationId": 1640995200000
}
```

### GET /api/violations
Retrieves violations with optional filtering.

**Query Parameters:**
- `sessionId` (optional): Filter by session ID
- `studentId` (optional): Filter by student ID

**Response:**
```json
{
  "success": true,
  "violations": [...],
  "count": 5
}
```

### DELETE /api/violations
Clears violations.

**Query Parameters:**
- `sessionId` (optional): Clear only violations for specific session

**Response:**
```json
{
  "success": true,
  "message": "Violations cleared"
}
```

## Violation Types

The system tracks various types of security violations:

- `focus`: Window focus changes (switching applications)
- `copy`: Copy operations
- `paste`: Paste operations
- `virtual-copy`: Virtual clipboard operations
- `context-menu`: Right-click attempts
- `shortcut`: Blocked keyboard shortcuts
- `navigate`: Navigation attempts
- `tab`: Tab switching
- `devtools`: Developer tools access
- `window`: Window manipulation
- `general`: General security violations

## File Storage

Violations are automatically saved to daily log files in the `logs/` directory:
- Format: `violations-YYYY-MM-DD.json`
- Each file contains an array of violation objects

## Integration

The trigger page (`index.html`) automatically sends violations to this API when:
1. The server is running
2. Security mode is activated
3. A violation occurs

## Production Deployment

For production use:
1. Replace in-memory storage with a proper database
2. Add authentication and authorization
3. Implement rate limiting
4. Add proper logging and monitoring
5. Use environment variables for configuration
6. Set up HTTPS

## Environment Variables

- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (development/production)

## Testing

You can test the API using curl:

```bash
# Log a violation
curl -X POST http://localhost:3000/api/violations \
  -H "Content-Type: application/json" \
  -d '{"type":"test","message":"Test violation","timestamp":"2021-12-31T12:00:00.000Z"}'

# Get violations
curl http://localhost:3000/api/violations

# Clear violations
curl -X DELETE http://localhost:3000/api/violations
``` 