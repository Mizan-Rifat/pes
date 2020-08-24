import React,{useState} from 'react';
import Mtable from '@customComponent/Mtable'
import { Team1 } from '@customComponent/Team';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    table: {
      '& tbody>.MuiTableRow-root:hover': {
        background: '#E6E7E9',
      }
    },
  }));


export default function Standings() {
    const classes = useStyles();
    const [columns, setcolumns] = useState([
        {
            title:'#',
            field: 'tableData.id',
            render:rowData=> rowData.tableData.id + 1
        },
        {
            title:'CLUBS',
            field:'clubName',
            render:rowData => <Team1 logo={rowData.clubLogo} name={rowData.clubName} panel='admin' />,
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
            field:'gs',
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

    const [pointsTable, setpointsTable] = useState([
        {
        "clubName": "REAL BETIS",
        "clubLogo": "fcb.png",
        "played": 2,
        "win": 1,
        "draw": 1,
        "lose": 0,
        "gs": 1,
        "ga": 2,
        "gd": -1,
        "points": 4
        },
        {
        "clubName": "FC RED RANGERS",
        "clubLogo": "fcb.png",
        "played": 2,
        "win": 1,
        "draw": 1,
        "lose": 0,
        "gs": 2,
        "ga": 5,
        "gd": -3,
        "points": 4
        },
        {
        "clubName": "LEVANTE",
        "clubLogo": "mu.png",
        "played": 2,
        "win": 1,
        "draw": 1,
        "lose": 0,
        "gs": 0,
        "ga": 5,
        "gd": -5,
        "points": 4
        },
        {
        "clubName": "Athletic Bilbao",
        "clubLogo": "rm.png",
        "played": 2,
        "win": 1,
        "draw": 0,
        "lose": 1,
        "gs": 2,
        "ga": 4,
        "gd": -2,
        "points": 3
        },
        {
        "clubName": "Valencia",
        "clubLogo": "fcb.png",
        "played": 2,
        "win": 0,
        "draw": 1,
        "lose": 1,
        "gs": 3,
        "ga": 2,
        "gd": 1,
        "points": 1
        },
        {
        "clubName": "FC BARCELONA",
        "clubLogo": "fcb.png",
        "played": 2,
        "win": 0,
        "draw": 1,
        "lose": 1,
        "gs": 0,
        "ga": 0,
        "gd": 0,
        "points": 1
        },
        {
        "clubName": "REAL MADRID",
        "clubLogo": "rm.png",
        "played": 2,
        "win": 0,
        "draw": 1,
        "lose": 1,
        "gs": 3,
        "ga": 6,
        "gd": -3,
        "points": 1
        },
        {
        "clubName": "Atletico Madrid",
        "clubLogo": "mu.png",
        "played": 2,
        "win": 0,
        "draw": 0,
        "lose": 2,
        "gs": 1,
        "ga": 3,
        "gd": -2,
        "points": 0
        },
        {
        "clubName": "VILLAREAL",
        "clubLogo": "rm.png",
        "played": 2,
        "win": 0,
        "draw": 0,
        "lose": 2,
        "gs": 0,
        "ga": 3,
        "gd": -3,
        "points": 0
        },
        {
        "clubName": "SEVILLA",
        "clubLogo": "fcb.png",
        "played": 2,
        "win": 0,
        "draw": 0,
        "lose": 2,
        "gs": 0,
        "ga": 6,
        "gd": -6,
        "points": 0
        }
        ])


    return (
        <div className={classes.table}>
            <Mtable
                
                columns={columns}
                data={pointsTable}
                editable={false}
                search={false}
                sorting={false}
                
            />
        </div>
    )
}
