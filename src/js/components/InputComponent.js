import React, { Component } from 'react';
import querystring from "query-string";
import SongItem from "./SongItem";
let accessToken;

class InputComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
        value: 'Song & Artist...',
        loading: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
      let parsed = querystring.parse(window.location.search);
      accessToken=parsed.access_token;
      //SAVE SONGS IN PREDEFINED PLAYLIST
      /*let params=[
        "spotify:track:7BqBn9nzAq8spo5e7cZ0dJ",
        "spotify:track:3AJwUDP919kvQ9QcozQPxg",
        "spotify:track:6kPJZM97LwdG9QIsT7khp6"
      ];
      console.log('https://api.spotify.com/v1/playlists/1Gy6j9o8siJG7OTi7HFRj8/tracks?uris=' + params.join(','));
      fetch('https://api.spotify.com/v1/playlists/1Gy6j9o8siJG7OTi7HFRj8/tracks?uris=' + params.join(','), {
          method: 'POST',
          headers: {'Authorization': 'Bearer ' + accessToken, 'Accept': 'application/json'}
      }).then((response) => response.json()).then((data) => {
          console.log("Fin de promise");
          console.log(data);
      }).catch(err => console.log('There was an error:' + err));*/
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
      if (!(accessToken && accessToken !== null)) {
          return;
      }
      let lines = this.state.value.split('\n');
      let params = {
          'limit': '1',
          'offset': '0',
          'market': 'MX',
          'type': 'track',
      };

      let promises=[];
      let tracks=[];
      this.setState({loading:true});
      lines.forEach((songSearch,index)=>{
          params.q=songSearch;
          promises[index]=fetch('https://api.spotify.com/v1/search?' + querystring.stringify(params), {
              headers: {'Authorization': 'Bearer ' + accessToken}
          }).then((response) => response.json()).then((data) => {
              //tracks[index]=data;
              //song = data.tracks.items[0];
              //songObj = data.tracks.items[0];
              tracks[index]=data.tracks.items[0];
              return true;
          }).catch(err => {
              tracks[index]='There was an error:' + err;
          });
      });
      Promise.all(promises).then( () =>{
          this.setState({response: tracks});
          this.setState({loading:false});
          this.props.handler(this.state.response);
      });
      return true;
  }

  render() {    
    return (
        <div className="inputComponent center-text">
            <form onSubmit={this.handleSubmit}>
                <textarea placeholder="Song Artist..." value={this.state.value} onChange={this.handleChange}/>
                <button className="btn btn-full-width" type="submit">Search</button>
                <p className="ornament-center center-text"> or </p>
                <button className="btn btn-full-width">Upload file</button>
            </form>
            {this.state.loading ?
                <p>Loading...</p> :
                <p></p>
            }
            <div>
                {this.state.response?
                    <div>
                        <div className="songsContent">
                            {
                                this.state.response.map((song, index)=>
                                    <SongItem info={song} key={index}/>
                                )
                            }
                        </div>
                    </div> : <div><p className="ornament-center">No songs found</p></div>
                }
            </div>
        </div>
    )}
}

export default InputComponent;
