import React, { Component } from 'react';
import logo from './logo.svg';
//import './App.css';
import './styles/app.sass';

import Aggregate from './js/components/Aggregate';
import TimeCounter from './js/components/TimeCounter';
import InputComponent from './js/components/InputComponent';
import Filter from './js/components/Filter';
import PlaylistItem from './js/components/PlaylistItem';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      filterString:"songs",
      serverDataSample:{
        user:{
          name:"Suleyma",
          playlists:[
            { name: "Rock",
              songs: [
                {
                  title:  "Beat it",
                  artist: "Michael Jackson",
                  duration: 305
                },
                {
                  title:  "Bohemian Rhaphsody",
                  artist: "Queen",
                  duration: 400
                },
                {
                  title:  "Always",
                  artist: "Bon Jovi",
                  duration: 305
                }],
            },
            { name: "Sad songs",
              songs: [
                {
                  title:  "Fix you",
                  artist: "Coldplay",
                  duration: 450
                },
                {
                  title:  "I'm with you",
                  artist: "Avril Lavigne",
                  duration: 295
                },
                {
                  title:  "Someone like you",
                  artist: "Adele",
                  duration: 279
                }],
            },
            { name: "Same songs",
              songs: [
                {
                  title:  "Beat it",
                  artist: "Michael Jackson",
                  duration: 305
                },
                {
                  title:  "Beat it",
                  artist: "Michael Jackson",
                  duration: 305
                },
                {
                  title:  "Beat it",
                  artist: "Michael Jackson",
                  duration: 305
                }],
            },
            { name: "Party songs",
              songs: [
                {
                  title:  "Beat it",
                  artist: "Michael Jackson",
                  duration: 305
                },
                {
                  title:  "Beat it",
                  artist: "Michael Jackson",
                  duration: 305
                },
                {
                  title:  "Beat it",
                  artist: "Michael Jackson",
                  duration: 305
                }],
            }
          ]
        }             
      }
    }
  }  
  render() {
    let playlistsToRender = this.state.serverDataSample.user ? this.state.serverDataSample.user.playlists.filter(playlist=>
      playlist.name.toLowerCase().includes(this.state.filterString.toLowerCase())
    ) : [];
    return (
      <div className="App">            
      { this.state.serverDataSample.user ?
        <div>
          <h1 style={{color:'white'}}>
            {this.state.serverDataSample.user.name}'s Playlists
          </h1>                                     

          <div>

          </div>
          <div className="cols col-50">
            <InputComponent/>
          </div>
          <div className="cols col-50 playlistComponent">
            <Filter onTextChange={text=>this.setState({filterString:text})}/>
            <div className="playlist-Info">
              <Aggregate playlists={playlistsToRender}/>
              <TimeCounter playlists={playlistsToRender}/>          
            </div>
            <div className="playlistsContent">
            {        
            playlistsToRender.map(playlist=>
              <PlaylistItem key={playlist.name} info={playlist}/>            
            )
            }  
            </div>
          </div>                        
        </div> : <h3 style={{color:'white'}}>Loading...</h3>
      }
      </div>    
    );
  }
}

export default App;
