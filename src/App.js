import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Header from './components/Header/Header';
import Welcome from './components/Welcome/Welcome';
import MobileHeader from './components/MobileHeader/MobileHeader';
import Footer from './components/Footer/Footer';
import Routes from './routes';
import './styles/foundation.min.css';


class App extends Component {

constructor(props){
  super(props);
  this.state ={
    appName : "todolist"
  }
}


  render() {
    return (
      <div className="off-canvas-wrapper">
      <div className="off-canvas-wrapper-inner" data-off-canvas-wrapper>
      <div className="off-canvas-contain" data-off-canvas-contain>
      <MobileHeader name = {this.state.appName}/>
      <Header name = {this.state.appName}/>
      <Routes/>
      <hr/>
      <Footer/>
      </div>
      </div>
      </div>
    );
  }
}

ReactDom.render(<App/>,document.getElementById('root'));
