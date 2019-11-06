import {Bar} from 'react-chartjs-2';
import React, {useState, useEffect} from 'react';
import './EntitiesDisplay.css'

function EntitiesDisplay(props){
    const {Score, Text, Type} = props.entity

    return(
        <div className='entities-display'>
            <p className='entities-properties' id='entities-text'>Entity: <br/>{Text}</p>
            <p className='entities-properties' id='entities-type'>Type: <br/>{Type}</p>
            <p className='entities-properties' id='entities-score'>Score: <br/>{Score.toFixed(3)}</p>
        </div>
    )
}

export default EntitiesDisplay