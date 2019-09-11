import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Button } from 'reactstrap';
import {capitalizeFirstLetter} from './../functions';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Document, Page } from './../../../../node_modules/react-pdf/dist/entry.webpack';
// import { Document, Page } from 'react-pdf';
// import Sample from './Sample';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import pdfFile from './sample.pdf';

const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true,
};

export default class ExpressionList extends Component {

  constructor(props){
    super(props);

    let expressions = [];
    let id_serie = '';
    
    if(this.props.data.app == 'server'){ // AppServer
        expressions = this.props.data.expressions;
        id_serie = this.props.data.id_serie;
    }
    this.state = {
      expressions: expressions,
      id_serie: id_serie,
      numPages: null,
      pageNumber: 1,
      file: pdfFile,
      numPages: null,
    }

  }

  render() {

    return (
      <div className="expression-container display-flex-center">
        <iframe className="iframe-pdf" src="http://localhost:1337/7/web/viewer.html?file=Natural_Cures.pdf"></iframe>
      </div>
    );
  }

}