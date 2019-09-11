import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Button } from 'reactstrap';
import {capitalizeFirstLetter} from '../functions';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default class ExpressionListSsr extends Component {

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
      id_serie: id_serie
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