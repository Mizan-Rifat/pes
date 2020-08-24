import React from 'react'
import {IconButton,Tooltip} from '@material-ui/core';



export default function MIconButton(props) {

    const {title,handleClick,icon} = props
    return (
        <Tooltip title={title}>
                            
            <IconButton aria-label="save" onClick={handleClick}>
                {icon}
            </IconButton>

        </Tooltip>
    )
}
