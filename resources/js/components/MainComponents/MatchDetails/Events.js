import React,{useState} from 'react'
import { Grid,makeStyles } from '@material-ui/core'
import { ListGroupItem1,ListGroupItem2 } from '@customComponent/ListGroupItem'
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import { FootballIcon,RedCardIcon,AssistIcon,YellowCardIcon } from '@customComponent/Icons';


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
    }
}))


export default function Events({team1_events,team2_events}) {
    const classes  = useStyles();


    return (
        
        <Grid container spacing={3} className={classes.container} justify='space-between'>
            <Grid item sm={4} >
                <div>
                {
                    team1_events.map((event,index)=>(
                        <SingleEvent key={index} event={event} team={1} />
                    ))
                }
                </div>
            </Grid>

            <Grid item sm={4}>
                <div>
                {
                    team2_events.map((event,index)=>(
                        <SingleEvent key={index} event={event} team={2} />
                    ))
                }
                </div>
            </Grid>
        
        </Grid>
    
    )
}

function SingleEvent({event,team}){

    const iconStyle = {
        fontSize:'14px',
        margin:'0 5px'
    }

    const icon = (event_id)=>{
        switch (event_id) {
            case 1:
                return <FootballIcon style={iconStyle} />
                break;
            case 2:
                return <YellowCardIcon style={iconStyle}/>
                break;
            case 3:
                return <RedCardIcon style={iconStyle}/>
                break;
            case 4:
                return <p style={{marginTop:'15px'}}>(og)</p>
                break;
            
            default:
                break;
        }
    }
    return(
        <div>
            {
                team == 1 ?
                    <>

                        <ListGroupItem1 
                            icon={icon(event.event_id)}
                            label={`${event.player.name} (${event.minute})`}
                            containerStyle={{
                                height: event.assist_player_id != null ? '20px' : '30px',
                                fontSize:'12px',
                            }}
                        />

                        {
            
                            event.assist_player_id != null &&
                                <ListGroupItem1 
                                    icon={<AssistIcon style={iconStyle} />}
                                    label={`${event.assist_player.name}`}
                                    containerStyle={{
                                        height:'20px',
                                        fontSize:'12px',
                                        marginLeft:'15px'
                                    }}
                                /> 
                        }

                    </>
                    :
                    <>
                        <ListGroupItem2 
                            icon={icon(event.event_id)}
                            label={`${event.player.name} (${event.minute})  `}
                            containerStyle={{
                                height: event.assist_player_id != null ? '20px' : '30px',
                                fontSize:'12px',
                                justifyContent:'flex-end'
                            }}
                        />

                        {
            
                            event.assist_player_id != null &&
                                <ListGroupItem2 
                                    icon={<AssistIcon style={iconStyle} />}
                                    label={`${event.assist_player.name}`}
                                    containerStyle={{
                                        height:'20px',
                                        fontSize:'12px',
                                        marginRight:'15px',
                                        justifyContent:'flex-end'
                                    }}
                                /> 
                        }
                    </>

            }
            
        </div>
    )
}