import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import AdminLayout from './Containers/Layouts/AdminLayout';
import MainLayout from './Containers/Layouts/MainLayout';
import {default  as AdminRoot} from './AdminComponents/Root';
import {default  as MainRoot} from './MainComponents/Root';
import Login from './Login'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>

                <Route path='/login' component={Login} />

                <Route path='/admin/:path?' exact>
                    <AdminLayout>
                        <Switch>
                            <Route path='/admin' exact component={AdminRoot} />
                            {/* <Route path='/admin/root' exact component={Dashboard} /> */}
                        </Switch>
                    </AdminLayout>
                </Route>
        
                <Route>
                    <MainLayout>
                        <Switch>
                            <Route path='/kk' exact component={MainRoot} />
                        </Switch>
                    </MainLayout>
                </Route>
            </Switch>
        
        </BrowserRouter>
    )
}
