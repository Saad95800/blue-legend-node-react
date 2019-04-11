import React, { Component } from 'react';
import axios from 'axios';

export default class Text extends Component {

  constructor(props){
    super(props);

    let texte = {};
    if(this.props.data.app == 'server'){
      texte = this.props.data.texte;
    }

    this.state = {
      texte: texte,
      dataPopup:{
        display: 'none', 
        top: 0, 
        left: 0
      }
    }
  }

  componentDidMount(){

    document.addEventListener('click', (e) => {
      this.viewPopup(e);
    });

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
    if(selText != ''){
      $('#popupTrad').css({
        left:  e.pageX - 100,
        top:   e.pageY - 86,
        display: 'block'
      });
      // this.setState({dataPopup:{display: 'block', top: e.pageY - 86, left: e.pageX - 100}});
      console.log(selText);
    }else{
      document.querySelector('#popupTrad').style.display = 'none';
    }
  }

  render() {

    return (
            <div>
                 <h3 style={{textAlign: 'center'}}>{this.state.texte.title}</h3>
                 <div id="popupTrad" style={{display: this.state.dataPopup.display, zIndex: 1, backgroundColor: 'white', width: '200px', height: '200px', border: '1px solid black', position: 'absolute', top: this.state.dataPopup.top, left: this.state.dataPopup.left}}>
                    contenu de la popup trad
                  </div>
                 <div onClick={this.viewPopup.bind(this)} dangerouslySetInnerHTML={{ __html: this.state.texte.content }} style={{padding: '10px', border: '1px solid black', borderRadius: '10px'}}></div>
            </div>
    );

  }

  }