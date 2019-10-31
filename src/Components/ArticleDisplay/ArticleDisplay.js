import React from 'react';
import './ArticleDisplay.css';
import axios from 'axios';

function ArticleDisplay(props){
    const {title, source, author, description, url, urlToImage, content, publishedAt} = props.article

    const {name} = source
    console.log(urlToImage)

    const handleSaveArticle = () => {
        axios.post('/api/article', {title, name, author, description, url, urlToImage, content, publishedAt})
    }

    var articlePic = urlToImage

    return(
        <main className='article-display'>
            <body className='article' >
                <img className='img' src={articlePic}/>
                <h1 className='headlines'>{title}</h1>             

                <section className='analysis'>
                    <p>Entities</p>
                    <p>Key Phrases</p>
                    <p>Sentiment</p>
                </section>
                <nav className='article-nav'>
                    <button className='article-nav-buttons' onClick={() => handleSaveArticle()}>Save</button>
                    <button className='article-nav-buttons'>View Article</button>
                </nav>
                <div className='break-line'></div>
            </body>

           
            

        </main>
    )
}

export default ArticleDisplay