import React,{useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Sidebar from './Sidebar';
import clsx from 'clsx';
import SideBarImage from '@assets/img/sidebar-2.jpg';
import {useSelector,useDispatch} from 'react-redux';
import { fetchAllTournaments } from '@actions/tournamentsAction';
import MAppBar from './Appbar/MAppBar';
import MyAppBar from '../Appbar/MyAppBar';
import { fetchSessionAdmin } from '../../../Redux/actions/SessionAction';
import Progress from '@customComponent/Progress';


export const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
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
    backgroundColor:theme.palette.primary.main
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
  },
}));

function AdminLayout(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);


  const {tournaments,fetchLoading:tournamentLoading} = useSelector(state=>state.tournaments)
  const {admin,loading:adminLoading} = useSelector(state=> state.session)



  const dispatch = useDispatch();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  const container = window !== undefined ? () => window().document.body : undefined;

  useEffect(() => {
    if(Object.entries(tournaments).length == 0){
      dispatch(fetchAllTournaments())
    }
    if(Object.entries(admin).length == 0){
      dispatch(fetchSessionAdmin())
    }

  }, [])

  return (
    tournamentLoading || adminLoading ? 
    
    <Progress />
    
    :

    <div className={classes.root}>

      <CssBaseline />

      <MyAppBar 
        handleDrawerToggle={handleDrawerToggle}
        panel='admin'  
      />

      <nav className={classes.drawer} aria-label="mailbox folders">

          <Hidden smUp implementation="css">

            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, 
              }}
            >
              <Sidebar />

            </Drawer>

          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              <Sidebar />
            </Drawer>
          </Hidden>
      </nav>


      <main className={classes.content}>
        <div className={classes.toolbar} />
          
        {props.children}

      </main>
    </div>
  );
}


export default AdminLayout;