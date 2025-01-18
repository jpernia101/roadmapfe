import axios from "axios";
import { Task } from "../context/TasksContext";
import {validResponse} from '../test/constants.js'

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
        //{Tasks:tasks} because thats the expected data format in the backend;
        const res = await axios.post('http://localhost:3001/submitTasks', {Tasks: tasks})
        console.log('RES', res);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}