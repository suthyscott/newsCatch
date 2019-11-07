import React, {useEffect, useState} from 'react';
import axios from 'axios'
import './Landing.css'
import {Slide} from 'react-slideshow-image';
import Microlink from '@microlink/react';
import ReactPlayer from 'react-player';

const config = require('../../Config');

function Landing(){
    const [feed, setFeed] = useState([{urlToImage: 'hello world', title: 'live long and prosper'}, {urlToImage: 'hello world', title: 'live long and prosper'}, {urlToImage: 'hello world', title: 'live long and prosper'}])
    
    useEffect(() => {
        axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${config.apiKey}`)
        .then(res => setFeed(res.data.articles))
        .catch(err => console.log(err))
    }, [])

    console.log(feed[0].urlToImage)
    console.log(feed[1].url)
    console.log(feed[2])
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
                        <section className='landing-section'>
                            {feed[0].urlToImage ? (
                            <section className='landing-img' style={{backgroundImage: `url(${feed[0].urlToImage})`}}></section>
                            ) : (
                                <ReactPlayer
                                url={`${feed[0].url}`} />
                            )}
                            <div className='landing-headline-container'><span className='landing-headlines'>{feed[0].title}</span></div>
                        </section>

                        <section className='landing-section'>
                            {feed[1].urlToImage ? (
                            <section className='landing-img' style={{backgroundImage: `url(${feed[1].urlToImage})`}}></section>
                            ) : (
                                <ReactPlayer
                                url={`${feed[1].url}`} />
                            )}
                            <div className='landing-headline-container'><span className='landing-headlines'>{feed[1].title}</span></div>
                        </section>

                        <section className='landing-section'>
                            {feed[2].urlToImage ? (
                            <section className='landing-img' style={{backgroundImage: `url(${feed[2].urlToImage})`}}></section>
                            ) : (
                                <ReactPlayer
                                url={`${feed[2].url}`} />
                            )}
                            <div className='landing-headline-container'><span className='landing-headlines'>{feed[2].title}</span></div>
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