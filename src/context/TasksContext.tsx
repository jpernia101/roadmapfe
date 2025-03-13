import { createContext, ReactNode, useContext, useState } from "react";
import React from "react";

let taskCounter = 0;
export interface Task {
    id: number,
    desc: string,
    priority: 'LOW' | 'MEDIUM' | 'HIGH'  | '',
    dueDate?: Date | null,
    frequency: string
}
const initialTask: Task = {
    id: ++taskCounter,
    desc: '',
    priority: '',
    frequency: '1',
    dueDate: null
}
interface TasksContextType {
    tasks : Array<Task>,
    addTask: () => void,
    removeTask: (id: number) => void,
    updateTask: (id:number, key: string, val: any) => void
}
const initialContext: TasksContextType = {
    tasks : [initialTask],
    addTask: () => {},
    removeTask: () => {},
    updateTask: () => {}
}


// Create Context
export const TasksContextData = createContext<TasksContextType>(initialContext);

// Provider Component
export const TasksContextProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<Task[]>([initialTask]);

    const addTask = () => {
        const newTask: Task = {
            id: ++taskCounter,
            desc: '',
            priority: '',
            frequency: '1',
            dueDate: null
        }
        setTasks((prev) => [...prev, newTask]);
    };

    const removeTask = (id: number) => {
        console.log('id' + id)
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    const updateTask = (id, key , val) =>{
        setTasks( prev => prev.map( x => x.id === id ? { ...x, [key]: val} : x
        ))
    }

    return (
        <TasksContextData.Provider value={{ tasks, addTask, removeTask, updateTask }}>
            {children}
        </TasksContextData.Provider>
    );
};

export interface ScheduleItem{
    desc: string,
    id: number | string,
    when: Array<any>,
    reasoning: string
}

interface ScheduleContext{
    schedule: Array<ScheduleItem> | null,
    setSchedule: (schedule: Array<ScheduleItem>) => void;
}

export const ScheduleContext = createContext<ScheduleContext | null>(null);

export const ScheduleContextProvider = ({children}: {children : ReactNode}) =>{
    const [schedule , setSchedule] = useState<Array<ScheduleItem>| null>(null);

    return(
        <ScheduleContext.Provider value={{schedule, setSchedule}}>
            {children}
        </ScheduleContext.Provider>
    )

}

export const useScheduleContext = () =>{
    let context = useContext(ScheduleContext);

    if(!context){
        throw new Error("useScheduleContext must be used within a ScheduleContextProvider");
    }
    return context;
}