import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


const useStyles = makeStyles((theme) => ({
  dialogPaper: {
      width: '350px',
      ['@media (max-width:480px)']: { 
          margin:'10px',
      },
  },
  tableContainer:{
    padding:'0 20px 20px'
  },
  formControl1: {
    '&.MuiInputBase-root':{
        fontSize:'unset'
    },
    minWidth: 195,
  },
  formControl2: {
      '&.MuiInputBase-root':{
          fontSize:'unset'
      },
      minWidth: 50,
  },
  textField:{ 
      width:'195px',
      '&.MuiInputBase-root':{
          fontSize:'14px'
      }
  },
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FixtureDialog({open,setOpen}) {
  const classes = useStyles();

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = ()=>{

  }

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        classes={{ paper: classes.dialogPaper }}
      >
        <DialogTitle id="alert-dialog-slide-title">Edit Fixture</DialogTitle>

        <DialogContent>

          <div className={classes.tableContainer}>

            <table className={classes.table}>

                    {
                        fields.map((item,index)=>(
                            <tr key={index}>
                                <td className={classes.td}>{item.field}</td>
                                <td>:</td>
             
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
                                
                        
                            </tr>
                        ))
                    }


            </table>
          </div>
          
        </DialogContent>

        <DialogActions>
          <Button variant='contained' size='small' onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button variant='contained' size='small' onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
