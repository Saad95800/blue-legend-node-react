import React, { Component } from 'react';

export default class Text extends Component {

  constructor(props){
    super(props);

    let texte = {};
    if(this.props.data.app == 'client'){
      texte = fetch("/text/list").then(function(response){
        console.log(response);
      });
      texte = {'id': 200, title: 'titre ajax', content: 'contenu ajax'};
    }else{
      texte = this.props.data.data.texte;
    }

    this.state = {
      texte: texte
    }
  }

    render() {

    // let texte = <div>{this.state.texte}</div>;
      return (
        
              <div>
                 <h3>{this.state.texte.title}</h3>
                 <div>{this.state.texte.content}</div>
              </div>
      );

    }

  }