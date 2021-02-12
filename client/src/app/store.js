import { configureStore } from '@reduxjs/toolkit';
import workoutReducer from "../components/workoutsTable/workoutsTableSlice";
import modalFormReducer from "../components/modalForm/modalFormSlice";

export default configureStore({
  reducer: {
    workouts: workoutReducer,
    modal: modalFormReducer,
  },
});