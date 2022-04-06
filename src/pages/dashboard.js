import React, { Component } from 'react';
import { useEffect, useState, useMemo } from 'react';
import Sidebar from '../components/sidebar';
import Profile from '../components/profile';
import Chart from 'react-apexcharts';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { wait } from '@testing-library/user-event/dist/utils';

const animatedComponents = makeAnimated();

const stonksUrl = 'https://yahoo-finance-api.vercel.app/QQQ';
async function getStonks() {
  const response = await fetch(stonksUrl);
  return response.json();
}

const directionEmojis = {
  up: '+',
  down: '',
  '': ''
};

const datasets = [
    { value: '1', label: '23Y QQQ Price' },
    { value: '2', label: '5Y TOP10 Holdings' }
]

const models = [
    { value: '1', label: 'LSTM' },
    { value: '2', label: 'GRU' }
]

const chart = {
  options: {
    chart: {
      type: 'candlestick',
      height: 350
    },
    xaxis: {
      type: 'datetime',
      labels: {
            style: {
                fontSize: '12px',
                color: {className: 'label'}
            }
        }
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    },
    tooltip: {
        custom: function({ seriesIndex, dataPointIndex, w }) {
            const o = w.globals.seriesCandleO[seriesIndex][dataPointIndex]
            const h = w.globals.seriesCandleH[seriesIndex][dataPointIndex]
            const l = w.globals.seriesCandleL[seriesIndex][dataPointIndex]
            const c = w.globals.seriesCandleC[seriesIndex][dataPointIndex]
            return (
              '<div class="apexcharts-tooltip-candlestick">' +
              '<div>Open: <span class="value">' +
              o +
              '</span></div>' +
              '<div>High: <span class="value">' +
              h +
              '</span></div>' +
              '<div>Low: <span class="value">' +
              l +
              '</span></div>' +
              '<div>Close: <span class="value">' +
              c +
              '</span></div>' +
              '</div>'
            )
          }
    }
  },
};

const round = (number) => {
  return number ? +(number.toFixed(2)) : null;
};
function Dashboard() {
    const [series, setSeries] = useState([{
        data: []
      }]);
    const [price, setPrice] = useState();
    const [highPrice, setHighPrice] = useState();
    const [lowPrice, setLowPrice] = useState();
    const [prevPrice, setPrevPrice] = useState();
    const [dateState, setDateState] = useState(new Date());
    const [preClose, setPreClose] = useState();

    useEffect(() => {
        let timeoutId;
        async function getLatestPrice() {
            try {
            const data = await getStonks();
            const gme = data.chart.result[0];
            setPrevPrice(price);
            setPrice(gme.meta.regularMarketPrice.toFixed(2));
            const quote = gme.indicators.quote[0];
            const prices = gme.timestamp.map((timestamp, index) => ({
                x: new Date(timestamp * 1000),
                y: [quote.open[index], quote.high[index], quote.low[index], quote.close[index]].map(round)
            }));
            setPreClose(gme.meta.previousClose);
            const arrLow = quote.low;
            const arrHigh = quote.high;
            for(var i=0; i<arrLow.length;i++ )
            { 
                if(arrLow[i]==null)
                    arrLow.splice(i,1); 
            } 
            for(var i=0; i<arrHigh.length;i++ )
            { 
                if(arrHigh[i]==null)
                    arrHigh.splice(i,1); 
            }
            setHighPrice(Math.max(...arrHigh).toFixed(2));
            setLowPrice(Math.min(...arrLow).toFixed(2));
            setSeries([{
                data: prices,
            }]);
            } catch (error) {
            console.log(error);
            }
            timeoutId = setTimeout(getLatestPrice, 1000 * 3);
        }
        setInterval(() => setDateState(new Date()),  1000);
        getLatestPrice();
        return () => {
            clearTimeout(timeoutId);
        };
    }, []);
    const hour = dateState.getHours();
    const min = dateState.getMinutes();
    var direction = useMemo(() => prevPrice < price ? 'up' : prevPrice > price ? 'down' : '', [prevPrice, price]);
    direction = price-preClose > 0 ? 'up' : 'down';
        return (
            <div className="container">
                <Sidebar/>
                <main>
                    <h1>Welcome to StalkPrice</h1>
                    <Profile />
                    <svg>
                        <line x1="1" y1="3" x2="1" y2="40" stroke="#7380ec" stroke-width="0.5rem"
                        stroke-linecap="round" />
                    </svg>
                    <h3 class='desc-text'>
                        We provide you with real-time stock data and 5 business<br />
                        days prediction of the price of Invesco QQQ Trust Series 1
                    </h3>
                    <h2 className='subtitle'>Dashboard</h2>
                    <div style={{display: 'flex', justifyContent:'flex-end'}}>
                        <div class="date">
                            <div className='price-time'>
                                <span style={{fontSize: '1.2rem', verticalAlign:'middle'}} class="material-icons-sharp">calendar_today</span>
                                &nbsp;&nbsp;&nbsp;
                                {dateState.toLocaleDateString('en-GB', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: '2-digit',
                                })}
                            </div>
                        </div>
                        <div class="date">
                            <div className='price-time'>
                                <span style={{fontSize: '1.2rem', verticalAlign:'middle'}} class="material-icons-sharp">schedule</span>
                                &nbsp;&nbsp;&nbsp;
                                {dateState.toLocaleString('en-US', {
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: true,
                                })} (HKT)
                            </div>
                        </div>
                    </div>
                    <div class="insights">
                        <div>
                            <h2 className='text-center'>Today's Price</h2>
                            <h1 className={['price', direction].join(' ')}>
                                ${price}&nbsp;<h3>{directionEmojis[direction]}{(price-preClose).toFixed(2)} ({((price-preClose)*100/price).toFixed(2)}%)</h3>
                            </h1>
                            <h2 className='text-center'>24-Hour Highest</h2>
                            <h1 className="price up">
                                ${highPrice}
                            </h1>
                            <h2 className='text-center'>24-Hour Lowest</h2>
                            <h1 className="price down">
                                ${lowPrice}
                            </h1>
                        </div>

                        <div class="graph">
                            <h2 className='text-center'>Invesco QQQ Trust, Series 1</h2>
                            <div className='chart'>
                            <Chart options={chart.options} series={series} type="candlestick" width="100%" height={280} />
                            </div>
                        </div>
                    </div>
                    <h2 className='subtitle'>5 Days Forecasting</h2>
                    <div className='formula'>
                        <div class="input">
                                <div className='model-select'>
                                    <span class="material-icons-sharp">source</span>
                                    <h2>Dataset</h2>
                                    <Select defaultValue={datasets[0]} options={datasets} isDisabled={false} />
                                </div>
                        </div>
                        <h2>+</h2>
                        <div class="input">
                                <div className='model-select'>
                                    <span class="material-icons-sharp">psychology</span>
                                    <h2>Model</h2>
                                    <Select defaultValue={models[0]} options={models} isDisabled={true}/>
                                </div>
                        </div>
                    </div>
                    <h4 className='desc'>
                        <span class="material-icons-sharp">info</span>
                        We will suggest the best combination of our AI solution to predict the price for you. </h4>
                    <div class="predict">

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

export default Dashboard;