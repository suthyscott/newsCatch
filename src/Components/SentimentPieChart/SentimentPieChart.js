import {Pie} from 'react-chartjs-2';
import React, {useState, useEffect} from 'react';
import './SentimentPieChart.css'

function SentimentPieChart(props){
    const {Positive, Negative, Neutral, Mixed} = props.sentiment
    const [labels, setLabels] = useState(['Positive', 'Negative', 'Neutral', 'Mixed'])
    console.log(Positive, Negative, Neutral, Mixed)

    const [datasets, setDatasets] = useState([
        {
            data: [Positive, Negative, Neutral, Mixed],
            backgroundColor: ['red', 'blue', 'green', 'yellow']
        }
    ])

    useEffect(() => {
        setDatasets([
            {
                data: [Positive, Negative, Neutral, Mixed],
                backgroundColor: ['red', 'blue', 'green', 'yellow']
            }
        ])
    }, [props.sentiment])

    return(
        <div >
            <h1 className='sentiment-header'>Sentiment</h1>
            <Pie className='sentiment-pie-chart'
            data={{
                labels: labels,
                datasets: datasets
            }}
            options={{
                responsive: true,
                maintainAspectRatio: true,
                legend: {
                    labels: {
                        fontColor: 'white'
                    }
                }
            }} 
            />

        </div>
    )
}

export default SentimentPieChart