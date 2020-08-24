import React, { useState } from 'react'
import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import { Team1 } from '@customComponent/Team';

const useStyles = makeStyles((theme) => ({
    logo:{
        height: '70px'
    },
    link:{
        color:'#333',
        '&:hover':{
            textDecoration:'none',
            color :'#F1CB29',
        },
        display: 'inline-block',
        marginLeft: '30%',
        ['@media (max-width:480px)'] : {
            marginLeft:'20%'
          }
    },
    teamname : {
        color : '#333',
        '&:hover':{
            color :'#F1CB29',
        }
    }
  }));

export default function Teams() {
    const classes = useStyles();


    const [teams, setteams] = useState([
        {
        "id": 1,
        "name": "FC RED RANGERS",
        "slug": "fcredrangers",
        "logo": "http://127.0.0.1:8000/images/logo/fcb.png",
        "invitation": 1
        },
        {
        "id": 2,
        "name": "FC BARCELONA",
        "slug": "fcbarcelona",
        "logo": "http://127.0.0.1:8000/images/logo/fcb.png",
        "invitation": 1
        },
        {
        "id": 3,
        "name": "REAL MADRID",
        "slug": "realmadrid",
        "logo": "http://127.0.0.1:8000/images/logo/rm.png",
        "invitation": 1
        },
        {
        "id": 4,
        "name": "Valencia",
        "slug": "valencia",
        "logo": "http://127.0.0.1:8000/images/logo/fcb.png",
        "invitation": 1
        },
        {
        "id": 5,
        "name": "Atletico Madrid",
        "slug": "atleticomadrid",
        "logo": "http://127.0.0.1:8000/images/logo/mu.png",
        "invitation": 1
        },
        {
        "id": 6,
        "name": "Athletic Bilbao",
        "slug": "athleticbilbao",
        "logo": "http://127.0.0.1:8000/images/logo/rm.png",
        "invitation": 1
        },
        {
        "id": 8,
        "name": "LEVANTE",
        "slug": "levante",
        "logo": "http://127.0.0.1:8000/images/logo/mu.png",
        "invitation": 1
        },
        {
        "id": 7,
        "name": "SEVILLA",
        "slug": "sevilla",
        "logo": "http://127.0.0.1:8000/images/logo/fcb.png",
        "invitation": 1
        },
        {
        "id": 9,
        "name": "VILLAREAL",
        "slug": "villareal",
        "logo": "http://127.0.0.1:8000/images/logo/rm.png",
        "invitation": 1
        },
        {
        "id": 10,
        "name": "REAL BETIS",
        "slug": "realbetis",
        "logo": "http://127.0.0.1:8000/images/logo/fcb.png",
        "invitation": 1
        }
        ])


    return (
        <Container>
            <Grid container spacing={3} justify="center">

                {
                    teams.map((team,index)=>(
                        <Grid item xs={12} sm={6} key={index} >

                            <Link to={`/club/${team.id}`} className={classes.link}>
                                <Team1 logo={'fcb.png'} name={team.name} panel='user' />
                                {/* <img src={team.logo} className={classes.logo}  />
                                <h3 className={classes.teamname}>{team.name}</h3> */}
                            </Link>
                        </Grid>
                    ))
                }
                
            </Grid>
        </Container>
    )
}
