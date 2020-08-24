import React from 'react';
import Icon  from '@material-ui/core/Icon';
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles(theme=>({
    img:{
        height:'100%',
        verticalAlign:'unset',
    },
    icon:{
        fontSize:'16px'
    }
}))

export function FootballIcon({style}){
    const classes = useStyles();
    return(
        <Icon style={style} className={classes.icon}>
            <img src='/images/logo/football.svg' className={classes.img} />
        </Icon>
    )
}
export function YellowCardIcon({style}){
    const classes = useStyles();
    return(
        <Icon style={style} className={classes.icon}>
            <img src='/images/logo/Yellow_card.svg' className={classes.img} />
        </Icon>
    )
}
export function RedCardIcon({style}){
    const classes = useStyles();
    return(
        <Icon style={style} className={classes.icon}>
            <img src='/images/logo/Red_card.svg' className={classes.img} />
        </Icon>
    )
}
export function AssistIcon({style}){
    const classes = useStyles();
    return(
        <Icon style={style} className={classes.icon}>
            <img src='/images/logo/kick.svg' className={classes.img} />
        </Icon>
    )
}