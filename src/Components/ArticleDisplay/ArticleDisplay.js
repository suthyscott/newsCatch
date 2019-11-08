// This is the component that receives each article in turn from the Home component and displaying the image, headline, and analysis results. 

import React, {useEffect, useState} from 'react';
import './ArticleDisplay.css';
import axios from 'axios';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {passArticle} from '../../ducks/articleReducer';

function ArticleDisplay(props){
    const {article} = props
    const {title, source, author, description, url, urlToImage, content, publishedAt} = article

    const [keyPhrases, setKeyPhrases] = useState({KeyPhrases: [
        {BeginOffset: 1, EndOffset: 2, Score: 3, Text: 'A Louisiana pastor'},{BeginOffset: 1, EndOffset: 2, Score: 3, Text: 'A Louisiana pastor'},{BeginOffset: 1, EndOffset: 2, Score: 3, Text: 'A Louisiana pastor'},{BeginOffset: 1, EndOffset: 2, Score: 3, Text: 'A Louisiana pastor'},{BeginOffset: 1, EndOffset: 2, Score: 3, Text: 'A Louisiana pastor'}]})
    const [entities, setEntities] = useState({Entities: [
        {BeginOffset:1, EndOffset: 2, Score: 3, Text: 'Louisiana', Type: 'Location'},  {BeginOffset:1, EndOffset: 2, Score: 3, Text: 'Louisiana', Type: 'Location'}, {BeginOffset:1, EndOffset: 2, Score: 3, Text: 'Louisiana', Type: 'Location'}, {BeginOffset:1, EndOffset: 2, Score: 3, Text: 'Louisiana', Type: 'Location'}, {BeginOffset:1, EndOffset: 2, Score: 3, Text: 'Louisiana', Type: 'Location'}]})
    const [sentiment, setSentiment] = useState({SentimentScore: {Positive: 1, Negative: 2, Neutral: 3, Mixed: 4}, Sentiment: 'Positive'})
    const [pathIsSavedArticles, setPathIsSavedArticles] = useState(false)


        


    // this function fires a post request that sends the selected article to the database. 
    const {name} = source
    const handleSaveArticle = () => {
        axios.post('/api/article', {title, name, author, description, url, urlToImage, content, publishedAt})
    }

    // One of these will always be undefined, depending on whether article is coming from Home(Google API) or SavedArticles(the database). The ternary below toggles to display whichever one is truthy. 
    var articlePic = urlToImage
    var savedArticlePic = article.url_to_image

    const viewArticle = () => {
        // console.log('hit viewArticle', article, sentiment, entities, keyPhrases)
        props.passArticle(article, sentiment, entities, keyPhrases)
    }

    const removeArticle = () => {
        const {article_id} = props.article
        axios.delete(`/api/article/${article_id}`)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
        props.setRemovedArticle(!props.removedArticle)
    }
    
    useEffect(() => {
        if(props.match.path === '/savedarticles'){
           return setPathIsSavedArticles(true)
        } else {
           return setPathIsSavedArticles(false)
        }
    }, [])

    return(
        <main className='article-display'>
            <div className='article' >
                {articlePic ? (
                    <img className='img' src={articlePic}/>
                ) : (<img className='img' src={savedArticlePic}/>)}

                <section className='text-and-buttons'>
                    <h1 className='headlines'>{title}</h1>             

                    <section className='article-nav-button-bar'>
                    
                    
                    {pathIsSavedArticles ? (
                        <section>
                            <button className='article-nav-buttons' id='article-remove-button' onClick={() => removeArticle()}>Remove</button>
                            <Link to={`/singlearticle/:${props.match.params.id}`}><button className='article-nav-buttons' id='view-article-button' onClick={() => viewArticle()} >View Article</button></Link>
                        </section>                        
                        ) : (
                        <section>
                            <button className='article-nav-buttons' onClick={() => handleSaveArticle()}>Save</button>
                            <Link to={`/singlearticle/:${props.match.params.id}`}><button className='article-nav-buttons' id='view-article-button' onClick={() => viewArticle()} >View Article</button></Link>
                        </section>
                       
                    )}
                    </section>
                        
                </section>
            </div>
               

        </main>
    )
}

// Still not quite sure exactly what this does. 
const mapDispatchToProps = {
    passArticle
}

// Connects component to redux store. 
export default connect(null, mapDispatchToProps)(withRouter(ArticleDisplay))