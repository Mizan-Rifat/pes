import React, { useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Info from './Info/Info';
import { Paper, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Fixtures from './Fixtures/Fixtures';
import FixtureDetails from './Fixtures/FixtureDetails';
import Clubs from './Clubs/Clubs';
import Results from './Results/Result';
import Officials from './Officials/Officials';





const useStyles = makeStyles((theme) => ({
    paper:{
        boxShadow: "0 1px 4px 0 rgba(0,0,0, 0.14)",
    },
    heading: {
        background: '#EEEEEE',
        padding: '20px',
        fontSize: '16px',
    }

}))

export default function Main() {
    const classes = useStyles();
    const [title, setTitle] = useState('');
    return (

        <Paper variant="outlined" square className={classes.paper}>
            <div className={classes.heading}>
                <div style={{ fontWeight: 'bold' }}>{title}</div>
            </div>
            <div className="" style={{ padding: '20px' }}>
                <Switch>
                    <Route
                        path='/admin/tournament/:title/info'
                        render={(props) => (
                            <Info {...props} setTitle={setTitle} />
                        )}
                    />
                    <Route
                        path='/admin/tournament/:title/fixtures'
                        render={(props) => (
                            <Fixtures {...props} setTitle={setTitle} />
                        )}
                    />
                    <Route
                        path='/admin/tournament/:title/fixture/details/:id'
                        render={(props) => (
                            <FixtureDetails {...props} setTitle={setTitle} />
                        )}
                    />
                    <Route
                        path='/admin/tournament/:title/clubs'
                        render={(props) => (
                            <Clubs {...props} setTitle={setTitle} />
                        )}
                    />
                    <Route
                        path='/admin/tournament/:title/results'
                        render={(props) => (
                            <Results {...props} setTitle={setTitle} />
                        )}
                    />
                    <Route
                        path='/admin/tournament/:title/officials'
                        render={(props) => (
                            <Officials {...props} setTitle={setTitle} />
                        )}
                    />

                    <Redirect from='/admin/tournament/:title' to='/admin/tournament/:title/info' />
                </Switch> 
            </div>
        </Paper>

    )
}
