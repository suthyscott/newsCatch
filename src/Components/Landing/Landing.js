import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'
import './Landing.css'

const config = require('../../Config');

function Landing(){
    const [feed, setFeed] = useState([])
    
    useEffect(() => {
        axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${config.apiKey}`)
        .then(res => setFeed(res.data.articles))
        .catch(err => console.log(err))
    }, [])

    // console.log(feed[1])
    
    return(
        <div className='landing-body'>
            <p>Landing. Eventually there will be a carousel here.</p>
        </div>
    )
}

export default Landing