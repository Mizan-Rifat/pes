import React from 'react';
import { Grid, makeStyles } from '@material-ui/core'
import Versus from '../../CustomComponent/Versus'
import { ListGroupItem2, ListGroupItem1 } from '../../CustomComponent/ListGroupItem'


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
    }
}))

export default function Teams(props) {

    const {team1_name,team2_name,team1_logo,team2_logo,panel} = props;

    const classes  = useStyles();

    const labelStyle = {
        // fontWeight:700,
        fontSize:'20px',
        margin:'0 10px'
    }

    return (
        <>
            <Grid container spacing={3} className={classes.container}>
                <Grid item sm={4} >
                    <div className={classes.listItemContainer}>
                        <ListGroupItem1 
                            image={team1_logo}
                            label={team1_name}
                            labelStyle={labelStyle}
                        />
                    </div>
                </Grid>

                <Grid item sm={4} >
                    <Versus team1_goals={3} team2_goals={2} panel={panel} />
                </Grid>

                <Grid item sm={4}>
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
