import React, { Component } from 'react';
import { Container, Row, Col, FormGroup, Label, Input, Spinner } from 'reactstrap';

export default class TextAdd extends Component {

    constructor(props){
      super(props);

      this.state = {
        categories: [],
        redirect: false
      }

    }

    render() {

      let options = this.state.categories.map((category, index) =>{
        return <option key={index} value={category.id}>{category.name}</option>
      });

      return (
        <div className="container-text-add container-page">
        <Container>
        <div className="block-text-add">
          <Row>
            <div className="main-titles">
              AJOUTER UN TEXTE
            </div>
          </Row>
          <Row style={{marginTop: '20px'}}>
            <Col sm="9">
              <Label for="select-category-text" sm={2}>Catégorie</Label>
              <FormGroup row>
                <Col sm={12}>
                  <Input type="select" id="select-category-text">
                    <option>---</option>
                  </Input>
                </Col>
              </FormGroup>
            </Col>
            <Col sm="3" style={{textAlign: 'right', marginTop: '16px'}}>
              <div className="btn-forms">Ajouter</div>
            </Col>
          </Row>
          <Row>
            <Col sm="12">
              <Label for="title-text" sm={2}>Titre du texte</Label>
              <FormGroup row>
                <Col sm={12}>
                  <Input type="text" autoComplete="off" id="title-text" />
                </Col>
              </FormGroup>
            </Col>
          </Row>
          <Row>
          <Col sm="12">
            <div onClick={console.log('toto 2')} className="container-wysiwig">
              <img src="/client/images/89.gif" />
            </div>
          </Col>
          </Row>
          </div>
        </Container>
    </div>
      );
      
    }
  }