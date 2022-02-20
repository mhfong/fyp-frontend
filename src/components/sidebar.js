import React, { Component } from 'react';

class Sidebar extends Component {
    render() { 
        return (
            <nav>
                <h3>Logo</h3>
                <ul className='nav-links'>
                    <li>Home</li>
                    <li>Dashboard</li>
                    <li>Statistics</li>
                    <li>Setting</li>
                </ul>
            </nav>
        );
    }
}
 
export default Sidebar;