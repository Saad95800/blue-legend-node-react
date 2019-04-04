import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import NavBar from './navbar/Navbar';
import Home from './Home';
import TextAdd from './TextAdd';
import TextList from './TextList';
import Text from './Text';
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
                  className="switch-wrapper">
                          <Route exact path="/" component={() => { return <Home data={{app: 'client', url: this.props.data.url}}/>}} />
                          <Route path="/accueil" component={() => { return <Home data={{app: 'client', url: this.props.data.url}}/>}} />
                          <Route path="/ajout-texte" component={() => { return <TextAdd data={{app: 'client', url: this.props.data.url}}/>}} />
                          <Route path="/texte-liste" component={() => { return <TextList data={{app: 'client', url: this.props.data.url}}/>}} />
                          <Route path="/textes/category/:id_category" component={() => { return <TextList data={{app: 'client', url: this.props.data.url}}/>}} />
                          <Route path="/categories-liste" component={() => { return <CategoryList data={{app: 'client', url: this.props.data.url}}/>}} />
                          <Route path="/revision" component={() => { return <Revision data={{app: 'client', url: this.props.data.url}}/>}} />
                          <Route path="/texte/:id_texte" component={ () => { return <Text data={{app: 'client', url: this.props.data.url}}/>} } />
                  </AnimatedSwitch>
                </div>
            </div>
      </BrowserRouter>
    );
  }
}
