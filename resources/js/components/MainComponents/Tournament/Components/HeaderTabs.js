import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Fixtures from './Fixtures';
import Results from './Results/Results';
import {useHistory} from 'react-router-dom';
import Standings from './Standings';
import Teams from './Teams';
import Stats from './Stats';
import Groups from './Groups';
import {primaryColor,secondaryColor} from '@assets/jss/material-dashboard-react.js'



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    '&.MuiTab-wrapper':{
      color:'yellow'
    }
  },
  tabRoot: {
    justifyContent: "center",
    background:secondaryColor[0]
  },
  indicator:{
    backgroundColor:'unset'
  },
  scroller: {
    flexGrow: "0"
  },
  wrapper:{
    color:'#fff',
    fontWeight:700
  },
  selected:{
    background:primaryColor[0]
  },
  box:{
    padding:'10px',
    background:'#eee',
    ['@media (max-width:480px)'] : {
      padding:0
    }
  }
}));



function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();


  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className={classes.box}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}



export default function HeaderTabs({detailSlug,tournament}) {
  const classes = useStyles();

  const history = useHistory();
  const [value, setValue] = React.useState(0);

  const [tabs,setTabs] = useState([
    {
      label:'FIXTURES',
      key:0,
      children:<Fixtures />
    },
    {
      label:'RESULTS',
      key:1,
      children:<Results />
    },
    {
      label:'STANDINGS',
      key:2,
      children:<Standings />
    },
    {
      label:'Groups',
      key:3,
      children:<Groups />
    },
    {
      label:'Bracket',
      key:4,
      children:<p>bracket</p>
    },
    {
      label:'STATS',
      key:5,
      children:<Stats />
    },
    {
      label:'TEAMS',
      key:6,
      children:<Teams />
    },
  ]);

  const handleChange = (event, newValue) => {

    setValue(newValue);

    const pathname = window.location.pathname;
    const array = pathname.split('/');
   
    array.pop()
    const newPathName = array.join('/');
    history.push(`${newPathName}/${tabs[newValue].label.toLowerCase()}`)

  };


  useEffect(()=>{
    let newTabs = []

    if(tournament.format == 1){
      newTabs = tabs.filter(tab=>tab.key != 3 && tab.key != 4)
    }
    if(tournament.format == 2){
      newTabs = tabs.filter(tab=>tab.key != 2 && tab.key != 3)
    }
    if(tournament.format == 3){
      newTabs = tabs.filter(tab=>tab.key != 4)
    }

    console.log({tournament})

    setTabs(newTabs.map((tab,index)=>(
      {
        ...tab,
        index
      }
    )))


  },[])
  
  useEffect(()=>{

    tabs.map(tab=>{

      if(tab.label.toLowerCase() == detailSlug){
        setValue(tab.index)
      }
    })

  },[tabs])

  return (
    <div className={classes.root}>

      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant='scrollable'
        //   variant={window.width > 480 ? 'standard' : 'scrollable'}
          scrollButtons="auto"
          centered
          aria-label="scrollable auto tabs example"
          classes={{ root: classes.tabRoot, scroller: classes.scroller,wrapper:classes.wrapper,indicator:classes.indicator }}
        >
          {
            tabs.map((tab,ind)=>(
              <Tab key={ind} label={tab.label} {...a11yProps(tab.index)} classes={{wrapper:classes.wrapper,selected:classes.selected }}/>    
            ))
          }
        </Tabs>
      </AppBar>

      {
        tabs.map((tab,index)=>(
          <TabPanel value={value} index={tab.index} key={index}>
              {tab.children}
          </TabPanel>
        ))
      }

    
    </div>
  );
}

