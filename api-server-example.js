// Simple Node.js Express server to handle violations API
// This is an example implementation for the /api/violations endpoint

const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files from current directory

// Store violations in memory (in production, use a database)
let violations = [];

// API endpoint to receive violations
app.post('/api/violations', async (req, res) => {
    try {
        const violation = {
            ...req.body,
            receivedAt: new Date().toISOString(),
            ip: req.ip || req.connection.remoteAddress
        };
        
        violations.push(violation);
        
        // Log to console for debugging
        console.log('New violation received:', violation);
        
        // Optionally save to file
        await saveViolationToFile(violation);
        
        res.status(200).json({ 
            success: true, 
            message: 'Violation logged successfully',
            violationId: violation.id 
        });
        
    } catch (error) {
        console.error('Error processing violation:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to log violation' 
        });
    }
});

// API endpoint to get all violations
app.get('/api/violations', (req, res) => {
    const { sessionId, studentId } = req.query;
    
    let filteredViolations = violations;
    
    if (sessionId) {
        filteredViolations = filteredViolations.filter(v => v.sessionId === sessionId);
    }
    
    if (studentId) {
        filteredViolations = filteredViolations.filter(v => v.studentId === studentId);
    }
    
    res.json({
        success: true,
        violations: filteredViolations,
        count: filteredViolations.length
    });
});

// API endpoint to clear violations
app.delete('/api/violations', (req, res) => {
    const { sessionId } = req.query;
    
    if (sessionId) {
        violations = violations.filter(v => v.sessionId !== sessionId);
    } else {
        violations = [];
    }
    
    res.json({
        success: true,
        message: 'Violations cleared'
    });
});

// Save violation to file for persistence
async function saveViolationToFile(violation) {
    try {
        const logDir = path.join(__dirname, 'logs');
        await fs.mkdir(logDir, { recursive: true });
        
        const logFile = path.join(logDir, `violations-${new Date().toISOString().split('T')[0]}.json`);
        
        let existingLogs = [];
        try {
            const data = await fs.readFile(logFile, 'utf8');
            existingLogs = JSON.parse(data);
        } catch (error) {
            // File doesn't exist or is empty, start with empty array
        }
        
        existingLogs.push(violation);
        await fs.writeFile(logFile, JSON.stringify(existingLogs, null, 2));
        
    } catch (error) {
        console.error('Error saving violation to file:', error);
    }
}

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Vretta Violations API Server running on port ${PORT}`);
    console.log(`Access the assessment page at: http://localhost:${PORT}`);
    console.log(`API endpoints:`);
    console.log(`  POST /api/violations - Log a new violation`);
    console.log(`  GET /api/violations - Get all violations`);
    console.log(`  DELETE /api/violations - Clear violations`);
});

module.exports = app; 