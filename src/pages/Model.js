import React, { Component } from 'react';
import Sidebar from '../components/sidebar';
import ThemeToggler from '../components/themeToggler'

class Model extends Component {
    state = {  } 
    render() { 
        return (
            <div>
                <Sidebar />
                <ThemeToggler />
                This is Model
            </div>
        );
    }
}
 
export default Model;