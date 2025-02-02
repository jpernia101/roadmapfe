import React, {useEffect, useRef, useState} from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { ScheduleItem, useScheduleContext } from "../context/TasksContext";
import { DndContext , closestCenter} from "@dnd-kit/core";
import DragableTask from "../components/DragableTask";
import DropableTask from "../components/DropableTask";
import {validResponse} from '../test/constants.js'

const WeeklyScheduleCanvas = ( {isLoading}) => {
    interface reorderedScheduleType  {
        id: string ,
        reasoning: string,
        time: string | Date,
        day: string,
        desc: string
    }

    const days = ['Sun', 'Mon', 'Tue' ,"Wed","Thu", "Fri","Sat" ];
    const hours = ['04:00','05:00','06:00','07:00','08:00', '09:00', '10:00','11:00','12:00', '13:00', '14:00', '15:00',
    '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00','24:00'];

    const {schedule, setSchedule} = useScheduleContext();
    const [ reorderedSchedule, setreorderedSchedule ] = useState<Array<reorderedScheduleType | null>>([]);
    const parentDimensionRef = useRef<HTMLDivElement>(null);
    const [dimensions , setDimensions] = useState( {width: 0, height : 0})
    const [startPoints , setStartPoints] = useState({x: null, y : null})
    const [endPoints , setEndPoints] = useState({x: null, y : null})

    

    const organizeScheduleByTime = () : Array<reorderedScheduleType| null> =>   {
        let newOrder: Array<reorderedScheduleType| null> = [];

        if(schedule){
            newOrder = schedule.flatMap( (outer, i) => {
                return outer.when.map( (x,j) => {
                    let timeIndex = hours.indexOf( x.startTime);
                    let substringOfDay = x.day.substring(0,3)
                    let dayIndex = days.indexOf(substringOfDay)
                    let newId = `${outer.id}:${timeIndex}:${dayIndex}`
                    return ({
                    
                    desc: outer.desc,
                    reasoning : outer.reasoning,
                    time: x.startTime,
                    day: x.day,
                    id: newId
                })})
            })
            .sort( (a,b) => {
                if(a.time !== b.time){
                    return a.time.localeCompare(b.time)
                }

                return a.day.localeCompare(b.day)
            })
        }
        return newOrder
    }    

    useEffect( () => {
        const handleResize = () => {
            if (parentDimensionRef.current) {
                setDimensions({
                    width: parentDimensionRef.current.offsetWidth,
                    height: parentDimensionRef.current.offsetHeight
                });
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        const organizedData = organizeScheduleByTime();
        setreorderedSchedule(organizedData);
        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
    } ,[])


    
    
    

    const DrawDays = () => {
        return days.map( (text, i) => {
            const fontSize = dimensions.width * 0.02; 
            return (
                <Col key={i}>
                <h4  style={{ fontFamily: 'Nunito', fontSize: fontSize}}> {text} </h4>
                </Col>
                
            )
        })
    }

    const handleDragStart = (e) => {
        const {active} = e;
        
        if(active.data.current.parentId){
            const [x,y] = active.data.current.parentId.split(':')
            console.log(x,"x",y,'y')
            setStartPoints({x,y})
        }
        
        
    }
    const handleDragEnd = (e) => {
        const { active, over } = e;
        if (!over) return; // Don't do anything if not dropped over a valid area
        let currItem = active.id;
        if(reorderedSchedule){
            const [x,y] = over.id.split(':');

            
            let newTime = hours[x];
            let newDay =  days[y]

            setreorderedSchedule((prevSchedule) => {


                const updatedSchedule = [...prevSchedule];
                const taskToUpdate = updatedSchedule.find( x => x.id === currItem);
                console.log(taskToUpdate, "BEFOE");
                console.log(updatedSchedule, "BEFoe");
                if(taskToUpdate){
                    taskToUpdate.day = newDay;
                    taskToUpdate.time = newTime;
                    let oldId = taskToUpdate.id.split(':')
                    taskToUpdate.id = `${oldId[0]}:${x}:${y}`
                }
                
                console.log(updatedSchedule);
                console.log(taskToUpdate, "AFTER");
                return updatedSchedule;
            });
            
        }
        const draggedTaskId = active.id;  // The dragged task
        const newColumnId = over.id; // The new drop location

        console.log(reorderedSchedule);
        console.log(`Task ${draggedTaskId} dropped on ${newColumnId}`);
    }

    const DrawBody = () => {
        // const organizedData = organizeScheduleByTime();
        // setreorderedSchedule(organizedData);
        // console.log('organizedData', organizedData)
        const fontSize = dimensions.width * 0.015; 
    
        /**
         * OUR DATA WILL LOOK LIKE THIS Array<Array<{time: string, tasks: Array< ScheduleType | null>} >>
         * [null,null,null,null,{"desc": "taskkkkkkkk4","reasoning": "Eating with mom is a medium priority task, scheduled for the evening when both might be more available.","time": "18:00","day": "Thursday"},null, null]
         * 
         * so below we 
         *  -1 loop through the hours. so our array size will be the size of hours.length
         *  -2 loop through the days so each of our Arrays will have lenght of 7 since there is 7 days
         *  -3 we use the .find to search our organizedData to see if theres a task in that specfic time and day
         *     if it is then we return the task else we return null.
         * 
         */
        const groupedByTimeAndTask = hours.map((hour) => {
            const tasks = days.map((day) => {
                const task: Array<ScheduleItem> | null = reorderedSchedule.find((y) => {
                    //do this since our days are only the first three letters but out response spells out the whole day
                    let substringOfDay = y.day.substring(0,3)
                    let time = y.time.split(":")[1]
                    if(time === '30'){
                        let matchingHalfAndHour = hour.split(':')[0]+ ':';
                        return substringOfDay === day && y.time === matchingHalfAndHour + '30'
                    }
                    return y.time === hour && substringOfDay === day
                });
                return task || null; // Either the task object or null
            });
        
            return { time: hour, tasks }; // Return an object with time and the array of tasks for 7 days
        });

        
        console.log(groupedByTimeAndTask)

        return groupedByTimeAndTask.map( ({time,tasks}, i) => {
            return(
                <Row key={i} className="flex-nowrap">
                    <Col style={{border: '.5px solid black'}}>
                        <h4  style={{ fontFamily: 'Nunito', fontSize: fontSize}}> {time} </h4>
                    </Col>
                    {
                        tasks.map( (task, j) => {
                            if(task === null){
                                return(
                                    <DropableTask key={j} id={`${i}:${j}`}>
                                        <h4
                                            style={{
                                                fontFamily: 'Nunito',
                                                fontSize: fontSize
                                            }}
                                        >         
                                        </h4>
                                    </DropableTask>   
                                    )
                            }
                            else{
                                return (
                                    <DropableTask key={j} id={`${i}:${j}`}>
                                        <DragableTask id={task.id} desc={task.desc} data={ {parentId: `${i}:${j}`}}/>
                                    </DropableTask>    
                                    )
                            }
                            
                        }) 
                    }
                </Row>
        
            )
        })
    }

    const backToPlannerBtn = () => {
        isLoading(false)
    }
    return(
        <div>
        <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}collisionDetection={closestCenter}>
            <Container className="justify-content-sm-start" ref={parentDimensionRef }
            //  style={{backgroundImage: 'linear-gradient(45deg, #FFFFFF 0%, #6284FF 50%, #FF0000 100%)', color:'black'}}
            style={{backgroundImage: 'linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(125,155,190,1) 47%, rgba(253,187,45,1) 100%)', color:'black'}}
            >
                <div style={{marginLeft: dimensions.width * .1}}>
                    <Row>
                        {DrawDays()}
                    </Row>
                </div>
                <div>
                    <Row>
                        {DrawBody()}
                    </Row>
                </div>

            </Container>
        </DndContext>
            <div style={
                {display: "flex", justifyContent:'space-around', margin: "1% 0 0 3%" }
            }> 
                <Button onClick={() => backToPlannerBtn()}>Back to planner</Button>
                <Button>Export to PDF</Button>
            </div>
        </div>
    )
}

export default WeeklyScheduleCanvas;