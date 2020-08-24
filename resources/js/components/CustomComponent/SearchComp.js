import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Input, IconButton } from '@material-ui/core';
import clsx from 'clsx';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useSelector, useDispatch } from 'react-redux';



const useStyles = makeStyles(theme => ({

  list: {
    position: 'absolute',
    top: '35px',
    zIndex: 10,
    width: '100%'
  },
  listContainer:{
    display:'flex',
    justifyContent:'space-between',
    height:'50px',
  },
  cont:{
    display:'flex',
    alignItems:'center'
  },
  btn:{
      padding:0
  },
  logo:{
    height:'25px',
    marginRight:'8px'
  },
  image:{
    height:'45px',
    marginRight:'8px'
  }
}));



export default function SearchComp({searchurl,label,props}) {
  const classes = useStyles();

  const {id:tournament_id} = useSelector(state=>state.info.tournament)
  const dispatch = useDispatch();

  const [query, setquery] = useState('');

  const [state, setstate] = useState([])



  useEffect(() => {
    let cancel;
    if (query != '') {
      axios({
        method: 'get',
        url: `${searchurl}?query=${query}`,
        cancelToken: new axios.CancelToken(c => cancel = c)
      })
        .then(response => {
          console.log(response);
          setstate(response.data.data)
        })
        .catch(e => {
          if (axios.isCancel(e)) return
        })

      return () => cancel();
    } else {
        setstate([]);
    }
  }, [query])


  const handleChange = (e) =>{
    setquery(e.target.value)
    
  }


  const handleAdd = (item)=>{

    setquery(item.name)
    props.onChange(item.id)

  }

  useEffect(()=>{
    console.log({props})
  },[])



  return (
    <div style={{position:'relative'}} >

      <Input fullWidth value={query} onChange={handleChange} />


      <div className={clsx(classes.list,'list-group')} >
        {
          state.map((item, index) => (

                <div
                    key={index}
                    className={clsx('list-group-item list-group-item-action',classes.listContainer)}
                    style={{ cursor: 'pointer' }}
                >
                  <div className={classes.cont}>

                    {
                      label == 'players'  && <img src={`http://127.0.0.1:8000/images/players/${item.model_id}.png`} className={classes.image}/>
                    }

                    {
                      label == 'clubs' && <img src={`http://127.0.0.1:8000/images/logo/${item.logo}`} className={classes.logo}/>
                    }

                    <div>{item.name}</div>
                  </div>
                  
                    <IconButton 
                        className={classes.btn}
                        onClick={()=>handleAdd(item)}
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
