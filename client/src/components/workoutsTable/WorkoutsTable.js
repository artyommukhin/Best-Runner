import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, ButtonGroup, UncontrolledButtonDropdown, 
  DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import ReactModal from "react-modal";
import { 
  addWorkoutsList,
  deleteWorkout, 
  selectWorkoutsList 
} from './workoutsTableSlice';
import { openModalFormToEdit, openModalFormToCreate } from "../modalForm/modalFormSlice";
import api from "../../api";



export function WorkoutsTable() {
  
  // local state
  const [sortConfig, setSortConfig] = useState({
    field: 'date',
    direction: 'asc', // asc or desc
    arrowDirection: 'down'
  });
  const [typeFilter, setTypeFilter] = useState(null);
  const [delConfirmModal, setDelConfirmModal] = useState({
    isOpen: false, 
    idToDelete: null
  });

  const dispatch = useDispatch();
  useEffect(() => {
    api.getWorkouts()
    .then(
      (result) => {
        const workouts = result.data.map(w=>{
          w.date = new Date(w.date);
          return w;
        })
        dispatch(addWorkoutsList(workouts));
      }, 
      (error) => {
        console.log(error);
      }
    );
  }, [dispatch]);

  const confirmDeleteWorkout = () => {
    if (delConfirmModal.idToDelete){
      dispatch(deleteWorkout({workoutId: delConfirmModal.idToDelete}));
      api.deleteWorkoutById(delConfirmModal.idToDelete);
    }
    setDelConfirmModal({
      isOpen: false,
      idToDelete: null
    });
  }

  let workouts = [...useSelector(selectWorkoutsList)].filter(
    workout => !typeFilter || workout.type === typeFilter
  );
  
  workouts.sort((a, b) => {
    if (a[sortConfig.field] < b[sortConfig.field]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.field] > b[sortConfig.field]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = field => {
    let direction = 'asc';
    let arrowDirection = 'up'
    if (sortConfig.field === field && sortConfig.direction === 'asc') {
      direction = 'desc';
      arrowDirection = 'down'
    }
    setSortConfig({ field, direction, arrowDirection });
  }

  const setArrowDirection = field => {
    return sortConfig.field === field ? sortConfig.arrowDirection : 'down';
  }

  return (
    <div>
    <Table bordered>
      <thead>
        <tr>
          <th><SortableFieldHeader 
            name='Date'
            onClick={()=>requestSort('date')}
            arrowDirection={setArrowDirection('date')}
          /></th>
          <th><SortableFieldHeader 
            name='Distance'
            onClick={()=>requestSort('distance')}
            arrowDirection={setArrowDirection('distance')}
          /></th>
          <th><UncontrolledButtonDropdown >
                <DropdownToggle outline color='primary' caret>Type</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={()=>{setTypeFilter(null)}}>Clear filter</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={()=>{setTypeFilter('running')}}>Running</DropdownItem>
                  <DropdownItem onClick={()=>{setTypeFilter('walking')}}>Walking</DropdownItem>
                  <DropdownItem onClick={()=>{setTypeFilter('bicycling')}}>Bicycling</DropdownItem>
                  <DropdownItem onClick={()=>{setTypeFilter('skiing')}}>Skiing</DropdownItem>
                </DropdownMenu>
            </UncontrolledButtonDropdown></th>
          <th>Comment</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {// convert list to table rows
          workouts.map((workout) => {
            return (
              <WorkoutRow
                key = {workout.id} 
                id = {workout.id}
                distance = {workout.distance}
                date = {workout.date}
                type = {workout.type}
                comment = {workout.comment}
                onClickDelete = {setDelConfirmModal}
              />
            )
          }
        )}
      </tbody>
    </Table>
    <AddButton />
    <ReactModal
      isOpen = {delConfirmModal.isOpen}
    >
      <h3>Are you sure?</h3>
      <Button 
        color="success"
        onClick = {() => confirmDeleteWorkout()}>Yes</Button>
      <Button 
        color="danger"
        onClick = {() => setDelConfirmModal({isOpen:false})}
      >No</Button>
    </ReactModal>
    </div>
  )
}


function WorkoutRow(props) {
  const dispatch = useDispatch();

  const d = props.date;
  const dateString = `${d.getDate()}.${d.getMonth()+1}.${d.getFullYear()} ${d.getHours()}:${d.getMinutes().toString().padStart(2,'0')}`; 
  return (
    <tr>
      <td>{dateString}</td>
      <td>{props.distance}</td>
      <td>{props.type}</td>
      <td>{props.comment}</td>
      <td>
        <ButtonGroup>
        <Button 
          color="warning"   
          onClick={() => dispatch(openModalFormToEdit(props.id))}
        >Edit</Button>
        <Button 
          outline
          color="danger" 
          onClick={() => props.onClickDelete({
            isOpen: true, 
            idToDelete: props.id
          })}
        >Delete</Button>
        </ButtonGroup>
      </td>
    </tr>
  )
}


function SortableFieldHeader(props) { 
  return (
    <UncontrolledButtonDropdown direction={props.arrowDirection}>
      <DropdownToggle 
      outline 
      caret
      onClick={props.onClick}
      >
        {props.name}
      </DropdownToggle>
    </UncontrolledButtonDropdown> 
  );
};

function AddButton() {
  const dispatch = useDispatch();
  return (
    <Button 
      color="success" 
      block 
      onClick={() => dispatch(openModalFormToCreate())}
    >Add workout</Button>
  )
}