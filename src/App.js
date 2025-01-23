import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header.tsx';
import TasksForm from './pages/TasksForm';
import {ScheduleContextProvider, TasksContextProvider} from './context/TasksContext'
import WeeklyScheduleCanvas from './pages/WeeklySchedule'
import { useState } from 'react';
function App() {
  let [loading, setIsLoading] = useState(false);
  return (
    <div className='App-header'>
      
        <Header/>
        <TasksContextProvider>
          <ScheduleContextProvider>
            {loading ? <WeeklyScheduleCanvas isLoading={setIsLoading}/> : <TasksForm isLoading={setIsLoading}/>}
          </ScheduleContextProvider>
      </TasksContextProvider>
    </div>
  );
}

export default App;
