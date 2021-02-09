import { createSlice } from '@reduxjs/toolkit';

export const workoutSlice = createSlice({
    name: 'workouts',
    initialState:  [
        {
            id: 1,
            date: new Date(),
            type: 'bicycling',
            distance: 100,  
            comment: 'That was hard'
        },
        {
            id: 2,
            date: new Date(),
            type: 'running',
            distance: 5,  
            comment: 'That wasn\'t so hard'
        }
    ],
    reducers: {
        addWorkout: (state, action) => {
            const data = action.payload;
            state.workouts.push({
                id: data.id,
                date: data.date,
                type: data.type,
                distance: data.distance,
                comment: data.comment
            });
        },  
        removeWorkout: (state, action) => {
            const indexToRemove = state.workouts.findIndex(
                w => w.id === action.payload.workoutId
            );
            if (indexToRemove !== -1) 
                state.workouts.splice(indexToRemove,1);
        }
    }
});

// actions
export const {addWorkout, removeWorkout} = workoutSlice.actions;

// selector
export const selectWorkoutsList = state => state.workouts;


export default workoutSlice.reducer;