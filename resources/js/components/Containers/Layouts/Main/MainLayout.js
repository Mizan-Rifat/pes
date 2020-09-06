import React,{useEffect} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles,useTheme } from '@material-ui/core/styles';
import Appbar from './Appbar';
import Navbar from './Navbar';
import {useSelector,useDispatch} from 'react-redux';
import { fetchAllTournaments } from '@actions/tournamentsAction';
import MAppBar from '../Admin/Appbar/MAppBar';
import MyAppBar from '../Appbar/MyAppBar';
import { fetchSessionUser } from '../../../Redux/actions/SessionAction';
import Progress from '@customComponent/Progress';



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      // width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    // flexGrow: 1,
    // padding: theme.spacing(1),
    marginTop:'96px'
  },
}));

export default function MainLayout(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const {tournaments,fetchLoading:tournamentLoading} = useSelector(state=>state.tournaments)
  const {user,fetching:userFetching} = useSelector(state=> state.session)

  const dispatch = useDispatch();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;


  useEffect(() => {
    if(Object.entries(tournaments).length == 0){
      dispatch(fetchAllTournaments())
    }
    if(Object.entries(user).length == 0){
      dispatch(fetchSessionUser())
    }
  }, [])

  return (

    tournamentLoading || userFetching ? 
    
    <Progress />
    
    :


    <div className={classes.root}>
      <CssBaseline />
    <div>
      {/* <Appbar  
        drawerOpen={drawerOpen} 
        setDrawerOpen={setDrawerOpen} 
      /> */}
      <MyAppBar handleDrawerToggle={handleDrawerToggle} panel='user' />
      {/* <Navbar /> */}
     </div>
      
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={drawerOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        {/* <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden> */}
      </nav>
      <main className={classes.content}>
        {props.children}
      </main>
    </div>
  );
}

