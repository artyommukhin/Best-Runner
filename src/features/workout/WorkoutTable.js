import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from 'reactstrap';
import { addWorkout, removeWorkout, selectWorkoutsList } from './workoutTableSlice';
import ReactModal from "react-modal";

function WorkoutRow(props) {
  const [selected, setSelected] = useState(false);

  const toggleSelect = () => {
    props.onClickSelect();
    setSelected(!selected);
  };

  const dispatch = useDispatch();
  const d = props.date;
  const dateString = `${d.getDate()}.${d.getMonth()}.${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`; 
  return (
    <tr>
      {/* <td>{props.id.toString()}</td> */}
      <td>{dateString}</td>
      <td>{props.type}</td>
      <td>{props.distance}</td>
      <td>{props.comment}</td>
      <td>
        <Button color="primary" onClick={toggleSelect} active={selected}>Select</Button>
        <Button color="warning">Edit</Button>
        <Button 
          color="danger" 
          onClick={() => dispatch(removeWorkout({workoutId: props.id}))}
        >
          Delete
        </Button>
      </td>
    </tr>
  )
}

export function WorkoutsTable() {
  // local state
  const [selectedWorkouts, setSelectedWorkout] = useState([]);

  const selectRow = (id) => {
    if (!selectedWorkouts.includes(id))
      setSelectedWorkout(selectedWorkouts.concat(id));
  };
  // convert list to table rows
  const workouts = useSelector(selectWorkoutsList).map((workout) => {
    return (
      <WorkoutRow
        key = {workout.id} 
        id = {workout.id}
        distance = {workout.distance}
        date = {workout.date}
        type = {workout.type}
        comment = {workout.comment}
        onClickSelect = {() => selectRow(workout.id)}
      />
    )
  });
  return (
    <Table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Type</th>
          <th>Distance</th>
          <th>Comment</th>
          <th>Buttons</th>
        </tr>
      </thead>
      <tbody>
        {workouts}
      </tbody>
    </Table>
  )
}