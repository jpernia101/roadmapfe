import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header.tsx';
import TasksForm from './pages/TasksForm';
import {ScheduleContextProvider, TasksContextProvider} from './context/TasksContext'
// import { useContext } from 'react';
import WeeklyScheduleCanvas from './pages/WeeklySchedule'
import { useState } from 'react';
import { Alert , Container} from 'react-bootstrap';
function App() {
  let [scheduleExist, setScheduleExist] = useState(false);
  

  
  return (
    <div className='App-header'>
      
        <Header/>
          <ScheduleContextProvider>
          <TasksContextProvider>
          
            {scheduleExist ?  
              <WeeklyScheduleCanvas setScheduleExist={setScheduleExist} isLoading={scheduleExist}/> : 
              
              <Container>
                <Alert variant='dark' style={{color: 'darkred', fontSize: '14px'}}>
                  What is this : An AI tool designed to plan your week, effortlessly organizing your tasks into the perfect schedule.
                </Alert>
                <Alert variant='dark' style={{color: 'darkred', fontSize: '14px'}}>
                  How to use
                  <ul>
                    <li>Write a brief description of your task</li>
                    <li>Select the importance of the task</li>
                    <li>Pick a due date, if there is one</li>
                    <li>Frequency dropdown is for repeating task (e.g: workout 3 times this week so choose 3)</li>
                  </ul>
                  Finally press submit and let us create a shedule for you <br/>
                  Feel free to download the pdf and/or take a picture
                </Alert>

                <TasksForm setScheduleExist={setScheduleExist} isLoading={scheduleExist}/>
              </Container>
              
             
              }
          </TasksContextProvider>
          </ScheduleContextProvider>
    </div>
  );
}

export default App;
