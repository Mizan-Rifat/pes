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

export default function MyList() {

  const classes = useStyles();
  const [slug, setSlug] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const {tournaments} = useSelector(state => state.tournaments)

  const [routes,setRoutes] = useState([
    {
      path: "/admin/dashboard",
      name: "Dashboard",
      icon: <Dashboard />,
      children:[]
    },
    {
      path: "/admin/users",
      name: "Users",
      icon: <PeopleIcon />,
      children:[]
    },
    {
      path: "/admin/clubs",
      name: "Clubs",
      icon: <PeopleIcon />,
      children:[]
    },
    {
      path: "/admin/alltournaments",
      name: "All Tournaments",
      icon: <PeopleIcon />,
      children:[]
    },
    {
      path: null,
      name: "Tournaments",
      icon: <SportsSoccerIcon />,
      children:[]
    },
    {
      path: "/admin/settings",
      name: "Settings",
      icon: <SettingsIcon />,
      children:[]
    },
  
  ])

  useEffect(() => {
    const array = routes.map(route=>(
      route.name == 'Tournaments' ? 
      {
        ...route,
        children:tournaments.map(tournament=>({
          path: `/admin/tournament/${tournament.slug}`,
          name: tournament.name,
          icon: Dashboard,
          children:[]
      }))
      } : route

    ))
    setRoutes(array);

  }, [tournaments])

  useEffect(()=>{
    
    setSlug(window.location.pathname)
  },[window.location.pathname])
  console.log(window.location.pathname)

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
        {
            routes.map((item,index)=>(

              <SingleListItem 
                item={item} 
                index={index} 
                key={index} 
                setSlug={setSlug} 
                setSelectedIndex={setSelectedIndex}
                slug={slug}
                selectedIndex={selectedIndex}
                routes={routes} 
              />

            ))
        }


    </List>
  );
}

function SingleListItem({ item,index,slug,selectedIndex,setSlug,setSelectedIndex,routes}) {

  const classes = useStyles();
  const history = useHistory();

  const [open, setOpen] = React.useState(false);
  


  const handleListItemClick = (event, index) => {
    
      setOpen(!open);
      setSelectedIndex(index);
      if(routes[index].path != null){
        history.push(`${routes[index].path}`)
      }
  };

  const handleChildClick = (event,parentIndex,childindex)=>{
    setSlug(`${routes[parentIndex].children[childindex].path}`)
    history.push(`${routes[parentIndex].children[childindex].path}`)
  }

  useEffect(()=>{
    setSlug(window.location.pathname)
  },[window.location.pathname])



  return (
      <>
                  <ListItem 
                    button 
                    selected={slug == item.path}
                    onClick={(event) => handleListItemClick(event, index)}
                    className={classes.listItem}
                  >
                    <ListItemIcon className={classes.listicon}>
                         {item.icon}
                    </ListItemIcon>

                    <ListItemText primary={item.name} className={classes.listtext}/>
                    {

                        item.children.length > 0  ?
                          open ? <ExpandLess /> : <ExpandMore />
                          : ''
                          
                    }
                </ListItem>

                <Collapse in={open} timeout="auto" unmountOnExit>


                  {
                    item.children.map((children,childindex)=>(
                      <List 
                        key={children} 
                        component="div" 
                        disablePadding
                        onClick={(event) => handleChildClick(event,index,childindex)}
                        className={classes.listItem}
                      >
                        <ListItem 
                          button
                          selected={slug == children.path} 
                          className={clsx(classes.nested,classes.listItem)}>
                          <ListItemIcon className={classes.listicon}>
                            <StarBorder />
                          </ListItemIcon>
                          <ListItemText primary={children.name} className={classes.listtext}/>
                        </ListItem>
                      </List> 
                    ))
                  }

                </Collapse>


      </>
  )
}
