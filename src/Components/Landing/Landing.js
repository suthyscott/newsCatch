import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './Landing.css';
import {Slide} from 'react-slideshow-image';
import ReactPlayer from 'react-player';
import {withRouter} from 'react-router-dom'

const config = require('../../Config');

function Landing(props){
    const [feed, setFeed] = useState([{urlToImage: 'hello world', title: 'live long and prosper', url: 'star trek'}, {urlToImage: 'hello world', title: 'live long and prosper', url: 'star trek'}, {urlToImage: 'hello world', title: 'live long and prosper', url: 'star trek'}])
    
    useEffect(() => {
        axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${config.apiKey}`)
        .then(res => setFeed(res.data.articles))
        .catch(err => console.log(err))
    }, [])



    const properties = {
        duration: 5000,
        transitionDuration: 500,
        infinite: true,
        indicators: true,
        arrows: true
    }

    console.log(feed)

    const slideShow = () => {
        return (
            <body className='landing-body'>
                <section className='slider'>
                    <Slide {...properties}>
                        <section className='landing-section'>
                            {feed[0].urlToImage ? (
                                <a href={`${feed[0].url}`}  className='landing-img' style={{backgroundImage: `url(${feed[0].urlToImage})`}}>
                                
                                </a>
                            ) : (
                                <ReactPlayer
                                url={`${feed[0].url}`} />
                            )}
                            <div className='landing-headline-container'><span className='landing-headlines'>{feed[0].title}</span></div>
                        </section>

                        <section className='landing-section'>
                            {feed[1].urlToImage ? (
                            <a href={`${feed[1].url}`} className='landing-img' style={{backgroundImage: `url(${feed[1].urlToImage})`}}></a>
                            ) : (
                                <ReactPlayer
                                url={`${feed[1].url}`} />
                            )}
                            <div className='landing-headline-container'><span className='landing-headlines'>{feed[1].title}</span></div>
                        </section>

                        <section className='landing-section'>
                            {feed[2].urlToImage ? (
                            <a href={`${feed[0].url}`} className='landing-img' style={{backgroundImage: `url(${feed[2].urlToImage})`}}></a>
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

export default withRouter(Landing)