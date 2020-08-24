import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { makeStyles, CircularProgress } from '@material-ui/core';
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
  progress:{
    // color:
    position:'absolute'
  }
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FixtureDialog(props) {

  const {open,setOpen,title,content,btnText,handleSubmit} = props
  const {loading = false} = props;
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOk = ()=>{

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
        <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>

        <DialogContent>

          
            {content}
          
        </DialogContent>

        <DialogActions>
          <Button variant='contained' size='small' onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button variant='contained' size='small' onClick={handleSubmit} color="primary" disabled={loading}>
            {btnText}
            {
              loading && <CircularProgress size={24} className={classes.progress} />
            }
            
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
