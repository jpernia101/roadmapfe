import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header.tsx';
import TasksForm from './pages/TasksForm';

function App() {
  return (
    <div className='App-header'>
      <Header/>
      <TasksForm/>
    </div>
  );
}

export default App;
