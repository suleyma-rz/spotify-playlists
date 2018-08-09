import React, { Component } from 'react';

class Aggregate extends Component{
  render(){
      let allSongs=this.props.playlists.reduce((songs,playlist)=>{
          return songs.concat(playlist.songs);
      },[]);
      let totalDuration=allSongs.reduce((sum,song)=>{
        return sum+song.duration;
      },0);
    return(
      <div>
        <p> {Math.round(totalDuration/60)} minutes </p>
      </div>
    )
  }  
}

export default Aggregate;
