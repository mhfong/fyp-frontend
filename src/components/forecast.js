import React, { Component } from 'react';
import Select from 'react-select'

const datasets = [
    { value: '1', label: '23Y QQQ Price' },
    { value: '2', label: '5Y TOP10 Holdings' }
]

const models = [
    { value: '1', label: 'LSTM' },
    { value: '2', label: 'GRU' }
]

const days = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' }
]

class Forecast extends Component {
    state = {  } 
    render() { 
        return (
            <div className='container'>
                <main>
                    <h2 className='subtitle'>5 Days Forecasting</h2>
                    <div className='formula'>
                        <div className="input">
                                <div className='model-select'>
                                    <span className="material-icons-sharp">source</span>
                                    <h2>Dataset</h2>
                                    <Select defaultValue={datasets[0]} options={datasets} isDisabled={false} />
                                </div>
                        </div>
                        <h2>+</h2>
                        <div className="input">
                                <div className='model-select'>
                                    <span className="material-icons-sharp">psychology</span>
                                    <h2>Model</h2>
                                    <Select defaultValue={models[0]} options={models} isDisabled={true}/>
                                </div>
                        </div>
                        <h2>+</h2>
                        <div className="input">
                                <div className='model-select'>
                                    <span className="material-icons-sharp">date_range</span>
                                    <h2>Predict days</h2>
                                    <Select defaultValue={days[4]} options={days} isDisabled={true}/>
                                </div>
                        </div>
                        <h2>-{'>'}</h2>
                        <div className="submit">
                                <button className='btn2'>
                                    <h2>START</h2>
                                </button>
                        </div>
                    </div>
                    <h4 className='desc'>
                        <span className="material-icons-sharp">info</span>
                        We suggest the best combination of our AI solution to predict the price for you. </h4>
                    <div className="predict">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div className='graph2'></div>
                    </div>
                </main>
            </div>
        );
    }
}
 
export default Forecast;