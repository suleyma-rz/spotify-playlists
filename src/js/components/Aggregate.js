import React, { Component } from 'react';

class Aggregate extends Component{
  render(){
    return(
      <div>
        <h2 style={{color:'#1db954'}}> {this.props.playlists && this.props.playlists.length} Playlists</h2>
      </div>
    )
  }  
}

export default Aggregate;
