import React from 'react';
import { Grid, makeStyles, Divider, Button } from '@material-ui/core';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';


const useStyles = makeStyles(theme=>({
    card: {
        border: "0",
        marginBottom: "30px",
        marginTop: "30px",
        borderRadius: "6px",
        color: "rgba(0,0,0, 0.87)",
        background: 'white',
        width: "100%",
        boxShadow: "0 1px 4px 0 rgba(0,0,0, 0.14)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        minWidth: "0",
        wordWrap: "break-word",
        fontSize: ".875rem",
        padding:'10px'
      },
      body:{
          textAlign:"right",
      },
      iconContainer:{
          position:'absolute',
          padding: '20px',
          background: 'red',
          top: '-25px',
          left: '25px',
      },
      details:{
          marginBottom:'15px'
      },
      icon:{
        color:'white',
        fontSize:'35px'
      },
      footerText:{
        color: "rgba(0,0,0, 0.6)",
        marginTop:'8px'
      },
      content: {
        padding: theme.spacing(3),
      },
}))

export default function Dashboard() {
    const classes =useStyles();
    return (
        <Grid container spacing={3} className={classes.content}>
            <Grid item xs={12} sm={6} md={3}>
                <div className={classes.card}>
                    <div className={classes.body}>

                        <div className={classes.iconContainer}>
                            <FileCopyOutlinedIcon className={classes.icon}/>
                        </div>

                        <div className={classes.details}>
                            <p style={{color: "rgba(0,0,0, 0.6)"}}>Used Space</p>
                            <h3>49/50 <small>GB</small></h3>
                        </div>
                    </div>
                    <div className={classes.footer}>
                        <Divider />
                        <div className={classes.footerText}>Get More Space</div>
                    </div>
                </div>
            </Grid><Grid item xs={12} sm={6} md={3}>
                <div className={classes.card}>
                    <div className={classes.body}>

                        <div className={classes.iconContainer}>
                            <FileCopyOutlinedIcon className={classes.icon}/>
                        </div>
                        
                        <div className={classes.details}>
                            <p style={{color: "rgba(0,0,0, 0.6)"}}>Used Space</p>
                            <h3>49/50 <small>GB</small></h3>
                        </div>
                    </div>
                    <div className={classes.footer}>
                        <Divider />
                        <div className={classes.footerText}>Get More Space</div>
                    </div>
                </div>
            </Grid><Grid item xs={12} sm={6} md={3}>
                <div className={classes.card}>
                    <div className={classes.body}>

                        <div className={classes.iconContainer}>
                            <FileCopyOutlinedIcon className={classes.icon}/>
                        </div>
                        
                        <div className={classes.details}>
                            <p style={{color: "rgba(0,0,0, 0.6)"}}>Used Space</p>
                            <h3>49/50 <small>GB</small></h3>
                        </div>
                    </div>
                    <div className={classes.footer}>
                        <Divider />
                        <div className={classes.footerText}>Get More Space</div>
                    </div>
                </div>
            </Grid><Grid item xs={12} sm={6} md={3}>
                <div className={classes.card}>
                    <div className={classes.body}>

                        <div className={classes.iconContainer}>
                            <FileCopyOutlinedIcon className={classes.icon}/>
                        </div>
                        
                        <div className={classes.details}>
                            <p style={{color: "rgba(0,0,0, 0.6)"}}>Used Space</p>
                            <h3>49/50 <small>GB</small></h3>
                        </div>
                    </div>
                    <div className={classes.footer}>
                        <Divider />
                        <div className={classes.footerText}>Get More Space</div>
                    </div>
                </div>
            </Grid>

        </Grid>
    )
}
