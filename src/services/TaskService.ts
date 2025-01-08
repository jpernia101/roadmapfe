import axios from "axios";
import { Task } from "../context/TasksContext";

export const alive = async () =>{
    try {
        const res = await axios.get('http://localhost:3001/alive')
        
        console.log('RES', res);
        
    } catch (error) {
        console.log(error);
    }
}


export const submitTask = async (tasks: Array<Task>) =>{
    try {
        const obj = {
            Tasks : tasks
        }
        const res = await axios.post('http://localhost:3001/submitTasks', obj)
        
        console.log('RES', res);
        
    } catch (error) {
        console.log(error);
    }
}