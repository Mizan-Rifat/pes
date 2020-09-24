import React, { useState } from 'react';
import PrimaryLayout from '../../CustomComponent/PrimaryLayout';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PersonalInfo from './Personalnfo';
import ClubInfo from './ClubInfo';
import { useSelector } from 'react-redux';


const useStyles = makeStyles((theme) => ({
  pcontainer:{
        padding:'20px 150px',
        // minHeight:500,
        [theme.breakpoints.down('sm')]:{
          padding:'20px'  
        },
        [theme.breakpoints.down('xs')]:{
          padding:'10px'  
        }
    },
    toolbar:{
        padding:'0 !important',
        minHeight:'unset'
        
    },
    link:{
        fontSize:'12px',
        padding:'14px'
    },
    wrapper:{
        padding:20,
        [theme.breakpoints.down('xs')]:{
            padding:'10px'  
          }
    },
    tabHeader:{
        boxShadow:'unset',
        background:'unset'
    },
    selected:{
        '&.Mui-selected':{
            background:theme.palette.primary.light
        }
    }

}))

export default function Profile() {
    const classes = useStyles();

    const {user,loading} = useSelector(state => state.session)
    const {club,loading:clubLoading} = useSelector(state => state.clubs)

    const [tabValue, setTabValue] = useState(0);

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };



    return (
        <Container className={classes.pcontainer}>
            <PrimaryLayout title='Profile' loading={ loading || clubLoading }>


            <div className={classes.root}>

                <AppBar position="static" color="default" className={classes.tabHeader}>
                    <Tabs
                        value={tabValue}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        // variant="fullWidth"
                        centered
                        aria-label="full width tabs example"
                    >
                        <Tab label="Personal Info" {...a11yProps(0)} />
                        <Tab label="Club Info" {...a11yProps(1)} />
                    </Tabs>

                </AppBar>
                
                    <TabPanel value={tabValue} index={0}>
                        <PersonalInfo user={user} />
                    </TabPanel>

                    <TabPanel value={tabValue} index={1} >
                        <ClubInfo user={user} />
                    </TabPanel>

            </div>

            
            </PrimaryLayout>
            
        </Container>
    )
}
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  
function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }