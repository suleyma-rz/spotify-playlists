import React, {Component} from 'react';

class SongItem extends Component{
    render(){
        if(!this.props.info.id)
            return false;
        let img=this.props.info.album.images[0].url;
        let name=this.props.info.name;
        let album = this.props.info.album.name;
        let artist = this.props.info.artists[0].name;
        return(
            <div className="playlist-Item">
                <div className="cols col-25">
                    <img className="playlist-Image circle-preview" src={img} alt={album}/>
                </div>
                <div className="cols col-75 playlist-Info">
                    <p className="cols col-50">{name}</p>
                    <p className="cols col-25">{artist}</p>
                    <p className="cols col-25">{album}</p>
                </div>
            </div>
        );
    }
}

export default SongItem;