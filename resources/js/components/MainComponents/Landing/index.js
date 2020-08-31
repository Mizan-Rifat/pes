import React,{useState} from 'react'
import MCarousel2 from '@customComponent/Carousel/MCarousel2';


export default function index() {
    const [caroselItems, setcaroselItems] = useState([
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
        <div>
            <MCarousel2 
                indicators={false}
                items={caroselItems}
            />
        </div>
    )
}
