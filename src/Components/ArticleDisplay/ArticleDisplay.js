// This is the component that receives each article in turn from the Home component and displaying the image, headline, and analysis results. 

import React, {useEffect, useState} from 'react';
import './ArticleDisplay.css';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

function ArticleDisplay(props){
    const {article} = props
    const {title, source, author, description, url, urlToImage, content, publishedAt} = article

    const [keyPhrases, setKeyPhrases] = useState({keyPhrases: [{BeginOffset: 1, EndOffset: 2, Score: 3, Text: 'A Louisiana pastor'}]})
    const [entities, setEntities] = useState({Entities: [{BeginOffset:1, EndOffset: 2, Score: 3, Text: 'Louisiana', Type: 'Location'}]})
    const [sentiment, setSentiment] = useState({SentimentScore: {Positive: 1, Negative: 2, Neutral: 3, Mixed: 4}, Sentiment: 'Positive'})

    console.log(sentiment)
    console.log(entities)
    console.log(keyPhrases)
   

    const config = require('../../Config')
    
    var AWS = require('aws-sdk/dist/aws-sdk-react-native')

    // I had to use this config.update because it wasn't reading the credentials or region from the correct folder. Since I have no idea where that folder might be or why it's not reading, i'm updating those here. I don't know how secure it is. 
    AWS.config.update({
        region:'us-west-2',
        accessKeyId: config.AWS_ACCESS_KEY_ID,
        secretAccessKey: config.AWS_SECRET_ACCESS_KEY
    })
    // this is a possible alternative to the above if I can figure out the pathname to the actual config file.
    // AWS.config.loadFromPath('./AwsConfig.json');

    var comprehend = new AWS.Comprehend({apiVersion: '2017-11-27'});
    
    // This function sends the article's content to Amazon comprehend and attaches the entities to the article object.
    var detectEntitiesParams = {
        LanguageCode: 'en',
        Text: content
    }        
    useEffect(() => {
        comprehend.detectEntities(detectEntitiesParams, function(err, data) {
        if(err) console.log(err, err.stack);
        else setEntities(data)
        })
    
    

        // This function sends the article's content to Amazon comprehend and attaches the sentiment to the article object.
    var detectSentimentParams = {
        LanguageCode: 'en',
        Text: content
    }

  
        comprehend.detectSentiment(detectSentimentParams, function(err, data) {
        if(err) console.log(err, err.stack); 
        else setSentiment(data)
        })
  
    

        // This function sends the article's content to Amazon comprehend and attaches the key phrases to the article object.
    var detectKeyPhrasesParams = {
        LanguageCode: 'en',
        Text: content
    }

  
   
         comprehend.detectKeyPhrases(detectKeyPhrasesParams, function(err, data) {
            if(err) console.log(err, err.stack); 
            else setKeyPhrases(data)
        })


     }, [])
        


    // this function fires a post request that sends the selected article to the database. 
    const {name} = source
    const handleSaveArticle = () => {
        axios.post('/api/article', {title, name, author, description, url, urlToImage, content, publishedAt})
    }

    // One of these will always be undefined, depending on whether article is coming from Home(Google API) or SavedArticles(the database). The ternary below toggles to display whichever one is truthy. 
    var articlePic = urlToImage
    var savedArticlePic = article.url_to_image


    return(
        <main className='article-display'>
            <div className='article' >
                {articlePic ? (
                    <img className='img' src={articlePic}/>
                ) : (<img className='img' src={savedArticlePic}/>)}
                <h1 className='headlines'>{title}</h1>             

                <section className='analysis'>
                    <p>Entities</p>
                    
                    {sentiment.Sentiment}
                </section>
                <nav className='article-nav'>
                    <button className='article-nav-buttons' onClick={() => handleSaveArticle()}>Save</button>
                    <button className='article-nav-buttons'>View Article</button>
                </nav>
                <div className='break-line'></div>
            </div>

           
            

        </main>
    )
}

export default withRouter(ArticleDisplay)