import React from 'react';
import './ArticleDisplay.css';

function ArticleDisplay(props){
    return(
        <main className='article'>
            {props.article.title}
            <br/>
            {props.article.source.name}
            <br/>

            {props.article.author}
            <br/>

            {props.article.description}
            <br/>

            URL{props.article.url}
            <br/>

            {props.article.url_to_image}
            <br/>

            {props.article.content}

        </main>
    )
}

export default ArticleDisplay