import React, { Component } from 'react';
import InputComponent from './InputComponent';
import Filter from './Filter';
import PlaylistItem from './PlaylistItem';
import querystring from 'query-string'

import {Checkbox,CheckboxGroup} from 'react-checkbox-group'

class AddComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            filterString:"",
            serverDataSample: null,
            songs:[],
            playlists:[]
        }
        this.handleSongs=this.handleSongs.bind(this);
        this.handlePlaylists=this.handlePlaylists.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        let parsed = querystring.parse(window.location.search);
        let accessToken=parsed.access_token;
        if(accessToken && accessToken!==null){
            //Get the user info
            fetch('https://api.spotify.com/v1/me',{
                headers:{'Authorization': 'Bearer ' + accessToken}
            }).then((response) => response.json()).then((data) => {
                this.setState({serverDataSample:{user:{name:( data.display_name && data.display_name!==null )? data.display_name : data.id}}});
                return true;
            });
            //Get the user playlists
            fetch('https://api.spotify.com/v1/me/playlists',{
                headers:{'Authorization': 'Bearer ' + accessToken}
            }).then((response) => response.json())
                .then((data) => {
                    let currentData =this.state.serverDataSample;
                    currentData.playlists=data.items;
                    this.setState({serverDataSample:currentData});
                });
        }
    }

    handleSongs(songsUpdated){
        if(songsUpdated){
            this.setState({songs:songsUpdated});
        }else
            console.log("Error updating songs");
    }

    handleSubmit(event){
        event.preventDefault();
        console.log(event.target);
    }

    handlePlaylists(playlistsUpdated){
        if(playlistsUpdated){
            this.setState({playlists:playlistsUpdated});
        }else
            console.log("Error updating playlists");
    }
    render(){
        let playlistsToRender = this.state.serverDataSample && this.state.serverDataSample.playlists ? this.state.serverDataSample.playlists.filter(playlist=>
            playlist.name.toLowerCase().includes(this.state.filterString.toLowerCase())
        ) : [];
        return (
            <div className="AddComponent">
                { this.state.serverDataSample && this.state.serverDataSample !==null ?
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
                                    <div>
                                        <p className="first-title">
                                            {this.state.serverDataSample.user.name}'s Playlists
                                        </p>
                                        {this.state.serverDataSample.playlists ?
                                            <div>
                                                <Filter onTextChange={text=>this.setState({filterString:text})}/>                                                
                                                <form onSubmit={this.handleSubmit}>
                                                    <div className="playlistsContent">
                                                        {
                                                            playlistsToRender.map(playlist=>
                                                                <PlaylistItem key={playlist.name} info={playlist}/>
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
                        </div>
                        <div className="wrapper">
                            <div style={{height: '300px'}}>
                            </div>
                        </div>
                    </div>:
                    <div></div>
                }
            </div>
        );
    }
}

export default AddComponent;
