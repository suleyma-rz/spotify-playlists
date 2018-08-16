import React, {Component} from 'react';

class PlaylistItem extends Component{
    render(){
        return(
            <div className="playlist-Item">
                <div className="cols col-15">
                    <img className="playlist-Image circle-preview" src={this.props.info.images[0].url} alt={this.props.info.name}/>
                </div>
                <div className="cols col-75 playlist-Info">
                    <h3>{this.props.info.name}</h3>
                    <ul className="playlist-Songs">
                        {/*this.props.info.songs.map(song=>
                            <li key={song.idsong}>{song.title} - {song.artist}</li>
                        )
                        */}
                    </ul>
                </div>
                <div className="cols col-10 form-checkbox">
                    <input type="checkbox" id={"checkbox-"+this.props.info.id} value={this.props.info.id} name="set-of-playlists"/>
                    <label htmlFor={"checkbox-"+this.props.info.id}></label>
                </div>
            </div>
        );
    }
}

export default PlaylistItem;