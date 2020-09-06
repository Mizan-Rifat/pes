import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Input, IconButton } from '@material-ui/core';
import clsx from 'clsx';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useSelector, useDispatch } from 'react-redux';
import { contains } from 'jquery';



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
    height:'30px',
    marginRight:'8px'
  },
  formControl: {
    '&.MuiInputBase-root':{
        // fontSize:'unset'
    },
},
}));



export default function SearchComp2({handleChange}) {
  const classes = useStyles();

  const searchurl = '/api/clubmodel/search'

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


  const handleQueryChange = (e) =>{
    setquery(e.target.value)
    
    
  }


  const handleAdd = (item)=>{

    setquery(item.name)
    console.log({item})
    handleChange('club_model',item.name)
    handleChange('model_id',item.id)
    
    setstate([])

  }

  



  return (
    <div style={{position:'relative'}} >

      <Input value={query} onChange={handleQueryChange} className={classes.formControl} placeholder='Search'/>


      <div className={clsx(classes.list,'list-group')} >
        {
          state.map((item, index) => (

                <div
                    key={index}
                    className={clsx('list-group-item list-group-item-action',classes.listContainer)}
                    style={{ cursor: 'pointer' }}
                >
                  <div className={classes.cont}>

                    <img src={item.logo} className={classes.image}/>
                   
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
