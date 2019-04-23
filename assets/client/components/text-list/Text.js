import React, { Component } from 'react';
import axios from 'axios';
import Trumbowyg from 'react-trumbowyg';

export default class Text extends Component {

  constructor(props){
    super(props);

    let texte = {};
    if(this.props.data.app == 'server'){
      texte = this.props.data.texte;
    }

    this.state = {
      texte: texte,
      selText: '',
      french_value: '...',
      msgBtnSave: 'Enregistrer',
      wysiwyg: false,
      dataPopup:{
        display: 'none', 
        top: 0, 
        left: 0
      }
    }
  }

  componentDidMount(){

    axios({
      method: 'post',
      url: '/get-texte-ajax',
      responseType: 'json',
      data: {id: this.props.location.pathname.split("/")[2]}
    })
    .then((response) => {
      let text = response.data[0];
      this.setState({texte: text});
    })
    .catch( (error) => {
      console.log(error);
    });

  }

  getSelectedText(){
    var selText = "";
    if (window.getSelection) {  // all browsers, except IE before version 9
        if (document.activeElement && 
                (document.activeElement.tagName.toLowerCase () == "textarea" || 
                 document.activeElement.tagName.toLowerCase () == "input")){
            var text = document.activeElement.value;
            selText = text.substring (document.activeElement.selectionStart, 
                                      document.activeElement.selectionEnd);
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

  viewPopup(e) {
    let selText = this.getSelectedText();
    if(selText != '' && selText != ' ' && selText != '\n'){
      this.state.selText = selText;
      $('#popupTrad').css({
        left:  e.pageX - 100,
        top:   e.pageY - 86,
        display: 'flex'
      });

      axios({
        method: 'post',
        url: 'https://api.deepl.com/v2/translate?auth_key=0&text='+selText+'&target_lang=fr&source_lang=en',
        responseType: 'json',
        headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Accept': '*/*'}
      })
      .then((response) => {
        console.log(response);
        this.setState({french_value: response.data.translations[0].text});
      })
      .catch( (error) => {
        console.log(error);
      });
      // document.querySelector('#translationPopupText').innerHTML = '...';
      // this.setState({french_value: '...'});
      // axios({
      //   method: 'post',
      //   url: `https://translation.googleapis.com/language/translate/v2?source=en&target=fr&key=0&q=${selText}`,
      //   responseType: 'json',
      //   headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Accept': '*/*'}
      // })
      // .then((response) => {
      //   console.log(response);
      //   this.setState({french_value: response.data.data.translations[0].translatedText});
      // })
      // .catch( (error) => {
      //   console.log(error);
      // });
    }else{
      document.querySelector('#popupTrad').style.display = 'none';
      this.setState({msgBtnSave: 'Enregistrer'})
    }
  }

  saveExpression(){

    axios({
      method: 'post',
      url: '/save-expression-ajax',
      responseType: 'json',
      data: {french_value: this.state.french_value, english_value: this.state.selText, id_text: this.state.texte.id}
    })
    .then((response) => {
      console.log(response);
      if(response.statusText == 'OK'){
        this.setState({msgBtnSave: 'Enregistré !'});
        setTimeout(() => {this.setState({msgBtnSave: 'Enregistrer'})}, 3000);
      }
    })
    .catch( (error) => {
      console.log(error);
    });

  }

  updateText(){

    let wysiwyg = document.getElementsByName("react-trumbowyg")[0];

    axios({
      method: 'post',
      url: '/update-texte-ajax',
      responseType: 'json',
      data: {id_text: this.props.location.pathname.split("/")[2], content: wysiwyg.value}
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

  render() {

    let wysiwyg = '';
    let text = '';
    if(this.state.wysiwyg == true){
      wysiwyg = <div>
                  <button onClick={this.updateText.bind(this)}>Enregistrer</button>
                  <button onClick={() => {this.setState({wysiwyg: false})}}>Annuler</button>
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
                    onChange={console.log('change')}
                    ref="trumbowyg"
                /></div>;
    }else{
      text = <div><h3 style={{textAlign: 'center'}}>{this.state.texte.title}</h3>
              <button onClick={ () => {this.setState({wysiwyg: true})} }>Edit</button>
              <div id="popupTrad" style={{display: this.state.dataPopup.display,flexDirection: 'column',justifyContent: 'center',alignItems: 'center',padding: '10px', padding: '10px 10px', zIndex: 1, backgroundColor: '#e8ffe8', width: '200px', minHeight: '90px', border: '1px solid black', borderRadius: '10px', position: 'absolute', top: this.state.dataPopup.top, left: this.state.dataPopup.left}}>
                  <div id="translationPopupText">
                    <div style={{margin: '10px'}}>{this.state.french_value}</div>
                  </div>
                  <div id="btnSaveExpression" onClick={this.saveExpression.bind(this)} style={{width:'90px', height: '45px', cursor: 'pointer', color: 'white', fontWeight: 'bold', backgroundColor: '#08e608', borderRadius: '5px', textAlign: 'center', padding: '12px 0px'}}>{this.state.msgBtnSave}</div>
                </div>
              <div onClick={this.viewPopup.bind(this)} dangerouslySetInnerHTML={{ __html: this.state.texte.content }} style={{padding: '10px', border: '1px solid black', borderRadius: '10px', overflow: 'hidden'}}></div>
            </div>;
  }
    return (
            <div>
                {text}
                {wysiwyg}
            </div>
    );

  }
  
  }
