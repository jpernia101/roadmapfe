import React, { useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import  Form  from "react-bootstrap/Form";
import { Button, Modal } from "react-bootstrap";
import TaskData from "../components/TaskData";
import { useScheduleContext, TasksContextData } from "../context/TasksContext";
// import {validResponse} from '../test/constants.js'
import Spinner from "react-bootstrap/Spinner";
import { submitTask } from "../services/TaskService";

interface TasksFormProps {
    setScheduleExist: (isLoading: boolean) => void;
    isLoading: boolean;
}

const TasksForm: React.FC<TasksFormProps> = ({setScheduleExist, isLoading }) => {
    const {tasks, addTask,} = useContext(TasksContextData);
    const {setSchedule} = useScheduleContext();
    const [showSpinner , setShowSpinner] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    
    /**
     * Handle form submission by displaying a loading spinner and then calling the server to process the tasks and
     * set the schedule.
     * After the response is received, the loading spinner is hidden and the schedule is set in the context.
     * The isLoading state is also set to false.
     */
    const handleSubmit = async () =>{
        // Validate that we have at least one task with a description
        const hasValidTasks = tasks && tasks.length > 0 && tasks.some(task => task.desc && task.desc.trim() !== '');
        
        if (!hasValidTasks) {
            setShowErrorModal(true);
            return;
        }

        setShowSpinner(true);
        const response = await submitTask(tasks);
        // setSchedule(response)
        
        

        if(response){
            console.log('response', response);
            setSchedule(response)
            setScheduleExist(true);
            setShowSpinner(false);
        }

        // setTimeout( () => {
        //     console.log('waiting')
        //     setSchedule(validResponse)
        //     setScheduleExist(true);
        //     setShowSpinner(false);
        // }, 2000)
    }

    // useEffect(() => {
    //     console.log('tasks',tasks)
    // })
    
    return(
        <Container>
            <Form >
            { tasks.map( x => <TaskData id={x.id} key={x.id}/>)}
            <div style={{display: "flex", alignContent:'center', justifyContent:'center', padding:'5px 10px 0 10px'}}>
                
                { showSpinner ?
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner> : 
                    <div>
                    <Button style={{margin:'10px'}} onClick={() => addTask()} >Add Task</Button>
                    <Button type="submit" style={{margin:'10px'}}  onClick={() => handleSubmit()}>Submit</Button>
                    </div>

                }  
            </div>                
            </Form>

            {/* Error Modal for empty tasks */}
            <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)} centered>
                <Modal.Header closeButton style={{ borderBottom: '2px solid #e9ecef' }}>
                    <Modal.Title style={{ color: '#dc3545', fontWeight: '600' }}>
                        ⚠️ No Tasks Found
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ padding: '24px' }}>
                    <p style={{ marginBottom: '0', fontSize: '16px', lineHeight: '1.6' }}>
                        You need to add at least <strong>one task with a description</strong> before submitting.
                    </p>
                    <p style={{ marginTop: '12px', marginBottom: '0', fontSize: '14px', color: '#6c757d' }}>
                        Please fill in at least one task description and try again.
                    </p>
                </Modal.Body>
                <Modal.Footer style={{ borderTop: '2px solid #e9ecef' }}>
                    <Button 
                        variant="primary" 
                        onClick={() => setShowErrorModal(false)}
                        style={{
                            padding: '8px 24px',
                            fontWeight: '500',
                        }}
                    >
                        Got it
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default TasksForm