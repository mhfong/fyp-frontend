import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import App from '../App';
import Dashboard from '../pages/Dashboard';
import Statistics from '../pages/Statistics';
import Setting from '../pages/Setting';

class Sidebar extends Component {
    render() { 
        return (
            <nav>
                <h3>Logo</h3>
                <ul className='nav-links'>
                    <Link to="/">
                        <li>Home</li>
                    </Link>
                    <Link to="/dashboard">
                        <li>Dashboard</li>
                    </Link>
                    <Link to="/statistics">
                        <button>Statistics</button>
                    </Link>
                    <Link to="/setting">
                        <li>Setting</li>
                    </Link>
                </ul>
            </nav>
        );
    }
}
 
export default Sidebar;