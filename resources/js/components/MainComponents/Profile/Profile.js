import React, { useEffect, useState } from 'react';
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
import {useHistory} from 'react-router-dom'
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

export default function Profile(props) {
    const classes = useStyles();
    const history = useHistory();

    const {user,loading} = useSelector(state => state.sessionUser)
    const {loading:clubLoading} = useSelector(state => state.cuClub)

    const info = props.match.params.info;

    const [tabValue, setTabValue] = useState(0);

    const [tabs,setTabs] = useState([
      {
        label:'PERSONAL INFO',
        slug:'personalinfo',
        key:0,
        children:<PersonalInfo/>
      },
      {
        label:'CLUB INFO',
        slug:'clubinfo',
        key:1,
        children:<ClubInfo />
      },
    ]);

    const handleChange = (event, newValue) => {

      setTabValue(newValue);

      const pathname = window.location.pathname;
      const array = pathname.split('/');
    
      array.pop()
      const newPathName = array.join('/');
      history.push(`${newPathName}/${tabs[newValue].slug}`)
    };

    useEffect(()=>{
        if(info == 'personalinfo'){
          setTabValue(0)
        }else if(info == 'clubinfo'){
          setTabValue(1)
        }else{
          history.push('/error')
        }
    },[])



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

                    {
                      tabs.map((tab,index)=>(
                        <TabPanel value={tabValue} index={index} key={index}>
                            {tab.children}
                        </TabPanel>
                      ))
                    }

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