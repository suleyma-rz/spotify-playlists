import React, {Component} from 'react';

class PlaylistItem extends Component{
    render(){
        return(
            <div className="playlist-Item">
                <div className="cols col-15">
                    <img className="playlist-Image circle-preview" src="https://hmrock.com.br/wp-content/uploads/2016/09/004972672_500.jpg"/>
                </div>
                <div className="cols col-70 playlist-Info">
                    <h3>{this.props.info.name}</h3>
                    <ul className="playlist-Songs">
                        {this.props.info.songs.map(song=>
                            <li key={song.idsong}>{song.title} - {song.artist}</li>
                        )
                        }                    
                    </ul>
                </div>
                <div className="cols col-15 form-checkbox">
                    <input type="checkbox" id={"checkbox-"+this.props.info.idplaylist}/>
                    <label for={"checkbox-"+this.props.info.idplaylist}></label>
                </div>
            </div>
        );
    }
}

export default PlaylistItem;