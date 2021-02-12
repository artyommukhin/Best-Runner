import { createSlice } from '@reduxjs/toolkit';

export const workoutsTableSlice = createSlice({
    name: 'workouts',
    initialState:  [
        // {
        //     id: null,
        //     date: null,
        //     type: null,
        //     distance: null,  
        //     comment: null
        // }
    ],
    reducers: {
        addWorkoutsList: (state, action) => {
            const data = action.payload;
            [].push.apply(state, data);
        },
        addWorkout: (state, action) => {
            const data = action.payload;
            state.push({
                id: data.id,
                date: new Date(data.date),
                type: data.type,
                distance: data.distance,
                comment: data.comment
            });
        },  
        deleteWorkout: (state, action) => {
            const indexToRemove = state.findIndex(
                w => w.id === action.payload.workoutId
            );
            if (indexToRemove !== -1) 
                state.splice(indexToRemove,1);
        },
        updateWorkout: (state, action) => {
            const data = action.payload;
            const workout = state.find(w => w.id === data.id);
            if (workout) {
                workout.date = data.date;
                workout.type = data.type;
                workout.distance = data.distance;
                workout.comment = data.comment;
            }
        }
    }
});

// actions
export const {addWorkoutsList, addWorkout, deleteWorkout, updateWorkout} = workoutsTableSlice.actions;

// selector
export const selectWorkoutsList = state => state.workouts;


export default workoutsTableSlice.reducer;