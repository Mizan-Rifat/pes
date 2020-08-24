import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Input, IconButton } from '@material-ui/core';
import clsx from 'clsx';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useSelector, useDispatch } from 'react-redux';
import Officials from './Officials';
import { offcialsAdded } from '@actions/officialsAction';


const useStyles = makeStyles(theme => ({

  list: {
    position: 'absolute',
    top: '35px',
    zIndex: 10,
    width: '100%'
  },
  btn:{
      padding:0
  }
}));



export default function UserSearch({props}) {
  const classes = useStyles();

  const {id:tournament_id} = useSelector(state=>state.info.tournament)
  const dispatch = useDispatch();

  const [query, setquery] = useState('');

  const [users, setusers] = useState([])



  useEffect(() => {
    let cancel;
    if (query != '') {
      axios({
        method: 'get',
        url: `/api/users/search?query=${query}`,
        cancelToken: new axios.CancelToken(c => cancel = c)
      })
        .then(response => {
          console.log(response);
          setusers(response.data.data)
        })
        .catch(e => {
          if (axios.isCancel(e)) return
        })

      return () => cancel();
    } else {
        setusers([]);
    }
  }, [query])


  const handleChange = (e) =>{
    setquery(e.target.value)
    
  }


  const handleAdd = (user)=>{

    setquery(user.name)
    props.onChange(user.id)

  }

  useEffect(()=>{
    console.log({props})
  },[])



  return (
    <div style={{position:'relative'}} >

     

      <Input fullWidth value={query} onChange={handleChange} />


      <div className={clsx(classes.list,'list-group')} >
        {
          users.map((user, index) => (

                <div
                    className='list-group-item list-group-item-action justify-content-between d-flex'
                    style={{ cursor: 'pointer' }}
                >
                    <div>{user.name}</div>

                    <IconButton 
                        className={classes.btn}
                        onClick={()=>handleAdd(user)}
                    >
                        <AddCircleIcon />
                    </IconButton>
                    
                </div>
          ))
        }
      </div>


    </div>
  );
}
