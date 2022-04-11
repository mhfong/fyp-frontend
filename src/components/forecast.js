import React, { Component, useState, useEffect } from 'react';
import Select from 'react-select'
import moment from 'moment';

const datasets = [
    { value: 'qqq_', label: 'All-time QQQ' },
    { value: 'top10_', label: 'Top 10 Holdings' }
]

const models = [
    { value: 'lstm_', label: 'LSTM' },
    { value: 'gru_', label: 'GRU' }
]

const days = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' }
]

function Forecast() {
    
    const [highPrice, setHighPrice] = useState([]);
    const [lowPrice, setLowPrice] = useState([]);
    const [dataset, setDataset] = useState(datasets[0].value);
    const [model, setModel] = useState(models[0].value);
    const [date, setDate] = useState(moment(new Date()).format("DD_MM_YY"));
    const today = new Date().toISOString().substr(0,10);

    async function getUrl(file) {
        const url = "https://stockpricestorage.s3.ap-east-1.amazonaws.com/log/"+file+".json";
        const response = await fetch(url);
        return response.json();
    }

    function selectDataset(input) {
        setDataset(input.value);
    }

    function selectModel(input) {
        setModel(input.value);
    }

    function selectDate(input) {
        setDate(moment(input.target.value).format("DD_MM_YY"));
    }

    function handleClick(e) {
        getPredictPrice();
    }

    async function getPredictPrice() {
        try {
            console.log(dataset+model+date);
            const data = await getUrl(dataset+model+date);
            const arrHigh = data.High;
            const arrLow = data.Low;
            var x = 0;
            var len = arrHigh.length
            while(x < len){ 
                arrHigh[x] = arrHigh[x].toFixed(2); 
                arrLow[x] = arrLow[x].toFixed(2); 
                x++
            }
            setHighPrice(arrHigh);
            setLowPrice(arrLow);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPredictPrice();
    }, []);

    return (
        <div>
            <main>
                <h2 className='subtitle'>5 Days Forecasting</h2>
                <div className='formula'>
                    <div className="input">
                            <div className='model-select'>
                                <span className="material-icons-sharp">source</span>
                                <h2>Dataset</h2>
                                <Select defaultValue={datasets[0]} options={datasets} isDisabled={false} onChange={selectDataset}/>
                            </div>
                    </div>
                    <h2>+</h2>
                    <div className="input">
                            <div className='model-select'>
                                <span className="material-icons-sharp">psychology</span>
                                <h2>Model</h2>
                                <Select defaultValue={models[0]} options={models} isDisabled={false} onChange={selectModel}/>
                            </div>
                    </div>
                    <h2>+</h2>
                    <div className="input">
                            <div className='model-select'>
                                <span className="material-icons-sharp">date_range</span>
                                <h2>Predict date</h2>
                                <input defaultValue={today} className='date-select' lang="fr-CA" type="date" min="2022-04-10" max={today} onChange={selectDate}/>
                            </div>
                    </div>
                    <h2>-{'>'}</h2>
                    <div className="submit">
                            <button className='btn2' onClick={handleClick}>
                                <h2>START</h2>
                            </button>
                    </div>
                </div>
                <h4 className='desc'>
                    <span className="material-icons-sharp">info</span>
                    We suggest the best combination of our AI solution to predict the price for you. </h4>
                <div className="predict">
                    <div className="day1">
                        <h2>Day 1</h2>
                        <h3>High:<h1 className="www up">${highPrice[0]}</h1></h3>
                        <h3>Low:<h1 className="www down">${lowPrice[0]}</h1></h3>
                    </div>
                    <div className="day1">
                        <h2>Day 2</h2>
                        <h3>High:<h1 className="www up">${highPrice[1]}</h1></h3>
                        <h3>Low:<h1 className="www down">${lowPrice[1]}</h1></h3>
                    </div>
                    <div className="day1">
                        <h2>Day 3</h2>
                        <h3>High:<h1 className="www up">${highPrice[2]}</h1></h3>
                        <h3>Low:<h1 className="www down">${lowPrice[2]}</h1></h3>
                    </div>
                    <div className="day1">
                        <h2>Day 4</h2>
                        <h3>High:<h1 className="www up">${highPrice[3]}</h1></h3>
                        <h3>Low:<h1 className="www down">${lowPrice[3]}</h1></h3>
                    </div>
                    <div className="day1">
                        <h2>Day 5</h2>
                        <h3>High:<h1 className="www up">${highPrice[4]}</h1></h3>
                        <h3>Low:<h1 className="www down">${lowPrice[4]}</h1></h3>
                    </div>
                    
                    <div className='graph2'></div>
                </div>
            </main>
        </div>
    );
}
 
export default Forecast;