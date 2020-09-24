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
    [theme.breakpoints.down('xs')]:{
      padding:0
    }
  },
  cont:{
    display:'flex',
    alignItems:'center',
    [theme.breakpoints.down('xs')]:{
      fontSize:'12px'
    }
  },
  btn:{
      padding:0
  },
  logo:{
    height:'25px',
    marginRight:'8px',
    
  },
  image:{
    height:'45px',
    marginRight:'8px',
    [theme.breakpoints.down('xs')]:{
      marginRight:0
    }
  },
  nof:{
    [theme.breakpoints.down('xs')]:{
      padding:10
    }
  }
}));



export default function SearchComp({searchurl,label,props}) {
  const classes = useStyles();

  const {id:tournament_id} = useSelector(state=>state.info.tournament)
  const dispatch = useDispatch();

  const [query, setquery] = useState('');

  const [state, setstate] = useState([])
  const [hideList, setHideList] = useState(true);
  const [focused, setFocused] = useState(false);



  useEffect(() => {
    let cancel;
    if (query != '') {
      axios({
        method: 'get',
        url: `${searchurl}?query=${query}`,
        cancelToken: new axios.CancelToken(c => cancel = c)
      })
        .then(response => {
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
    setHideList(false)
    
  }


  const handleAdd = (item)=>{
    console.log({item})
    setquery(item.name)
    props.onChange(item.id)
    setFocused(false)
  }

  useEffect(()=>{
    if(focused){
      setHideList(false)
    }else{
      setHideList(true)
    }
  },[focused])

  return (
    <div style={{position:'relative'}} >

      <Input 
        fullWidth 
        value={query} 
        onChange={handleChange} 
        onFocus={()=>setFocused(true)} 
        placeholder= { label == 'clubs' ? 'Search Clubs' : 'Search Players'}
      />


      <div className={clsx(classes.list,'list-group',{'d-none':hideList})} >
        {
           state.length > 0 ?

              state.map((item, index) => (

                    <div
                        key={index}
                        className={clsx('list-group-item list-group-item-action',classes.listContainer)}
                        style={{ cursor: 'pointer' }}
                    >
                      <div className={classes.cont}>

                        {
                          label == 'players'  && <img src={item.image} className={classes.image}/>
                        }

                        {
                          label == 'clubs' && <img src={item.logo} className={classes.logo}/>
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
              :

              <div
                  className={clsx('list-group-item list-group-item-action',classes.listContainer,classes.nof)}
                  
              >
                No Result Found.
              </div>

        }
      </div>


    </div>
  );
}
