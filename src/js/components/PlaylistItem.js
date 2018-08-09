import React, {Component} from 'react';

class PlaylistItem extends Component{
    render(){
        return(
            <div className="playlistItem">
                <img className="playlistImage circle-preview" src="https://hmrock.com.br/wp-content/uploads/2016/09/004972672_500.jpg"/>
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