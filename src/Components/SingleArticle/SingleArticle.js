import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import './SingleArticle.css';
import SentimentPieChart from '../SentimentPieChart/SentimentPieChart';
import EntitiesDisplay from '../EntitiesDisplay/EntitiesDisplay';
import KeyPhrasesDisplay from '../KeyPhrasesDisplay/KeyPhrasesDisplay';

function SingleArticle(props){
    const {article} = props
    const {title, source, author, description, url, urlToImage, content, publishedAt} = article

    const [keyPhrases, setKeyPhrases] = useState({KeyPhrases: [
        {BeginOffset: 1, EndOffset: 2, Score: 3, Text: 'A Louisiana pastor'},{BeginOffset: 1, EndOffset: 2, Score: 3, Text: 'A Louisiana pastor'},{BeginOffset: 1, EndOffset: 2, Score: 3, Text: 'A Louisiana pastor'},{BeginOffset: 1, EndOffset: 2, Score: 3, Text: 'A Louisiana pastor'},{BeginOffset: 1, EndOffset: 2, Score: 3, Text: 'A Louisiana pastor'}]})
    const [entities, setEntities] = useState({Entities: [
        {BeginOffset:1, EndOffset: 2, Score: 3, Text: 'Louisiana', Type: 'Location'},  {BeginOffset:1, EndOffset: 2, Score: 3, Text: 'Louisiana', Type: 'Location'}, {BeginOffset:1, EndOffset: 2, Score: 3, Text: 'Louisiana', Type: 'Location'}, {BeginOffset:1, EndOffset: 2, Score: 3, Text: 'Louisiana', Type: 'Location'}, {BeginOffset:1, EndOffset: 2, Score: 3, Text: 'Louisiana', Type: 'Location'}]})
    const [sentiment, setSentiment] = useState({SentimentScore: {Positive: 1, Negative: 2, Neutral: 3, Mixed: 4}, Sentiment: 'Positive'})

    const [displaySentiment, setDisplaySentiment] = useState(false)
    const [displayEntities, setDisplayEntities] = useState(false)
    const [displayKeyPhrases, setDisplayKeyPhrases] = useState(false)
    const [displayAnalysis, setDisplayAnalysis] = useState(false)

    
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
        if(err) console.log('err, err.stack');
        else setEntities(data)
        })
    
    

        // This function sends the article's content to Amazon comprehend and attaches the sentiment to the article object.
    var detectSentimentParams = {
        LanguageCode: 'en',
        Text: content
    }

  
        comprehend.detectSentiment(detectSentimentParams, function(err, data) {
        if(err) console.log('err, err.stack'); 
        else setSentiment(data)
        })
  
    

        // This function sends the article's content to Amazon comprehend and attaches the key phrases to the article object.
    var detectKeyPhrasesParams = {
        LanguageCode: 'en',
        Text: content
    }

  
   
         comprehend.detectKeyPhrases(detectKeyPhrasesParams, function(err, data) {
            if(err) console.log('err, err.stack'); 
            else setKeyPhrases(data)
        })


     }, [])

    const toggleDisplayEntities = (e) => {
        if(displayAnalysis === false){
            setDisplayAnalysis(true)
            setDisplayEntities(true)
            setDisplayKeyPhrases(false)
            setDisplaySentiment(false)
        } else if(displayAnalysis === true && displayEntities === false) {
            setDisplayAnalysis(true)
            setDisplayEntities(true)
            setDisplayKeyPhrases(false)
            setDisplaySentiment(false)
        } else {
            setDisplayAnalysis(false)
        }
        
    }

    const toggleDisplaySentiment = () => {
        if(displayAnalysis === false){
            setDisplayAnalysis(true)
            setDisplayEntities(false)
            setDisplayKeyPhrases(false)
            setDisplaySentiment(true)
        } else if(displayAnalysis === true && displaySentiment === false) {
            setDisplayAnalysis(true)
            setDisplayEntities(false)
            setDisplayKeyPhrases(false)
            setDisplaySentiment(true)
        } else {
            setDisplayAnalysis(false)
        }
    }

    const toggleDisplayKeyPhrases = () => {
        if(displayAnalysis === false){
            setDisplayAnalysis(true)
            setDisplayEntities(false)
            setDisplayKeyPhrases(true)
            setDisplaySentiment(false)
        } else if(displayAnalysis === true && displayKeyPhrases === false) {
            setDisplayAnalysis(true)
            setDisplayEntities(false)
            setDisplayKeyPhrases(true)
            setDisplaySentiment(false)
        } else {
            setDisplayAnalysis(false)
        }
    }

    const renderEntitiesTable = () => {
        return entities.Entities.map((e,i) =>{
            const {Score, Text, Type} = e
            return (
                <tr className='entities-tr'>
                    <td className='entities-property' id='text-td'>{Text}</td>
                    <td className='entities-property' id='type-td'>{Type.toLowerCase()}</td>
                    <td className='entities-property' id='score-td'>{Score.toFixed(3)}</td>
                </tr>
            )
        })
    }

    const renderKeyPhrasesTable = () => {
        return keyPhrases.KeyPhrases.map((e,i) =>{
            const {Score, Text, Type} = e
            return (
                <tr className='entities-tr'>
                    <td className='key-phrases-property' id='text-td'>{Text}</td>
                    <td className='key-phrases-property' id='score-td'>{Score.toFixed(3)}</td>
                </tr>
            )
        })
    }

    const renderEntitiesTableHeader = () => {
        let header = ['ENTITY', 'TYPE', 'CONFIDENCE LEVEL']
        return header.map((key, i) => {
            return <th className='entities-table-header' key={i}>{key}</th>
        })
    }

    const renderKeyPhrasesTableHeader = () => {
        let header = ['KEY PHRASE', 'CONFIDENCE LEVEL']
        return header.map((key, i) => {
            return <th className='key-phrases-table-header' key={i}>{key}</th>
        })
    }

    console.log(props)
    // console.log(props.article.url_to_image)
    // console.log(props.article.content)    

    
    return(
        <body className='single-article-body'>


            <footer className='analysis-footer'>
                <button className='analysis-buttons' onClick={(e) => toggleDisplaySentiment(e)}>Sentiment</button>

                <button className='analysis-buttons' onClick={(e) => toggleDisplayEntities(e)}>Entities</button>

                <button className='analysis-buttons' onClick={(e) => toggleDisplayKeyPhrases(e)}>Key Phrases</button>
            </footer>        

            {displayAnalysis ? (
                <section id='analysis'>
                    {displaySentiment ? (
                        <section className='sentiment-pie-chart'>
                            <SentimentPieChart sentiment={sentiment.SentimentScore}/>
                        </section>
                        ) : null}

                    {displayEntities ? (
                        <body className='entities-table'>
                            <tr>{renderEntitiesTableHeader()}</tr>
                            {renderEntitiesTable()}
                        </body>
                        ) : null}
                        
                    {displayKeyPhrases ? (
                        <body className='key-phrases-table'>
                            <tr>{renderKeyPhrasesTableHeader()}</tr>
                            {renderKeyPhrasesTable()}
                        </body>
                    
                    ) : null }
            </section>
            ) : (
                <div>
                        <p className='article-title' >{props.article.title}</p> 
                        {props.article.urlToImage ? (<img className='article-image' src={props.article.urlToImage}/>) : <img className='article-image' src={props.article.url_to_image}/>}
                        <p className='article-text'>{props.article.content ? (
                            props.article.content
                        ) : (
                            props.article.description
                        )}</p>   
                        <button className='read-article-button'><a className='article-link' href={`${props.article.url}`} target='_blank'>Read Full Article</a></button>
                    </div>
            )}
        </body>
    )
}

// Receiving state from articleReducer.
const mapStateToProps = reduxState => {
    const {article, sentiment, entities, keyPhrases} = reduxState.articleReducer;
    return {
        article, 
        sentiment, 
        entities,
        keyPhrases
    }
}

// Still not quite sure exactly what this does. 
const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SingleArticle))


