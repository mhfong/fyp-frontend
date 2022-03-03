import React, { Component } from 'react';
const themeToggler = document.querySelector(".theme-toggler");

class ThemeToggler extends Component {
    state = {  } 

    // change theme
    handleClick = () => {
        document.body.classList.toggle('dark-theme-variables');

        const sun = document.getElementById('sun');
        sun.classList.toggle('active');
        const moon = document.getElementById('moon');
        moon.classList.toggle('active');   
    }

    render() { 
        return (
            <div class="right">
                <div class="theme-toggler" onClick={this.handleClick}>
                    <span id="sun" class="material-icons-sharp active">light_mode</span>
                    <span id="moon" class="material-icons-sharp">dark_mode</span>
                </div>
            </div>
        );
    }
}

export default ThemeToggler;