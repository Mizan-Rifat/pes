import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme)=>({
    image:{
        height:300,
        width:'100%'
    },
    wrapper:{
        height:'50vh'
    },
    img:{
        width: '100%',
        height: 400,
    }
}))
export default function MCarousel() {
    const classes = useStyles();

    const [items, setItems] = useState([
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
        <Carousel
            autoPlay={false}
            indicators={false}
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
