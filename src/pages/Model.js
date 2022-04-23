import React, { Component } from 'react';
import Sidebar from '../components/sidebar';
import Profile from '../components/profile';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import moment from 'moment';

const percentage = 66;

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
                                    text={`${percentage/10}/10`} 
                                    value={percentage} 
                                    styles={buildStyles({
                                        strokeLinecap: 'butt',
                                        textSize: '14px',
                                        pathTransitionDuration: 0.5,
                                        pathColor: '#7380ec',
                                        textColor: '#7380ec',
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
                                5-year QQQ Dataset
                            </h2>
                            <h4>Updated on {today}</h4>
                            <div className='bar'>
                                    <CircularProgressbar 
                                    text={`${percentage/10}/10`} 
                                    value={percentage} 
                                    styles={buildStyles({
                                        strokeLinecap: 'butt',
                                        textSize: '14px',
                                        pathTransitionDuration: 0.5,
                                        pathColor: '#7380ec',
                                        textColor: '#7380ec',
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
                                    text={`${percentage/10}/10`} 
                                    value={percentage} 
                                    styles={buildStyles({
                                        strokeLinecap: 'butt',
                                        textSize: '14px',
                                        pathTransitionDuration: 0.5,
                                        pathColor: '#7380ec',
                                        textColor: '#7380ec',
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
                                5-year QQQ Dataset
                            </h2>
                            <h4>Updated on {today}</h4>
                            <div className='bar'>
                                    <CircularProgressbar 
                                    text={`${percentage/10}/10`} 
                                    value={percentage} 
                                    styles={buildStyles({
                                        strokeLinecap: 'butt',
                                        textSize: '14px',
                                        pathTransitionDuration: 0.5,
                                        pathColor: '#7380ec',
                                        textColor: '#7380ec',
                                        trailColor: '#d6d6d6',
                                      })}
                                    />
                            </div>
                        </div>
                    </div>
                    <div className='graphs'>
                        <div className="model">
                                <h1>
                                    GRU Model 2
                                </h1>
                                <h2>
                                    5-year QQQ Dataset
                                </h2>
                                <h4>Updated on {today}</h4>

                            </div>
                            <div className="model">
                                <h1>
                                    GRU Model 2
                                </h1>
                                <h2>
                                    5-year QQQ Dataset
                                </h2>
                                <h4>Updated on {today}</h4>

                            </div>
                    </div>
                </main>
            </div>
        );
}
 
export default Model;