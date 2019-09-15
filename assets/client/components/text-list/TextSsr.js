import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import {capitalizeFirstLetter} from './../functions';

export default class TextSsr extends Component {

  constructor(props){
    super(props);

    let texte = this.props.data.texte;
    let contentText = texte.content;
    let contentTextArea = texte.contentTextArea;
    this.state = {
      texte: texte,
      texteContent: contentText,
      contentTextArea: contentTextArea,
      categories: [],
      selText: '',
      french_value: '',
      msgBtnSave: 'Enregistrer',
      colorBtnSave: '#3b74fe',
      wysiwyg: false,
      textTitle: texte.title,
      textCategory: texte.owner_category,
      wysiwyg_bg_color: '#fff'
    }

    this.type_text = texte.type_text;

  }

  render() {
    let contentText = this.state.texteContent;
    let wysiwygDisplay = 'none';
    let textDisplay = 'none';
    if(this.state.wysiwyg == true){
      wysiwygDisplay = 'block';
      textDisplay = 'none';
    }else{
      wysiwygDisplay = 'none';
      textDisplay = 'block';   
    }

    let text = '';
    
    if(this.type_text == 'text'){
      text = <div>
                    <div className="display-flex-right" style={{marginTop: '20px'}}>
                      <div className="btn-forms" onClick={ () => {this.setState({wysiwyg: true})} }>Editer</div>
                    </div>
                    <div id="cal1">&nbsp;</div>
                    <div id="cal2">&nbsp;</div>
                    <div id="popupTrad" className="popup-trad">
                        <div className="arrow-popuptrad"></div>
                        <div id="translationPopupText" className="text-center">
                        <div style={{margin: '10px'}}>{capitalizeFirstLetter(this.state.selText)}</div>
                        <div style={{margin: '10px', fontSize: '1.2em', fontWeight: 'bold'}}>{capitalizeFirstLetter(this.state.french_value)}</div>
                        </div>
                        <div className="display-flex-center">
                          <div id="btnSaveExpression" style={{backgroundColor: this.state.colorBtnSave}}>{this.state.msgBtnSave}</div>
                        </div>
                    </div>
                    <div id="container-text" style={{marginTop: '20px'}} dangerouslySetInnerHTML={{ __html: this.state.texteContent }}></div>
                  </div>;      
    }else{
      console.log(this.props.data.texte);
      let src = "http://blue-legend.com/7/web/viewer.html?file="+this.props.data.texte.file_name_server;
      text = <iframe className="iframe-pdf" src={src}></iframe>
    }

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