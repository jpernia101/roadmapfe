import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import  Form  from "react-bootstrap/Form";
import { FormGroup } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";


const TaskData = ({id, handleDateChange}) => {
    return(
        <Row key={id}>
            <Col md={5}>
                <FormGroup>
                    <Form.Label> Task Description</Form.Label>
                    <Form.Control type='text' placeholder="Put a small description of your task"/>
                </FormGroup>
                
            </Col>
            <Col md>
            <FormGroup>
                    <Form.Label> Priority</Form.Label>
                    <Form.Select title="Pick Priority" aria-label="Pick A Priority" required>
                        <option key='placeholder' hidden value=''> -- Select an Option -- </option>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </Form.Select>
                </FormGroup>
            </Col>
            <Col md>
                <FormGroup>
                    <Form.Label> Due Date (optional) </Form.Label>
                    <InputGroup>
                        <Form.Control type="date" placeholder="mm/dd/yyyy" onChange={handleDateChange}/>
                        <InputGroup.Text>
                            <i className="bi bi-calender"></i>
                        </InputGroup.Text>
                    </InputGroup>
                </FormGroup>
            </Col>
            <Col md>
                <FormGroup>
                    <Form.Label> Frequency </Form.Label>
                    <Form.Control type='text' placeholder="How many times"/>
                    <Form.Text style={{color: 'red'}}>Number must be less than 7 </Form.Text>
                </FormGroup>
                
            </Col>
            
        </Row>
    )
}

export default TaskData