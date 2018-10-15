import Filter from "./Filter";
import PlaylistItem from "./PlaylistItem";
import React, {Component} from 'react';

class PlaylistsComponent extends Component {
    render() {
        return (
            <div className="cols col-50 playlistComponent">
                {this.state.serverDataSample.user ?
                    <div>
                        <p className="first-title">
                            {this.state.serverDataSample.user.name}'s Playlists
                        </p>
                        {this.state.serverDataSample.playlists ?
                            <div>
                                <Filter onTextChange={text => this.setState({filterString: text})}/>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="playlistsContent">
                                        {
                                            playlistsToRender.map(playlist =>
                                                <PlaylistItem key={playlist.name} info={playlist} name={playlist.id}
                                                              checked={this.state.checkedPlaylists.get(playlist.id)}
                                                              handler={this.handleChange}/>
                                            )
                                        }
                                    </div>
                                    <button className="btn btn-full-width" type="submit">Add songs</button>
                                </form>
                            </div> : <div><p className="ornament-center">No playlists found</p></div>
                        }
                    </div> :
                    <div></div>
                }
            </div>
        )
    }
}

export default PlaylistComponent;