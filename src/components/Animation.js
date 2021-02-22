import React, {useState, useEffect} from 'react';
import Character from '../assets/funnyBar.png';
import '../animate.css';

function Animation() {

    const css = {
        animate: {

        }
    }

    const handleClick = () => {

    }

    return(
        <div className='Canvas'>
            <img className='box2' src={Character} width='100px' height='100px'/>

        </div>
    )
}

export default Animation;