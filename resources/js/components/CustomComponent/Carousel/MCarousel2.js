import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme)=>({
    image:{
        height:'100vh',
        width:'100%'
    },
    wrapper:{
        height:'100vh'
    },
    img:{
        width: '100%',
        height: '100vh',
    }
}))
export default function MCarousel(props) {

    const {autoPlay,indicators = true} = props;
    const {items} = props;
    
    return (
        <Carousel
            autoPlay={autoPlay}
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
        // <div className={classes.wrapper} style={{backgroundImage:`url(${src})`}}>
            <img src={src} className={classes.img} />
        // </div>
    )
}
