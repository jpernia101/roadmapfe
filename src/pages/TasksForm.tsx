import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import  Form  from "react-bootstrap/Form";
import { FormGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import TaskData from "../components/TaskData";

const TasksForm = () => {
    let [numOfTasks, setNumOfTasks] = useState<number>(1)
    let [taskDate, setTaskDate] = useState<string>('')

    const handleDateChange = (e) => {
        setTaskDate(e.target.value)
    }

    const addTask = () => {
        let newTasksNum = numOfTasks + 1;
        setNumOfTasks(newTasksNum)
    }

    

    return(
        <Container fluid>
            <Form >
            {Array.from({length: numOfTasks}, (_, i) => TaskData({id : i, handleDateChange}))}
            <div style={{display: "flex", alignContent:'center', justifyContent:'center', padding:'5px 10px 0 10px'}}>
                <Button style={{margin:'10px'}} onClick={addTask} >Add Task</Button>
                <Button style={{margin:'10px'}} >Submit</Button>
            </div>                
            </Form>
        </Container>
    )
}

export default TasksForm