import React, {Component} from 'react';

class PlaylistItem extends Component{
    constructor(props){
        super(props);         
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.props.handler(e);
    }
    render(){
        return(
            <div className="playlist-Item">
                <div className="cols col-15">
                    <img className="playlist-Image circle-preview" src={this.props.info.images[0].url} alt={this.props.info.name}/>
                </div>
                <div className="cols col-75 playlist-Info">
                    <h3>{this.props.info.name}</h3>                    
                </div>
                <div className="cols col-10 form-checkbox">                 
                    <input type="checkbox" id={"checkbox-"+this.props.info.id} value={this.props.info.id} name={this.props.name} onChange={this.handleChange}/>
                    <label htmlFor={"checkbox-"+this.props.info.id}></label>
                </div>
            </div>
        );
    }
}

export default PlaylistItem;