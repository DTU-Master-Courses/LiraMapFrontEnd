import { Rnd } from "react-rnd";
import React, { useState } from 'react';
import '../Drawer/DrawerComponents.css';

interface DraggableWindowProps {
    componentName: string,
    id: number,
    x: number,
    y: number,
    width: string,
    height: string,
    focusWindow: (windowId: number) => number,
    children: React.ReactNode;
}

const DraggableWindow = ({componentName, id, x, y, width, height, focusWindow, children}: DraggableWindowProps) => {
    const [uniqueZ, setUniqueZ] = useState(0);

    return(
        <Rnd
            className={`draggable_component_container ${componentName}`}
            bounds='body'
            dragHandleClassName={'draggable_handle'}
            default={{
                x: x,
                y: y,
                width: width,
                height: height
            }}
            style={{zIndex: 1000 + uniqueZ}}
            onMouseDown={(_: MouseEvent) => {
                setUniqueZ(uniqueZ + focusWindow(id));
            }}
        >
            {React.Children.only(children)}
        </Rnd>
    );
};

export default DraggableWindow;