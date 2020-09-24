import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import { colors } from '@material-ui/core';
import {useHistory} from 'react-router-dom';
// import routes from './routes';
import clsx from 'clsx';
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import SettingsIcon from '@material-ui/icons/Settings';
import PeopleIcon from '@material-ui/icons/People';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    zIndex:10,
    color:'white',
    padding:'15px'
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  listItem:{
    paddingRight:0,
    '&.Mui-selected':{
      // backgroundColor:'rgb(0,172,193)'
      backgroundColor:theme.palette.secondary.main
    },
    '&.Mui-selected:hover':{
      // backgroundColor:`${theme.palette.secondary.dark} !important`
    },
    '&.MuiListItem-button:hover': {
      // backgroundColor: 'red'
      backgroundColor: theme.palette.secondary.light
    }
  },
  listicon:{
      color:'unset',
      minWidth:'unset',
      marginRight:'15px',
  },
  selected:{
      // backgroundColor:'#00ACC1',
  },
  listtext:{
    '&.MuiListItemText-primary':{
      fontSize:'14px'
    }
    
  }
}));

export default function MyList({setDrawerOpen}) {

  const classes = useStyles();

  const [items, setitems] = useState([
    {
        label:'Tournaments',
        icon: <Dashboard />,
        name:'fixtures'
    },
    {
        label:'Clubs',
        name:'teams',
        icon: <Dashboard />,
    },
    {
        label:'Fixtures',
        name:'fixtures',
        icon: <Dashboard />,
    },
    {
        label:'Results',
        name:'results',
        icon: <Dashboard />,
    },
    {
        label:'Standings',
        name:'standings',
        icon: <Dashboard />,
    },
])



  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
        {
            items.map((item,index)=>(

              <SingleListItem 
                item={item}
                key={index}
                setDrawerOpen={setDrawerOpen} 
                
              />

            ))
        }


    </List>

    
  );
}

function SingleListItem({ item,setDrawerOpen}) {

  const classes = useStyles();
  const history = useHistory();
  const {tournaments} = useSelector(state => state.tournaments)
  const [open, setOpen] = React.useState(false);

console.log('d',history.location.pathname.includes('eliteleague/'))

  const handleChildClick = (event,tournament_slug)=>{
    const slug = `/tournament/${tournament_slug}/${item.name}`
    setDrawerOpen(false)
    history.push(slug)
  }


  return (
      <>
                  <ListItem 
                    button 
                    // selected={slug == item.path}
                    onClick={() => setOpen(!open)}
                    className={classes.listItem}
                  >
                    <ListItemIcon className={classes.listicon}>
                         {item.icon}
                    </ListItemIcon>

                    <ListItemText primary={item.label} className={classes.listtext}/>
                    {
                        open ? <ExpandLess /> : <ExpandMore />
                    }
                </ListItem>

                <Collapse in={open} timeout="auto" unmountOnExit>


                  {
                    tournaments.map((tournament,childindex)=>(

                      <List 
                        key={childindex} 
                        component="div" 
                        disablePadding
                        onClick={(event) => handleChildClick(event,tournament.slug)}
                        className={classes.listItem}
                      >
                        <ListItem 
                          button
                          selected={history.location.pathname.includes(`${tournament.slug}/${item.name}`)} 
                          className={clsx(classes.nested,classes.listItem)}>
                          <ListItemIcon className={classes.listicon}>
                            <StarBorder />
                          </ListItemIcon>
                          <ListItemText primary={tournament.name} className={classes.listtext}/>
                        </ListItem>
                      </List> 
                    ))
                  }

                </Collapse>


      </>
  )
}
