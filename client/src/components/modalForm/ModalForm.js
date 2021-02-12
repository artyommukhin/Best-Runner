import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import ReactModal from "react-modal";
import { useFormik } from 'formik';
import { 
  closeModalForm, 
  selectModalIsOpen, 
  selectModalMode, 
  selectCurrentWorkoutId 
} from './modalFormSlice';
import { 
  addWorkout, 
  updateWorkout, 
  selectWorkoutsList,   
} from "../workoutsTable/workoutsTableSlice";
import api from "../../api";


function WorkoutEditForm() {
    const dispatch = useDispatch();

    const mode = useSelector(selectModalMode);
    const workoutId = useSelector(selectCurrentWorkoutId);
    const currentWorkout = useSelector(selectWorkoutsList).find(w => w.id === workoutId);


    const makeDate = (date, time) => {
      return new Date(`${date} ${time}`);
    }

    const getFormData = () => {
      let d = null;
      if (mode === 'edit'){
        d = currentWorkout.date;
        return {
          ...currentWorkout,
          date: d.getFullYear() + '-' + (d.getMonth()+1).toString().padStart(2,'0') + '-' + d.getDate().toString().padStart(2,'0'),
          time: d.getHours().toString().padStart(2,'0')+':'+d.getMinutes().toString().padStart(2,'0'),
        };
      } else {
        d = new Date();
        return {
          date: d.getFullYear() + '-' + (d.getMonth()+1).toString().padStart(2,'0') + '-' + d.getDate().toString().padStart(2,'0'),
          time: d.getHours().toString().padStart(2,'0')+':'+d.getMinutes().toString().padStart(2,'0'),
          type: 'running',
          distance: 0,
          comment: ''
        };
      }
    }

    const formik = useFormik({
      initialValues: {
        ...getFormData()
      },
      onSubmit: values => {
        if (mode === 'edit'){
          const workout = {
            id: currentWorkout.id,
            date: makeDate(values.date, values.time),
            type: values.type,
            distance: values.distance,
            comment: values.comment
          };
          dispatch(updateWorkout(workout));
          api.updateWorkout(workout);
          console.log(currentWorkout.id + ' is updated');
        } else if (mode === 'create') {
          const workout = {
            date: makeDate(values.date, values.time),
            type: values.type,
            distance: values.distance,
            comment: values.comment
          };
          dispatch(addWorkout(workout));
          api.addWorkout(workout);
        }
        dispatch(closeModalForm());
      }
    });

    return (
      <Form onSubmit={formik.handleSubmit}>
        <FormGroup>
          <Label for='workoutDate'>Date</Label>
          <Input 
            type='date'
            id='workoutDate'
            name='date'
            value={formik.values.date}
            onChange={formik.handleChange}
            required
          /> 
          <Input 
            type='time'
            name='time'
            value={formik.values.time}
            onChange={formik.handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for='workoutType'>Type</Label>
          <Input 
            type='select' 
            id='workoutType'
            name='type' 
            defaultValue='running'
            value={formik.values.type}
            onChange={formik.handleChange}
            required
          >
            <option value='running'>Running</option>
            <option value='walking'>Walking</option>
            <option value='bicycling'>Bicycling</option>
            <option value='skiing'>Skiing</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for='workoutDistance'>Distance (km)</Label>
          <Input 
            type='number' 
            id='workoutDistance'
            name='distance'
            value={formik.values.distance}
            onChange={formik.handleChange}
            required
            min='1'
          />
        </FormGroup>
        <FormGroup> 
          <Label for='workoutComment'>Comment</Label>
          <Input 
            type='textarea'
            id='workoutComment'
            name='comment'
            value={formik.values.comment}
            onChange={formik.handleChange}
            maxLength='100'
          />
        </FormGroup>
        <Input
          type='submit'
          value='Submit'
        />
      </Form>
    )
};

const ModalHeader = () => {
  const mode = useSelector(selectModalMode);
  if (mode === 'edit'){
    return (
      <h1>Edit workout</h1>
    )
  } else {
    return (
      <h1>Create workout</h1>
    )
  }
}

export function WorkoutEditModal() {
  const dispatch = useDispatch();
  return (
      <ReactModal
          isOpen={useSelector(selectModalIsOpen)}
      >
          <Button close onClick={() => dispatch(closeModalForm())} />
          <ModalHeader />
          <WorkoutEditForm />
      </ReactModal>
  )
}

