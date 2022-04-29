import React, { Component } from 'react';
import Sidebar from '../components/sidebar';
import Profile from '../components/profile';

function About() {
    return (
        <div className="container">
            <Sidebar/>
            <main>
                <h1>About</h1>
                <Profile />
                <svg>
                        <line x1="1" y1="16" x2="1" y2="200" stroke="#7380ec" strokeWidth="0.5rem"
                        strokeLinecap="round" />
                </svg>
                <h3 className='desc-text2'>
                    This project aims to provide new investor a financial web application to browse through the stock market with machine learning method, including linear regression and recurrent neural network. The model architecture and training function is based on tradition methods that deals with time-series prediction, such as Long Short-Term Memory (LSTM) and gated recurrent unit (GRU) gating mechanism. The project further provides a comparison of using 2 different datasets to train 2 different models. The result is not 100% accurate but a promising predicted trend is given for users to take reference when making trading decision. It is believed that the machine learning principles behind is solid and worth pursuing in financial aspect.
                </h3>
                <h1 className='subtitle2'>Generic risk warning and disclaimer</h1>         
                <h3 className='desc-text3'>
                    Investment involves risk. As a general rule, you should only trade in financial products that you are familiar with and understand the risk associated with them. The risk warning described in each financial product below is not exhaustive, you should carefully consider your investment experience, financial situation, investment objective, risk tolerance level and consult your independent financial adviser as to the suitability of your situation prior making any investment. <br /> WE ACCEPT NO LIABILITY FOR ANY LOSS OR DAMAGE ARISING DIRECTLY OR INDIRECTLY FROM ACTION TAKEN, OR NOT TAKEN, IN RELIANCE ON INFORMATION OR MATERIALS CONTAINED ON THIS WEBSITE
                </h3>
                <h1 className='subtitle2' style={{marginBottom:"20px"}}>More about Model Metrics</h1>
                <h2>Model Score</h2>
                <h3 className='desc-text4'>
                    score<sub>model</sub> = (accuracy<sub>high</sub>) &#215; 50% + (accuracy<sub>low</sub>) &#215; 50%
                </h3>
                <h2>Accuracy</h2>
                <h3 className='desc-text4'>
                    accuracy<sub>high</sub> = 1 - MPAE<sub>high</sub><br />
                    accuracy<sub>low</sub> = 1 - MPAE<sub>low</sub>
                </h3>
                <h2>Mean Percentage Absolute Error</h2>
                <h3 className='desc-text4'>
                    MPAE = (1/N &#215; &#8721;<sup>N</sup> |(price<sub>actual</sub> - price<sub>predict</sub>)/price<sub>actual</sub>|) &#215; 100%
                </h3>
                <h2>Mean Absolute Error</h2>
                <h3 className='desc-text4'>
                    MAE = 1/N &#215; &#8721;<sup>N</sup>(|price<sub>actual</sub> - price<sub>predict</sub>|)
                </h3>
                <h2>Mean Squared Error</h2>
                <h3 className='desc-text4'>
                    MSE = 1/N &#215; &#8721;<sup>N</sup>(price<sub>actual</sub> - price<sub>predict</sub>)<sup>2</sup>
                </h3>
                <h2>Root Mean Squared Error</h2>
                <h3 className='desc-text4'>
                    RMSE = &#8730;(1/N &#215; ∑<sup>N</sup>(price<sub>actual</sub> - price<sub>predict</sub>)<sup>2</sup>)
                </h3>
                
            </main>
        </div>
    );
}
 
export default About;