import React, {Component} from 'react';

class PlaylistItem extends Component{
    render(){
        return(
            <div className="playlistItem"  style={{width:'25%', display:'inline-block', color:'white'}}>
                <img/>
                <h3>{this.props.info.name}</h3>
                <ul>
                    {this.props.info.songs.map(song=>
                        <li key={song.title}>{song.title} - {song.artist}</li>
                    )
                    }                    
                </ul>
            </div>
        );
    }
}

export default PlaylistItem;