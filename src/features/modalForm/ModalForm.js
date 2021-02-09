import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { openModalForm, closeModalForm, selectModalIsOpen } from './modalFormSlice';
import ReactModal from "react-modal";

export function WorkoutEditModal() {
    return (
        <ReactModal
            isOpen={useSelector(selectModalIsOpen)}
            shouldCloseOnOverlayClick={true}>
            <WorkoutEditModalHeader action="Creating"/>
            <WorkoutEditForm />
        </ReactModal>
    )
}

function WorkoutEditModalHeader(props) {
    return (
        <h1>{props.action} workout</h1>
    )
}

const WorkoutEditForm = () => {
    const dispatch = useDispatch();
    return (
      <Form>
        <FormGroup>
          <Label for='workoutDate'>Date</Label>
          <Input type='date' id='workoutDate'/> 
        </FormGroup>
        <FormGroup>
          <Label for='workoutType'>Type</Label>
          <Input type='select' id='workoutType'>
            <option value='running'>Running</option>
            <option value='walking'>Walking</option>
            <option value='bicycling'>Bicycling</option>
            <option value='skiing'>Skiing</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for='workoutDistance'>Distance (km)</Label>
          <Input type='number' id='workoutDistance'/>
        </FormGroup>
        <FormGroup>
          <Label for>Comment</Label>
          <Input type='textarea' id='workoutComment'/>
        </FormGroup>
        <Button>Submit</Button>
        <Button onClick={() => dispatch(closeModalForm())}>Cancel</Button>
      </Form>
    )
  };