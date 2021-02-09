import { configureStore } from '@reduxjs/toolkit';
import workoutReducer from "../features/workout/workoutTableSlice";
import modalFormReducer from "../features/modalForm/modalFormSlice";
//import counterReducer from '../features/counter/counterSlice';

export default configureStore({
  reducer: {
    workouts: workoutReducer,
    modal: modalFormReducer,
  },
});
