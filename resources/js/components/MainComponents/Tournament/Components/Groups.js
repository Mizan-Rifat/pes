import React, { useState } from 'react'
import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import { ListGroupItem1 } from '@customComponent/ListGroupItem';
import { useSelector,useDispatch } from 'react-redux';
import Title from '@customComponent/Title'


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
        // marginLeft: '30%',
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

export default function Groups() {
    const classes = useStyles();

    const {fetchLoading,tournament} = useSelector(state=> state.info)
    const dispatch = useDispatch();

 

    return (
        <Container>
          
            
                <Grid container spacing={3} justify="center">

                {
                    Object.keys(tournament.groups).map((group)=>(

                        <Grid item xs={12} sm={6} >
                            <Title 
                                title={`Group ${String.fromCharCode(64 + parseInt(group.substring(group.length - 1)))}`}
                                titleStyle={{width:'150px',padding:'10px'}}
                            />

                            <table>
                                <tr>
                                    <th></th>
                                </tr>
                           
                            
                                    {
                                        tournament.groups[group].map((club,index)=>(
                                            
                                            <tr>
                                            <td colSpan='2'>
                                                <Link to={`/club/${club.slug}`} className={classes.link} key={index}>
                                                    <ListGroupItem1 
                                                        image={club.logo}
                                                        label={club.name}
                                                    />
                                                </Link>
                                            </td>
                                            </tr>
                                        ))
                                    }
                               
                            </table>

                        </Grid>
                    
                
                    ))
                }

                        
                    
                    
                </Grid>
         
        </Container>
    )
}
