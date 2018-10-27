import React, {Component} from 'react';
import logo from '../../assets/Spotify_Logo_RGB_White.png';

class App extends Component {
    render() {
        return (
            <nav className="menu-top">
                <div className="col-20">
                    <img src={logo} alt="Spotify Logo" className="logo"/>
                </div>
                <ul className="menu-top-options">
                    <li className="menu-top-option">
                        <a className="menu-top-option-active" href="#Add">Add</a>
                    </li>
                    <li className="menu-top-option">
                        <a href="#Manage">Manage</a>
                    </li>
                    <li className="menu-top-option">
                        <a href="#Remove">Remove</a>
                    </li>
                    <li className="menu-top-option">
                        <a href="#Game">Game</a>
                    </li>
                    <li>
                        <button className="btn">Log Out</button>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default App;
