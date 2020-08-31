import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {useSelector,useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    position:'fixed',
    top:64,
    right:0,
    left:'auto',
    width:'100%',
    background:'rgba(0,0,0,.5)',
    color:'white',
    // padding:'10px 20px',
    // height:'30px',
    zIndex:100
  },
  container:{
    display:'flex',
    justifyContent:'center'
  },
  item:{
      borderRight:'1px solid rgba(255,255,255,.3)',
      padding: '10px 20px',
      cursor:'default',
    //   '&:hover':{
    //     background:theme.palette.primary.light
    // }
  
  },
  paper:{
      background:theme.palette.primary.main,
      color:theme.palette.primary.contrastText
    //   height:100,
    //   width:100,
},
  menus:{
    position:'absolute',
    width:'100%',
    // top:0,
    // right:0

  },
  listRoot:{
    '&.MuiList-padding':{
        padding:0
    }
  },
  listItem:{
      '&.MuiListItem-button':{
          '&:hover':{
              background:theme.palette.secondary.main
          }
      }
  },
  firstItem:{
      borderLeft:'1px solid rgba(255,255,255,.3)',
  },
  active:{
      background:theme.palette.primary.dark
  }
}));

export default function Navbar() {
  const classes = useStyles();
  const {tournaments,fetchLoading} = useSelector(state=>state.tournaments)


  const [items, setitems] = useState([
      {
          label:'Tournaments',
          name:'fixtures'
      },
      {
          label:'Clubs',
          name:'teams',
      },
      {
          label:'Fixtures',
          name:'fixtures'
      },
      {
          label:'Results',
          name:'results',
      },
      {
          label:'Standings',
          name:'standings'
      },
  ])
  

  return (
    <>
            {
                fetchLoading ? '' :   
            

                        <div className={classes.root}>

                            <div className={classes.container}>
                                {
                                    items.map((item,index)=>(
                                        <MItems 
                                            label={item.label}
                                            name={item.name}
                                            items={tournaments}
                                            index={index}
                                        />
                                    ))
                                }
                            </div>

                        </div>
            }
    </> 
  );
}


function MItems({label,items,name,index}){
    const classes = useStyles();
    const [checked, setchecked] = useState(false)
    return(
            <div style={{position:'relative',width:'170px',textAlign:'center'}}>
                <div 
                    className={clsx(classes.item,{
                        [classes.firstItem] : index == 0,
                        [classes.active] : checked
                    })}
                    onMouseEnter={()=>setchecked(true)}
                    onMouseLeave={()=>setchecked(false)}
                    >
                        {label}
                </div>
                {
                    checked &&

                    <div className={classes.menus}>
                        <Collapseitem checked={checked} setchecked={setchecked} items={items} name={name} />
                    </div>

                }
                
            </div>
    )
}


function Collapseitem({checked,setchecked,items,name}){
    const classes = useStyles();
    const history = useHistory();

    const handleClick = (slug,name) =>{
        setchecked(false)
        history.push(`/tournament/${slug}/${name}`)
    }

    return(

        
                <div
                        onMouseEnter={()=>setchecked(true)}
                        onMouseLeave={()=>setchecked(false)}
                >
                    <Paper elevation={0} className={classes.paper} square>
                            <List component="nav" aria-label="main mailbox folders" className={classes.listRoot}>

                                {
                                    items.map((tournament,index)=>(
                                        <ListItem 
                                            button 
                                            key={index} 
                                            onClick={()=>handleClick(tournament.slug,name)}
                                            className={classes.listItem}
                                        >
                                            <ListItemText primary={tournament.name} />
                                        </ListItem>
                                    ))
                                }
                                
                            
                        </List>
                    </Paper>
                </div>
            
       
    )
}
