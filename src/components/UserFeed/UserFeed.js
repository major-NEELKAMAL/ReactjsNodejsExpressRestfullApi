import React, {Component} from 'react';
import Linkify from 'react-linkify';
import './UserFeed.css';
import TimeAgo from 'react-timeago';
class UserFeed extends Component {

  constructor(props){
    super(props);
  
    
  }

  render() {
    
  
    let userFeed = this
      .props
      .feedData
      .map(function (feedData, index) {
        return (
          <div className="medium-12 columns" key={index}>

          <div className="people-you-might-know">
         
          <div className="row add-people-section">
            <div className="small-12 medium-10 columns about-people">
              
              <div className="about-people-author">
                <p className="author-name">
                <Linkify>{feedData.todolist}</Linkify>
                <br/>
                
                <TimeAgo date={feedData.created} />
                </p>
               
              </div>    
            </div>
            <div className="small-12 medium-2 columns add-friend">
              <div className="add-friend-action">
              <button className="button secondary small" onClick={this.props.deleteFeed} feeddata={feedData.id} value={index} >
              <i className="fa fa-user-times" aria-hidden="true"></i>
              Delete
              </button>
              </div>
            </div>
          </div>
          
          
        </div>
        </div>
         
        )
      }, this);

    return (
      <div>
        {userFeed}

      </div>
    );
  }

}

export default UserFeed;