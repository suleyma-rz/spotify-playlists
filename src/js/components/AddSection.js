import React, {Component} from 'react';
import InputComponent from './InputComponent';
import Filter from './Filter';
import PlaylistItem from './PlaylistItem';
import PlaylistsList from './PlaylistsList';
import querystring from 'query-string'
import UserInfo from "./UserInfo";

let accessToken;
let infoAPI;

class AddSection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterString: "",
            serverDataSample: null,
            songs: [],
            playlists: [],
            checkedPlaylists: new Map(),
        }
        this.handleSongs = this.handleSongs.bind(this);
        this.handlePlaylists = this.handlePlaylists.bind(this);
    }

    componentDidMount() {
        let parsed = querystring.parse(window.location.search);
        accessToken = parsed.access_token;

        this.infoAPI = new UserInfo(accessToken);
        console.log(this.infoAPI)
        console.log(this.infoAPI.user)
        this.setState(
            {
                serverDataSample: {
                    user: {
                        name: (this.infoAPI.user.display_name && this.infoAPI.user.display_name !== null) ?
                            this.infoAPI.user.display_name :
                            this.infoAPI.user.id
                    }
                },
                checkedPlaylists: this.infoAPI.playlists
            }
        );
    }

    handleSongs(songsUpdated) {
        if (songsUpdated) {
            this.setState({songs: songsUpdated});
        } else
            console.log("Error updating songs");
    }


    handlePlaylists(playlistsUpdated) {
        if (playlistsUpdated) {
            this.setState({playlists: playlistsUpdated});
        } else
            console.log("Error updating playlists");
    }

    render() {
        let playlistsToRender = this.state.serverDataSample && this.state.serverDataSample.playlists ? this.state.serverDataSample.playlists.filter(playlist =>
            playlist.name.toLowerCase().includes(this.state.filterString.toLowerCase())
        ) : [];
        return (
            <div className="AddComponent">
                {this.state.serverDataSample && this.state.serverDataSample !== null ?
                    <div>
                        <div className="wrapper">
                            <div className="cols col-50 padding-right-10">
                                <p className="first-title">
                                    Songs to add
                                </p>
                                <InputComponent handler={this.handleSongs}/>
                            </div>
                            <div className="cols col-50 playlistComponent">
                                {this.state.serverDataSample.user ?
                                    <PlaylistsList username={this.state.serverDataSample.user.name}  playlists={this.state.serverDataSample.playlists}  /> :
                                    <React.Fragment/>
                                }
                            </div>
                        </div>
                        <div className="wrapper">
                            <div style={{height: '300px'}}>
                            </div>
                        </div>
                    </div> :
                    <div></div>

                }
            </div>
        );
    }
}

export default AddSection;
