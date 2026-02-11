import React, {useEffect, useRef, useState, useMemo} from "react";
import { Button, Container } from "react-bootstrap";
import { ScheduleItem, useScheduleContext } from "../context/TasksContext";
import { DndContext , closestCenter} from "@dnd-kit/core";
import DragableTask from "../components/DragableTask";
import DropableTask from "../components/DropableTask";
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import { motion } from "framer-motion";

const WeeklyScheduleCanvas = ( {setScheduleExist, isLoading}) => {
    interface reorderedScheduleType  {
        id: string ,
        reasoning: string,
        time: string | Date,
        day: string,
        desc: string
    }

    const days = useMemo(() => ['SUN', 'MON', 'TUE' ,"WED","THU", "FRI","SAT" ], []);
    const hours = useMemo(() => [
  "04:00", "04:30",
  "05:00", "05:30",
  "06:00", "06:30",
  "07:00", "07:30",
  "08:00", "08:30",
  "09:00", "09:30",
  "10:00", "10:30",
  "11:00", "11:30",
  "12:00", "12:30",
  "13:00", "13:30",
  "14:00", "14:30",
  "15:00", "15:30",
  "16:00", "16:30",
  "17:00", "17:30",
  "18:00", "18:30",
  "19:00", "19:30",
  "20:00", "20:30",
  "21:00", "21:30",
  "22:00", "22:30",
  "23:00", "23:30",
  '24:00'], []);

    const {schedule} = useScheduleContext();
    const [ reorderedSchedule, setreorderedSchedule ] = useState<Array<reorderedScheduleType | undefined>>([]);
    const parentDimensionRef = useRef<HTMLDivElement>(null);
    const [dimensions , setDimensions] = useState( {width: 0, height : 0})
    const pdfRef = useRef<HTMLDivElement | null>(null);
    
    const pdfGenerator = async () => {
    console.log('generating pdf');
    const elem = pdfRef.current;
    if (!elem) return;

    try {
        // Capture at high DPI for better quality
        const img = await toPng(elem, { 
            quality: 1,
            cacheBust: true,
            pixelRatio: 2, // Capture at 2x resolution
        });

        // Get the actual dimensions of the element
        const width = elem.offsetWidth;
        const height = elem.offsetHeight;

        // A4 dimensions in mm
        const pageWidth = 210;
        const pageHeight = 297;
        const margin = 10; // 10mm margin
        const contentWidth = pageWidth - (margin * 2);
        const contentHeight = pageHeight - (margin * 2);

        // Calculate the aspect ratio
        const aspectRatio = width / height;

        // Calculate dimensions to fit on page while maintaining aspect ratio
        let finalWidth = contentWidth;
        let finalHeight = contentWidth / aspectRatio;

        // If height exceeds page, scale down
        if (finalHeight > contentHeight) {
            finalHeight = contentHeight;
            finalWidth = contentHeight * aspectRatio;
        }

        // Create PDF
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        // Add image centered with margins
        const xPosition = margin + (contentWidth - finalWidth) / 2;
        const yPosition = margin;

        pdf.addImage(img, 'PNG', xPosition, yPosition, finalWidth, finalHeight);
        pdf.save('weekly-schedule.pdf');

        console.log('PDF generated successfully');
    } catch (error) {
        console.error('Error generating PDF:', error);
    }
};

    useEffect( () => {
        const handleResize = () => {
            if (parentDimensionRef.current) {
                setDimensions({
                    width: parentDimensionRef.current.offsetWidth,
                    height: parentDimensionRef.current.offsetHeight
                });
            }
        };
        
        const organizeScheduleByTime = () : Array<reorderedScheduleType| undefined> =>   {
            let newOrder: Array<reorderedScheduleType| undefined> = [];

            if(schedule){
                newOrder = (schedule as any).flatMap( (outer: any, i: number) => {
                    return outer.when.map( (x: any,j: number) => {
                        console.log(x,'x');
                        let timeIndex = hours.indexOf( x.startTime);
                        console.log(timeIndex,'timeindex');
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
                .sort( (a: any,b: any) => {
                    if(a.time !== b.time){
                        return a.time.localeCompare(b.time)
                    }

                    return a.day.localeCompare(b.day)
                })
            }
            return newOrder
        }; 
        
        handleResize();
        window.addEventListener('resize', handleResize);

        const organizedData = organizeScheduleByTime();
        setreorderedSchedule(organizedData);
        return () => window.removeEventListener('resize', handleResize);
    } ,[schedule, hours, days])

    // Helper function to get dates for the current week
    const getWeekDates = () => {
        const today = new Date();
        const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
        
        // Find Sunday of current week
        const sunday = new Date(today);
        sunday.setDate(today.getDate() - dayOfWeek);
        sunday.setHours(0, 0, 0, 0);
        
        // Generate dates for each day of the week
        return days.map((_, index) => {
            const date = new Date(sunday);
            date.setDate(sunday.getDate() + index);
            
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const year = String(date.getFullYear()).slice(-2);
            
            return `${month}/${day}/${year}`;
        });
    }

    const DrawDays = () => {
        const weekDates = getWeekDates();
        return days.map( (text, i) => {
            // Responsive font sizing: larger on mobile, capped on desktop
            const dayNameSize = dimensions.width < 768 
                ? Math.max(dimensions.width * 0.025, 16) // Mobile: min 16px, scales with width
                : Math.min(dimensions.width * 0.020, 18); // Desktop: max 18px
            const dateSize = dimensions.width < 768
                ? Math.max(dimensions.width * 0.018, 13) // Mobile: min 13px
                : Math.min(dimensions.width * 0.014, 12); // Desktop: max 12px
            return (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    style={{
                        fontFamily: 'Roboto Slab',
                        fontWeight: '700',
                        fontSize: dayNameSize,
                        color: '#ffffff',
                        textAlign: 'center',
                        padding: '12px 8px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        background: 'linear-gradient(135deg, #282c34 0%, #1f2937 100%)',
                        borderBottom: '2px solid #1a1d24',
                        borderRight: '1px solid #1a1d24',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '4px',
                    }}> 
                        <div>{text}</div>
                        <div style={{
                            fontSize: dateSize,
                            fontWeight: '400',
                            color: '#cbd5e1',
                            letterSpacing: '0.5px',
                            textTransform: 'none',
                        }}>
                            {weekDates[i]}
                        </div>
                    </motion.div>
            )
        })
    }

    const handleDragEnd = (e) => {
        const { active, over } = e;
        if (!over) return;
        let currItem = active.id;
        if(reorderedSchedule){
            const [x,y] = over.id.split(':');

            for(let task of reorderedSchedule){
                const taskId = task?.id.split(':'); 
                console.log('taskid', taskId)
                console.log('x', x)
                console.log('y', y)
                if(taskId?.[1] === x && taskId?.[2] === y){
                    console.log('A TASK ALREADY EXIST HERE')
                    return;
                }
            }

            let newTime = hours[x];
            let newDay =  days[y]

            setreorderedSchedule((prevSchedule) => {
                const updatedSchedule = [...prevSchedule];
                const taskToUpdate = updatedSchedule.find( x => x?.id === currItem);
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
        const draggedTaskId = active.id;
        const newColumnId = over.id;

        console.log(reorderedSchedule);
        console.log(`Task ${draggedTaskId} dropped on ${newColumnId}`);
    }

    const DrawBody = () => {
        const fontSize = Math.min(dimensions.width * 0.015, 14); // cap at 14px
        const timeSize = Math.max(Math.min(dimensions.width * 0.015, 18), 16); // Larger time font: min 16px, max 18px

        const groupedByTimeAndTask = hours.map((hour) => {
            const tasks = days.map((day) => {
                const task: ScheduleItem | undefined  = reorderedSchedule.find((y) => {
                    let substringOfDay = y?.day.substring(0,3)
                    if(y?.time  instanceof(Date) ){
                        y.time = y.time.toString(); 
                    }
                    let time = y?.time.split(":")[1]
                    if(time === '30'){
                        let matchingHalfAndHour = hour.split(':')[0]+ ':';
                        return substringOfDay === day && y?.time === matchingHalfAndHour + '30'
                    }
                    return y?.time === hour && substringOfDay === day
                }) as ScheduleItem | undefined;
                return task || null;
            });
        
            return { time: hour, tasks };
        });

        console.log(groupedByTimeAndTask)
        
        return groupedByTimeAndTask.map( ({time,tasks}, i) => {
            const halfHourTimeSlot = time.split(':')[1] === "00" ? true : false 
            
            return halfHourTimeSlot && (
                <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.02 }}
                    style={{ 
                        display: 'grid',
                        gridTemplateColumns: '90px repeat(7, minmax(90px, 1fr))',
                        gap: '0',
                        borderBottom: '1px solid #cbd5e1',
                        minHeight: '60px',
                        minWidth: '760px',
                    }}
                >
                    <div 
                        style={{
                            display:'flex', 
                            alignItems:'center', 
                            justifyContent: 'center',
                            background: 'linear-gradient(135deg, #282c34 0%, #1f2937 100%)',
                            padding: '14px 12px',
                            borderRight: '2px solid #06b6d4',
                            boxShadow: 'none',
                        }}
                    >
                        <h5  style={{ 
                            fontFamily: 'Roboto Slab', 
                            fontSize: timeSize,
                            color: '#ddfaff',
                            fontWeight: '700',
                            marginBottom: '0',
                            lineHeight: '1.2',
                        }}> 
                            {time} 
                        </h5>
                    </div>
                    {
                        tasks.map( (task, j) => {
                            if(task === null){
                                return(
                                    <DropableTask key={j} id={`${i}:${j}`}>
                                        <h4
                                            style={{
                                                fontFamily: 'Nunito',
                                                fontSize: fontSize,
                                                color: '#9CA3AF'
                                            }}
                                        >         
                                        </h4>
                                    </DropableTask>   
                                    )
                            }
                            else{
                                return (
                                    <DropableTask key={j} id={`${i}:${j}`}>
                                        <DragableTask  id={task.id} desc={task.desc} data={ {parentId: `${i}:${j}`}}/>
                                    </DropableTask>    
                                    )
                            }
                            
                        }) 
                    }
                </motion.div>
        
            )
        })
    }

    const backToPlannerBtn = () => {
        setScheduleExist(false)
    }
    
    return(
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
            <div style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                <motion.h1 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                        textAlign: 'center',
                        color: '#06b6d4',
                        fontFamily: 'Roboto Slab',
                        fontSize: '32px',
                        fontWeight: '700',
                        marginBottom: '8px'
                    }}
                >
                    📅 Weekly Schedule
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    style={{
                        textAlign: 'center',
                        color: '#cbd5e1',
                        fontFamily: 'Nunito',
                        fontSize: '14px',
                        maxWidth: '420px',
                        margin: '0 auto',
                    }}
                >
                    Feel free to drag the tasks around to fine‑tune your week.
                </motion.p>
            </div>
            <div style={{ marginBottom: '30px', marginLeft: '10px', marginRight: '10px' }}>
                <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
                    <Container 
                        className="justify-content-sm-start" 
                        ref={parentDimensionRef}
                        style={{
                            background: '#f8fafc',
                            borderRadius: '12px',
                            padding: '24px',
                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                            position: 'relative',
                            maxWidth: '100%',
                        }}
                    >
                        {/* Header row + body share one horizontal scroll container */}
                        <div style={{ overflowX: 'auto' }}>
                            <div ref={pdfRef} style={{ minWidth: '760px' }}>
                                {/* Header Row with Days */}
                                <div style={{ 
                                    display: 'grid',
                                    gridTemplateColumns: '90px repeat(7, minmax(90px, 1fr))',
                                    gap: '0',
                                    marginBottom: '0',
                                    borderBottom: '2px solid #1a1d24',
                                }}>
                                    <div style={{
                                        display:'flex', 
                                        alignItems:'center', 
                                        justifyContent: 'center',
                                        borderRight: '2px solid #06b6d4',
                                    }}>
                                    </div>
                                    {DrawDays()}
                                </div>

                                {/* Body */}
                                {DrawBody()}
                            </div>
                        </div>

                    </Container>
                </DndContext>
            </div>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    display: "flex", 
                    justifyContent:'space-around', 
                    margin: "20px auto",
                    maxWidth: '400px',
                    gap: '12px'
                }}
            > 
                <Button 
                    onClick={() => backToPlannerBtn()}
                    style={{
                        backgroundColor: '#EF4444',
                        borderColor: '#EF4444',
                        padding: '10px 24px',
                        fontWeight: '600',
                        fontSize: '14px',
                        flex: 1,
                        borderRadius: '8px',
                        transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.backgroundColor = '#DC2626')}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.backgroundColor = '#EF4444')}
                >
                    ← Back to planner
                </Button>
                <Button 
                    onClick={() => pdfGenerator()}
                    style={{
                        backgroundColor: '#10B981',
                        borderColor: '#10B981',
                        padding: '10px 24px',
                        fontWeight: '600',
                        fontSize: '14px',
                        flex: 1,
                        borderRadius: '8px',
                        transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.backgroundColor = '#059669')}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.backgroundColor = '#10B981')}
                >
                    📥 Export to PDF
                </Button>
            </motion.div>
        </div>
    )
}

export default WeeklyScheduleCanvas;