import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import React, { useState } from "react";
import { motion } from "framer-motion";

interface DragableTaskProps  {
    id: number | string,
    desc: string
    data: { parentId: string }
}
const DragableTask: React.FC<DragableTaskProps> = ({id, desc, data}) => {
    const {attributes, listeners, setNodeRef, transform, isDragging} = useDraggable({id : id, data: data })
    const [isHovered, setIsHovered] = useState(false);

    const style = {
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 1000 : 'auto',
    }

    return (
        <motion.div 
            ref={setNodeRef} 
            style={style}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            {...listeners} 
            {...attributes}
        >
            <div
                style={{
                    backgroundColor: '#06b6d4',
                    color: 'white',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'grab',
                    boxShadow: isHovered 
                        ? '0 8px 16px rgba(6, 182, 212, 0.4)'
                        : '0 4px 8px rgba(6, 182, 212, 0.2)',
                    transition: 'box-shadow 0.2s ease',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    fontFamily: 'Nunito',
                    overflow: 'hidden',
                    textOverflow: 'clip',
                    whiteSpace: 'normal',
                    wordBreak: 'break-word',
                    textAlign: 'center',
                }}
            >
                {desc}
            </div>
        </motion.div>
    )

}
export default DragableTask;