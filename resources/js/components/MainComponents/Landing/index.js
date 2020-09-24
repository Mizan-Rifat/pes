import React,{useState} from 'react'
import MCarousel from '@customComponent/Carousel/MCarousel';


export default function index() {
    const [caroselItems, setcaroselItems] = useState([
        {
            image:'/images/slides/slide1.jpg',
        },
        {
            image:'/images/slides/slide2.jpg',
        },
        {
            image:'/images/slides/slide3.jpg',
        },
    ])
    return (
        <div>
            <MCarousel
                indicators={false}
                items={caroselItems}
            />
        </div>
    )
}
