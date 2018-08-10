import React, { Component } from 'react';

class Notification extends Component {
  constructor(props){
    super(props);
    this.state={
        show:true,
        blocking:false,
    }
  }

  close=()=>{
      this.setState({show : false});
  };

  show=()=>{
     this.setState({show : true});
  };

  toggle=()=>{
    this.setState({show : !this.state.show});
  };
  render(){
    return (      
        <div className={"notification-modal " + ((this.state.show) ? "notification-modal-shown" : "") }>
            <div className="notification-container">
                <div className={"notification-content " + this.props.className}>
                    <div className="notification-content-header">
                        <p>{this.props.title}</p>
                    </div>                    
                    <div className="notification-content-body">
                        {this.props.children}
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default Notification;
