import React, { Component } from 'react';
import axios from 'axios';
import Trumbowyg from 'react-trumbowyg';
import { Container, Row, Col, FormGroup, Label, Input } from 'reactstrap';
import {capitalizeFirstLetter} from './../functions';

export default class Text extends Component {

  constructor(props){
    super(props);

    this.state = {
      texte: {},
      categories: [],
      selText: '',
      french_value: 'Trad',
      msgBtnSave: 'Enregistrer',
      colorBtnSave: '#3b74fe',
      wysiwyg: false,
      dataPopup:{
        display: 'none', 
        top: 0, 
        left: 0
      },
      textTitle: '',
      textCategory: '',
      wysiwyg_bg_color: '#fff'
    }

  }

  componentDidMount(){

    this.inputTitleText = document.querySelector("#title-text");
    this.selectCategory = document.querySelector("#select-category-text");

    axios({
      method: 'post',
      url: '/get-texte-ajax',
      responseType: 'json',
      data: {id: this.props.location.pathname.split("/")[2]}
    })
    .then((response) => {
      let text = response.data[0];
      this.setState({
        texte: text,
        textTitle: text.title,
        textCategory: text.owner_category
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
    // this.addLinksToWords();
  }
  addLinksToWords(){
    let new_html = this.state.texte.content.replace(' as ', ' <span style="color:blue">as</span> ');
    this.setState({texte: {content: new_html}});
  }

  changePopup(mouse){
      var ele = document.getElementById('popupTrad');
      var sel = window.getSelection();
      var rel1= document.createRange();
      rel1.selectNode(document.getElementById('cal1'));
      var rel2= document.createRange();
      rel2.selectNode(document.getElementById('cal2'));
    if(mouse == 'mouseUp'){
      if (!sel.isCollapsed) {
            
        var r = sel.getRangeAt(0).getBoundingClientRect();
        var rb1 = rel1.getBoundingClientRect();
        var rb2 = rel2.getBoundingClientRect();
        ele.style.top = ((r.bottom - rb2.top)*100/(rb1.top-rb2.top)+20) + 'px'; //this will place ele below the selection
        ele.style.left = ((r.left - rb2.left)*100/(rb1.left-rb2.left)-90) + 'px'; //this will align the right edges together
        this.setState({selText: sel.toString()});
        ele.style.display = 'block';
        if(sel.toString().length > 40){
          this.setState({msgBtnSave: 'Maximum 40 caractères', colorBtnSave: 'red'});
        }else{
          this.setState({msgBtnSave: 'Enregistrer', colorBtnSave: '#3b74fe'});
        }
        // axios({
        //   method: 'post',
        //   url: 'https://api.deepl.com/v2/translate?auth_key=&text='+sel.toString()+'&target_lang=fr&source_lang=en',
        //   // url: `https://translation.googleapis.com/language/translate/v2?source=en&target=fr&key=&q=${sel.toString()}`,
        //   responseType: 'json',
        //   headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Accept': '*/*'}
        // })
        // .then((response) => {
        //   console.log(response);
        //   this.setState({french_value: response.data.translations[0].text});
        // })
        // .catch( (error) => {
        //   console.log(error);
        // });
    }
    }else{
      ele.style.display = 'none';
      this.setState({selText: ''});
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
        if (document.selection.createRange) {       // Internet Explorer
            var range = document.selection.createRange ();
            selText = range.text;
        }
    }
    return selText;
  }

  // viewPopup(e) {
  //   let selText = this.getSelectedText();
  //   if(selText != '' && selText != ' ' && selText != '\n'){
  //     this.setState({selText: selText});
  //     console.log(selText);
  //     $('#popupTrad').css({
  //       left:  e.pageX - 350,
  //       top:   e.pageY - 90,
  //       display: 'flex'
  //     });

  //     axios({
  //       method: 'post',
  //       url: 'https://api.deepl.com/v2/translate?auth_key=de9c22f0-b3e2-6694-d19a-e6c106c773d2&text='+selText+'&target_lang=fr&source_lang=en',
  //       responseType: 'json',
  //       headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Accept': '*/*'}
  //     })
  //     .then((response) => {
  //       console.log(response);
  //       this.setState({french_value: response.data.translations[0].text});
  //     })
  //     .catch( (error) => {
  //       console.log(error);
  //     });
  //   }else{
  //     document.querySelector('#popupTrad').style.display = 'none';
  //     this.setState({msgBtnSave: 'Enregistrer'})
  //   }
  // }

  saveExpression(){

    if(this.state.msgBtnSave == 'Enregistrer'){
      axios({
        method: 'post',
        url: '/save-expression-ajax',
        responseType: 'json',
        data: {french_value: this.state.french_value, english_value: this.state.selText, id_text: this.state.texte.id}
      })
      .then((response) => {
        console.log(response);
        if(response.statusText == 'OK'){
          this.setState({msgBtnSave: 'Enregistré !', colorBtnSave: '#08e608'});
          setTimeout(() => {this.setState({msgBtnSave: 'Enregistrer', colorBtnSave: '#3b74fe'})}, 1000);
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
        console.log(response);
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

    let wysiwygDisplay = 'none';
    let textDisplay = 'none';
    if(this.state.wysiwyg == true){
      wysiwygDisplay = 'block';
      textDisplay = 'none';
    }else{
      wysiwygDisplay = 'none';
      textDisplay = 'block';   
    }

      let wysiwyg = <div>
                  <Row style={{marginTop: '20px'}}>
                    <Col sm="12">
                      <Label for="select-category-text" sm={2}>Catégorie</Label>
                      <FormGroup row>
                        <Col sm={12}>
                          <Input value={this.state.textCategory} type="select" id="select-category-text" onChange={()=>{this.setState({textCategory: document.querySelector("#select-category-text").value})}}>
                            <option key="0" value="0">---</option>
                            {options}
                          </Input>
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="12">
                      <Label for="title-text" sm={3}>Titre du texte</Label>
                      <FormGroup row>
                        <Col sm={12}>
                          <Input value={this.state.textTitle} type="text" onChange={() => {this.setState({textTitle: document.querySelector("#title-text").value})}} autoComplete="off" id="title-text" />
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>
                  <div className="display-flex-right">
                    <div className="btn-forms" style={{marginRight: '5px'}} onClick={this.updateText.bind(this)}>Enregistrer</div>
                    <div className="btn-forms" style={{backgroundColor: '#DF2645'}} onClick={() => {this.setState({wysiwyg: false})}}>Annuler</div>
                  </div>
                  <div  style={{backgroundColor: this.state.wysiwyg_bg_color}}>
                    <Trumbowyg id='react-trumbowyg'
                      buttons={
                          [
                              ['viewHTML'],
                              ['formatting'],
                              'btnGrp-semantic',
                              ['link'],
                              ['insertImage'],
                              'btnGrp-justify',
                              'btnGrp-lists',
                              ['table'], // I ADDED THIS FOR THE TABLE PLUGIN BUTTON
                              ['fullscreen']
                          ]
                      }
                      data={this.state.texte.content}
                      placeholder='Entrez votre texte'
                      ref="trumbowyg"
                    />
                  </div>
              </div>;

      let text = <div>
                    <div className="display-flex-right" style={{marginTop: '20px'}}>
                      <div className="btn-forms" onClick={ () => {this.setState({wysiwyg: true})} }>Editer</div>
                    </div>
                    <div id="cal1">&nbsp;</div>
                    <div id="cal2">&nbsp;</div>
                    <div id="popupTrad" style={{display: 'none',flexDirection: 'column',justifyContent: 'center',alignItems: 'center',padding: '10px', padding: '10px 10px', zIndex: 1, backgroundColor: '#E7EDFD', minWidth: '200px', minHeight: '90px', border: '1px solid black', position: 'absolute'}}>
                        <div className="arrow-popuptrad"></div>
                        <div id="translationPopupText" className="text-center">
                        <div style={{margin: '10px'}}>{capitalizeFirstLetter(this.state.selText)}</div>
                        <div style={{margin: '10px', fontSize: '1.2em', fontWeight: 'bold'}}>{capitalizeFirstLetter(this.state.french_value)}</div>
                        </div>
                        <div className="display-flex-center">
                          <div id="btnSaveExpression" onClick={this.saveExpression.bind(this)} style={{width:'90px', minHeight: '45px', cursor: 'pointer', color: 'white', fontWeight: 'bold', backgroundColor: this.state.colorBtnSave, borderRadius: '5px', textAlign: 'center', padding: '12px 0px'}}>{this.state.msgBtnSave}</div>
                        </div>
                    </div>
                    <div id="container-text" style={{marginTop: '20px'}} onMouseUp={()=>{this.changePopup('mouseUp')}} onMouseDown={()=>{this.changePopup('mouseDown')}} dangerouslySetInnerHTML={{ __html: this.state.texte.content }}></div>
                  </div>;

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
            <Col sm="12">
              <div className="container-wysiwig" style={{display: wysiwygDisplay,backgroundColor: this.state.wysiwyg_bg_color}}>
                {wysiwyg}
              </div>
            </Col>
            </Row>
            </div>
          </Container>
      </div>
    );

  }
  
  }
