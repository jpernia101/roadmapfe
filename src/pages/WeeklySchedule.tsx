import React, {useEffect, useRef, useState} from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Stage, Layer, Rect, Text, Line } from "react-konva";
import { ScheduleItem, useScheduleContext } from "../context/TasksContext";

const WeeklyScheduleCanvas = ( {isLoading}) => {
    const {schedule} = useScheduleContext();
    const parentDimensionRef = useRef<HTMLDivElement>(null);
    const [dimensions , setDimensions] = useState( {width: 0, height : 0})

    const organizeScheduleByTime = () => {
        let newOrder: any = [];

        if(schedule){
            newOrder = schedule.flatMap( outer => {
                return outer.when.map( x => ({
                    desc: outer.desc,
                    reasoning : outer.reasoning,
                    time: x.startTime,
                    day: x.day
                }))
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

        // Cleanup
        return () => window.removeEventListener('resize', handleResize);

    } ,[])


    const days = ['Sun', 'Mon', 'Tue' ,"Wed","Thu", "Fri","Sat" ];
    const hours = ['04:00','05:00','06:00','07:00','08:00', '09:00', '10:00','11:00','12:00', '13:00', '14:00', '15:00',
    '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00','24:00'];

    

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

    const DrawBody = () => {
        const organizedData = organizeScheduleByTime();
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
                const task = organizedData.find((y) => {
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

        // console.log(groupedByTimeAndTask, 'time object')
        

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
                                    <Col key={j} style={{border: '.5px solid black'}} >
                                        <h4
                                            style={{
                                                fontFamily: 'Nunito',
                                                fontSize: fontSize
                                            }}
                                        >
                                            
                                        </h4>
                                    </Col>
                                    )
                            }
                            else{
                                return (
                                    <Col key={j} style={{border: '.5px solid black'}} > 
                                        <div>
                                            <h4  style={{ fontFamily: 'Nunito', fontSize: fontSize, fontWeight:'bold'}}> {task.desc} </h4>
                                        </div>
                                    </Col>)
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
        <Container className="justify-content-sm-start" ref={parentDimensionRef }
        //  style={{backgroundImage: 'linear-gradient(45deg, #FFFFFF 0%, #6284FF 50%, #FF0000 100%)', color:'black'}}
         style={{backgroundImage: 'linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)', color:'black'}}
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