import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class TextList extends Component {

  constructor(props){
    super(props);

    let textes = [];
    let id_category = '';
    
    if(this.props.data.app == 'server'){ // AppServer
      textes = this.props.data.data.textes;
      id_category = this.props.data.data.id_category;
    }
    this.state = {
      textes: textes,
      id_category: id_category
    }

  }

  componentDidMount(){

    let data = {};
    let url = window.location.href.split("//")[1].replace(window.location.href.split("//")[1].split("/")[0], "");

    if(this.props.data.app == 'client'){
      
      if( url.indexOf('textes/category') != -1 ){

        data = {
          id_category: url.split("/")[3]
        }
      }

      axios({
        method: 'post',
        url: '/textes-ajax',
        responseType: 'json',
        data: data
      })
      .then((response) => {
        this.setState({textes: response.data, id_category:url.split("/")[3]});
      })
      .catch( (error) => {
        console.log(error);
      });

    }

  }
    render() {

    let textes = this.state.textes.map((texte) => {
      return <div key={texte.id} style={{display: 'inline-block', borderRadius: '5px'}} className="hover-item">
                <div style={{textAlign: 'center'}}>{texte.title}</div>
                <div style={{width: '90px', height: '70px', 'textAlign': 'center'}}>
                <Link
                to={'/texte/'+texte.id}
                id={this.props.id}>
                <span className="img-item-liste-texte"></span>
                </Link>
                </div>  
             </div>;
    });
      return (
              <div>
                 {textes}
              </div>
      );
    }

  }