import React,{useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme=>({
  root:{
    minWidth:'600px'
  }
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialog(props) {

  const classes = useStyles();

  const {type,handleOk,open,setOpen} = props

  const [dialogText, setDialogText] = useState('')
  const [btnText, setBtnText] = useState('')

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  useEffect(() => {
    switch (type) {
      case 'deleteAll':
        setDialogText('The following operation will delete all selected data.')
        setBtnText('Delete')
        break;
      case 'delete':
        setDialogText('The following operation will delete the data.')
        setBtnText('Delete')
        break;
      case 'blockAll':
        setDialogText('The following operation will block/unblock all selected users.')
        setBtnText('Block')
          break;
      case 'block':
        setDialogText('The following operation will block/unblock the user.')
        setBtnText('Block')
        break;
      case 'save':
        setDialogText('The following operation will save the data')
        setBtnText('Save')
        break;
    
      default:
        break;
    }
  }, [])
 

  return (

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        className={classes.root}
      >
        <DialogTitle id="alert-dialog-slide-title">Are You Sure?</DialogTitle>
        <DialogContent>

          {/* <DialogContentText id="alert-dialog-slide-description">
            {dialogText}
          </DialogContentText>
        */}
        </DialogContent> 
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button 
            variant='contained'
            color={type === 'save' ? 'primary' : 'secondary'}
            onClick={handleOk}
            >
                {btnText}
          </Button>
        </DialogActions>
      </Dialog>
  
  );
}

