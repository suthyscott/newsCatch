import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import './SingleArticle.css'

function SingleArticle(props){
//   have a footer for the analysis and any other buttons. 

    console.log(props)
    console.log(props.article.url_to_image)
    console.log(props.article.title)

    

    
    return(
        <div>
            <h1 id='test-headline'>SingleArticle</h1>
            {props.article.urlToImage ? (<img src={props.article.urlToImage}/>) : <img src={props.article.url_to_image}/>}
            <p>{props.article.title}</p>            
        </div>
    )
}

// Receiving state from authReducer.
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

  // const [displaySentiment, setDisplaySentiment] = useState(false)
    // const [displayEntities, setDisplayEntities] = useState(false)
    // const [displayKeyPhrases, setDisplayKeyPhrases] = useState(false)
    // const [displayAnalysis, setDisplayAnalysis] = useState(false)

        // const toggleDisplayEntities = (e) => {
    //     setDisplayAnalysis(!displayAnalysis)
    //     setDisplayEntities(!displayEntities)
    //     console.log(e)
    // }

    // const toggleDisplaySentiment = () => {
    //     setDisplayAnalysis(!displayAnalysis)
    //     setDisplaySentiment(!displaySentiment)
    // }

    // const toggleDisplayKeyPhrases = () => {
    //     setDisplayAnalysis(!displayAnalysis)
    //     setDisplayKeyPhrases(!displayKeyPhrases)
    // }

    // const renderEntitiesTable = () => {
    //     return entities.Entities.map((e,i) =>{
    //         const {Score, Text, Type} = e
    //         return (
    //             <tr className='entities-tr'>
    //                 <td className='entities-property' id='text-td'>{Text}</td>
    //                 <td className='entities-property' id='type-td'>{Type.toLowerCase()}</td>
    //                 <td className='entities-property' id='score-td'>{Score.toFixed(3)}</td>
    //             </tr>
    //         )
    //     })
    // }

    // const renderEntitiesTableHeader = () => {
    //     let header = [entities.Entities.Text.toUpperCase(), entities.Entities.Type.toUpperCase(), entities.Entities.Score.toUpperCase()]
    //     return header.map(key => {
    //         return <th>key</th>
    //     })
    // }


                {/* 
            <section className='analysis-button-bar'>
                        <button className='analysis-buttons' onMouseOver={(e) => toggleDisplaySentiment(e)} onMouseOut={(e) => toggleDisplaySentiment(e)}>Sentiment</button>
                        <button className='analysis-buttons' onMouseOver={(e) => toggleDisplayEntities(e)} onMouseOut={(e) => toggleDisplayEntities(e)}>Entities</button>
                        <button className='analysis-buttons' onMouseOver={(e) => toggleDisplayKeyPhrases(e)} onMouseOut={(e) => toggleDisplayKeyPhrases(e)}>Key Phrases</button>
                    </section> */}

            {/* {displayAnalysis ? ( <section className='analysis'>
                        {displaySentiment ? (<SentimentPieChart sentiment={sentiment.SentimentScore}/>) : null}

                        {displayEntities ? (
                        <body>
                        <tr>{renderEntitiesTableHeader()}</tr>
                        {renderEntitiesTable()}
                        </body>
                        ) : null}
                    
                        {displayKeyPhrases ? (keyPhrases.KeyPhrases.map((e,i) => {
                            return <KeyPhrasesDisplay keyPhrase={e} key={`keyPhrase key${i}`}/>
                        }) ) : null}
                    </section>) : null} */}