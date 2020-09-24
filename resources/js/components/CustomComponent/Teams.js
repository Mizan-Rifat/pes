import React from 'react';
import { Grid, makeStyles } from '@material-ui/core'
import Versus from '@customComponent/Versus'
import { ListGroupItem2, ListGroupItem1 } from '@customComponent/ListGroupItem'


const useStyles = makeStyles(theme=>({
    container:{
        boxShadow:'0 6px 12px rgba(0,0,0,.1)',
        marginTop:'30px',
    },
    listItemContainer:{
        display: 'flex',
        // justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    gridItem:{
        [theme.breakpoints.down('xs')]:{
            padding:'0 10px !important'
        }
    }
}))

export default function Teams({fixtureDetails,panel}) {

    const {name:team1_name,logo:team1_logo} = fixtureDetails.team1_details;
    const {name:team2_name,logo:team2_logo} = fixtureDetails.team2_details;

    const classes  = useStyles();

    const labelStyle = {
        // fontWeight:700,
        fontSize:'20px',
        margin:'0 10px'
    }

    return (
        <>
            <Grid container spacing={3} className={classes.container}>
                <Grid item xs={12} sm={4} className={classes.gridItem}>
                    <div className={classes.listItemContainer}>
                        <ListGroupItem1 
                            image={team1_logo}
                            label={team1_name}
                            labelStyle={labelStyle}
                        />
                    </div>
                </Grid>

                <Grid item xs={12} sm={4} className={classes.gridItem}>
                    <Versus data={fixtureDetails} panel={panel} />
                </Grid>

                <Grid item xs={12} sm={4} className={classes.gridItem}>
                    <div className={classes.listItemContainer} style={{justifyContent:'flex-end'}}>
                        <ListGroupItem2 
                            image={team2_logo}
                            label={team2_name}
                            labelStyle={labelStyle}
                        />
                    </div>
                </Grid>
            
            </Grid>
        </>
    )
}
