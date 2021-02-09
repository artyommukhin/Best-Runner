import './App.css';
import React, {useState} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { useForm } from "react-hook-form";
import { WorkoutsTable } from "./features/workout/WorkoutTable";
import { WorkoutEditModal } from "./features/modalForm/ModalForm";
import { useSelector, useDispatch } from 'react-redux';
import { openModalForm } from "./features/modalForm/modalFormSlice";
import ReactModal from "react-modal";

function AddButton() {
  const dispatch = useDispatch();
  return (
    <Button 
      color="success" 
      block 
      onClick={() => dispatch(openModalForm())}
    >Add workout</Button>
  )
}

function App() {
  return (
    <div className="App">
      <WorkoutsTable />
      <AddButton />
      <WorkoutEditModal />
    </div>
  );
} 

export default App;
