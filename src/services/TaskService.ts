import axios from "axios";
import { Task } from "../context/TasksContext";


const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const alive = async () =>{
    try {
        const res = await axios.get(`${API_URL}/alive`)
        
        console.log('RES', res);
        
    } catch (error) {
        console.log(error);
    }
}


export const submitTask = async (tasks: Array<Task>) =>{
    try {
        //{Tasks:tasks} because thats the expected data format in the backend;
        const res = await axios.post(`${API_URL}/submitTasks`, {Tasks: tasks})
        console.log('RES', res);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}