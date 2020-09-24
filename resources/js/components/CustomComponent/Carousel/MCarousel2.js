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
        backgroundSize:'contain !important',
        backgroundRepeat:'no-repeat !important'
    },
    img:{
        width: '100%',
        height: 'auto',
    }
}))
export default function MCarousel(props) {

    const {autoPlay,indicators = false} = props;
    const {items} = props;
    
    return (
        <Carousel
            autoPlay={false}
            indicators={indicators}
        >
            {
                items.map((item,index)=><CarouselItem src={item.image} /> )
            }
        </Carousel>
    )
}

function CarouselItem({src}){
    const classes = useStyles();
    return(
        // <div className={classes.wrapper} style={{background:`url(${src})`}} />
            <img src={src} className={classes.img} /> 
        // {/* // </div> */}
    )
}
