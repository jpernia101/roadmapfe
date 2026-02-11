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

    // Helper to get today's date in YYYY-MM-DD format (timezone-safe)
    const getTodayString = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // Helper to get max date (7 days from today) in YYYY-MM-DD format
    const getMaxDateString = () => {
        const maxDate = new Date();
        maxDate.setDate(maxDate.getDate() + 7);
        const year = maxDate.getFullYear();
        const month = String(maxDate.getMonth() + 1).padStart(2, '0');
        const day = String(maxDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        
        if (!value) {
            updateTask(id, 'dueDate', null);
            return;
        }

        // Validate date is within allowed range (iOS Safari doesn't always respect min/max)
        const todayStr = getTodayString();
        const maxDateStr = getMaxDateString();
        
        if (value < todayStr) {
            // Date is before today - reset to today
            event.target.value = todayStr;
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            updateTask(id, 'dueDate', today);
            return;
        }
        
        if (value > maxDateStr) {
            // Date is more than 7 days away - reset to max date
            event.target.value = maxDateStr;
            const maxDate = new Date();
            maxDate.setDate(maxDate.getDate() + 7);
            maxDate.setHours(0, 0, 0, 0);
            updateTask(id, 'dueDate', maxDate);
            return;
        }

        // Date is valid
        const parsedDate = new Date(value + 'T00:00:00'); // Add time to avoid timezone issues
        if (isNaN(parsedDate.getTime())) {
            updateTask(id, 'dueDate', null);
        } else {
            updateTask(id, 'dueDate', parsedDate);
        }
    }

    useEffect( () =>{
        let filteredTask = tasks.find( x => x.id === id);
        setCurrentTask(filteredTask);
    }, [tasks, id])
    
    return(
        <Row key={id} className="align-items-end">
            <Col xs={12} md={5} className="mb-3 mb-md-0">
                <Form.Label>Task Description</Form.Label>
                <FormGroup>
                    <Form.Control onChange={(event) => handleDataChange(id, 'desc', event)} value={currentTask?.desc || ""} type='text' placeholder="📝Put a small description of your task"/>
                </FormGroup>
            </Col>
            <Col xs={6} md className="mb-3 mb-md-0">
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
            <Col xs={6} md className="mb-3 mb-md-0">
                <FormGroup>
                    <Form.Label>Due Date (optional)</Form.Label>    
                    <Form.Control 
                        type="date"
                        onChange={handleDateChange}
                        min={getTodayString()}
                        max={getMaxDateString()}
                        value={
                            currentTask?.dueDate
                                ? (() => {
                                    const date = new Date(currentTask.dueDate);
                                    const year = date.getFullYear();
                                    const month = String(date.getMonth() + 1).padStart(2, '0');
                                    const day = String(date.getDate()).padStart(2, '0');
                                    return `${year}-${month}-${day}`;
                                })()
                                : ""
                        }
                    />
                </FormGroup>
            </Col>
            <Col xs={6} md className="mb-3 mb-md-0">
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
            <Col xs={6} md="auto" className="mb-3 mb-md-0">
                <FormGroup className="mb-0">
                    <Form.Label style={{ visibility: 'hidden', marginBottom: '0' }}>Remove</Form.Label>
                    <Button 
                        variant='danger' 
                        onClick={() => removeTask(id)}
                        style={{
                            height: '38px', // Match Bootstrap form control height
                            width: '38px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            padding: '0',
                            minWidth: '38px',
                        }}
                    >
                        &times;
                    </Button>
                </FormGroup>
            </Col>
        </Row>
    )
}

export default TaskData