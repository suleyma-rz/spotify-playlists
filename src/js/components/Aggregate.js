import React, { Component } from 'react';

class Aggregate extends Component{
  render(){
    return(
      <div>
        <p> {this.props.playlists && this.props.playlists.length} Playlists</p>
      </div>
    )
  }  
}

export default Aggregate;
