import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import NavBar from './navbar/Navbar';
import Home from './home/Home';
import TextAdd from './text-add/TextAdd';
import TextList from './text-list/TextList';
import Text from './text-list/Text';
import CategoryList from './category/CategoryList';
import Revision from './revision/Revision';
import SwipeableRoutes from "react-swipeable-routes";

let styles = {
  mfs: {
    width: '100%', 
    height: '0px', 
    backgroundColor: '#00ba62', 
    color: 'white',
    position: 'fixed',
    top: '0px',
    zIndex: '1',
    textAlign: 'center',
    transition: 'height 0.5s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}

export default class Appclient extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      data: this.props.data
    }
  }

  viewMessageFlash(msg, error){
    
    let mf = document.querySelector("#message-flash");
    mf.style.height = '40px';
    mf.style.height = '40px';
    mf.innerHTML = msg;
    if(error){
      mf.style.backgroundColor = 'rgb(255, 29, 22)';
    }else{
      mf.style.backgroundColor = '#00ba62';
    }
    setTimeout(function(){
      mf.style.height = '0px';
      mf.style.padding = '0px';
      mf.innerHTML = '';
    }, 3000);

  }

  render() {

    let data = this.props.data;
    data.app = 'client';

    return (
      <BrowserRouter>
            <div className="body-container">
                <div id="message-flash" style={styles.mfs}></div>
                <Route render={ (props) => { return <NavBar {...props} data={{url: this.props.data.url}}/>} }/>
                <div className="container">
                  <AnimatedSwitch
                    atEnter={{ opacity: 0 }}
                    atLeave={{ opacity: 0 }}
                    atActive={{ opacity: 1 }}
                    className="switch-wrapper">
                          <Route exact path="/" render={(props) => { return <Home {...props} data={this.state.data}/>}} />
                          <Route path="/accueil" render={(props) => { return <Home {...props} data={this.state.data}/>}} />

                          <Route path="/ajout-texte" render={(props) => { return <TextAdd {...props} data={this.state.data} viewMessageFlash={this.viewMessageFlash}/>}} />

                          <Route path="/texte-liste" render={(props) => { return <TextList {...props} data={this.state.data}/>}} />
                          <Route path="/textes/category/:id_category" render={(props) => { return <TextList {...props} data={this.state.data}/>}} />
                          <Route path="/categories-liste" render={(props) => { return <CategoryList {...props} data={this.state.data}/>}} />
                          <Route path="/texte/:id_texte" render={ (props) => { return <Text {...props} data={this.state.data}/>} } />
                          {/* <SwipeableRoutes> */}
                            <Route key={1} path="/revision" render={(props) => { return <Revision {...props} data={this.state.data} step={'text-list'} flag={'toto'} />}} />
                            <Route key={2} path="/revision-content/texte/:id_texte" render={(props) => { return <Revision {...props} data={this.state.data} step={'content-review'}/>}} />
                            <Route key={3} path="/revision-mode/texte/:id_texte/content/:num_content" render={(props) => { return <Revision {...props} data={this.state.data} step={'mode'}/>}} />
                            <Route key={4} path="/revision-btn-begin/texte/:id_texte/content/:num_content/mode/:num_mode" render={(props) => { return <Revision {...props} data={this.state.data} step={'btn-begin'}/>}} />
                            <Route key={5} path="/revision-serie/texte/:id_texte/content/:num_content/mode/:num_mode/serie/:id_serie" render={(props) => { return <Revision {...props} data={this.state.data} step={'serie'}/>}} />
                          {/* </SwipeableRoutes> */}
                  </AnimatedSwitch>
                </div>
            </div>
      </BrowserRouter>
    );
  }
}