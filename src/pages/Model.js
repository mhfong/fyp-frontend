import React, { Component } from 'react';
import Sidebar from '../components/sidebar';
import Profile from '../components/profile';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Chart } from "react-google-charts";
import moment from 'moment';

const percentage = 66;

export const data = [
    ["", "MAE", "MSE", "RMSE"],
    ["LSTM(QQQ)", 2.385215007902938, 8.535829287287733, 2.447021840375504],
    ["LSTM(Top10)", 13.241499567748775, 191.35020577240456, 12.590539363373583],
    ["GRU(QQQ)", 2.176072776901767, 8.179405069847279, 2.61739379932057],
    ["GRU(Top10)", 13.834391238870277, 269.9872095354509, 17.26460629264779],
  ];

export const data2 = [
    [ "", "High", "Low"],
    ["LSTM Model 1", 100-18.11, 100-22.92],
    ["LSTM Model 2", 100-58.53, 100-71.30],
    ["GRU Model 1", 100-19.72, 100-20.98],
    ["GRU Model 2", 100-73.22, 100-70.42],
];

var options = {
    colors:['#7380ec','#ff7782', '#ffbb55'],
};

var options2 = {
    colors:['#7380ec', '#ff7782'],
};

function Model()  {
    const today = moment(new Date()).format("MMM-DD");

        return (
            <div className="container">
                <Sidebar/>
                <main>
                    <h1>Models</h1>
                    <Profile />
                    <div className="score">
                        <div className="model">
                            <h1>
                                LSTM Model 1
                            </h1>
                            <h2>
                                5-year QQQ Dataset
                            </h2>
                            <h4>Updated on {today}</h4>
                            <div className='bar'>
                                    <CircularProgressbar 
                                    text={`7.95/10`} 
                                    value={7.95*10} 
                                    styles={buildStyles({
                                        strokeLinecap: 'butt',
                                        textSize: '14px',
                                        pathTransitionDuration: 0.5,
                                        pathColor: '#41f1b6',
                                        textColor: '#363949',
                                        trailColor: '#d6d6d6',
                                      })}
                                    />
                            </div>
                        </div>
                        <div className="model">
                            <h1>
                                LSTM Model 2
                            </h1>
                            <h2>
                                5-year Top 10 Dataset
                            </h2>
                            <h4>Updated on {today}</h4>
                            <div className='bar'>
                                    <CircularProgressbar 
                                    text={`3.51/10`} 
                                    value={3.51*10} 
                                    styles={buildStyles({
                                        strokeLinecap: 'butt',
                                        textSize: '14px',
                                        pathTransitionDuration: 0.5,
                                        pathColor: '#41f1b6',
                                        textColor: '#363949',
                                        trailColor: '#d6d6d6',
                                      })}
                                    />
                            </div>
                        </div>
                        <div className="model">
                            <h1>
                                GRU Model 1
                            </h1>
                            <h2>
                                5-year QQQ Dataset
                            </h2>
                            <h4>Updated on {today}</h4>
                            <div className='bar'>
                                    <CircularProgressbar 
                                    text={`7.96/10`} 
                                    value={7.96*10} 
                                    styles={buildStyles({
                                        strokeLinecap: 'butt',
                                        textSize: '14px',
                                        pathTransitionDuration: 0.5,
                                        pathColor: '#41f1b6',
                                        textColor: '#363949',
                                        trailColor: '#d6d6d6',
                                      })}
                                    />
                            </div>
                        </div>
                        <div className="model">
                            <h1>
                                GRU Model 2
                            </h1>
                            <h2>
                                5-year Top 10 Dataset
                            </h2>
                            <h4>Updated on {today}</h4>
                            <div className='bar'>
                                    <CircularProgressbar 
                                    text={`2.82/10`} 
                                    value={2.82*10} 
                                    styles={buildStyles({
                                        strokeLinecap: 'butt',
                                        textSize: '14px',
                                        pathTransitionDuration: 0.5,
                                        pathColor: '#41f1b6',
                                        textColor: '#363949',
                                        trailColor: '#d6d6d6',
                                      })}
                                    />
                            </div>
                        </div>
                    </div>

                    <div className='graphs'>
                        

                        <div className="graph1">
                            <h2>
                                Models' Accuracy (%)
                            </h2>
                            <h4 className='day'>Updated on {today}</h4>
                            <div className='chart'>
                                <Chart
                                    chartType="Bar"
                                    width="100%"
                                    height="100%"
                                    data={data2}
                                    options={options2}
                                />
                            </div>
                        </div>         

                        <div className="model">
                            <h2>
                                LSTM Model 1
                             <h3>
                                High Error:
                            </h3>
                            <h1 className="www1 up">± ${9.73}</h1>
                            <h3>
                                Low Error:
                            </h3>
                            <h1 className="www1 down">± ${11.12}</h1>
                            </h2>
                            <h2>
                                LSTM Model 2
                             <h3>
                                High Error:
                            </h3>
                            <h1 className="www1 up">± ${20.63}</h1>
                            <h3>
                                Low Error:
                            </h3>
                            <h1 className="www1 down">± ${23.40}</h1>
                            </h2>
                            <h2>
                                GRU Model 1
                             <h3>
                                High Error:
                            </h3>
                            <h1 className="www1 up">± ${8.87}</h1>
                            <h3>
                                Low Error:
                            </h3>
                            <h1 className="www1 down">± ${10.21}</h1>
                            </h2>
                            <h2>
                                GRU Model 2
                             <h3>
                                High Error:
                            </h3>
                            <h1 className="www1 up">± ${31.05}</h1>
                            <h3>
                                Low Error:
                            </h3>
                            <h1 className="www1 down">± ${29.72}</h1>
                            </h2>
                        </div>
                    </div>
                    <div className='graphs'>
                        <div className="graph2">
                            <h2>
                                Models' Metrics
                            </h2>
                            <h4 className='day'>Updated on {today}</h4>
                            <div className='chart'>
                                <Chart
                                    chartType="Bar"
                                    width="100%"
                                    height="100%"
                                    data={data}
                                    options={options}
                                />
                            </div>
                        </div>     
                    </div>
                </main>
            </div>
        );
}
 
export default Model;