import React from 'react';
import {BrowserRouter,Switch,Route, Redirect} from 'react-router-dom';
import AdminLayout from './Containers/Layouts/Admin/AdminLayout';
import MainLayout from './Containers/Layouts/Main/MainLayout';
import {default  as AdminRoot} from './AdminComponents/Root';
import Login from './Login';
import Dashboard from '@components/AdminComponents/Dashboard';
import Tournament from '@components/AdminComponents/views/Tournaments/Tournament';
import MTournament from '@components/MainComponents/Tournament/MTournament';
import Test from '../components/Test/Test';
import Users from '@components/AdminComponents/views/Users/Users';
import { SnackbarProvider } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';
import TournamentDashboard from './AdminComponents/views/Tournaments/TournamentDashboard';
import AllClubs from './AdminComponents/views/Clubs/AllClubs';
import AllTournaments from './AdminComponents/views/AllTournaments/AllTournaments';
import Club from './MainComponents/Club/Club';
import ResultDetails from './MainComponents/MatchDetails/ResultDetails';
import AddResult from './MainComponents/AddResult/AddResult';

const useStyles = makeStyles((theme) => ({
    topClass: {
      top: '60px',
      ['@media (max-width:480px)']: { 
        top:0
    },
    },
  }));

export default function Routes() {

    const classes = useStyles();

    return (
        <BrowserRouter>


            <SnackbarProvider
            //   autoHideDuration={2000}
              classes={{
                anchorOriginTopRight: classes.topClass
              }}

            >
            <Switch>

                <Route path='/login' component={Login} />


                {/* <Provider store={adminStore}> */}
                    <Route path='/admin/:path1?/:path2?/:path3?/:path4?/:path5?/:path6?/:path7?/:path8?' exact>
                        <AdminLayout>
                            <Switch>
                                <Route path='/admin' exact component={AdminRoot} />
                                <Route path='/admin/dashboard'  component={Dashboard} />
                                <Route path='/admin/tournaments'  component={TournamentDashboard} />
                                <Route path='/admin/tournament/:title'  component={Tournament} />
                                <Route path='/admin/users'  component={Users} />
                                <Route path='/admin/clubs'  component={AllClubs} />
                                <Route path='/admin/alltournaments'  component={AllTournaments} />
                            
                            </Switch>
                        </AdminLayout>
                    </Route>
                {/* </Provider> */}
        
                <Route>
                    <MainLayout>
                        <Switch>
                            <Route path='/tournament/:title/:details' component={MTournament} />
                            <Route path='/club/:slug' component={Club} />
                            <Route path='/resultdetails/:match_id' component={ResultDetails} />
                            <Route path='/addresult/:match_id' component={AddResult} />
                            <Route path='/test' component={Test} />
                            
                        </Switch>
                    </MainLayout>
                </Route>
            </Switch>

            </SnackbarProvider>
        
        </BrowserRouter>
    )
}
