import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: 'unset',
  },
  listItem:{
    paddingLeft:'10px',
 
  },
  listicon:{
      minWidth:'30px',
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function SimpleList() {
  const classes = useStyles();

  const history = useHistory();

  const [items, setitems] = useState([
      {
          name:'Info',
          url:'/info'
      },
      {
          name:'Fixtures',
          url:'/fixtures'
      },
      {
          name:'Results',
          url:'/results'
      },
      {
          name:'Clubs',
          url:'/clubs'
      },
      {
          name:'Officials',
          url:'/officials'
      },
  ])

  const handleListItemClick = (url) => {

    const pathname = window.location.pathname;
    const array = pathname.split('/');
    array.pop()
    const newPathName = array.join('/');
    
    history.push(`${newPathName}${url}`)
  };


  return (
    <div className={classes.root}>

      <List component="nav" aria-label="main mailbox folders">

          {
              items.map((item,index)=>(
                <ListItem 
                    button 
                    key={index} 
                    className={classes.listItem}
                    selected={window.location.pathname.indexOf(item.url) > 0}
                    onClick={()=>handleListItemClick(item.url)}
                    >
                    <ListItemIcon className={classes.listicon}>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                </ListItem>
              ))
          }

    
      </List>

    </div>
  );
}
