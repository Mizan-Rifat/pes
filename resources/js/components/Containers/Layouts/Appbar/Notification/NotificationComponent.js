import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    
    msg:{
      flexGrow:1,
    },
  }));

export function ResultSubmitted({data}) {

    const  {tournament,team1,team2,fixture_id} = data;

    const classes = useStyles();
    return (
        <div className={classes.msg}>
            <b>{tournament} Result Submitted</b>
            <div>
                {team1} VS {team2} result has been submitted to approve.
                <Link to={`/result/approve/${fixture_id}`}>Approve Result</Link>
            </div>
            
        </div>
    )
}
export function ResultRejected({data}) {

    const  {tournament,team1,team2,fixture_id} = data;

    const classes = useStyles();
    return (
        <div className={classes.msg}>
            <b>{tournament} Result Rejected.</b>
            <div>
                {team1} VS {team2} result has been rejected for wrong information.
                <Link to={`/result/add/${fixture_id}`}>Update Result</Link>
            </div>
            
        </div>
    )
}

export function ResultApproved({data}) {

    const  {tournament,team1,team2,fixture_id,official} = data;

    const classes = useStyles();
    return (
        <div className={classes.msg}>
            <b>{tournament} Result Approved</b>
            <div>
                {team1} VS {team2} result has been approved by {official}.
                <Link to={`/result/details/${fixture_id}`}>View Result Details</Link>
            </div>
          
            
        </div>
    )
}
export function Welcome() {

    const classes = useStyles();
    return (
        <div className={classes.msg}>
            <b>Welcome to PesTournament.</b>
            <div>
                You should create a club first.
                <Link to='/profile/clubinfo'>Create club</Link>
            </div>
            
        </div>
    )
}
export function UserRegistered({data}) {

    const classes = useStyles();
    return (
        <div className={classes.msg}>
            <b>New User Registered.</b>
            <div>
                user_id : {data.user_id}
            </div>
            
        </div>
    )
}
export function AddedInTournament({data}) {

    const {tournament,club} = data;

    const classes = useStyles();
    return (
        <div className={classes.msg}>
            <b>Congratulations!</b>
            <div>
                Your club {club} has been added to {tournament}. 
            </div>
          
            
        </div>
    )
}
export function AddedAsOfficial({data}) {

    const {tournament} = data;

    const classes = useStyles();
    return (
        <div className={classes.msg}>
            <b>Congratulations!</b>
            <div>
                You are selected as an official of  {tournament}. 
            </div>
          
            
        </div>
    )
}
export function FixturesCreated({data}) {

    const {tournament,slug} = data;

    const classes = useStyles();
    return (
        <div className={classes.msg}>
            <b>Fixtures Confirmed.</b>
            <div>
                {tournament} fixtures has been confirmed.
                Find out your <Link to={`/tournament/${slug}/fixtures`}>matches</Link> 
            </div>
          
            
        </div>
    )
}