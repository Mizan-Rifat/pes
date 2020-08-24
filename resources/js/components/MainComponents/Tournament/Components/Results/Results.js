import React, { useState } from 'react'
import {Team1,Team2} from '@customComponent/Team'
import Mtable from '@customComponent/Mtable';
import {makeStyles} from '@material-ui/core';
import DetailPanel from './DetailPanel';




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

export default function Results() {

    const [state, setstate] = useState([
        {
        "id": 1,
        "team1_id": 1,
        "team2_id": 10,
        "team1_details": {
        "id": 1,
        "name": "FC RED RANGERS",
        "slug": "fcredrangers",
        "logo": 'http://192.168.0.100:8000/images/logo/fcb.png'
        },
        "team2_details": {
        "id": 10,
        "name": "REAL BETIS",
        "slug": "realbetis",
        "logo": 'http://192.168.0.100:8000/images/logo/fcb.png'
        },
        "date": "2020-08-08 22:02:00",
        "tournament_id": 1,
        "group": 0,
        "round": 1,
        "leg": 1,
        "completed": 1,
        "team1_goals": 2,
        "team2_goals": 1
        },
        {
        "id": 2,
        "team1_id": 2,
        "team2_id": 9,
        "team1_details": {
        "id": 2,
        "name": "FC BARCELONA",
        "slug": "fcbarcelona",
        "logo": 'http://192.168.0.100:8000/images/logo/fcb.png'
        },
        "team2_details": {
        "id": 9,
        "name": "VILLAREAL",
        "slug": "villareal",
        "logo": 'http://192.168.0.100:8000/images/logo/fcb.png'
        },
        "date": null,
        "tournament_id": 1,
        "group": null,
        "round": 1,
        "leg": 1,
        "completed": 1,
        "team1_goals": 0,
        "team2_goals": 0
        },
        {
        "id": 3,
        "team1_id": 3,
        "team2_id": 7,
        "team1_details": {
        "id": 3,
        "name": "REAL MADRID",
        "slug": "realmadrid",
        "logo": 'http://192.168.0.100:8000/images/logo/fcb.png'
        },
        "team2_details": {
        "id": 7,
        "name": "SEVILLA",
        "slug": "sevilla",
        "logo": 'http://192.168.0.100:8000/images/logo/fcb.png'
        },
        "date": null,
        "tournament_id": 1,
        "group": null,
        "round": 1,
        "leg": 1,
        "completed": 1,
        "team1_goals": 0,
        "team2_goals": 0
        },
        {
        "id": 4,
        "team1_id": 4,
        "team2_id": 8,
        "team1_details": {
        "id": 4,
        "name": "Valencia",
        "slug": "valencia",
        "logo": 'http://192.168.0.100:8000/images/logo/fcb.png'
        },
        "team2_details": {
        "id": 8,
        "name": "LEVANTE",
        "slug": "levante",
        "logo": 'http://192.168.0.100:8000/images/logo/fcb.png'
        },
        "date": null,
        "tournament_id": 1,
        "group": null,
        "round": 1,
        "leg": 1,
        "completed": 1,
        "team1_goals": 0,
        "team2_goals": 0
        },
        {
        "id": 5,
        "team1_id": 5,
        "team2_id": 6,
        "team1_details": {
        "id": 5,
        "name": "Atletico Madrid",
        "slug": "atleticomadrid",
        "logo": 'http://192.168.0.100:8000/images/logo/fcb.png'
        },
        "team2_details": {
        "id": 6,
        "name": "Athletic Bilbao",
        "slug": "athleticbilbao",
        "logo": 'http://192.168.0.100:8000/images/logo/fcb.png'
        },
        "date": null,
        "tournament_id": 1,
        "group": null,
        "round": 1,
        "leg": 1,
        "completed": 1,
        "team1_goals": 0,
        "team2_goals": 0
        },
        {
        "id": 6,
        "team1_id": 2,
        "team2_id": 10,
        "team1_details": {
        "id": 2,
        "name": "FC BARCELONA",
        "slug": "fcbarcelona",
        "logo": 'http://192.168.0.100:8000/images/logo/fcb.png'
        },
        "team2_details": {
        "id": 10,
        "name": "REAL BETIS",
        "slug": "realbetis",
        "logo": 'http://192.168.0.100:8000/images/logo/fcb.png'
        },
        "date": null,
        "tournament_id": 1,
        "group": null,
        "round": 2,
        "leg": 1,
        "completed": 1,
        "team1_goals": 0,
        "team2_goals": 0
        },
        {
        "id": 7,
        "team1_id": 3,
        "team2_id": 1,
        "team1_details": {
        "id": 3,
        "name": "REAL MADRID",
        "slug": "realmadrid",
        "logo": 'http://192.168.0.100:8000/images/logo/fcb.png'
        },
        "team2_details": {
        "id": 1,
        "name": "FC RED RANGERS",
        "slug": "fcredrangers",
        "logo": 'http://192.168.0.100:8000/images/logo/fcb.png'
        },
        "date": null,
        "tournament_id": 1,
        "group": null,
        "round": 2,
        "leg": 1,
        "completed": 1,
        "team1_goals": 0,
        "team2_goals": 0
        },
        {
        "id": 8,
        "team1_id": 4,
        "team2_id": 9,
        "team1_details": {
        "id": 4,
        "name": "Valencia",
        "slug": "valencia",
        "logo": 'http://192.168.0.100:8000/images/logo/fcb.png'
        },
        "team2_details": {
        "id": 9,
        "name": "VILLAREAL",
        "slug": "villareal",
        "logo": 'http://192.168.0.100:8000/images/logo/fcb.png'
        },
        "date": null,
        "tournament_id": 1,
        "group": null,
        "round": 2,
        "leg": 1,
        "completed": 1,
        "team1_goals": 0,
        "team2_goals": 0
        },
        {
        "id": 9,
        "team1_id": 5,
        "team2_id": 7,
        "team1_details": {
        "id": 5,
        "name": "Atletico Madrid",
        "slug": "atleticomadrid",
        "logo": 'http://192.168.0.100:8000/images/logo/fcb.png'
        },
        "team2_details": {
        "id": 7,
        "name": "SEVILLA",
        "slug": "sevilla",
        "logo": 'http://192.168.0.100:8000/images/logo/fcb.png'
        },
        "date": null,
        "tournament_id": 1,
        "group": null,
        "round": 2,
        "leg": 1,
        "completed": 1,
        "team1_goals": 0,
        "team2_goals": 0
        },
        {
        "id": 10,
        "team1_id": 6,
        "team2_id": 8,
        "team1_details": {
        "id": 6,
        "name": "Athletic Bilbao",
        "slug": "athleticbilbao",
        "logo": 'http://192.168.0.100:8000/images/logo/fcb.png'
        },
        "team2_details": {
        "id": 8,
        "name": "LEVANTE",
        "slug": "levante",
        "logo": 'http://192.168.0.100:8000/images/logo/fcb.png'
        },
        "date": null,
        "tournament_id": 1,
        "group": null,
        "round": 2,
        "leg": 1,
        "completed": 1,
        "team1_goals": 0,
        "team2_goals": 0
        }
        ])

    const [columns, setcolumns] = useState([
        
        {
            field:'team1_id',
            render: rowData => (<Team1 name={rowData.team1_details.name} logo={rowData.team1_details.logo} panel='user' />),
        },
        {
            render:rowData => <Versus team1_goals={rowData.team1_goals} team2_goals={rowData.team2_goals} />
        },
        {
            field:'team2_id',
            render: rowData => <Team2 name={rowData.team2_details.name} logo={rowData.team2_details.logo} panel='user' />
        },
        
    ])
    return (
        <div className='responsiveTable resultTable'>
            <Mtable
                headerLess={true} 
                columns={columns}
                data={state}
                paging={true}
                editable={false}
                onRowClick={(event, rowData, togglePanel) => togglePanel()}
                detailPanel={[
                    rowData => ({
                      render: () => <DetailPanel />,
                    })
                  ]}
                
            />
        </div>
    )
}
function Versus({team1_goals,team2_goals}){
    const classes = useStyles();
    return(
        <div className='text-center'>
            <h4>{team1_goals} : {team2_goals}</h4>
            <div className={classes.date}>08 Aug 20,10:02 PM</div>
            <small className={classes.small}>Round 1 | </small>
            <small className={classes.small}>Leg 1</small>
        </div>
    )
}