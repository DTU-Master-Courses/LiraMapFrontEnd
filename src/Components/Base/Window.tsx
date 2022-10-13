import { Rnd } from "react-rnd";
import React, { useState } from 'react';
import '../Drawer/DrawerComponents.css';

interface WindowProps {
    id: number,
    x: number,
    y: number,
    width: string,
    height: string,
    windowName?: string,
    closeWindow: (windowId: number) => any,
    focusWindow: (windowId: number) => number,
    children: React.ReactNode;
}

const Window = ({id, x, y, width, height, windowName, closeWindow, focusWindow, children}: WindowProps) => {
    const [uniqueZ, setUniqueZ] = useState(0);

    return(
        <Rnd
            className={`draggable_component_container`}
            bounds='body'
            dragHandleClassName={'draggable_handle'}
            default={{
                x: x,
                y: y,
                width: width,
                height: height
            }}
            minWidth={300}
            style={{zIndex: 1000 + uniqueZ}}
            onMouseDown={(_: MouseEvent) => {
                setUniqueZ(uniqueZ + focusWindow(id));
            }}
        >
            <div className='draggable_handle'>
                <span className="window_name">{windowName}</span>
                <button className='close_component_btn' onClick={() => closeWindow(id)}></button>
            </div>
            <div className="draggable_component_container_content">
                {React.Children.only(children)}
            </div>
        </Rnd>
    );
};

export default Window;