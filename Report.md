# 🏋️ Workout Tracker - Fitness Dashboard

A modern, responsive web application for tracking workouts, monitoring fitness progress, and managing exercise routines. Built with HTML5, CSS3, JavaScript, and Node.js/Express.js.

![Workout Tracker](https://img.shields.io/badge/Version-1.0.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Software Development Life Cycle (SDLC)](#software-development-life-cycle-sdlc)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Project Overview

The Workout Tracker is a comprehensive fitness management system designed to help users track their workout sessions, monitor progress, and maintain fitness goals. The application provides an intuitive interface for logging workouts, viewing statistics, and managing exercise routines.

### Key Objectives
- Provide an easy-to-use interface for workout logging
- Track fitness progress with visual statistics
- Support multiple workout types and exercise tracking
- Ensure responsive design for all devices
- Maintain data persistence and reliability

## ✨ Features

### Core Functionality
- **Workout Logging**: Add new workouts with detailed information
- **Progress Tracking**: Monitor total workouts, duration, and calories burned
- **Exercise Management**: Track individual exercises with sets and reps
- **Statistics Dashboard**: Visual representation of fitness progress
- **Data Filtering**: Filter workouts by type and date
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Advanced Features
- **Real-time Statistics**: Live updates of fitness metrics
- **Workout Types**: Support for Cardio, Strength Training, Yoga, HIIT, Running, Swimming, Cycling
- **Data Persistence**: JSON-based storage system
- **Toast Notifications**: User feedback for all operations
- **Loading States**: Visual feedback during data operations

## 🛠 Technology Stack

### Frontend
- **HTML5**: Semantic markup and modern structure
- **CSS3**: Advanced styling with Flexbox and Grid
- **JavaScript (ES6+)**: Modern JavaScript with async/await
- **Font Awesome**: Icon library for enhanced UI

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **CORS**: Cross-origin resource sharing
- **Body Parser**: Request body parsing middleware

### Data Storage
- **JSON Files**: Lightweight data persistence
- **File System API**: Node.js file operations

## 🔄 Software Development Life Cycle (SDLC)

### 1. Planning & Requirements Analysis

#### 1.1 Project Initiation
- **Objective**: Create a comprehensive workout tracking system
- **Stakeholders**: Fitness enthusiasts, personal trainers, general users
- **Scope**: Web-based application with data persistence

#### 1.2 Requirements Gathering
**Functional Requirements:**
- Users can add new workouts with name, type, duration, and calories
- Users can track individual exercises with sets and reps
- Users can view workout history and statistics
- Users can filter workouts by type and date
- Users can edit and delete existing workouts
- System provides visual statistics and progress tracking

**Non-Functional Requirements:**
- Responsive design for all device sizes
- Fast loading times (< 2 seconds)
- Data persistence and reliability
- Cross-browser compatibility
- Intuitive user interface

#### 1.3 Feasibility Study
- **Technical Feasibility**: ✅ Achievable with current technology stack
- **Economic Feasibility**: ✅ Low-cost development with open-source tools
- **Operational Feasibility**: ✅ Simple deployment and maintenance

### 2. System Design

#### 2.1 Architecture Design
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Data Layer    │
│   (HTML/CSS/JS) │◄──►│   (Express.js)  │◄──►│   (JSON Files)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

#### 2.2 Database Design
**Workout Entity:**
```json
{
  "id": "unique_identifier",
  "name": "workout_name",
  "type": "workout_type",
  "duration": "minutes",
  "calories": "calories_burned",
  "date": "YYYY-MM-DD",
  "exercises": [
    {
      "name": "exercise_name",
      "sets": "number_of_sets",
      "reps": "repetitions"
    }
  ],
  "createdAt": "ISO_timestamp"
}
```

#### 2.3 API Design
- **GET /api/workouts**: Retrieve all workouts
- **POST /api/workouts**: Create new workout
- **PUT /api/workouts/:id**: Update existing workout
- **DELETE /api/workouts/:id**: Delete workout
- **GET /api/stats**: Get workout statistics

### 3. Implementation

#### 3.1 Development Environment Setup
```bash
# Project initialization
npm init -y
npm install express cors body-parser
npm install -D nodemon
```

#### 3.2 Backend Implementation
- **Server Setup**: Express.js server with middleware configuration
- **API Routes**: RESTful endpoints for CRUD operations
- **Data Persistence**: JSON file-based storage system
- **Error Handling**: Comprehensive error handling and validation

#### 3.3 Frontend Implementation
- **HTML Structure**: Semantic markup with accessibility features
- **CSS Styling**: Modern responsive design with CSS Grid and Flexbox
- **JavaScript Logic**: Event handling, API communication, and DOM manipulation
- **User Interface**: Intuitive navigation and form handling

#### 3.4 Integration
- **API Integration**: Frontend-backend communication via fetch API
- **Data Flow**: Unidirectional data flow with state management
- **Error Handling**: User-friendly error messages and loading states

### 4. Testing

#### 4.1 Unit Testing
- **Backend Testing**: API endpoint validation
- **Frontend Testing**: JavaScript function testing
- **Data Validation**: Input validation and error handling

#### 4.2 Integration Testing
- **API Integration**: Frontend-backend communication testing
- **Data Persistence**: File system operations testing
- **User Workflows**: End-to-end user journey testing

#### 4.3 User Acceptance Testing
- **Usability Testing**: User interface and experience validation
- **Performance Testing**: Load time and responsiveness testing
- **Cross-browser Testing**: Compatibility across different browsers

### 5. Deployment

#### 5.1 Production Setup
- **Environment Configuration**: Production environment setup
- **Server Configuration**: Express.js production configuration
- **Security Measures**: CORS and input validation

#### 5.2 Deployment Process
```bash
# Install dependencies
npm install

# Start production server
npm start

# Development mode
npm run dev
```

### 6. Maintenance

#### 6.1 Monitoring
- **Performance Monitoring**: Server response times and error rates
- **User Feedback**: Continuous improvement based on user input
- **Data Backup**: Regular data backup procedures

#### 6.2 Updates and Enhancements
- **Feature Updates**: New functionality based on user needs
- **Bug Fixes**: Regular bug fixes and improvements
- **Security Updates**: Regular security patches and updates

## 🚀 Installation & Setup

### Prerequisites
- Node.js (version 18 or higher)
- npm (Node Package Manager)
- Modern web browser

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd workout-tracker
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Application**
   ```bash
   npm start
   ```

4. **Access the Application**
   Open your browser and navigate to `http://localhost:3000`

### Development Mode
```bash
npm run dev
```

## 📖 Usage

### Getting Started
1. **Dashboard**: View your fitness statistics and progress
2. **Add Workout**: Log new workout sessions with detailed information
3. **My Workouts**: Browse, filter, and manage your workout history

### Adding a Workout
1. Click "Add Workout" in the navigation
2. Fill in the workout details:
   - Workout name
   - Type (Cardio, Strength, Yoga, etc.)
   - Duration in minutes
   - Calories burned
   - Date
3. Optionally add individual exercises with sets and reps
4. Click "Save Workout"

### Viewing Statistics
- **Total Workouts**: Number of completed workout sessions
- **Total Duration**: Cumulative workout time in minutes
- **Calories Burned**: Total calories burned across all workouts
- **Average Duration**: Average workout length
- **Workout Types**: Distribution of different workout types

## 📚 API Documentation

### Endpoints

#### GET /api/workouts
Retrieve all workouts
```javascript
Response: [
  {
    "id": "1234567890",
    "name": "Morning Cardio",
    "type": "Cardio",
    "duration": 30,
    "calories": 250,
    "date": "2024-01-15",
    "exercises": [],
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
]
```

#### POST /api/workouts
Create a new workout
```javascript
Request Body: {
  "name": "Strength Training",
  "type": "Strength",
  "duration": 45,
  "calories": 300,
  "date": "2024-01-15",
  "exercises": [
    {
      "name": "Push-ups",
      "sets": 3,
      "reps": 15
    }
  ]
}
```

#### PUT /api/workouts/:id
Update an existing workout
```javascript
Request Body: {
  "name": "Updated Workout Name",
  "duration": 50
}
```

#### DELETE /api/workouts/:id
Delete a workout
```javascript
Response: {
  "message": "Workout deleted successfully"
}
```

#### GET /api/stats
Get workout statistics
```javascript
Response: {
  "totalWorkouts": 25,
  "totalDuration": 1200,
  "totalCalories": 5000,
  "avgDuration": 48,
  "typeStats": {
    "Cardio": 10,
    "Strength": 8,
    "Yoga": 7
  }
}
```

## 📁 Project Structure

```
workout-tracker/
├── public/
│   ├── index.html          # Main HTML file
│   ├── styles.css          # CSS styles
│   └── script.js           # Frontend JavaScript
├── data/
│   └── workouts.json       # Data storage
├── server.js               # Backend server
├── package.json           # Dependencies and scripts
└── README.md              # Project documentation
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] Add new workout with all fields
- [ ] Add workout with exercises
- [ ] View workout statistics
- [ ] Filter workouts by type
- [ ] Filter workouts by date
- [ ] Edit existing workout
- [ ] Delete workout
- [ ] Responsive design on mobile
- [ ] Error handling for invalid data

### Automated Testing
```bash
# Run tests (when implemented)
npm test
```

## 🚀 Deployment

### Production Deployment
1. **Environment Setup**
   ```bash
   NODE_ENV=production
   PORT=3000
   ```

2. **Start Production Server**
   ```bash
   npm start
   ```

3. **Process Management**
   ```bash
   # Using PM2 (recommended)
   npm install -g pm2
   pm2 start server.js --name workout-tracker
   ```

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

### Development Guidelines
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Standards
- Use consistent indentation (2 spaces)
- Follow JavaScript ES6+ standards
- Comment complex logic
- Maintain responsive design principles

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation for common issues

## 🔮 Future Enhancements

### Planned Features
- [ ] User authentication and profiles
- [ ] Workout templates and routines
- [ ] Progress charts and graphs
- [ ] Social features and sharing
- [ ] Mobile app development
- [ ] Integration with fitness trackers
- [ ] Advanced analytics and insights
- [ ] Workout recommendations

### Technical Improvements
- [ ] Database migration (MongoDB/PostgreSQL)
- [ ] API rate limiting
- [ ] Caching implementation
- [ ] Unit test coverage
- [ ] CI/CD pipeline
- [ ] Performance optimization

---

**Developed with ❤️ for fitness enthusiasts worldwide**

*Last updated: January 2024*

