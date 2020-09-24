import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme)=>({
    image:{
        height:'100vh',
        width:'100%'
    },
    wrapper:{
        height:'100vh',
        backgroundSize:'contain'
    },
    img:{
        width: '100%',
        height: '100vh',
    }
}))
export default function CarouselItem(props) {

    
    const [images, setImages] = useState([
        {
            image:'http://127.0.0.1:8000/images/slides/slide1.jpg',
        },
        {
            image:'http://127.0.0.1:8000/images/slides/slide2.jpg',
        },
        {
            image:'http://127.0.0.1:8000/images/slides/slide3.jpg',
        },
    ])
    
    return (
        <div className={classes.wrapper} style={{background:`url(${src})`}} />
    )
}

