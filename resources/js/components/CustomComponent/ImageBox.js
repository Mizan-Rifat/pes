import React,{useState} from 'react'
import { Grid,makeStyles, Badge, Tooltip } from '@material-ui/core'
import MLightBox from './MLightBox';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import Notify from '@customComponent/Notify';
import { deleteImage } from '../Redux/Ducks/MatchImagesDuck';

const useStyles = makeStyles(theme=>({
    container:{
        margin:'20px 0'
    },
    gridContainer:{
        border:'1px solid rgba(0,0,0,.3)',
        margin:'unset',

    },
    item:{
        position:'relative',
        height:'100px',
        width:'170px',
    },
    img:{
        height:'100%',
        width:'100%',
    },
    title:{
        fontWeight:700,
        marginBottom:'5px'
    },
    badge:{
        cursor:'pointer',
        background: 'red',
        height: '20px',
        width: '20px',
        borderRadius: '50%',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        position:'absolute',
        top:'-10px',
        right:'-8px'
    },
    disable:{
        pointerEvents:'none',
        opacity:'.5'
    },
    toolTip:{
        display:'none'
    },
    gridItem:{
        [theme.breakpoints.down('xs')]:{
            padding:'3px !important'
        }
    }
}))


export default function ImageBox({title,images,updateMode}) {

    const classes  = useStyles();

    const dispatch = useDispatch();
    const [loading, setloading] = useState(false)

    const toast = Notify();
    const [lightBox, setLightBox] = useState({
            open:false,
            images:[],
            selectedindex:''
          });
    const handleLightBox = (images,index) => {
        setLightBox({
            open:true,
            images:images.map(item=>item.image),
            selectedindex:index
        })
    }

    const handleImageDelete = (id)=>{
        setloading(true)
        dispatch(deleteImage(id))
        .then(response=>{
            setloading(false)
            toast(response,'success')
        })
        .catch(error=>{
            setloading(false)
            Object.keys(error.errors).map(err=>{
                toast(error.errors[err],'error')
            })
        })
    }

    return (
        <div className={clsx(classes.container,{'formDisable':loading})}>
            <div className={classes.title}>{title}</div>
            <Grid container spacing={3} className={classes.gridContainer}>

                {
                    images.map((image,index)=>(
                        <Grid item xs={6} sm={4} md={2} className={classes.gridItem}>
                            
                            <div className={classes.item}>
                                <img src={image.image} className={classes.img} onClick={()=>handleLightBox(images,index)} />
                                {
                                    updateMode &&
                                
                                    <Tooltip title='Delete' >
                                        <div 
                                            className={clsx(classes.badge)} 
                                            onClick={()=>handleImageDelete(image.id)}
                                        >
                                            <div>X</div>
                                        </div>
                                    </Tooltip>
                                }
                            </div>
                        </Grid>
                    ))
                }
                {
                    images.length == 0 &&
                    <Grid item xs={12} style={{padding:5,textAlign:'center'}}>
                        <div className='font-weight-bold'>Nothing To Show</div>
                    </Grid>
                }
            </Grid>

            {
                lightBox.open && <MLightBox lightBox={lightBox} setLightBox={setLightBox} title={title}/>
            }

            
        </div>
    )
}
