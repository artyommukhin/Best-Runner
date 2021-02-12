import { createSlice } from "@reduxjs/toolkit";

export const modalFormSlice = createSlice({
    name: 'modal',
    initialState: {
        isOpen: false,
        mode: null, // 'edit' or 'create'
        currentWorkoutId: null, // only in 'edit' mode
    },
    reducers: {
        openModalFormToEdit: (state, action) => {
            state.isOpen = true;
            state.mode = 'edit';
            state.currentWorkoutId = action.payload;
        },
        openModalFormToCreate: state => {
            state.isOpen = true;
            state.mode = 'create';
        },
        closeModalForm: state => {
            state.isOpen = false;
            state.mode = null;
            state.currentWorkoutId = null;
        }
    }
});

export const {openModalFormToEdit, openModalFormToCreate, closeModalForm} = modalFormSlice.actions;


export const selectModalIsOpen = state => state.modal.isOpen;
export const selectModalMode = state => state.modal.mode;

export const selectCurrentWorkoutId = state => {
    if (state.modal.mode === 'edit') {
        return state.modal.currentWorkoutId;
    }
};


export default modalFormSlice.reducer;