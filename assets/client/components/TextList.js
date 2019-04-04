import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class TextList extends Component {

  constructor(props){
    super(props);

    let textes = [];
    
    if(this.props.data.app == 'client'){ // AppClient

    }else{// AppServer
      textes = this.props.data.data.textes;
    }
    this.state = {
      textes: textes
    }
  }

  componentDidMount(){
    fetch("/textes-ajax", {
      method: 'get',
    })
    .then((resp) => resp.json())
    .then( (textes) => {
      console.log(textes);
      this.setState({textes: textes});
    });
  }
    render() {

    let textes = this.state.textes.map((texte) => {
      return <div key={texte.id} style={{display: 'inline-block', borderRadius: '5px'}} className="hover-item">
                <div style={{textAlign: 'center'}}>{texte.title}</div>
                <div style={{width: '90px', height: '70px', 'textAlign': 'center'}}>
                <Link
                to={'/texte/'+texte.id}
                className={this.props.classItem}
                id={this.props.id}>
                <span className="img-item-liste-texte"></span>
                </Link>
                </div>
             </div>;
    });
      return (
              <div>
                 <h3>Liste des textes</h3>
                 {textes}
              </div>
      );
    }

  }