import React, { useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import  Form  from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import TaskData from "../components/TaskData";
import { useScheduleContext, TasksContextData } from "../context/TasksContext";
import { submitTask } from "../services/TaskService";
import {validResponse} from '../test/constants.js'

const TasksForm = ({isLoading}) => {
    const {tasks, addTask,} = useContext(TasksContextData);
    const {setSchedule} = useScheduleContext();
    
    const handleSubmit = async () =>{
        // const response = await submitTask(tasks);
        // setSchedule(response)
        
        setSchedule(validResponse)
        isLoading(true);


    }
    
    return(
        <Container>
            <Form >
            { tasks.map( x => <TaskData id={x.id} key={x.id}/>)}
            <div style={{display: "flex", alignContent:'center', justifyContent:'center', padding:'5px 10px 0 10px'}}>
                <Button style={{margin:'10px'}} onClick={() => addTask()} >Add Task</Button>
                <Button style={{margin:'10px'}}  onClick={() => handleSubmit()}>Submit</Button>
            </div>                
            </Form>
        </Container>
    )
}

export default TasksForm