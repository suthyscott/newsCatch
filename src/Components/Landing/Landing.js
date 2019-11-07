import React, {useEffect, useState} from 'react';
import axios from 'axios'
import './Landing.css'
import {Slide} from 'react-slideshow-image';
import Microlink from '@microlink/react';

const config = require('../../Config');

function Landing(){
    const [feed, setFeed] = useState([{urlToImage: 'hello world', title: 'live long and prosper'}, {urlToImage: 'hello world', title: 'live long and prosper'}, {urlToImage: 'hello world', title: 'live long and prosper'}])
    
    useEffect(() => {
        axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${config.apiKey}`)
        .then(res => setFeed(res.data.articles))
        .catch(err => console.log(err))
    }, [])

    console.log(feed[0].urlToImage)
    console.log(feed[1].urlToImage)
    console.log(feed[2].urlToImage)
    const slideImages = [
        `${feed[0].urlToImage}`, 
        `${feed[1].urlToImage}`,
        `${feed[2].urlToImage}`
    ]

    const properties = {
        duration: 5000,
        transitionDuration: 500,
        infinite: true,
        indicators: true,
        arrows: true
    }

    console.log(slideImages[0])
    console.log(slideImages[1])
    console.log(slideImages[2])

    const slideShow = () => {
        return (
            <body className='landing-body'>
                <section className='slider'>
                    <Slide {...properties}>
                            <section className='landing-img' style={{backgroundImage: `url(${slideImages[0]})`}}>
                                <span>{feed[0].title}</span>
                            </section>
                        <section>
                            <section className='landing-img' style={{backgroundImage: `url(${slideImages[1]})`}}><span>{feed[1].title}</span></section>
                        </section>
                        <section>
                            <section className='landing-img' style={{backgroundImage: `url(${slideImages[2]})`}}><span>{feed[2].title}</span></section>
                        </section>
                    </Slide>
                </section>
                {/* <section>
                    <section>
                        <p>headlines</p>
                    </section>
                </section> */}
            </body>
        )
    }




    
    return(
        slideShow()
    )
}

export default Landing