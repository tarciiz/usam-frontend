import React, { useState } from 'react';
import { Popover, Pane, Position} from 'evergreen-ui';

const HoverPopover = ({ content, children }) => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);


  return (
    <Popover
      isShown={isPopoverOpen}
      position={Position.RIGHT }
      
      content={ 
        <Pane minWidth={200} padding={16} 
              style={{border: '1px solid gray'}}>
          {content}
        </Pane>
      }
      
    >
      <div
        onMouseOver={()=>{
            setPopoverOpen(true)
        }}
        onMouseLeave={()=>{
            setPopoverOpen(false)
        }}
      >
        {children}
      </div>
    </Popover>
  );
};

export default HoverPopover;