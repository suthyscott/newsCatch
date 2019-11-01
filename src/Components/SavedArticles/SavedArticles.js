import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ArticleDisplay from '../ArticleDisplay/ArticleDisplay'

function SavedArticles(){
    const [feed, setFeed] = useState([])
    const [search, setSearch] = useState('')


    useEffect(() => {
        console.log('hit useEffect')
        axios.get('/api/savedarticles')
        .then(res => {
            console.log("hit .then")
            setFeed(res.data)
        })
        .catch(err => console.log(err))
    }, [])

    const handleSearch = () => {
       console.log('searching')
    }

    console.log(feed)

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
                    console.log(e)
                    return <ArticleDisplay article={e} key={'saved-article',i}/>
                })}
            </article>
        </main>
    )
}

export default SavedArticles