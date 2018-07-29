import React, {Component} from 'react';

class PlaylistItem extends Component{
    render(){
        return(
            <div className="playlistItem"  style={{width:'25%', display:'inline-block', color:'white'}}>
                <img/>
                <h3>Playlist Name</h3>
                <ul>
                    <li>Song 1</li>
                    <li>Song 2</li>
                    <li>Song 3</li>
                </ul>
            </div>
        );
    }
}

export default PlaylistItem;