import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import './SingleArticle.css'

function SingleArticle(props){

    console.log(props)
    
    return(
        <div>
            <h1 id='test-headline'>SingleArticle</h1>
            <img src={props.article.urlToImage}/>
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