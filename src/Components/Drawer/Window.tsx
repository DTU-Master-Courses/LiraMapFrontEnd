import { Rnd } from "react-rnd";
import '../Drawer/DrawerComponents.css';
import { FC, useState } from 'react';




interface Props {
    index: number,
    closeWindow(index: number): any;
    focusWindow(windowId: number):any;
    newZ: number,
    children: JSX.Element,
}





const Window: FC<Props> = ({closeWindow, index, focusWindow, newZ, children}) => {
    const [z, setZ] = useState(0);
    const x = 350;
    const y = 300;


    return(
        <Rnd
            className="draggable_component_container"
            bounds='body'
            dragHandleClassName={'draggable_handle'}
            default={{
            x: x,
            y: y,
            width: '70%',
            height: '60%'
            }}
            style={{zIndex: 1000 + z}}
            onMouseDown={(e:MouseEvent) => {
                setZ(newZ + 1);
                focusWindow(index);
            }}
        >
            <div className='draggable_handle'>
            <button className='close_component_btn' onClick={() => closeWindow(index - 1000000)}></button>
            </div>
            <div className='draggable_component_container_content'>
            	{children}
            </div>
        </Rnd>
    );
};

export default Window;
