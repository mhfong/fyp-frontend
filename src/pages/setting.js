import React, { Component } from 'react';
import Sidebar from '../components/sidebar';
import Profile from '../components/profile';

class Setting extends Component {
    render() { 
        return (
            <div className="container">
                <Sidebar/>
                <main>
                    <h1>Setting</h1>
                    <Profile />
                    
                </main>
            </div>
        );
    }
}
 
export default Setting;