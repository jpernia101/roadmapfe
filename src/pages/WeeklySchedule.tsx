import React, {useState} from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Stage, Layer, Rect, Text, Line } from "react-konva";
import { useScheduleContext } from "../context/TasksContext";

const WeeklyScheduleCanvas = () => {
    const {schedule} = useScheduleContext();

    let x = 390;
    let y = 760
    const days = ['Sunday', 'Monday', 'Tuesday' ,"Wednesday","Thursday", "Friday","Saturday" ];
    return(
        <Container className="justify-content-sm-start" style={{
            overflow: "auto",
            backgroundColor: "grey",
            height: "94vh",
            justifyContent:'center'
          }}>
            <div >
            <Stage width={800} height={600} >
                <Layer>
                <Text text="Sunday" fontSize={15} x={13} y={75}/>    
                <Text text="Monday" fontSize={15} x={83} y={75}/>
                <Text text="Tuesday" fontSize={15} x={160} y={75}/>
                <Text text="Wednesday" fontSize={14} x={227} y={75}/>
                <Text text="Thursday" fontSize={15} x={309} y={75}/>
                <Text text="Friday" fontSize={15} x={388} y={75}/>
                <Text text="Saturday" fontSize={15} x={460} y={75}/>
                
                <Line  draggable stroke='black' points={[0,75 , 675, 75]} />
                
                <Line  stroke='black' points={[0,75 , 0,800]} />
                <Line  stroke='black' points={[75,75 , 75,800]} />
                <Line  stroke='black' points={[150,75 , 150,800]} />
                <Line  stroke='black' points={[225,75 , 225,800]} />
                <Line  stroke='black' points={[300,75 , 300,800]} />
                <Line  stroke='black' points={[375,75 , 375,800]} />
                <Line  stroke='black' points={[450,75 , 450,800]} />
                <Line  stroke='black' points={[525,75 , 525,800]} />
                <Line  stroke='black' points={[600,75 , 600,800]} />
                <Line  stroke='black' points={[675,75 , 675,800]} />
                
                </Layer>
            </Stage>
            </div>
            
        </Container>
    )
}

export default WeeklyScheduleCanvas;
