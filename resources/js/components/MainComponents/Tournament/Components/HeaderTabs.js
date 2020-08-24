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



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  tabRoot: {
    justifyContent: "center"
  },
  scroller: {
    flexGrow: "0"
  },
  box:{
    padding:'10px',
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



export default function HeaderTabs({detailSlug}) {
  const classes = useStyles();

  const history = useHistory();
  const [value, setValue] = React.useState(0);
  const [tabs,setTabs] = useState([
    {
      label:'FIXTURES',
      index:0
    },
    {
      label:'RESULTS',
      index:1
    },
    {
      label:'STANDINGS',
      index:2
    },
    {
      label:'STATS',
      index:3
    },
    {
      label:'TEAMS',
      index:4
    },
  ]);

  const handleChange = (event, newValue) => {
    setValue(newValue);

    const pathname = window.location.pathname;
    const array = pathname.split('/');
    console.log({array})
    array.pop()
    const newPathName = array.join('/');
    history.push(`${newPathName}/${tabs[newValue].label.toLowerCase()}`)

  };

  useEffect(()=>{

    tabs.map(tab=>{

      if(tab.label.toLowerCase() == detailSlug){
        setValue(tab.index)
      }
    })


  },[])

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
          classes={{ root: classes.tabRoot, scroller: classes.scroller }}
        >
          {
            tabs.map((tab,ind)=>(
              <Tab key={ind} label={tab.label} {...a11yProps(tab.index)} />    
            ))
          }
          {/* <Tab label="FIXTURES" {...a11yProps(0)} />
          <Tab label="RESULTS" {...a11yProps(1)} />
          <Tab label="STANDINGS" {...a11yProps(2)} />
          <Tab label="STATS" {...a11yProps(3)} />
          <Tab label="TEAMS" {...a11yProps(4)} /> */}
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <Fixtures />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Results />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Standings />
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Teams />
      </TabPanel>
    </div>
  );
}

