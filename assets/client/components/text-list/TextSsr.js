import React, { Component } from 'react';

export default class TextSsr extends Component {

  constructor(props){
    super(props);

    let texte = {};
    if(this.props.data.app == 'server'){
      texte = this.props.data.texte;
    }

    this.state = {
      texte: texte,
      selText: '',
      french_value: '',
      msgBtnSave: 'Enregistrer',
      wysiwyg: false,
      dataPopup:{
        display: 'none', 
        top: 0, 
        left: 0
      }
    }
  }

  render() {

    return (
            <div>
                <div>
                  <h3 style={{textAlign: 'center'}}>{this.state.texte.title}</h3>
                  <div id="popupTrad" style={{display: this.state.dataPopup.display,flexDirection: 'column',justifyContent: 'center',alignItems: 'center',padding: '10px', padding: '10px 10px', zIndex: 1, backgroundColor: '#e8ffe8', width: '200px', minHeight: '90px', border: '1px solid black', borderRadius: '10px', position: 'absolute', top: this.state.dataPopup.top, left: this.state.dataPopup.left}}>
                      <div id="translationPopupText">
                        <div style={{margin: '10px'}}>{this.state.selText}</div>
                        <div style={{margin: '10px'}}>{this.state.french_value}</div>
                      </div>
                      <div id="btnSaveExpression" style={{width:'90px', height: '45px', cursor: 'pointer', color: 'white', fontWeight: 'bold', backgroundColor: '#08e608', borderRadius: '5px', textAlign: 'center', padding: '12px 0px'}}>{this.state.msgBtnSave}</div>
                    </div>
                  <div dangerouslySetInnerHTML={{ __html: this.state.texte.content }} style={{padding: '10px', border: '1px solid black', borderRadius: '10px', overflow: 'scroll'}}></div>                  
                </div>

                <div>
                  {this.state.wysiwyg}
                </div>

            </div>
    );

  }
  
  }