import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Aggregate from './js/components/Aggregate';
import Filter from './js/components/Filter';
import PlaylistItem from './js/components/PlaylistItem';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 style={{color:'white'}}>
          Spotify Playlists
        </h1>                             
        <Aggregate/>
        <Aggregate/>
        <Filter/>
        <div className="playlistsContent">
          <PlaylistItem/>
          <PlaylistItem/>
          <PlaylistItem/>
          <PlaylistItem/>
        </div>
      </div>
    );
  }
}

export default App;
