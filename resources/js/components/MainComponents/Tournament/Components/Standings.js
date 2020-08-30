import React,{useState, useEffect} from 'react';
import Mtable from '@customComponent/Mtable'
import { Team1 } from '@customComponent/Team';
import {makeStyles} from '@material-ui/core';
import { useSelector,useDispatch } from 'react-redux';
import { fetchStandings } from '../../../Redux/actions/standingsActions';


const useStyles = makeStyles(theme => ({
    table: {
    //   '& tbody>.MuiTableRow-root:hover': {
    //     background: '#E6E7E9',
    //   }
    },
  }));


export default function Standings() {
    const classes = useStyles();

    const {id:tournament_id} = useSelector(state=>state.info.tournament)
    const {standings,loading} = useSelector(state=>state.standings)
    const dispatch = useDispatch()

    const [columns, setcolumns] = useState([
        {
            title:'#',
            field: 'tableData.id',
            render:rowData=> {
                return rowData.tableData.id + 1
            },
            width:'50px',
        },
        {
            title:'CLUBS',
            field:'clubName',
            render:rowData => <Team1 logo={rowData.club.logo} name={rowData.club.name} panel='admin' />,
            cellStyle:{
                width:'50%'
            }
        },
        {
            title:'P',
            field:'played',
        },
        {
            title:'W',
            field:'win',
        },
        {
            title:'D',
            field:'draw',
        },
        {
            title:'L',
            field:'lose',
        },
        {
            title:'GS',
            field:'gs',
        },
        {
            title:'GA',
            field:'ga',
        },
        {
            title:'GD',
            field:'gd',
        },
        {
            title:'PTS',
            field:'points',
        },
    ])

    useEffect(()=>{
        if(standings.length === 0){
            dispatch(fetchStandings(tournament_id))
        }
    },[])

    return (
        <div className={classes.table}>
            <Mtable
                
                columns={columns}
                data={standings}
                editable={false}
                search={false}
                sorting={false}
                loading={loading}
                hoverable={true}
                
            />
        </div>
    )
}
