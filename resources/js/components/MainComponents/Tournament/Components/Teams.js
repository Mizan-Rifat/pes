import React, { useState } from 'react'
import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import { Team1 } from '@customComponent/Team';
import { useSelector,useDispatch } from 'react-redux';
import Progress from '../../../CustomComponent/Progress';

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

    const {clubs,loading} = useSelector(state => state.clubs);
    const dispatch = useDispatch();


    return (
        <Container>
          
            
                <Grid container spacing={3} justify="center">

                    {
                        clubs.map((club,index)=>(
                            <Grid item xs={12} sm={6} key={index} >

                                <Link to={`/club/${club.slug}`} className={classes.link}>
                                    <Team1 logo={club.logo} name={club.name} panel='user' />
                                </Link>
                            </Grid>
                        ))
                    }
                    
                </Grid>
         
        </Container>
    )
}
