import React, { Component, useState, useEffect } from 'react';
import Select, { components } from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { Chart } from "react-google-charts";
import moment from 'moment';

library.add(faAngleDown);

const datasets = [
    { value: 'qqq_', label: '5-years QQQ' },
    { value: 'top10_', label: '5-years Top 10' }
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
    const [array, setArray] = useState([]);
    const [data, setData] = useState([]);
    const [options, setOptions] = useState({
        colors:['#7380ec','#ff7782', '#CCD0EB','#FFD2D6'],
    });

    async function getUrl(file) {
        const url = "https://stockpricestorage.s3.ap-east-1.amazonaws.com/log/"+file+".json";
        const response = await fetch(url);
        return response.json();
    }

    async function getResultUrl() {
        const url = "https://stockpricestorage.s3.ap-east-1.amazonaws.com/dataset/result.csv";
        const response = await fetch(url);
        return response.text();
    }

    async function getResultJson() {
        const url = "https://stockpricestorage.s3.ap-east-1.amazonaws.com/doc/result.json";
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

    function getPredictDate(day) {
        var predictDate = new Array(5);
        var todayDate = new Date(date.slice(3,5)+'-'+date.slice(0,2)+"-20"+date.slice(6,8));
        var curDate = todayDate.getDate();
        var curMonth = todayDate.getMonth()+1;
        var curYear = todayDate.getFullYear();
        var curDay = todayDate.getDay();
        var skip1 = false;
        var skip2 = false;
        if(curDay == 0){curDate+=1};
        if(curDay == 6){curDate+=2};
        var count = 0;
        for (let i = 0; i < 5; i++) {
            var nextday = parseInt(curDate)+i;
            var curMonth2=curMonth;
            if (nextday >= 30) {curMonth2+=1};
            nextday = nextday%30
            if (nextday==0) {count+=1}
            nextday += count;
            var target = new Date(curYear+'-'+curMonth2+'-'+nextday);
            if (skip1){nextday+=1};
            if (skip2){nextday+=1};
            if (target.getDay()==0){nextday+=1;skip1=true;};
            if (target.getDay()==6){nextday+=2;skip2=true;};
            target = new Date(curYear+'-'+curMonth2+'-'+nextday);
            predictDate[i] = target;
        } 

        return (moment(predictDate[day]).format("DD MMM ")+'('+weekDays[predictDate[day].getDay()]+')');
    }

    function handleClick(e) {
        getPredictPrice();
        getGraphResult();
    }

    const csvFileToArray = string => {
        const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
        const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
    
        const array = csvRows.map(i => {
          const values = i.split(",");
          const obj = csvHeader.reduce((object, header, index) => {
            object[header] = values[index];
            return object;
          }, {});
          return obj;
        });
    
        setArray(array);
      };

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
                x++;
            }
            setHighPrice(arrHigh);
            setLowPrice(arrLow);
        } catch (error) {}
    }

    async function getTableResult() {
        try {
            const data = await getResultUrl();
            csvFileToArray(data);
        } catch (error) {}
    }

    async function getGraphResult() {
        try {
            const data = await getResultJson();
            var dataArr = [
                ["", "High", "Low","Predicted High","Predicted Low"],
            ];
            for(let i = 0;i < Object.keys(data.Date).length;i++) {
                dataArr.push([data.Date[i], data.High[i], data.Low[i], data[dataset+model+"predict_high"][i], data[dataset+model+"predict_low"][i]]);
            }

            setData(dataArr);
        } catch (error) {}
    }

    useEffect(() => {
        getPredictPrice();
        getGraphResult();
        getTableResult();
        
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
                            <h4 className='day'>{getPredictDate(0)}</h4>
                        </h2>
                        <h3>High:<h1 className="www up">${highPrice[0]}</h1></h3>
                        <h3>Low:<h1 className="www down">${lowPrice[0]}</h1></h3>
                    </div>
                    <div className="day1">
                        <h2>
                            Day 2
                            <h4 className='day'>{getPredictDate(1)}</h4>
                        </h2>
                        <h3>High:<h1 className="www up">${highPrice[1]}</h1></h3>
                        <h3>Low:<h1 className="www down">${lowPrice[1]}</h1></h3>
                    </div>
                    <div className="day1">
                    <h2>
                            Day 3
                            <h4 className='day'>{getPredictDate(2)}</h4>
                        </h2>
                        <h3>High:<h1 className="www up">${highPrice[2]}</h1></h3>
                        <h3>Low:<h1 className="www down">${lowPrice[2]}</h1></h3>
                    </div>
                    <div className="day1">
                    <h2>
                            Day 4
                            <h4 className='day'>{getPredictDate(3)}</h4>
                        </h2>
                        <h3>High:<h1 className="www up">${highPrice[3]}</h1></h3>
                        <h3>Low:<h1 className="www down">${lowPrice[3]}</h1></h3>
                    </div>
                    <div className="day1">
                    <h2>
                            Day 5
                            <h4 className='day'>{getPredictDate(4)}</h4>
                        </h2>
                        <h3>High:<h1 className="www up">${highPrice[4]}</h1></h3>
                        <h3>Low:<h1 className="www down">${lowPrice[4]}</h1></h3>
                    </div>
                </div>
                <h2>
                    Predicted Result (Graph)
                </h2>
                <div className='graphs'>
                    <div className="graph_predict">
                        <div className='chart'>
                            <Chart
                                chartType="Line"
                                width="100%"
                                height="420px"
                                data={data}
                                options={options}
                            />
                        </div>
                    </div>         
                </div>
                
                <div class="recent-orders">
                    <h2>Predicted Result (Table)</h2>
                    <table>
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>High</th>
                            <th>Predicted High<br/>(QQQ LSTM))</th>
                            <th>Predicted High<br/>(Top10 LSTM))</th>
                            <th>Predicted High<br/>(QQQ GRU))</th>
                            <th>Predicted High<br/>(Top10 GRU))</th>
                            <th>Low</th>
                            <th>Predicted Low<br/>(QQQ LSTM))</th>
                            <th>Predicted Low<br/>(Top10 LSTM))</th>
                            <th>Predicted Low<br/>(QQQ GRU))</th>
                            <th>Predicted Low<br/>(Top10 GRU))</th>
                        </tr>
                        </thead>
                        <tbody>
                            {array.map((item) => (
                                <tr key={item.id}>
                                {Object.values(item).map((val) => (
                                    <td>{val}</td>
                                ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <a href="#">Show All</a>
                </div>

            </main>
        </div>
    );
}
 
export default Forecast;