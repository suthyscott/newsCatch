import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ArticleDisplay from '../ArticleDisplay/ArticleDisplay'

function SavedArticles(){
    const [feed, setFeed] = useState([])
    const [search, setSearch] = useState('')
    const [removedArticle, setRemovedArticle] = useState(false)


    useEffect(() => {
        axios.get('/api/savedarticles')
        .then(res => {
            setFeed(res.data)
        })
        .catch(err => console.log(err))
    }, [removedArticle])

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
                    return <ArticleDisplay article={e} key={'saved-article',i} removedArticle={removedArticle} setRemovedArticle={setRemovedArticle}/>
                })}
            </article>
        </main>
    )
}

export default SavedArticles