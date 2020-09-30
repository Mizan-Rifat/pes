import React,{useEffect} from 'react';
import {BrowserRouter,Switch,Route, Redirect} from 'react-router-dom';
import AdminLayout from './Containers/Layouts/Admin/AdminLayout';
import MainLayout from './Containers/Layouts/Main/MainLayout';
import {default  as AdminRoot} from './AdminComponents/Root';

import Login from '@components/AuthComponent/Login';
import Registration from '@components/AuthComponent/Registration';

import Dashboard from '@components/AdminComponents/Dashboard';
import Tournament from '@components/AdminComponents/views/Tournaments/Tournament';
import MTournament from '@components/MainComponents/Tournament/MTournament';
import Test from './Test/Test';
import Users from '@components/AdminComponents/views/Users/Users';
import { SnackbarProvider } from 'notistack';
// import TournamentDashboard from './AdminComponents/views/Tournaments/TournamentDashboard';
import AllClubs from './AdminComponents/views/Clubs/AllClubs';
import AllTournaments from './AdminComponents/views/AllTournaments/AllTournaments';
import Club from './MainComponents/Club/Club';
import ResultDetails from './MainComponents/MatchDetails/ResultDetails';
import Result from './MainComponents/AddResult/Result';
import { createMuiTheme } from "@material-ui/core/styles";
import { makeStyles, ThemeProvider } from "@material-ui/styles";
import { purple,pink,red } from '@material-ui/core/colors';
import LandingPage from './MainComponents/Landing'
import Profile from './MainComponents/Profile/Profile';
import ApproveResult from './MainComponents/AddResult/ApproveResult';
import EditResult from './MainComponents/AddResult/EditResult';
import ErrorComp from './Errors/ErrorComp';
import SubmittedFixtures from './MainComponents/AddResult/SubmittedFixtures';
import {AuthProtectedRoute} from '@customComponent/AuthProtectedRoute'
import { GuestProtectedRoute } from './CustomComponent/GuestProtectedRoute';
import { useSelector, useDispatch } from 'react-redux';
import Progress from './CustomComponent/Progress';
import { fetchSessionUser } from './Redux/actions/SessionAction';
import AddResult from './MainComponents/AddResult/AddResult';
import UpdateResult from './MainComponents/AddResult/UpdateResult';
import { fetchGinfo } from './Redux/Ducks/GInfoDuck';
import { AdminProtectedRoute } from './CustomComponent/AdminProtecedRoute';



const useStyles = makeStyles((theme) => ({
    topClass: {
      top: '60px',
      ['@media (max-width:480px)']: { 
        top:0
    },
    },
  }));

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#0E1723',
      },
      secondary: {
        main: "#EF2743",
      },
      info:{
        main:'#454545'
      },
      success:{
        main:'#161731'
      },

      background:{
        main:'#FFD525'
      }
    },
  });


export default function Routes() {

    const classes = useStyles();

    const dispatch = useDispatch();
    const {gInfo,fetching} = useSelector(state=> state.gInfo)

      useEffect(() => {
          dispatch(fetchGinfo());
      }, [])

    

    return (

      
        fetching ? <Progress /> :
      
        <ThemeProvider theme={theme}>

         
            <BrowserRouter>


                <SnackbarProvider
                //   autoHideDuration={2000}
                  classes={{
                    anchorOriginTopRight: classes.topClass
                  }}

                >
                <Switch>

                    <GuestProtectedRoute path='/login' component={Login} />
                    {/* <Route path='/register' component={Registration} /> */}
                    <GuestProtectedRoute path='/register' component={Registration} />
                    <Route
                        path='/admin/login'
                        render={(props) => (
                          <Login {...props} panel='admin' />
                        )}
                      />


                    {/* <Provider store={adminStore}> */}
                        <Route path='/admin/:path1?/:path2?/:path3?/:path4?/:path5?/:path6?/:path7?/:path8?' exact>
                          <AdminProtectedRoute>
                            <AdminLayout>
                                <Switch>
                                    {/* <Route path='/admin' exact component={AdminRoot} /> */}
                                    <Route path='/admin/dashboard'  component={Dashboard} />
                                    {/* <Route path='/admin/tournaments'  component={TournamentDashboard} /> */}
                                    <Route path='/admin/tournament/:title'  component={Tournament} />
                                    <Route path='/admin/users'  component={Users} />
                                    <Route path='/admin/clubs'  component={AllClubs} />
                                    <Route path='/admin/alltournaments'  component={AllTournaments} />
                                    <Redirect from='/admin' to ='/admin/dashboard' />
                                
                                </Switch>
                            </AdminLayout>
                            </AdminProtectedRoute>
                        </Route>
                    {/* </Provider> */}
            
                    <Route>
                        <MainLayout>
                            <Switch>
                                <Route path='/' exact component={LandingPage} />
                                <Route path='/fixtures/submitted/:tournament_id' component={SubmittedFixtures} />
                                <Route path='/tournament/:title/:details' component={MTournament} />
                                <Route path='/club/:slug' component={Club} />
                                <Route path='/result/details/:match_id' component={ResultDetails} />
                                <Route path='/test' component={Test} />
                                {/* <Route path='/profile' component={Profile} /> */}
                                <AuthProtectedRoute path='/profile/:info' component={Profile}/>

                                <AuthProtectedRoute path='/result/add/:match_id' component={AddResult} panel='addresult' />
                                <AuthProtectedRoute path='/result/approve/:match_id' component={ApproveResult} panel='approveresult' />
                                <AuthProtectedRoute path='/result/update/:match_id' component={UpdateResult} panel='updateresult' />
                                {/* <Redirect from='/profile' to ='/profile' /> */}
                                <Route path='*' component={ErrorComp} />
                            </Switch>
                        </MainLayout>
                    </Route>
                </Switch>

                </SnackbarProvider>
            
            </BrowserRouter>
        </ThemeProvider>

      
    )
}
