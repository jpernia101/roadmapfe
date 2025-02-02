import { useDroppable } from "@dnd-kit/core";
import React from "react";
import { Col } from "react-bootstrap";


const DropableTask = ({id, children}) =>{
    const {setNodeRef} = useDroppable({id})

    return(
        <Col ref={setNodeRef} style={{ border: '.5px solid black', minHeight: '50px' }}>
            {children}
        </Col>
    )
}

export default DropableTask;