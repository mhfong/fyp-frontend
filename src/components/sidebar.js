import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Model from '../pages/Model';
import Setting from '../pages/Setting';
import logo from '../assets/images/logo.svg'

class Sidebar extends Component {

    handleClick = () => {
        document.getElementById('btn1').classList.add('active');
    };

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

                <div class="sidebar">
                    <NavLink id="btn1" to="/dashboard" activeClassName="active">
                        <span class="material-icons-sharp">grid_view</span>
                        <h3>Dashboard</h3>
                    </NavLink>
                    <NavLink id="btn2" to="/model" activeClassName="active">
                        <span class="material-icons-sharp">insert_chart_outlined</span>
                        <h3>Model</h3>
                    </NavLink>
                    <NavLink id="btn3" to="/setting" activeClassName="active">
                        <span class="material-icons-sharp">settings</span>
                        <h3>Setting</h3>
                    </NavLink>
                    <NavLink id="btn4" to="/about">
                        <span class="material-icons-sharp">info</span>
                        <h3>About</h3>
                    </NavLink>
                </div>
            </aside>
        );
    }
}

export default Sidebar;