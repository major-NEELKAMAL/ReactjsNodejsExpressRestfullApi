import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import './Home.css';
import UserFeed from "../UserFeed/UserFeed";
import ReactConfirmAlert, { confirmAlert } from 'react-confirm-alert'; 
import '../../styles/react-confirm-alert.css';
import { APImanager } from '../../../utility/index';


class Home extends Component {
 

  constructor(props) {
    super(props);

    this.state = {
      data:[],
      userFeed: '',
      redirectToReferrer: false,
      name:'',
    };

    this.getUserFeed = this
      .getUserFeed
      .bind(this);
    this.feedUpdate = this.feedUpdate.bind(this);
    this.onChange = this.onChange.bind(this);
    this.deleteFeed = this.deleteFeed.bind(this);
    this.deleteFeedAction = this.deleteFeedAction.bind(this);
    this.convertTime = this.convertTime.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentWillMount() {

   if(sessionStorage.getItem("userData")){
    this.getUserFeed();
   }
  
   else{
    this.setState({redirectToReferrer: true});
   }
   

  }

  feedUpdate(e) {
    e.preventDefault();
    let data = JSON.parse(sessionStorage.getItem("userData"));
    let postData = { user_id: data[0].user_id, feed: this.state.userFeed};
    if (this.state.userFeed) {


        APImanager.post('/api/add-todo-list',postData , (err, response) => {

            if (err) {
                //alert('check network console for error message');
                console.log(response);
            } else {
                //this.setState({data: response});
                console.log(response);

                let K = [response.resource[0]].concat(this.state.data);
                console.log(K);
                this.setState({data: K , userFeed:''});

            }

        });
    }
  }

  convertTime(created) {
    let date = new Date(created * 1000);
    return date;
  }

  deleteFeedAction(feed_data,indexValue) {
      let updateIndex = indexValue;
      let feed_id= feed_data;

      let data = JSON.parse(sessionStorage.getItem("userData"));

      let userToDOData = {user_id: data[0].user_id, feed_id: feed_id};
      if (userToDOData) {

          APImanager.delete('/api/delete-user-todo-list', userToDOData, (err, response) => {

              if (err) {
                  console.log(err);
              } else {
                  this.state.data.splice(updateIndex, 1);
                  this.setState({ data: this.state.data });
              }


          });

      }
  }

  deleteFeed(e){

      let indexValue = e.target.getAttribute('value');
      let feed_data= e.target.getAttribute('feeddata');
      confirmAlert({
        title: '',                        
        message: 'Are you sure?',               
        childrenElement: () => '',       
        confirmLabel: 'Delete',                          
        cancelLabel: 'Cancel',                            
        onConfirm: () => this.deleteFeedAction(feed_data,indexValue),
        onCancel: () => '',      
      })
 
    

       
  }

  getUserFeed() {
  
    let data = JSON.parse(sessionStorage.getItem("userData"));
    this.setState({name:data[0].name});
    let userID = { user_id: data[0].user_id};

    if (data) {


        APImanager.get('/api/get-user-todo-list',userID , (err, response) => {

                if (err) {
                    //alert('check network console for error message');
                    console.log(response);
                } else {
                    this.setState({data: response.resource});
                    console.log(response);
                }

        });
    }
    
  }

  onChange(e){
    this.setState({userFeed:e.target.value});
   }
  logout(){
     sessionStorage.setItem("userData",'');
     sessionStorage.clear();
     this.setState({redirectToReferrer: true});
  }

  render() {
    if (this.state.redirectToReferrer) {
      return (<Redirect to={'/login'}/>)
    }

    return (
      <div className="row" id="Body">
        <div className="medium-12 columns">
            hi! {this.state.name}
        <a  onClick={this.logout} className="logout">Logout</a>
        <form onSubmit={this.feedUpdate} method="post">
            <input name="userFeed" onChange={this.onChange} value={this.state.userFeed} type="text" placeholder="TODO List"/>
            <input  type="submit" value="Post"  className="button" onClick={this.feedUpdate}/>
        </form>
        
        </div>
        <UserFeed feedData = {this.state.data}  deleteFeed = {this.deleteFeed} convertTime={this.convertTime} name={this.state.name}/>
        
      
      </div>
    );
  }
}

export default Home;