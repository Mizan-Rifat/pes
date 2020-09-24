import React from 'react'
import Restricted from '@customComponent/Restricted';
import { useLocation } from 'react-router-dom';

export default function ErrorComp() {

    const location = useLocation();

    const msg = location.state != undefined ? location.state.message :'Not Found';
    const code = location.state != undefined ? location.state.code : 404;
    return (
        <div>
            <Restricted msg={`${code}, ${msg}`} home/>
        </div>
    )
}
