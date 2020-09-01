import React,{useState} from 'react'
import MPopper from '@customComponent/MPopper';
import {IconButton,Badge} from '@material-ui/core';

export default function DesktopSection(props) {

    const {icon,component,count} = props;

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = event => {
        if (anchorEl && anchorEl.contains(event.target)) {
            setAnchorEl(null);
        } else {
            setAnchorEl(event.currentTarget);
        }
      };

    return (
        <div>
                <IconButton color="inherit" onClick={handleClick} >
                  <Badge badgeContent={count} color="secondary">
                    {icon}
                  </Badge>
                </IconButton>
                <MPopper 
                    anchorEl={anchorEl}
                    setAnchorEl={setAnchorEl}
                    component={component}
                  />
        </div>
    )
}
