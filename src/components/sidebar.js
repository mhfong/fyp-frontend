import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Model from '../pages/Model';
import Setting from '../pages/Setting';
import logo from '../assets/images/logo.svg'

class Sidebar extends Component {

    // change theme
    handleClick = () => {
        const bt1 = document.getElementById('bt1');
        bt1.classList.add("active");
        const bt2 = document.getElementById('bt2');
        bt2.classList.add("active");
        const bt3 = document.getElementById('bt3');
        bt3.classList.add("active");
    }

    render() { 
        return (
            <aside>
                <link
                    href="https://fonts.googleapis.com/icon?family=Material+Icons+Sharp"
                    rel="stylesheet"
                />
                <div class="top">
                    <div class="logo">
                        <Link to="/">
                            <img className='logo' src={logo} alt="Logo" />
                        </Link>
                    </div>
                    
                </div>

                <div class="sidebar" onClick={this.handleClick}>
                    <Link id="btn1" to="/dashboard">
                        <span class="material-icons-sharp">grid_view</span>
                        <h3>Dashboard</h3>
                    </Link>
                    <Link id="btn2" to="/model">
                        <span class="material-icons-sharp">insert_chart_outlined</span>
                        <h3>Model</h3>
                    </Link>
                    <Link id="btn3" to="/setting">
                        <span class="material-icons-sharp">settings</span>
                        <h3>Setting</h3>
                    </Link>
                    <Link id="btn4" to="/about">
                        <span class="material-icons-sharp">info</span>
                        <h3>About</h3>
                    </Link>
                </div>
            </aside>
        );
    }
}
 
export default Sidebar;