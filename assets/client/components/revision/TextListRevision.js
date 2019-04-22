import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class TextListRevision extends Component {

  constructor(props){
    super(props);
  }

  render() {
    let textes = '';

    if(this.props.data.textes.length > 0){
      textes = this.props.data.textes.map( (texte) => {
        let link = '/revision-serie-list/text/'+texte.id;
        let textTitle = texte.title.length > 20 ? texte.title.substring(0, 20)+'...' : texte.title;
        return <Link
                to={link}
                id={this.props.id}>
                <div key={texte.id} style={{display: 'inline-block', borderRadius: '5px', margin: '10px', width: '120px'}} className="hover-item">
                  <div style={{textAlign: 'center'}}>{textTitle}</div>
                  <div style={{width: '90px', height: '70px', 'textAlign': 'center'}}>
                  <span className="img-item-liste-texte"></span>
                  </div>  
                </div>
               </Link>;
      });
    }


    return (
            <div>
              {textes}
            </div>
    );

  }
}