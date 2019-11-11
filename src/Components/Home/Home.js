import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ArticleDisplay from '../ArticleDisplay/ArticleDisplay';
import './Home.css'
import Landing from '../Landing/Landing';

const config = require('../../Config');

function Home(props){
    // console.log(props)
    const [feed, setFeed] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${config.apiKey}`)
        .then(res => setFeed(res.data.articles))
        .catch(err => console.log(err))
    }, [])

    console.log(feed)

    const handleSearch = () => {
        axios.get(`https://newsapi.org/v2/everything?q=${search}&apiKey=${config.apiKey}`)
        .then(res => setFeed(res.data.articles))
        .catch(err => console.log(err))
    }

    return(
        <main>
            
            <Landing />
            <section className='search-box'>
                <input 
                className='search-input'
                placeholder='Enter keyword here'
                name='search'
                onChange={e => setSearch(e.target.value)}
                onKeyDown={e => {
                    if(e.key === 'Enter'){
                        handleSearch()
                    }
                }} />

                <button onClick={() => handleSearch()} className='search-button' >Search</button>
            </section>

            <article className='articles-list'>
            {feed.map((e, i) => {
                return <ArticleDisplay article={e} key={'home-article', i}/>
            })}
            </article>
        </main>
    )
}

export default Home