import React, { Component } from 'react';
import Sidebar from '../components/sidebar';
import Profile from '../components/profile';

class Model extends Component {
    state = {  } 
    render() { 
        return (
            <div className="container">
                <Sidebar/>
                <main>
                    <h1>Models</h1>
                    <Profile />
                    
                </main>
            </div>
        );
    }
}
 
export default Model;