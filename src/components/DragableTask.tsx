import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

interface DragableTaskProps  {
    id: number | string,
    desc: string
    data: { parentId: string }
}
const DragableTask: React.FC<DragableTaskProps> = ({id, desc, data}) => {
    const {attributes, listeners, setNodeRef,transform} = useDraggable({id : id, data: data })

    const style = transform ? {
        transform: CSS.Translate.toString(transform),
        fontFamily: "Nunito",
        fontSize: "14px",
        fontWeight: "bold",
        padding: "8px",
        backgroundColor: "#FFD700",
        borderRadius: "4px",
        cursor: "grab",

    } : undefined

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {desc}
        </div>
    )

}
export default DragableTask;