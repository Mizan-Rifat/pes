import React, { useState } from 'react';
import {makeStyles} from '@material-ui/core';
import Mtable from '@customComponent/Mtable';
import clsx from 'clsx';
import {Team1,Team2} from '@customComponent/Team'

const useStyles = makeStyles(theme=>({

    logo:{
        height:'100%',
        margin:'0 10px'
    },
    team:{
        height:'50px',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        ['@media (max-width:480px)'] : {
            margin:'5px 0'
          }
    },
    team1:{
        ['@media (max-width:480px)'] : {
            justifyContent:'flex-start !important'
          }
    },
    team2:{
        ['@media (max-width:480px)'] : {
            justifyContent:'flex-end !important'
          }

    },
    date:{
        fontSize:'14px',
        ['@media (max-width:480px)'] : {
            fontSize:'12px'
          }
    },
    small:{
        ['@media (max-width:480px)'] : {
            fontSize:'10px'
          }
    },
    name:{
        fontWeight:700
    }
  }));

export default function Fixtures() {

    const [columns, setcolumns] = useState([
        {
            field:'team1_id',
            render: rowData => (<Team1 name={rowData.team1} logo={rowData.logo} panel='user' />),
        },
        {
            render:rowData => <Versus />
        },
        {
            field:'team2_id',
            render: rowData => <Team2 name={rowData.team2} logo={rowData.logo} panel='user' />
        },

    ])

const [fixtures, setfixtures] = useState([
    {
        team1:'FC BARCELONA',
        team2:'FC RED RANGERS',
        logo:'http://192.168.0.100:8000/images/logo/fcb.png'
    },{
        team1:'FC BARCELONA',
        team2:'FC RED RANGERS',
        logo:'http://192.168.0.100:8000/images/logo/fcb.png'
    },{
        team1:'FC BARCELONA',
        team2:'FC RED RANGERS',
        logo:'http://192.168.0.100:8000/images/logo/fcb.png'
    },{
        team1:'FC BARCELONA',
        team2:'FC RED RANGERS',
        logo:'http://192.168.0.100:8000/images/logo/fcb.png'
    },{
        team1:'FC BARCELONA',
        team2:'FC RED RANGERS',
        logo:'http://192.168.0.100:8000/images/logo/fcb.png'
    },
])

    return (
        <div className='responsiveTable'>
            <Mtable
                headerLess={true} 
                columns={columns}
                data={fixtures}
                editable={false}
                
            />
        </div>
    )
}



function Versus(){
    const classes = useStyles();
    return(
        <div className='text-center' className={classes.container}>
            <h4>VS</h4>
            <div className={classes.date}>08 Aug 20,10:02 PM</div>
            <small className={classes.small}>Round 1 | </small>
            <small className={classes.small}>Leg 1</small>
        </div>
    )
}