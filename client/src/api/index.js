import axios from "axios";

const apiUrl = 'http://localhost:5000/api';

const api = {
    getWorkouts: () => axios.get(`${apiUrl}/workouts`),
    getWorkoutById: (id) => axios.get(`${apiUrl}/workouts/${id}`),
    addWorkout: (data) => axios.post(`${apiUrl}/workouts`, data),
    updateWorkout: (data) => axios.put(`${apiUrl}/workouts`, data),
    deleteWorkoutById: (id) => axios.delete(`${apiUrl}/workouts/${id}`),
}

export default api;