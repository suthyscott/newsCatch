import {Bar} from 'react-chartjs-2';
import React, {useState, useEffect} from 'react';

function EntitiesDisplay(props){
    const {Score, Text, Type} = props.entity

    return(
        <div>
            <p>{Text}</p>
            <p>{Type}</p>
            <p>{Score}</p>
        </div>
    )
}

export default EntitiesDisplay