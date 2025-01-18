import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header.tsx';
import TasksForm from './pages/TasksForm';
import {ScheduleContextProvider, TasksContextProvider} from './context/TasksContext'
import WeeklyScheduleCanvas from './pages/WeeklySchedule'
function App() {
  return (
    <div className='App-header'>
      
        <Header/>
        <TasksContextProvider>
          <ScheduleContextProvider>
            <TasksForm/>
            <WeeklyScheduleCanvas/>
          </ScheduleContextProvider>
      </TasksContextProvider>
    </div>
  );
}

export default App;
