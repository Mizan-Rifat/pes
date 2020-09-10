import React,{useState} from 'react'
import { Grid,makeStyles } from '@material-ui/core'
import MLightBox from '../../CustomComponent/MLightBox';


const useStyles = makeStyles(theme=>({
    container:{
        margin:'20px 0'
    },
    gridContainer:{
        border:'1px solid rgba(0,0,0,.3)',
        margin:'unset'
    },
    img:{
        height:'100px',
        width:'170px',
    },
    title:{
        fontWeight:700,
        marginBottom:'5px'
    }
}))


export default function ImageBox({title,images}) {

    const classes  = useStyles();

    const [lightBox, setLightBox] = useState({
            open:false,
            images:[],
            selectedindex:''
          });
    const handleLightBox = (images,index) => {
        setLightBox({
            open:true,
            images,
            selectedindex:index
        })
    }

    return (
        <div className={classes.container}>
            <div className={classes.title}>{title}</div>
            <Grid container spacing={3} className={classes.gridContainer}>

                {
                    images.map((image,index)=>(
                        <Grid item xs={6} sm={4} md={2}>
                            <img src={image} className={classes.img} onClick={()=>handleLightBox(images,index)} />
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
