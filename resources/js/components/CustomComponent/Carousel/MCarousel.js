import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

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
        height: '100vh',
    },
    img2:{
        height:'350px'
    }
}))
export default function MCarousel(props) {

    const {autoPlay,indicators,tournament = false} = props;
    const {items} = props;
    
    return (
        <Carousel
            autoPlay={autoPlay}
            indicators={indicators}
        >
            {
                items.map((item,index)=><CarouselItem key={index} src={item.image} tournament={tournament} /> )
            }
        </Carousel>
    )
}

function CarouselItem({src,tournament}){
    const classes = useStyles();
    return(
            <img src={src} className={clsx(classes.img,{[classes.img2]:tournament})} /> 
    )
}
