import React, { Component } from 'react';
import '../../../node_modules/react-trumbowyg/dist/trumbowyg.css';
import {$, jQuery} from 'jquery';
import Trumbowyg from 'react-trumbowyg';

export default class TextAdd extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount() { // hook the jQuery when component is mounted
    // window.$ = window.jQuery = jquery;
  }

  render() {

    return (
      <div>

        <div>Ajoutez votre texte dans la zone ci dessous</div>

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
                  data={''}
                  placeholder='Entrez votre texte'
                  onChange={console.log('change')}
                  ref="trumbowyg"
        />

      </div>
    );
  }

}