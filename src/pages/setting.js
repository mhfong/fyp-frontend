import React, { Component } from 'react';
import Sidebar from '../components/sidebar';
import ThemeToggler from '../components/themeToggler'

class Setting extends Component {
    render() { 
        return (
            <div>
                <Sidebar />
                <ThemeToggler />
                This is Setting
            </div>
        );
    }
}
 
export default Setting;