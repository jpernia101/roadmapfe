import { createContext, ReactNode, useState } from "react";
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
    removeTask: (id: number) => void
}

const initialContext: TasksContextType = {
    tasks : [initialTask],
    addTask: () => {},
    removeTask: () => {}
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

    return (
        <TasksContextData.Provider value={{ tasks, addTask, removeTask }}>
            {children}
        </TasksContextData.Provider>
    );
};

//