import React, { Component } from 'react';
import { useEffect, useState, useMemo } from 'react';
import Sidebar from '../components/sidebar';
import Profile from '../components/profile';
import Chart from 'react-apexcharts';
import Forecast from '../components/forecast';

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

    var direction = useMemo(() => prevPrice < price ? 'up' : prevPrice > price ? 'down' : '', [prevPrice, price]);
    direction = price-preClose > 0 ? 'up' : 'down';
        return (
            <div className="container">
                <Sidebar/>
                <main>
                    <h1>Welcome to StalkPrice</h1>
                    <Profile />
                    <svg>
                        <line x1="1" y1="16" x2="1" y2="53" stroke="#7380ec" strokeWidth="0.5rem"
                        strokeLinecap="round" />
                    </svg>
                    <h3 className='desc-text'>
                        We provide you with real-time stock data and 5 business<br />
                        days prediction of the price of Invesco QQQ Trust Series 1
                    </h3>
                    <h2 className='subtitle'>Dashboard</h2>
                    <div style={{display: 'flex', justifyContent:'flex-end'}}>
                        <div className="date">
                            <div className='price-time'>
                                <span style={{fontSize: '1.2rem', verticalAlign:'middle'}} className="material-icons-sharp">calendar_today</span>
                                &nbsp;&nbsp;&nbsp;
                                {dateState.toLocaleDateString('en-GB', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: '2-digit',
                                })}
                            </div>
                        </div>
                        <div className="date">
                            <div className='price-time'>
                                <span style={{fontSize: '1.2rem', verticalAlign:'middle'}} className="material-icons-sharp">schedule</span>
                                &nbsp;&nbsp;&nbsp;
                                {dateState.toLocaleString('en-US', {
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: true,
                                })} (HKT)
                            </div>
                        </div>
                    </div>
                    <div className="insights">
                        <div>
                            <h2 className='text-center'>Today's Price</h2>
                            <h1 className={['price', direction].join(' ')}>
                                ${price}&nbsp;
                                <h4>
                                    {directionEmojis[direction]}{(price-preClose).toFixed(2)} ({((price-preClose)*100/price).toFixed(2)}%)
                                </h4>
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

                        <div className="graph">
                            <h2 className='text-center'>Invesco QQQ Trust, Series 1</h2>
                            <div className='chart'>
                                <Chart options={chart.options} series={series} type="candlestick" width="100%" height={280} />
                            </div>
                        </div>
                    </div>
                    <Forecast />
                </main>
            </div>
        );
}

export default Dashboard;