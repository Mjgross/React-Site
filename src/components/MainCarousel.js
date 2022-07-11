import React, { useState} from "react"
import {Carousel } from 'react-daisyui'

export default function MainCarousel({products}) {
    const [isLoaded, setisLoaded] = useState(products.length ? true : false);
    console.log(products);
    if (!products ){
        return 'Loading';
    }
    
    if (products && products.length){
        console.log(isLoaded);
        console.log("LOADED OKAY");
    }
    return (
        <Carousel snap="center" display="sequential" className="h-96 w-64 rounded-box">
            {isLoaded ? (products.map((product) =>
            <Carousel.Item 
            src={product.images.split(",")[0]} 
            alt="hi" 
            key={product.id} 

            />
        )) : null }
        </Carousel>
        )
    
}