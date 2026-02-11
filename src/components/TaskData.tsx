import React, { useContext, useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import  Form  from "react-bootstrap/Form";
import { Button, FormGroup } from "react-bootstrap";
// import { InputGroup } from "react-bootstrap";
import { Task, TasksContextData } from "../context/TasksContext";

const TaskData = ( {id}: {id: number} ) => {
    const {removeTask, updateTask, tasks} = useContext(TasksContextData);

    const [currentTask, setCurrentTask] = useState<Task | undefined>();

    const handleDataChange = ( id, key, e ) => {
        
        updateTask(id,key, e.target.value);
    }

    useEffect( () =>{
        let filteredTask = tasks.find( x => x.id === id);
        setCurrentTask(filteredTask);
    }, [tasks, id])
    
    return(
        <Row key={id}>
            <Col md={5}>
                <Form.Label>Task Description</Form.Label>
                <FormGroup>
                    <Form.Control onChange={(event) => handleDataChange(id, 'desc', event)} value={currentTask?.desc || ""} type='text' placeholder="📝Put a small description of your task"/>
                </FormGroup>
                
            </Col>
            <Col md>
            <FormGroup>
                    <Form.Label>Priority</Form.Label>
                    <Form.Select 
                        title="Pick Priority" 
                        aria-label="Pick A Priority" 
                        required 
                        onChange={(event) => handleDataChange(id, 'priority', event)}
                        value={currentTask?.priority || ""}
                        >
                        <option key='placeholder' hidden value=''> -- Select an Option -- </option>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </Form.Select>
                </FormGroup>
            </Col>
            <Col md>
                    <FormGroup>
                        <Form.Label>Due Date (optional)</Form.Label>    
                        <Form.Control 
                            type="date"
                            onChange={(event) => {
                                const value = event.target.value;
                                if (!value) {
                                    // Clear the date if user deletes or form resets
                                    updateTask(id, 'dueDate', null);
                                    return;
                                }
                                const parsedDate = new Date(value);
                                if (isNaN(parsedDate.getTime())) {
                                    updateTask(id, 'dueDate', null);
                                } else {
                                    updateTask(id, 'dueDate', parsedDate);
                                }
                            }}
                            min={new Date().toISOString().split("T")[0]} // Today's date
                            max={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]} // 7 days from today
                            value={
                                currentTask?.dueDate
                                    ? new Date(currentTask.dueDate).toISOString().split("T")[0]
                                    : ""
                            }
                        />
                        
                    </FormGroup>
                
            </Col>
            <Col md>
                <FormGroup>
                    <Form.Label>Frequency</Form.Label>
                    <Form.Select 
                        title="Pick Priority" 
                        aria-label="Pick A Priority" 
                        required 
                        onChange={(event) => handleDataChange(id, 'frequency', event)}
                        value={currentTask?.frequency || ""}
                        >
                        <option key='placeholder' hidden value=''>-- Select an Option --</option>
                        <option>1 Day</option>
                        <option>2 Days</option>
                        <option>3 Days</option>
                        <option>4 Days</option>
                        <option>5 Days</option>
                        <option>6 Days</option>
                        <option>7 Days</option>
                    </Form.Select>
                </FormGroup>
            </Col>
            <Col md>
                <Button style={{margin:'50px auto'}}variant='danger' onClick={() => removeTask(id)}>&times;</Button>
            </Col>
        </Row>
    )
}

export default TaskData