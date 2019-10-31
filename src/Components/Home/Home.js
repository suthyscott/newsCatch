import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ArticleDisplay from '../ArticleDisplay/ArticleDisplay';

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

    const handleSearch = () => {
        axios.get(`https://newsapi.org/v2/everything?q=${search}&apiKey=${config.apiKey}`)
        .then(res => setFeed(res.data.articles))
        .catch(err => console.log(err))
    }

    return(
        <main>
            <article>
            <section id='input'>
                <input 
                
                placeholder='Enter keyword here'
                name='search'
                onChange={e => setSearch(e.target.value)} />

                <button onClick={() => handleSearch()} className='button' >Search</button>
            </section>

            {feed.map((e, i) => {
                return <ArticleDisplay article={e} key={i}/>
            })}
            </article>
        </main>
    )
}

export default Home