import React from 'react'
import { Grid, makeStyles, Divider,Hidden } from '@material-ui/core';

const useStyles = makeStyles(theme=>({
    sidebar:{
        width:'240px',
        position:'fixed',
        top:'65px',
        bottom:0,
        padding:'10px',
        borderRight:'1px solid rgba(0,0,0,.1)',
        background:"#eee",
        zIndex:30
    },
    main:{
        marginLeft:'240px',
        padding:'10px',
        height:'auto',
        ['@media (max-width:960px)']: { 
            marginLeft:0,
            padding:'10px'
          }

    }

}))

export default function DoubleSidebarLayout({sidebar,main}) {
    const classes =useStyles();
    return (
        <div>
            <Hidden smDown>
                <div className={classes.sidebar}>
                    {sidebar}
                </div>
            </Hidden>
            
            <div className={classes.main}>
                {main}
            </div>

        </div>
    )
}
