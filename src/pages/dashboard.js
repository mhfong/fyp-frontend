import React, { Component } from 'react';
import Sidebar from '../components/sidebar';
import ThemeToggler from '../components/themeToggler'

class Dashboard extends Component {
    render() { 
        return (
            <div className="container">
                <Sidebar />
                <main>
                    <h1 class='title-Dashboard'>Welcome to StalkPrice</h1>
                    
                        <svg class='desc-line'>
                            <line x1="0" y1="22" x2="0" y2="60"></line>
                        </svg>
                        <h3 class='desc-text'>We provide you with real-time stock data and 5 business 
                        days prediction of the price of Invesco QQQ Trust Series 1</h3> 

                    <div class="insights">
                        <div class="sales">
                            <span class="material-icons-sharp">analytics</span>
                            <div class="middle">
                            <div class="left">
                                <h3>Total Sales</h3>
                                <h1>$25,024</h1>
                            </div>
                            <div class="progress">
                                <svg>
                                <circle cx="38" cy="38" r="36"></circle>
                                </svg>
                                <div class="number">
                                <p>81%</p>
                                </div>
                            </div>
                            </div>
                            <small class="text-muted">Last 24 Hours</small>
                        </div>
                        <div class="sales">
                            <span class="material-icons-sharp">analytics</span>
                            <div class="middle">
                            <div class="left">
                                <h3>Total Sales</h3>
                                <h1>$25,024</h1>
                            </div>
                            <div class="progress">
                                <svg>
                                <circle cx="38" cy="38" r="36"></circle>
                                </svg>
                                <div class="number">
                                <p>81%</p>
                                </div>
                            </div>
                            </div>
                            <small class="text-muted">Last 24 Hours</small>
                        </div>
                        <div class="sales">
                            <span class="material-icons-sharp">analytics</span>
                            <div class="middle">
                            <div class="left">
                                <h3>Total Sales</h3>
                                <h1>$25,024</h1>
                            </div>
                            <div class="progress">
                                <svg>
                                <circle cx="38" cy="38" r="36"></circle>
                                </svg>
                                <div class="number">
                                <p>81%</p>
                                </div>
                            </div>
                            </div>
                            <small class="text-muted">Last 24 Hours</small>
                        </div>
                        <div class="sales">
                            <span class="material-icons-sharp">analytics</span>
                            <div class="middle">
                            <div class="left">
                                <h3>Total Sales</h3>
                                <h1>$25,024</h1>
                            </div>
                            <div class="progress">
                                <svg>
                                <circle cx="38" cy="38" r="36"></circle>
                                </svg>
                                <div class="number">
                                <p>81%</p>
                                </div>
                            </div>
                            </div>
                            <small class="text-muted">Last 24 Hours</small>
                        </div>
                        <div class="sales">
                            <span class="material-icons-sharp">analytics</span>
                            <div class="middle">
                            <div class="left">
                                <h3>Total Sales</h3>
                                <h1>$25,024</h1>
                            </div>
                            <div class="progress">
                                <svg>
                                <circle cx="38" cy="38" r="36"></circle>
                                </svg>
                                <div class="number">
                                <p>81%</p>
                                </div>
                            </div>
                            </div>
                            <small class="text-muted">Last 24 Hours</small>
                        </div>
                    </div>
                </main>
                
                
            </div>
        );
    }
}
 
export default Dashboard;