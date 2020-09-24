import React,{useState} from 'react'
import { Grid,makeStyles } from '@material-ui/core'
import { ListGroupItem1,ListGroupItem2 } from '@customComponent/ListGroupItem'
import Mtable from '@customComponent/Mtable'
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import { FootballIcon,RedCardIcon,AssistIcon,YellowCardIcon } from '@customComponent/Icons';
import { MTableToolbar } from 'material-table';
import { ratingsTableColumns } from '../../CData/table';


const useStyles = makeStyles(theme=>({
    container:{
        // boxShadow:'0 6px 12px rgba(0,0,0,.1)',
        marginTop:'30px',
    },
    listItemContainer:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    toolbar:{
        padding:'0 !important',
        minHeight:'unset'
        
    },
}))

export default function Ratings({team1_name,team2_name,team1_ratings,team2_ratings}) {

    const classes  = useStyles();
   
    const columns = ratingsTableColumns();



    return (
        <Grid container spacing={3} className={classes.container} justify='space-between'>
            <Grid item xs={12} sm={4} >
                
                <RatingsTable 
                    columns={columns}
                    data={team1_ratings}
                    teamName={team1_name}
                
                />
            </Grid>

            <Grid item xs={12} sm={4}>
                <RatingsTable 
                        columns={columns}
                        data={team2_ratings}
                        teamName={team2_name}
                    
                    />
            </Grid>
        
        </Grid>
    )
}

function RatingsTable({columns,data,teamName}){

    const classes  = useStyles();
    return(
        <Mtable 
            columns={columns}
            data={data}
            search={false}
            title={teamName}
            header={{padding:'8px'}}
            edit={true}
            toolbarLess={true}
           
        
        />
    )
}
