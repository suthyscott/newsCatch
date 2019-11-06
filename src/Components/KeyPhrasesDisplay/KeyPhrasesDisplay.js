import React from 'react';
import './KeyPhrasesDisplay.css'

function KeyPhrasesDisplay(props){
    const {Text, Score} = props.keyPhrase
    return(
        <div className='key-phrases-display'>
            <p className='key-phrases-properties' id='key-phrase'>Key Phrase:<br/>{Text}</p>
            <p className='key-phrases-properties' id='key-phrase'>Confidence:<br/> {Score.toFixed(3)}</p>
        </div>
    )
}

export default KeyPhrasesDisplay