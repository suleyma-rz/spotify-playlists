import React, {Component} from 'react';
import InputComponent from './InputComponent';
import Filter from './Filter';
import PlaylistItem from './PlaylistItem';
import querystring from 'query-string'
import UserInfo from "./UserInfo";

let accessToken;

class PlaylistsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterString: "",
            playlists: [],
            checkedPlaylists: new Map(),
        }
        this.handleSongs = this.handleSongs.bind(this);
        this.handlePlaylists = this.handlePlaylists.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        let songsUris = [];
        this.state.songs.forEach((songInfo, index) => songsUris.push(songInfo.uri));
        let playlistToUpdate = Array.from(this.state.checkedPlaylists).filter((value, index, m) => {
            return (value[1]) ? value[0] : false;
        });

        this.setState({playlists: playlistToUpdate});
        this.setState({songs: songsUris});
        this.infoAPI.updatePlaylists(songsUris, playlistToUpdate)

    }

    handleChange(e) {
        const item = e.target.name;
        const isChecked = e.target.checked;
        this.setState(prevState => ({checkedPlaylists: prevState.checkedPlaylists.set(item, isChecked)}));
    }

    render() {
        let playlistsToRender = this.props.playlists ? this.props.playlists.filter(playlist =>
            playlist.name.toLowerCase().includes(this.state.filterString.toLowerCase())
        ) : [];
        return (
            <div>
                <p className="first-title">
                    {this.props.username}'s Playlists
                </p>
                {this.props.playlists ?
                    <div>
                        <Filter onTextChange={text => this.setState({filterString: text})}/>
                        <form onSubmit={this.handleSubmit}>
                            <div className="playlistsContent">
                                {
                                    playlistsToRender.map(playlist =>
                                        <PlaylistItem key={playlist.name} info={playlist}
                                                      name={playlist.id}
                                                      checked={this.state.checkedPlaylists.get(playlist.id)}
                                                      handler={this.handleChange}/>
                                    )
                                }
                            </div>

                            <button className="btn btn-full-width" type="submit">
                                Add songs
                            </button>

                        </form>
                    </div> : <div><p className="ornament-center">No playlists found</p></div>
                }
            </div>
        );
    }
}

export default PlaylistsList;
