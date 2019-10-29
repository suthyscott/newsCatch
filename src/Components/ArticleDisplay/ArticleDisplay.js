import React from 'react';
import './ArticleDisplay.css';

function ArticleDisplay(props){
    return(
        <main className='article'>
            {props.article.title}
        </main>
    )
}

export default ArticleDisplay