import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.svg'

class Home extends Component {
    handleClick = () => {
        const bt1 = document.getElementById('btn1');
        bt1.classList.toggle('active');
        
    }
    render() { 
        return (
            <div className='main'>
                <link
                    href="https://fonts.googleapis.com/icon?family=Material+Icons+Sharp"
                    rel="stylesheet"
                />
                <Link to="/">
                    <img className='logo1' src={logo} alt="Logo" />
                </Link>
                <h1 className='title'>With a future vision, makes better decisions</h1>
                <h2 className='baseline'>Here we help you to predict an ETF of 5 business days.</h2>
                <Link to="/Dashboard" onClick={this.handleClick}>
                    <button className='btn1'>
                        <span>Get Started</span>
                    </button>
                </Link>
            </div>
        );
    }
}
 
export default Home;