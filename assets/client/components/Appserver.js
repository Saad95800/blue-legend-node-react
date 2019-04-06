import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import NavBar from './navbar/Navbar';
import Home from './home/Home';
import TextAddSrr from './text-add/TextAddSrr';
import TextList from './text-list/TextList';
import Text from './text-list/Text';
import CategoryList from './category/CategoryList';
import Revision from './revision/Revision';

export default class Appserver extends Component {
  render() {

    let data = this.props.data;
    data.app = 'server';

    return (
          <div className="body-container">
          <Route render={ (props) => { return <NavBar {...props} data={data}/>} }/>
          <div className="container">
            <AnimatedSwitch
                    atEnter={{ opacity: 0 }}
                    atLeave={{ opacity: 0 }}
                    atActive={{ opacity: 1 }}
                    className="switch-wrapper"
                    >
                    <Route exact path="/" render={ (props) => { return <Home {...props} data={data}/>} } />
                    <Route path="/accueil" render={ (props) => { return <Home {...props} data={data}/>} } />
                    <Route path="/ajout-texte" render={ (props) => { return <TextAddSrr {...props} data={data}/>} } />
                    <Route path="/texte-liste" render={ (props) => { return <TextList {...props} data={data}/>} } />
                    <Route path="/textes/category/:id_category" render={ (props) => { return <TextList {...props} data={data}/>} } />
                    <Route path="/categories-liste" render={ (props) => { return <CategoryList {...props} data={data}/>} } />
                    <Route path="/texte/:id_texte" render={ (props) => { return <Text {...props} data={data}/>} } />

                    <Route path="/revision" render={ (props) => { return <Revision {...props} data={data} step={'text-list'}/>} } />
                    <Route path="/revision-content/texte/:id_texte" render={ (props) => { return <Revision {...props} data={data} step={'content-review'}/>} } />
                    <Route path="/revision-mode/texte/:id_texte/content/:num_content" render={ (props) => { return <Revision {...props} data={data} step={'mode'}/>} } />
                    <Route path="/revision-btn-begin/texte/:id_texte/content/:num_content/mode/:num_mode" render={ (props) => { return <Revision {...props} data={data} step={'btn-begin'}/>} } />
                    <Route path="/revision-serie/texte/:id_texte/content/:num_content/mode/:num_mode/serie/:id_serie" render={ (props) => { return <Revision {...props} data={data} step={'serie'}/>} } />
            </AnimatedSwitch>
          </div>
      </div>
    );
  }
}
