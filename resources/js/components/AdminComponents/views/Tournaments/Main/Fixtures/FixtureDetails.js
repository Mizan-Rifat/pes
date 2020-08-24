import React, { useState } from 'react';
import {MenuItem,FormControl,TextField,Select,makeStyles, Button,Input, Tooltip,IconButton} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import clsx from 'clsx';

const useStyles = makeStyles(theme=>({
    td:{
        padding:'15px',
        
    },
    tdedit:{
        padding:'0 15px',
        
    },

    formControl1: {
        margin: theme.spacing(1),
        '&.MuiInputBase-root':{
            fontSize:'unset'
        },
        minWidth: 195,
    },
    formControl2: {
        margin: theme.spacing(1),
        '&.MuiInputBase-root':{
            fontSize:'unset'
        },
        minWidth: 50,
    },
    textField:{ 
        margin: theme.spacing(1),
        width:'195px',
        '&.MuiInputBase-root':{
            fontSize:'14px'
        }
    },
    table:{
        marginLeft:'50px',
        ['@media (max-width:960px)']: { 
            marginLeft:'unset',
          }
    }
      
}));

export default function FixtureDetails() {
    const classes = useStyles();

    const [mode, setMode] = useState(false)

    const [fields, setfields] = useState([
        {
            field:'Team1',
            name:'team1',
            label:'FC RED RANGERS',
            value:1,
            options:[
                {
                    label:'Fc Red Rangers',
                    value:1
                },
                {
                    label:'Fc Barcelona',
                    value:2
                },
            ]
        },
        {
            field:'Team2',
            name:'team2',
            label:'FC BARCELONA',
            value:2,
            options:[
                {
                    label:'Fc Red Rangers',
                    value:1
                },
                {
                    label:'Fc Barcelona',
                    value:2
                },
            ]
        }, 
        {
            field:'Host',
            name:'host',
            label:'FC BARCELONA',
            value:2,
            options:[
                {
                    label:'Fc Red Rangers',
                    value:1
                },
                {
                    label:'Fc Barcelona',
                    value:2
                },
            ]
        }, 
        {
            field:'Date',
            name:'date',
            label:'Not Set',
            value:null,
            options:[]
        }, 
        {
            field:'Group',
            name:'group',
            label:'Not Set',
            value:null,
            options:[
                {
                    label:'A',
                    value:1
                },
                {
                    label:'B',
                    value:2
                },
            ]
        }, 
        {
            field:'Round',
            name:'round',
            label:1,
            value:1,
            options:[
                {
                    label:1,
                    value:1
                },
                {
                    label:2,
                    value:2
                },
            ]
        }, 
        {
            field:'Leg',
            name:'leg',
            label:1,
            value:1,
            options:[
                {
                    label:1,
                    value:1
                },
                {
                    label:2,
                    value:2
                },
            ]
        },
    
    ])

    const [fixture, setFixture] = useState({
        "id": 1,
        "team1_details": {
            "id": 1,
            "name": "FC RED RANGERS",
            "slug": "fcredrangers",
            "logo": "fcb.png"
            },
        "team2_details": {
            "id": 10,
            "name": "REAL BETIS",
            "slug": "realbetis",
            "logo": "fcb.png"
            },
        "date": null,
        "host_details": {
            "id": 1,
            "name": "FC RED RANGERS",
            "slug": "fcredrangers",
            "logo": "fcb.png"
            },
        "tournament_id": 1,
        "group": null,
        "round": 1,
        "leg": 1,
        "completed": 1        
    })

    const handleChange = (e)=>{
        console.log(e.target.value)
        console.log(e.target.name)
    }
    
    return (
        <div>
            <div className='text-right'>
                <Tooltip title='Edit'>
                    <IconButton aria-label="edit" className={classes.margin} onClick={()=>setMode(!mode)}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            </div>
            
            <table className={classes.table}>

                {
                    fields.map((item,index)=>(
                        <tr key={index}>
                            <td className={classes.td}>{item.field}</td>
                            <td>:</td>
                            {
                                mode ? 

                                    <td className={classes.tdedit}>
                                        {
                                            item.name === 'date' ?
                                            
                                            <Input
                                                type="datetime-local"
                                                defaultValue="2017-05-24T10:30"
                                                className={classes.textField}
                                                name='date'
                                                onChange={handleChange}
                                                InputLabelProps={{
                                                shrink: true,
                                                }}
                                                style={{fontSize:'14px'}}
                                            />

                                            :
                                        
                                            <FormControl>
                                                    <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={item.value}
                                                    name={item.name}
                                                    onChange={handleChange}
                                                    className={ index > 3 ? classes.formControl2 : classes.formControl1}
                                                    >
                                                        {
                                                            item.options.map((option,index)=>(
                                                                <MenuItem value={option.value}>{option.label}</MenuItem>
                                                            ))
                                                        }
                                                    </Select>
                                            </FormControl>
                                        }
                                    </td>
                                :
                                <td className={classes.td}>{item.label}</td>
                            }
                    
                        </tr>
                    ))
                }
                
               
            </table>
            <div className='text-center mt-3'>
                {
                    mode &&
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            className={classes.button}
                            startIcon={<SaveIcon />}
                        >
                            Save
                        </Button>
                }
            </div>
            
        </div>
    )
}
