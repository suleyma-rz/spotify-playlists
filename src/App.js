import React, { Component } from 'react';
import logo from './assets/Spotify_Logo_RGB_White.png';
//import './App.css';
import './styles/app.sass';
import Notification from './js/components/Notification';

import AddComponent from './js/components/AddComponent';
import querystring from 'query-string'

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      filterString:"",
      serverDataSample: null
    }
  }
  componentDidMount(){
      let parsed = querystring.parse(window.location.search);
      let accessToken=parsed.access_token;
        if(accessToken && accessToken!==null){
            //Get the user info
            fetch('https://api.spotify.com/v1/me',{
                headers:{'Authorization': 'Bearer ' + accessToken}
            }).then((response) => response.json()).then((data) => {
                this.setState({serverDataSample:{user:{name:( data.display_name && data.display_name!==null )? data.display_name : data.id}}});
                return true;
            });
            //Get the user playlists
            /*fetch('https://api.spotify.com/v1/me/playlists?limit=50',{
                headers:{'Authorization': 'Bearer ' + accessToken}
            }).then((response) => response.json())
                .then((data) => {
                let currentData =this.state.serverDataSample;
                currentData.playlists=data.items;
                this.setState({serverDataSample:currentData});
            });*/
        }
  }

  render(){
    return (
      <div className="App">
        { this.state.serverDataSample && this.state.serverDataSample !==null ?
            <div>
              <nav className="menu-top">
                  <div className="col-20">
                      <img src={logo} alt="Spotify Logo" className="logo" />
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
                    <li><button className="btn">Log Out</button></li>
                  </ul>
              </nav>
              <div className="sectionBody">
                <AddComponent/>
              </div>              
            </div> :
            <Notification title="Sign in" className="notification-content-sm">
                <p>Oops! It look like you're not signed in :C </p>                
                <button className="btn" onClick={() => window.location =                    
                    window.location.href.includes('localhost')
                        ? 'http://localhost:8888/login'
                        : 'https://spotify-play-lists-backend.herokuapp.com/login' }> Sign in with Spotify</button>
            </Notification>
        }
      </div>
    );
  }
}
export default App;
