import { createSlice } from "@reduxjs/toolkit";

export const modalFormSlice = createSlice({
    name: 'modal',
    initialState: {
        isOpen: false,
    },
    reducers: {
        openModalForm: state => {
            console.log(state);
            state.modal.isOpen = true;
        },
        closeModalForm: state => {
            state.modal.isOpen = false;
        }
    }
})

export const {openModalForm, closeModalForm} = modalFormSlice.actions;

export const selectModalIsOpen = state => state.modal.isOpen;

export default modalFormSlice.reducer;