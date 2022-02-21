import React, { Component } from 'react';
import Sidebar from '../components/sidebar';

class Dashboard extends Component {
    render() { 
        return (
            <div>
                <Sidebar />
                This is Dashboard
            </div>
        );
    }
}
 
export default Dashboard;