import React from 'react';
import { WorkoutsTable } from "./components/workoutsTable/WorkoutsTable";
import { WorkoutEditModal } from "./components/modalForm/ModalForm";

function App() {
  return (
    <div className="App">
      <WorkoutsTable />
      <WorkoutEditModal />
    </div>
  );
} 

export default App;
