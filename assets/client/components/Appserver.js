import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import NavBar from './navbar/Navbar';
import Home from './Home';
import TextAddSrr from './TextAddSrr';
import TextList from './TextList';
import Text from './Text';
import CategoryList from './CategoryList';
import Revision from './Revision';

export default class Appserver extends Component {
  render() {

    return (
          <div className="body-container">
          <Route component={ () => { return <NavBar data={{app: 'server', url: this.props.data.url}}/>} }/>
          <div className="container">
            <AnimatedSwitch
                    atEnter={{ opacity: 0 }}
                    atLeave={{ opacity: 0 }}
                    atActive={{ opacity: 1 }}
                    className="switch-wrapper"
                    >
                    <Route exact path="/" component={ () => { return <Home data={{app: 'server', url: this.props.data.url}}/>} } />
                    <Route path="/accueil" component={ () => { return <Home data={{app: 'server', url: this.props.data.url}}/>} } />
                    <Route path="/ajout-texte" component={ () => { return <TextAddSrr data={{app: 'server', url: this.props.data.url}}/>} } />
                    <Route path="/texte-liste" component={ () => { return <TextList data={{app: 'server', url: this.props.data.url, data: this.props.data }}/>} } />
                    <Route path="/textes/category/:id_category" component={ () => { return <TextList data={{app: 'server', url: this.props.data.url, data: this.props.data }}/>} } />
                    <Route path="/categories-liste" component={ () => { return <CategoryList data={{app: 'server', url: this.props.data.url, data: this.props.data}}/>} } />
                    <Route path="/revision" component={ () => { return <Revision data={{app: 'server', url: this.props.data.url, data: this.props.data}}/>} } />
                    <Route path="/texte/:id_texte" component={ () => { return <Text data={{app: 'server', url: this.props.data.url, data: this.props.data}}/>} } />
            </AnimatedSwitch>
          </div>
      </div>
    );
  }
}
