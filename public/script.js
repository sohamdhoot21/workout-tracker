// Global variables
let workouts = [];
let currentSection = 'dashboard';

// DOM elements
const navButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.section');
const workoutForm = document.getElementById('workout-form');
const workoutsList = document.getElementById('workouts-list');
const typeFilter = document.getElementById('type-filter');
const dateFilter = document.getElementById('date-filter');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadWorkouts();
    loadStats();
});

// Initialize app
function initializeApp() {
    // Set today's date as default
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('workout-date').value = today;
}

// Setup event listeners
function setupEventListeners() {
    // Navigation
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => switchSection(btn.dataset.section));
    });

    // Form submission
    workoutForm.addEventListener('submit', handleFormSubmit);

    // Add exercise button
    document.getElementById('add-exercise').addEventListener('click', addExercise);

    // Filters
    typeFilter.addEventListener('change', filterWorkouts);
    dateFilter.addEventListener('change', filterWorkouts);
}

// Switch between sections
function switchSection(sectionName) {
    // Update navigation
    navButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.section === sectionName);
    });

    // Update sections
    sections.forEach(section => {
        section.classList.toggle('active', section.id === sectionName);
    });

    currentSection = sectionName;

    // Load data for specific sections
    if (sectionName === 'workouts') {
        displayWorkouts();
    }
}

// Handle form submission
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(workoutForm);
    const workoutData = {
        name: formData.get('name'),
        type: formData.get('type'),
        duration: parseInt(formData.get('duration')),
        calories: parseInt(formData.get('calories')) || 0,
        date: formData.get('date'),
        exercises: getExercises()
    };

    try {
        showLoading();
        const response = await fetch('/api/workouts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(workoutData)
        });

        if (response.ok) {
            const newWorkout = await response.json();
            workouts.push(newWorkout);
            showToast('Workout saved successfully!', 'success');
            workoutForm.reset();
            clearExercises();
            loadStats();
            switchSection('dashboard');
        } else {
            const error = await response.json();
            showToast(error.error || 'Failed to save workout', 'error');
        }
    } catch (error) {
        showToast('Network error. Please try again.', 'error');
    } finally {
        hideLoading();
    }
}

// Get exercises from form
function getExercises() {
    const exerciseItems = document.querySelectorAll('.exercise-item');
    const exercises = [];
    
    exerciseItems.forEach(item => {
        const name = item.querySelector('.exercise-name').value;
        const sets = item.querySelector('.exercise-sets').value;
        const reps = item.querySelector('.exercise-reps').value;
        
        if (name.trim()) {
            exercises.push({
                name: name.trim(),
                sets: parseInt(sets) || 0,
                reps: parseInt(reps) || 0
            });
        }
    });
    
    return exercises;
}

// Add exercise row
function addExercise() {
    const container = document.getElementById('exercises-container');
    const exerciseItem = document.createElement('div');
    exerciseItem.className = 'exercise-item';
    exerciseItem.innerHTML = `
        <input type="text" placeholder="Exercise name" class="exercise-name">
        <input type="number" placeholder="Sets" class="exercise-sets" min="0">
        <input type="number" placeholder="Reps" class="exercise-reps" min="0">
        <button type="button" class="remove-exercise" onclick="removeExercise(this)">
            <i class="fas fa-trash"></i>
        </button>
    `;
    container.appendChild(exerciseItem);
}

// Remove exercise row
function removeExercise(button) {
    button.parentElement.remove();
}

// Clear exercises
function clearExercises() {
    const container = document.getElementById('exercises-container');
    container.innerHTML = `
        <div class="exercise-item">
            <input type="text" placeholder="Exercise name" class="exercise-name">
            <input type="number" placeholder="Sets" class="exercise-sets" min="0">
            <input type="number" placeholder="Reps" class="exercise-reps" min="0">
            <button type="button" class="remove-exercise" onclick="removeExercise(this)">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
}

// Load workouts from API
async function loadWorkouts() {
    try {
        const response = await fetch('/api/workouts');
        if (response.ok) {
            workouts = await response.json();
        }
    } catch (error) {
        console.error('Error loading workouts:', error);
    }
}

// Display workouts
function displayWorkouts() {
    const filteredWorkouts = getFilteredWorkouts();
    
    if (filteredWorkouts.length === 0) {
        workoutsList.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #666;">
                <i class="fas fa-dumbbell" style="font-size: 3rem; margin-bottom: 20px; opacity: 0.3;"></i>
                <p>No workouts found. Start by adding your first workout!</p>
            </div>
        `;
        return;
    }

    workoutsList.innerHTML = filteredWorkouts.map(workout => `
        <div class="workout-item">
            <div class="workout-header">
                <div class="workout-name">${workout.name}</div>
                <div class="workout-type">${workout.type}</div>
            </div>
            <div class="workout-details">
                <div class="workout-detail">
                    <div class="workout-detail-label">Duration</div>
                    <div class="workout-detail-value">${workout.duration} min</div>
                </div>
                <div class="workout-detail">
                    <div class="workout-detail-label">Calories</div>
                    <div class="workout-detail-value">${workout.calories}</div>
                </div>
                <div class="workout-detail">
                    <div class="workout-detail-label">Date</div>
                    <div class="workout-detail-value">${formatDate(workout.date)}</div>
                </div>
                ${workout.exercises.length > 0 ? `
                <div class="workout-detail">
                    <div class="workout-detail-label">Exercises</div>
                    <div class="workout-detail-value">${workout.exercises.length}</div>
                </div>
                ` : ''}
            </div>
            ${workout.exercises.length > 0 ? `
            <div style="margin-top: 15px;">
                <strong>Exercises:</strong>
                <ul style="margin-top: 5px; padding-left: 20px;">
                    ${workout.exercises.map(ex => `
                        <li>${ex.name} - ${ex.sets} sets × ${ex.reps} reps</li>
                    `).join('')}
                </ul>
            </div>
            ` : ''}
            <div class="workout-actions">
                <button class="btn-edit" onclick="editWorkout('${workout.id}')">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn-delete" onclick="deleteWorkout('${workout.id}')">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `).join('');
}

// Get filtered workouts
function getFilteredWorkouts() {
    let filtered = [...workouts];
    
    if (typeFilter.value) {
        filtered = filtered.filter(w => w.type === typeFilter.value);
    }
    
    if (dateFilter.value) {
        filtered = filtered.filter(w => w.date === dateFilter.value);
    }
    
    return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Filter workouts
function filterWorkouts() {
    displayWorkouts();
}

// Load statistics
async function loadStats() {
    try {
        const response = await fetch('/api/stats');
        if (response.ok) {
            const stats = await response.json();
            updateStatsDisplay(stats);
        }
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// Update stats display
function updateStatsDisplay(stats) {
    document.getElementById('total-workouts').textContent = stats.totalWorkouts;
    document.getElementById('total-duration').textContent = stats.totalDuration;
    document.getElementById('total-calories').textContent = stats.totalCalories;
    document.getElementById('avg-duration').textContent = stats.avgDuration;
    
    // Update type chart
    const typeChart = document.getElementById('type-chart');
    typeChart.innerHTML = Object.entries(stats.typeStats).map(([type, count]) => `
        <div class="type-item">
            <div class="type-name">${type}</div>
            <div class="type-count">${count}</div>
        </div>
    `).join('');
}

// Edit workout
function editWorkout(id) {
    const workout = workouts.find(w => w.id === id);
    if (!workout) return;
    
    // Fill form with workout data
    document.getElementById('workout-name').value = workout.name;
    document.getElementById('workout-type').value = workout.type;
    document.getElementById('workout-duration').value = workout.duration;
    document.getElementById('workout-calories').value = workout.calories;
    document.getElementById('workout-date').value = workout.date;
    
    // Clear and populate exercises
    clearExercises();
    if (workout.exercises.length > 0) {
        workout.exercises.forEach((exercise, index) => {
            if (index > 0) addExercise();
            const items = document.querySelectorAll('.exercise-item');
            const item = items[items.length - 1];
            item.querySelector('.exercise-name').value = exercise.name;
            item.querySelector('.exercise-sets').value = exercise.sets;
            item.querySelector('.exercise-reps').value = exercise.reps;
        });
    }
    
    switchSection('add-workout');
}

// Delete workout
async function deleteWorkout(id) {
    if (!confirm('Are you sure you want to delete this workout?')) return;
    
    try {
        showLoading();
        const response = await fetch(`/api/workouts/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            workouts = workouts.filter(w => w.id !== id);
            showToast('Workout deleted successfully!', 'success');
            displayWorkouts();
            loadStats();
        } else {
            showToast('Failed to delete workout', 'error');
        }
    } catch (error) {
        showToast('Network error. Please try again.', 'error');
    } finally {
        hideLoading();
    }
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Show loading spinner
function showLoading() {
    document.getElementById('loading').classList.remove('hidden');
}

// Hide loading spinner
function hideLoading() {
    document.getElementById('loading').classList.add('hidden');
}

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type === 'error' ? 'error' : ''}`;
    toast.classList.remove('hidden');
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.classList.add('hidden'), 300);
    }, 3000);
}
