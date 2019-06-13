import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Row} from 'reactstrap';
import {capitalizeFirstLetter} from './../functions';

export default class TextListRevision extends Component {

  constructor(props){
    super(props);
  }

  render() {
    let textes = '';
    if(this.props.data.textes.length > 0){

      textes = this.props.data.textes.map((texte, index) => {
        let link = '/revision-serie-list/text/'+texte.id;
        let textTitle = texte.title.length > 20 ? texte.title.substring(0, 20)+'...' : texte.title;
        return  <div className="col-xs-4 col-sm-2" key="index">
                  <Link
                    to={link}
                    key={index}>
                    <div key={texte.id} className="list-hover-item">
                      <div className="display-flex-center" style={{textAlign: 'center', height: '40px'}}>{ capitalizeFirstLetter(textTitle) }</div>
                      <div style={{'textAlign': 'center'}}>
                      <span className="img-item-liste-texte"></span>
                      </div>
                    </div>
                  </Link>
                </div>;
        });
    }


    return (
            <div className="container-revision-text-list">
                <Row>
                  {textes}
                </Row>
            </div>
    );

  }
}