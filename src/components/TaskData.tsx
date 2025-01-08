import React, { useContext } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import  Form  from "react-bootstrap/Form";
import { Button, FormGroup } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { TasksContextData } from "../context/TasksContext";

const TaskData = ( {id}: {id: number} ) => {
    const {removeTask, updateTask} = useContext(TasksContextData);

    const handleDataChange = ( id, key, e ) => {
        
        updateTask(id,key, e.target.value);
    }
    return(
        <Row key={id}>
            <Col md={5}>
                <FormGroup>
                    <Form.Label>Task Description</Form.Label>
                    <Form.Control onChange={(event) => handleDataChange(id, 'desc', event)} type='text' placeholder="Put a small description of your task"/>
                </FormGroup>
                
            </Col>
            <Col md>
            <FormGroup>
                    <Form.Label>Priority</Form.Label>
                    <Form.Select title="Pick Priority" aria-label="Pick A Priority" required onChange={(event) => handleDataChange(id, 'priority', event)}>
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
                    <InputGroup>
                        <Form.Control type="date" placeholder="mm/dd/yyyy" onChange={(event) => updateTask(id, 'dueDate', new Date(event.target.value))}/>
                        <InputGroup.Text>
                            <i className="bi bi-calendar"></i>
                        </InputGroup.Text>
                    </InputGroup>
                </FormGroup>
            </Col>
            <Col md>
                <FormGroup>
                    <Form.Label>Frequency</Form.Label>
                    <Form.Select title="Pick Priority" aria-label="Pick A Priority" required onChange={(event) => handleDataChange(id, 'frequency', event)}>
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