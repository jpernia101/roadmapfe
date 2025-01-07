import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header.tsx';
import TasksForm from './pages/TasksForm';
import {TasksContextProvider} from './context/TasksContext'
function App() {
  return (
    <div className='App-header'>
      <TasksContextProvider>
        <Header/>
        <TasksForm/>
      </TasksContextProvider>

    </div>
  );
}

export default App;
