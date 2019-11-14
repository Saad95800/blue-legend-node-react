import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col, FormGroup, Label, Input } from 'reactstrap';
import {capitalizeFirstLetter} from './../functions';

export default class Text extends Component {

  constructor(props){
    super(props);
    this.state = {
      texte: {},
      texteContent: '',
      contentTextArea: '',
      categories: [],
      selText: '',
      french_value: '',
      msgBtnSave: 'Enregistrer',
      colorBtnSave: '#6592ff',
      wysiwyg: false,
      textTitle: '',
      textCategory: '',
      wysiwyg_bg_color: '#fff',
      type_text: ''
    }

    this.inputTitleText = document.querySelector("#title-text");
    this.selectCategory = document.querySelector("#select-category-text");

    axios({
      method: 'post',
      url: '/get-texte-ajax',
      responseType: 'json',
      data: {id: this.props.location.pathname.split("/")[2]}
    })
    .then((response) => {
      let text = response.data;
      this.setState({
        texte: text,
        texteContent: text.content,
        contentTextArea: text.contentTextArea,
        textTitle: text.title,
        textCategory: text.owner_category,
        type_text: text.type_text
      });
    })
    .catch( (error) => {
      console.log(error);
    });

    axios({
      method: 'post',
      url: '/categories-ajax',
      responseType: 'json',
      data: {}
    })
    .then((response) => {
      this.setState({categories: response.data});
    })
    .catch( (error) => {
      console.log(error);
    });

    let th = this;
    $(document).on('click', '.block-hover-word', function(e) {
      console.log('cliqued');
      let word = $(this).find('.hover-word').text();
      console.log($(this));
      th.setState({selText: word, french_value: $(this).find('.hover-word-french').text()});
      let ele = $('#popupTrad');
      $(this).find('.popup-hover-word').html('<div class="popup-trad" style="display:inline-block;margin-left: -130px;margin-top: 20px;">'+ele.html()+'</div>');
      $(this).find('#btnSaveExpression').remove();
    });
    
  }

  componentWillMount(){
    if(this.props.data.app == 'client'){
      this.props.changeColorItemNav("item-menu-text");
    }
  }

  changePopup(mouse){
    console.log(mouse);
      $('.popup-hover-word').html("");
      var ele = document.getElementById('popupTrad');
      var sel = window.getSelection();
      var rel1= document.createRange();
      rel1.selectNode(document.getElementById('cal1'));
      var rel2= document.createRange();
      rel2.selectNode(document.getElementById('cal2'));
      let selText = sel.toString().trim();
    if(selText != '' && selText != ' '){
      if(mouse == 'mouseUp'){
          /////////////////////////////////////////
          if (!sel.isCollapsed) {
              
            if(selText.length > 40){
              ele.style.display = 'block';
              this.setState({
                msgBtnSave: 'Maximum 40 caractères', 
                colorBtnSave: 'red'
              });
            }else{

              axios({
                method: 'post',
                url: '/check-expression-exist-ajax',
                responseType: 'json',
                data: {expression: selText}
              })
              .then((response) => {
                console.log(response);
                var r = sel.getRangeAt(0).getBoundingClientRect();
                var rb1 = rel1.getBoundingClientRect();
                var rb2 = rel2.getBoundingClientRect();
                ele.style.top = ((r.bottom - rb2.top)*100/(rb1.top-rb2.top)+20) + 'px'; //this will place ele below the selection
                ele.style.left = ((r.left - rb2.left)*100/(rb1.left-rb2.left)-90) + 'px'; //this will align the right edges together
                ele.style.display = 'block';
                this.setState({selText: selText});
                if(response.data.existUserSpace == 'no'){
                  // L'expression sélectionnéee n'éxiste pas dans l'espace de l'utilisateur
                  this.setState({
                    msgBtnSave: 'Enregistrer', 
                    colorBtnSave: '#6592ff', 
                    french_value: response.data.translation
                  });
                }else{
                  // L'expression sélectionnée éxiste en bdd
                  this.setState({
                    msgBtnSave: 'Déjà enregistré', 
                    colorBtnSave: '#727d97', 
                    french_value: response.data.translation
                  });
                }
    
              })
              .catch( (error) => {
                console.log(error);
              });

            }

          }
        
      }else{ // MouseDown
        ele.style.display = 'none';
        console.log("none btn")
        this.setState({
          msgBtnSave: 'Enregistrer', 
          french_value: '', selText: ''
        });
        $('.popup-hover-word').html("");
      }      
    }else{
      ele.style.display = 'none';
      this.setState({
        msgBtnSave: 'Enregistrer', 
        french_value: '', selText: ''
      });
    }

  }

  getSelectedText(){
    var selText = "";
    if (window.getSelection) {  // all browsers, except IE before version 9
        if (document.activeElement && 
                (document.activeElement.tagName.toLowerCase () == "textarea" || 
                 document.activeElement.tagName.toLowerCase () == "input")){
                  var text = document.activeElement.value;
                  selText = text.substring (document.activeElement.selectionStart, document.activeElement.selectionEnd);
        }else {
            var selRange = window.getSelection();
            selText = selRange.toString();
        }
    }else {
        if (document.selection.createRange) {
            var range = document.selection.createRange ();
            selText = range.text;
        }
    }
    return selText;
  }

  saveExpression(e){
    e.stopPropagation();
    if(this.state.msgBtnSave == 'Enregistrer'){
      axios({
        method: 'post',
        url: '/save-expression-ajax',
        responseType: 'json',
        data: {french_value: this.state.french_value, english_value: this.state.selText, id_text: this.state.texte.id}
      })
      .then((response) => {
        let data = response.data;
        if(response.statusText == 'OK'){
          this.setState({msgBtnSave: 'Enregistré !', colorBtnSave: '#08e608', texteContent: data.textHoverWords});
          setTimeout(() => {
            this.setState({msgBtnSave: 'Enregistrer', colorBtnSave: '#6592ff'});
            document.getElementById('popupTrad').style.display = 'none';
          }, 1000);
        }
      })
      .catch( (error) => {
        console.log(error);
      });      
    }

  }

  updateText(){

    let wysiwyg = document.getElementsByName("react-trumbowyg")[0];
    let divWysiwyg = document.querySelector("#react-trumbowyg");

    if(divWysiwyg.innerText == ''){
      this.props.viewMessageFlash('Le contenu du texte ne doit pas être vide.', true);
      divWysiwyg.style.backgroundColor = '#ff00001a';
      setTimeout(function(){divWysiwyg.style.backgroundColor = '#fff';}, 3000)
    }else{
      axios({
        method: 'post',
        url: '/update-texte-ajax',
        responseType: 'json',
        data: {id_text: this.props.location.pathname.split("/")[2], title: this.state.textTitle, content: wysiwyg.value, category: this.state.textCategory }
      })
      .then((response) => {
        if(response.statusText == 'OK'){
          let text = this.state.texte;
          text.content = wysiwyg.value;
          this.setState({texte: text, wysiwyg: false});
        }
      })
      .catch( (error) => {
        console.log(error);
      });
    }

  }

  render() {
    let options = this.state.categories.map((category, index) =>{
      return <option key={index} value={category.id}>{category.name}</option>
    });

    let textDisplay = 'block';

      let text = '';
      if(this.state.type_text == 'text'){

        let src = "http://localhost:1337/pages/text.html?data="+this.state.texteContent;
        let textEditUrl = "/texte-edit/"+this.state.text.id;
        text = <div>
                      <div className="display-flex-right" style={{marginTop: '20px'}}>
                        <a href={textEditUrl} className="btn-forms" onClick={ () => {this.setState({wysiwyg: true})} }>Editer</a>
                      </div>

                      <div 
                        id="container-text"
                        style={{marginTop: '20px'}} 
                        // onMouseUp={()=>{this.changePopup('mouseUp')}} 
                        // onMouseDown={()=>{this.changePopup('mouseDown')}} 
                        // dangerouslySetInnerHTML={{ __html: this.state.  }}
                      >
                        <iframe 
                          id="container-text-iframe" 
                          data-textcontent={this.state.texteContent}
                          data-textid={this.state.texte.id}
                          src={src}
                          style={{width: '100%', height: '1000px'}}
                        ></iframe>                        
                      </div>

                    </div>;
      }else if(this.state.type_text == 'pdf'){
        console.log(this.state.texte);
        let src = "http://localhost:1337/7/web/viewer.html?file="+this.state.texte.file_name_server;
        text = 
        <div>
          <div id="cal1">&nbsp;</div>
          <div id="cal2">&nbsp;</div>
          <div id="popupTrad" className="popup-trad">
              <div className="arrow-popuptrad"></div>
              <div id="translationPopupText" className="text-center">
              <div style={{margin: '10px'}}>{capitalizeFirstLetter(this.state.selText)}</div>
              <div style={{margin: '10px', fontSize: '1.2em', fontWeight: 'bold'}}>{capitalizeFirstLetter(this.state.french_value)}</div>
              </div>
              <div className="display-flex-center">
                <div 
                  id="btnSaveExpression" 
                  onClick={this.saveExpression.bind(this)} 
                  style={{backgroundColor: this.state.colorBtnSave}}
                >
                  {this.state.msgBtnSave}
                </div>
              </div>
          </div>
          <iframe 
            className="iframe-pdf" 
            src={src}
          ></iframe>
        </div>
      }

    return (
        <div className="container-text-view container-page display-flex-center" style={{padding: '0px 0px'}}>
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
            </Row>
            </div>
          </Container>
      </div>
    );

  }
  
  }
