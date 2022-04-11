import React, { Component, useState, useEffect } from 'react';
import Select, { components } from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import moment from 'moment';

library.add(faAngleDown);

const datasets = [
    { value: 'qqq_', label: 'All-time QQQ' },
    { value: 'top10_', label: 'Top 10 Holdings' }
]

const models = [
    { value: 'lstm_', label: 'LSTM' },
    { value: 'gru_', label: 'GRU' }
]

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const CaretDownIcon = () => {
    return <FontAwesomeIcon style={{color: "#363949"}} icon="fa-solid fa-angle-down fa-xl" />;
};
  
  const DropdownIndicator = props => {
    return (
      <components.DropdownIndicator {...props}>
        <CaretDownIcon />
      </components.DropdownIndicator>
    );
  };

function Forecast() {
    
    const [highPrice, setHighPrice] = useState([]);
    const [lowPrice, setLowPrice] = useState([]);
    const [dataset, setDataset] = useState(datasets[0].value);
    const [model, setModel] = useState(models[0].value);
    const [date, setDate] = useState(moment(new Date()).format("DD_MM_YY"));
    const today = moment(new Date()).format("YYYY-MM-DD");

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

    function getSelectDate(day) {
        var count = 0;
        var predictDays = new Array(5);
        
        for (let i = 0; i < 5; i++) {
            var checkDay = count + parseInt(date.slice(0,2));
            var checkDate = date.slice(3,5)+'-'+checkDay+"-20"+date.slice(6,8)
            var a = new Date(checkDate);
            if (a.getDay() == 6) {
                count += 2
            }
            var predictDay = count + parseInt(date.slice(0,2));
            var predictDate = date.slice(3,5)+'-'+predictDay+"-20"+date.slice(6,8);
            var b = new Date(predictDate);
            predictDays[i] = b;
            count += 1;
        }

        return (moment(predictDays[day]).format("DD MMM YY")+'\n'+weekDays[predictDays[day].getDay()]);
    }

    function handleClick(e) {
        getPredictPrice();
        console.log(today);
    }

    async function getPredictPrice() {
        try {
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
                                <Select components={{ DropdownIndicator }} defaultValue={datasets[0]} options={datasets} isDisabled={false} onChange={selectDataset}/>
                            </div>
                    </div>
                    <h2>+</h2>
                    <div className="input">
                            <div className='model-select'>
                                <span className="material-icons-sharp">psychology</span>
                                <h2>Model</h2>
                                <Select components={{ DropdownIndicator }} placeholder={"Choose"} defaultValue={models[0]} options={models} isDisabled={false} onChange={selectModel}/>
                            </div>
                    </div>
                    <h2>+</h2>
                    <div className="input">
                            <div className='model-select'>
                                <span className="material-icons-sharp">date_range</span>
                                <h2>Predict date</h2>
                                <input components={{ DropdownIndicator }} defaultValue={today} className='date-select' lang="fr-CA" type="date" min="2022-04-10" max={today} onChange={selectDate}/>
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
                        <h2>
                            Day 1
                            <h4 className='day' style={{paddingLeft: "50px"}}>{getSelectDate(0)}</h4>
                        </h2>
                        <h3>High:<h1 className="www up">${highPrice[0]}</h1></h3>
                        <h3>Low:<h1 className="www down">${lowPrice[0]}</h1></h3>
                    </div>
                    <div className="day1">
                        <h2>
                            Day 2
                            <h4 className='day' style={{paddingLeft: "50px"}}>{getSelectDate(1)}</h4>
                        </h2>
                        <h3>High:<h1 className="www up">${highPrice[1]}</h1></h3>
                        <h3>Low:<h1 className="www down">${lowPrice[1]}</h1></h3>
                    </div>
                    <div className="day1">
                    <h2>
                            Day 3
                            <h4 className='day' style={{paddingLeft: "50px"}}>{getSelectDate(2)}</h4>
                        </h2>
                        <h3>High:<h1 className="www up">${highPrice[2]}</h1></h3>
                        <h3>Low:<h1 className="www down">${lowPrice[2]}</h1></h3>
                    </div>
                    <div className="day1">
                    <h2>
                            Day 4
                            <h4 className='day' style={{paddingLeft: "50px"}}>{getSelectDate(3)}</h4>
                        </h2>
                        <h3>High:<h1 className="www up">${highPrice[3]}</h1></h3>
                        <h3>Low:<h1 className="www down">${lowPrice[3]}</h1></h3>
                    </div>
                    <div className="day1">
                    <h2>
                            Day 5
                            <h4 className='day' style={{paddingLeft: "50px"}}>{getSelectDate(4)}</h4>
                        </h2>
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