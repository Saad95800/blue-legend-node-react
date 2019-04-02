import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import NavBar from './navbar/Navbar';
import Home from './Home';
import TextAdd from './TextAdd';
import TextList from './TextList';
import CategoryList from './CategoryList';
import Revision from './Revision';

export default class Appclient extends Component {
  render() {
    return (
      <BrowserRouter>
            <div className="body-container">
                <Route component={ () => { return <NavBar data={{url: this.props.data.url}}/>} }/>
                <div className="container">
                  <AnimatedSwitch
                          atEnter={{ opacity: 0 }}
                          atLeave={{ opacity: 0 }}
                          atActive={{ opacity: 1 }}
                          className="switch-wrapper"
                          >
                          <Route exact path="/" component={function(){ return <Home data={{url: '/revision'}}/>}} />
                          <Route path="/accueil" component={function(){ return <Home data={{url: '/revision'}}/>}} />
                          <Route path="/ajout-texte" component={function(){ return <TextAdd data={{url: '/revision'}}/>}} />
                          <Route path="/texte-liste" component={function(){ return <TextList data={{url: '/revision'}}/>}} />
                          <Route path="/categories-liste" component={function(){ return <CategoryList data={{url: '/revision'}}/>}} />
                          <Route path="/revision" component={function(){ return <Revision data={{url: '/revision'}}/>}} />
                  </AnimatedSwitch>
                </div>
            </div>
      </BrowserRouter>
    );
  }
}
