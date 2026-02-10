import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import  Form  from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
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
    
    /**
     * Handle form submission by displaying a loading spinner and then calling the server to process the tasks and
     * set the schedule.
     * After the response is received, the loading spinner is hidden and the schedule is set in the context.
     * The isLoading state is also set to false.
     */
    const handleSubmit = async () =>{
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

    useEffect(() => {
        console.log('tasks',tasks)
    })
    
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
        </Container>
    )
}

export default TasksForm