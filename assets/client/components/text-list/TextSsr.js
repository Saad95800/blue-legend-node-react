import React, { Component } from 'react';
import { Container, Row, Col, FormGroup, Label, Input } from 'reactstrap';
import {capitalizeFirstLetter} from './../functions';

export default class TextSsr extends Component {

  constructor(props){
    super(props);

    let texte = {};
    if(this.props.data.app == 'server'){
      texte = this.props.data.texte;
    }

    this.state = {
      texte: texte,
      categories: [],
      selText: '',
      french_value: 'TRADUCTION',
      msgBtnSave: 'Enregistrer',
      wysiwyg: false,
      dataPopup:{
        display: 'none', 
        top: 0, 
        left: 0
      },
      textTitle: texte.title,
      textContent: texte.content,
      textCategory: texte.owner_category,
      wysiwyg_bg_color: '#fff'
    }

  }

  render() {

    let wysiwygDisplay = 'none';
    let textDisplay = 'none';
    if(this.state.wysiwyg == true){
      wysiwygDisplay = 'block';
      textDisplay = 'none';
    }else{
      wysiwygDisplay = 'none';
      textDisplay = 'block';   
    }

    let text = <div>
                  <div className="display-flex-right" style={{marginTop: '20px'}}>
                    <div className="btn-forms" onClick={ () => {this.setState({wysiwyg: true})} }>Editer</div>
                  </div>
                    <div id="popupTrad" style={{display: this.state.dataPopup.display,flexDirection: 'column',justifyContent: 'center',alignItems: 'center',padding: '10px', padding: '10px 10px', zIndex: 1, backgroundColor: '#E7EDFD', width: '200px', minHeight: '90px', border: '1px solid black', position: 'absolute', top: this.state.dataPopup.top, left: this.state.dataPopup.left}}>
                      <div className="arrow-popuptrad"></div>
                      <div id="translationPopupText" className="text-center">
                      <div style={{margin: '10px'}}>{capitalizeFirstLetter(this.state.selText)}</div>
                    <div style={{margin: '10px', fontSize: '1.2em', fontWeight: 'bold'}}>{capitalizeFirstLetter(this.state.french_value)}</div>
                      </div>
                      <div id="btnSaveExpression" style={{width:'90px', height: '45px', cursor: 'pointer', color: 'white', fontWeight: 'bold', backgroundColor: '#08e608', borderRadius: '5px', textAlign: 'center', padding: '12px 0px'}}>{this.state.msgBtnSave}</div>
                    </div>
                  <div className="container-text-view" style={{marginTop: '20px'}} dangerouslySetInnerHTML={{ __html: this.state.texte.content }}></div>
                </div>;

    return (
        <div className="container-text-view container-page">
            <Container>
            <div className="block-text-add">
              <Row>
                <div className="main-titles">
                  TEXTE
                </div>
              </Row>
              <Row>
                <Col sm="12">
                  <div style={{display: textDisplay}}>
                    {text}
                  </div>
                </Col>
              </Row>
              <Row>
              <Col sm="12">
                <div className="container-wysiwig" style={{display: wysiwygDisplay,backgroundColor: this.state.wysiwyg_bg_color}}>
                </div>
              </Col>
              </Row>
              </div>
            </Container>
        </div>
    );

  }
  
  }