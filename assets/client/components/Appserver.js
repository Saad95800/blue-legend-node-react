import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import NavBar from './navbar/Navbar';
import Home from './home/Home';
import TextAddSrr from './text-add/TextAddSrr';
import TextList from './text-list/TextList';
import TextSsr from './text-list/TextSsr';
import CategoryList from './category/CategoryList';
import CategoryAdd from './category/CategoryAdd';
import RevisionSsr from './revision/RevisionSsr';
import CustomSeriesList from './revision/CustomSeriesList';
import AddCustomSerie from './revision/AddCustomSerie';
// import SwipeableRoutes from "react-swipeable-routes";

let styles = {
  mfs: {
    width: '100%', 
    height: '0px', 
    backgroundColor: '#00ba62', 
    color: 'white',
    position: 'fixed',
    top: '0px',
    zIndex: '2',
    textAlign: 'center',
    transition: 'height 0.5s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold'
  }
}

export default class Appserver extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      data: this.props.data
    }
  }
  
  render() {

    let data = this.props.data;

    return (
          <div className="body-container">
          <div id="message-flash" style={styles.mfs}></div>
          
          <div className="container-app">
          
            <AnimatedSwitch
                    atEnter={{ opacity: 0 }}
                    atLeave={{ opacity: 0 }}
                    atActive={{ opacity: 1 }}
                    className="switch-wrapper"
                    >
                    {/* <Route exact path="/" render={ (props) => { return <Home {...props} data={data}/>} } /> */}
                    <Route path="/accueil" render={ (props) => { return <Home {...props} data={data}/>} } />
                    <Route path="/ajout-texte" render={ (props) => { return <TextAddSrr {...props} data={data}/>} } />
                    <Route path="/texte-liste" render={ (props) => { return <TextList {...props} data={data}/>} } />
                    <Route path="/textes/category/:id_category" render={ (props) => { return <TextList {...props} data={data}/>} } />
                    <Route path="/categories-liste" render={ (props) => { return <CategoryList {...props} data={data}/>} } />
                    <Route path="/categorie-ajout" render={(props) => { return <CategoryAdd {...props} data={data}/>}} />
                    <Route path="/texte/:id_texte" render={ (props) => { return <TextSsr {...props} data={data}/>} } />
                    {/* <SwipeableRoutes> */}
                      <Route path="/revision" render={ (props) => { return <RevisionSsr {...props} data={data} step={'text-list'}/>} } />
                      <Route path="/revision-serie-list/text/:id_text" render={(props) => { return <RevisionSsr {...props} data={data} step={'serie-list'}/>}} />
                      <Route path="/revision-content/text/:id_text/serie/:id_serie" render={ (props) => { return <RevisionSsr {...props} data={data} step={'content-review'}/>} } />
                      <Route path="/revision-mode/texte/:id_texte/serie/:id_serie/content/:num_content" render={ (props) => { return <RevisionSsr {...props} data={data} step={'mode'}/>} } />
                      <Route path="/revision-btn-begin/texte/:id_texte/serie/:id_serie/content/:num_content/mode/:num_mode" render={ (props) => { return <RevisionSsr {...props} data={data} step={'btn-begin'}/>} } />
                      <Route path="/revision-serie/texte/:id_texte/serie/:id_serie/content/:num_content/mode/:num_mode" render={ (props) => { return <RevisionSsr {...props} data={data} step={'serie'}/>} } />
                      <Route path="/custom-series-list" render={ (props) => { return <CustomSeriesList {...props} data={data} />} } />
                      <Route path="/add-custom-serie" render={ (props) => { return <CustomSeriesList {...props} data={data} />} } />
                    {/* </SwipeableRoutes> */}
            </AnimatedSwitch>
            </div>
          <Route render={ (props) => { return <NavBar {...props} data={data}/>} }/>
      </div>
    );
  }
}