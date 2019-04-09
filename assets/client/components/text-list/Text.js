import React, { Component } from 'react';
import axios from 'axios';
import h2p from 'html2plaintext';

export default class Text extends Component {

  constructor(props){
    super(props);

    let texte = {};
    if(this.props.data.app == 'server'){
      texte = this.props.data.texte;
    }

    this.state = {
      texte: texte
    }
  }

  componentDidMount(){
    
    axios({
      method: 'post',
      url: '/get-texte-ajax',
      responseType: 'json',
      data: {id: this.props.location.pathname.split("/")[2]}
    })
    .then((response) => {
      let text = response.data[0];
      // text.content = h2p(text.content);
      this.setState({texte: text});
    })
    .catch( (error) => {
      console.log(error);
    });

  }

    render() {

      return (
              <div>
                 <h3>{this.state.texte.title}</h3>
                 <div>{this.state.texte.content}</div>
              </div>
      );

    }

  }