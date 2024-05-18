import React from 'react';
import 'react-slideshow-image/dist/styles.css'

import {Fade} from 'react-slideshow-image'

const slideImages=[
    {
    url:"/images/cb1.png"
    },
    {
    url:"/images/cb2.png"
    },
    {
    url:"/images/cb3.png"
    },
    
];
const divstyle={
    display:'flex',
    alignItems:"center",
    justifyContent:"center",
    height:"545px",
    width:"1520px",
    backgroundSize:"cover"
}
const Carousal = () => {
  return (
    <div className='slide-container'>
      <Fade>
        {slideImages.map((image,index)=>(
            <div key={index}>
            <div style={{...divstyle,backgroundImage:`url(${image.url})`}}>

            </div>
            </div>
        ))}
      </Fade>
    </div>
  )
}

export default Carousal
