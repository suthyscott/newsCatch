import React from 'react';

function KeyPhrasesDisplay(props){
    const {Text, Score} = props.keyPhrase
    return(
        <div>
            <p>Key Phrase: {Text}</p>
            <p>Confidence: {Score.toFixed(3)}</p>
        </div>
    )
}

export default KeyPhrasesDisplay