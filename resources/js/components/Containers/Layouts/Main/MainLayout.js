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
import { fetchAllTournaments } from '../../../Redux/Ducks/TournamentsDuck';
import MyAppBar from '../Appbar/MyAppBar';
import { fetchSessionUser } from '../../../Redux/Ducks/SessionUserDuck';
import { receiveNotification } from '../../../Redux/Ducks/NotificationsDuck';
import Progress from '@customComponent/Progress';
import MyList from '../Admin/MyList';
import MainDrawer from './MainDrawer';



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
    background:theme.palette.primary.main
  },
  content: {
    marginTop:'96px',
    [theme.breakpoints.down('xs')]: {
      marginTop:'50px',
    },

  },
}));

export default function MainLayout(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const {tournaments,fetching:tournamentLoading} = useSelector(state=>state.tournaments)
  const {user,fetching:userFetching} = useSelector(state=> state.sessionUser)
 
  const dispatch = useDispatch();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawer = (
    <MainDrawer setDrawerOpen={setDrawerOpen}/>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  useEffect(() => {
    if(Object.entries(tournaments).length == 0){
      dispatch(fetchAllTournaments())
    }
    if(Object.entries(user).length == 0){
      dispatch(fetchSessionUser())
      .then(user=>{

        Echo.private(`App.User.${user.id}`)
        .notification((notification) => {
          console.log(notification);
          dispatch(receiveNotification(notification))
      });
      })
    }

    

  }, [])

  return (

    tournamentLoading || userFetching ? 
    
    <Progress />
    
    :


    <div className={classes.root}>
      <CssBaseline />
    <div>

      <MyAppBar handleDrawerToggle={handleDrawerToggle} panel='user' />
      
     </div>
      
      <nav className={classes.drawer} aria-label="mailbox folders">
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
      
      </nav>
      <main className={classes.content}>
        {props.children}
      </main>
    </div>
  );
}

