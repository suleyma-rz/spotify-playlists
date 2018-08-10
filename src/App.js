import React, { Component } from 'react';
import logo from './assets/Spotify_Logo_RGB_White.png';
//import './App.css';
import './styles/app.sass';
import Notification from './js/components/Notification';

import Aggregate from './js/components/Aggregate';
import TimeCounter from './js/components/TimeCounter';
import InputComponent from './js/components/InputComponent';
import Filter from './js/components/Filter';
import PlaylistItem from './js/components/PlaylistItem';

import querystring from 'query-string'

let data = {
    user: {
        name: "Suleyma",
        playlists: [
            {
                idplaylist: "123",
                name: "Rock",
                songs: [
                    {
                        idsong: "1",
                        title: "Beat it",
                        artist: "Michael Jackson",
                        duration: 305
                    },
                    {
                        idsong: "2",
                        title: "Bohemian Rhaphsody",
                        artist: "Queen",
                        duration: 400
                    },
                    {
                        idsong: "3",
                        title: "Always",
                        artist: "Bon Jovi",
                        duration: 305
                    }],
            },
            {
                idplaylist: "124",
                name: "Sad songs",
                songs: [
                    {
                        idsong: "4",
                        title: "Fix you",
                        artist: "Coldplay",
                        duration: 450
                    },
                    {
                        idsong: "5",
                        title: "I'm with you",
                        artist: "Avril Lavigne",
                        duration: 295
                    },
                    {
                        title: "Someone like you",
                        artist: "Adele",
                        duration: 279
                    }],
            },
            {
                idplaylist: "125",
                name: "Same songs",
                songs: [
                    {
                        idsong: "6",
                        title: "Beat it",
                        artist: "Michael Jackson",
                        duration: 305
                    },
                    {
                        idsong: "7",
                        title: "Beat it",
                        artist: "Michael Jackson",
                        duration: 305
                    },
                    {
                        idsong: "8",
                        title: "Beat it",
                        artist: "Michael Jackson",
                        duration: 305
                    }],
            },
            {
                idplaylist: "126",
                name: "Party songs",
                songs: [
                    {
                        idsong: "9",
                        title: "Beat it",
                        artist: "Michael Jackson",
                        duration: 305
                    },
                    {
                        idsong: "8",
                        title: "Beat it",
                        artist: "Michael Jackson",
                        duration: 305
                    },
                    {
                        idsong: "9",
                        title: "Beat it",
                        artist: "Michael Jackson",
                        duration: 305
                    }],
            }
        ]
    }
};

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      filterString:"",
      //serverDataSample: data
    }
  }

  componentDidMount(){
      let parsed = querystring.parse(window.location.search);
      let accessToken=parsed.access_token;

      //Get the user info
      fetch('https://api.spotify.com/v1/me',{
          headers:{'Authorization': 'Bearer ' + accessToken}
      }).then((response) => response.json()).then((data) => {
          this.setState({serverDataSample:{user:{name:( data.display_name && data.display_name!==null )? data.display_name : data.id}}});
          return true;
      });

      //Get the user playlists
      fetch('https://api.spotify.com/v1/me/playlists',{
          headers:{'Authorization': 'Bearer ' + accessToken}
      }).then((response) => response.json()).then((data) => {
          let currentData =this.state.serverDataSample;
          currentData.playlists=data.items;
          this.setState({serverDataSample:currentData});
          console.log(data);
      });
  }

  render(){
    let playlistsToRender = this.state.serverDataSample && this.state.serverDataSample.playlists ? this.state.serverDataSample.playlists.filter(playlist=>
      playlist.name.toLowerCase().includes(this.state.filterString.toLowerCase())
    ) : [];
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
                    <a className="menu-top-option-active" href="#">Add</a>
                </li>
                <li className="menu-top-option">
                    <a href="#">Manage</a>
                </li>
                <li className="menu-top-option">
                    <a href="#">Remove</a>
                </li>
                  <li className="menu-top-option">
                      <a href="#">Game</a>
                  </li>
                <li><button className="btn">Log Out</button></li>
              </ul>
          </nav>
            <div className="wrapper">
                <div className="cols col-50 padding-right-10">
                    <p className="first-title">
                        Songs to add
                    </p>
                    <InputComponent/>
                </div>
                <div className="cols col-50 playlistComponent">
                    {this.state.serverDataSample.user ?
                    <div>
                        <p className="first-title">
                            {this.state.serverDataSample.user.name}'s Playlists
                        </p>
                        {this.state.serverDataSample.playlists ?
                            <div>
                                <Filter onTextChange={text=>this.setState({filterString:text})}/>
                                <div className="playlistsContent">
                                    {
                                        playlistsToRender.map(playlist=>
                                            <PlaylistItem key={playlist.name} info={playlist}/>
                                        )
                                    }
                                </div>
                                <button className="btn btn-full-width">Add songs</button>
                            </div> : <div><p className="ornament-center">No playlists found</p></div>
                        }
                    </div> : <div></div>
                    }
                </div>
            </div>
        </div> :
        <Notification title="Sign in" className="notification-content-sm">
          <p>Oops! It look like you're not signed in :C </p>
          <button className="btn" onClick={() => window.location = 'http://localhost:8888/login'}> Sign in with Spotify</button>
        </Notification>                
      }
      </div>
    );
  }
}

export default App;
