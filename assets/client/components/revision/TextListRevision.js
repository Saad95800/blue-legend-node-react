import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class textListRevision extends Component {

  constructor(props){
    super(props);
  }

  render() {
console.log(this.props.data.textes);
    let textes = '';

    if(this.props.data.textes.length > 0){
      textes = this.props.data.textes.map( (texte) => {
        return <div key={texte.id} style={{display: 'inline-block', borderRadius: '5px'}} className="hover-item">
                  <div style={{textAlign: 'center'}}>{texte.title}</div>
                  <div style={{width: '90px', height: '70px', 'textAlign': 'center'}}>
                  <Link
                  to={'/revision-content/texte/'+texte.id}
                  id={this.props.id}>
                  <span className="img-item-liste-texte"></span>
                  </Link>
                  </div>  
               </div>;
      });
    }


    return (
            <div>
              {textes}
            </div>
    );

  }
}