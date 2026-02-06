import { useDroppable } from "@dnd-kit/core";
import React from "react";

const DropableTask = ({id, children}) =>{
    const {setNodeRef, isOver} = useDroppable({id})

    return(
        <div
            ref={setNodeRef} 
            style={{ 
                minHeight: '60px',
                padding: '8px',
                border: isOver 
                    ? '2px solid #06b6d4' 
                    : '1px solid #d1d5db',
                borderRight: '1px solid #d1d5db',
                backgroundColor: isOver ? 'rgba(6, 182, 212, 0.1)' : 'transparent',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                minWidth: 0,
                overflow: 'hidden',
            }}
        >
            {children}
        </div>
    )
}

export default DropableTask;