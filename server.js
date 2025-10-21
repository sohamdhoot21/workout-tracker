const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Data file path
const DATA_FILE = path.join(__dirname, 'data', 'workouts.json');

// Ensure data directory exists
if (!fs.existsSync(path.dirname(DATA_FILE))) {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
}

// Initialize data file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ workouts: [] }, null, 2));
}

// Helper function to read workouts
function readWorkouts() {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return { workouts: [] };
    }
}

// Helper function to write workouts
function writeWorkouts(workouts) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ workouts }, null, 2));
}

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Get all workouts
app.get('/api/workouts', (req, res) => {
    const data = readWorkouts();
    res.json(data.workouts);
});

// Add new workout
app.post('/api/workouts', (req, res) => {
    const { name, type, duration, calories, date, exercises } = req.body;
    
    if (!name || !type || !duration) {
        return res.status(400).json({ error: 'Name, type, and duration are required' });
    }

    const data = readWorkouts();
    const newWorkout = {
        id: Date.now().toString(),
        name,
        type,
        duration: parseInt(duration),
        calories: parseInt(calories) || 0,
        date: date || new Date().toISOString().split('T')[0],
        exercises: exercises || [],
        createdAt: new Date().toISOString()
    };

    data.workouts.push(newWorkout);
    writeWorkouts(data.workouts);

    res.status(201).json(newWorkout);
});

// Update workout
app.put('/api/workouts/:id', (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    const data = readWorkouts();
    const workoutIndex = data.workouts.findIndex(w => w.id === id);

    if (workoutIndex === -1) {
        return res.status(404).json({ error: 'Workout not found' });
    }

    data.workouts[workoutIndex] = { ...data.workouts[workoutIndex], ...updates };
    writeWorkouts(data.workouts);

    res.json(data.workouts[workoutIndex]);
});

// Delete workout
app.delete('/api/workouts/:id', (req, res) => {
    const { id } = req.params;

    const data = readWorkouts();
    const workoutIndex = data.workouts.findIndex(w => w.id === id);

    if (workoutIndex === -1) {
        return res.status(404).json({ error: 'Workout not found' });
    }

    data.workouts.splice(workoutIndex, 1);
    writeWorkouts(data.workouts);

    res.json({ message: 'Workout deleted successfully' });
});

// Get workout statistics
app.get('/api/stats', (req, res) => {
    const data = readWorkouts();
    const workouts = data.workouts;

    const totalWorkouts = workouts.length;
    const totalDuration = workouts.reduce((sum, w) => sum + w.duration, 0);
    const totalCalories = workouts.reduce((sum, w) => sum + w.calories, 0);
    const avgDuration = totalWorkouts > 0 ? Math.round(totalDuration / totalWorkouts) : 0;

    // Group by type
    const typeStats = workouts.reduce((acc, w) => {
        acc[w.type] = (acc[w.type] || 0) + 1;
        return acc;
    }, {});

    res.json({
        totalWorkouts,
        totalDuration,
        totalCalories,
        avgDuration,
        typeStats
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Workout Tracker server running on http://localhost:${PORT}`);
    console.log(`📊 Dashboard available at http://localhost:${PORT}`);
});
