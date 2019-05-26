import React, { Component } from 'react';
import '../../../../node_modules/react-trumbowyg/dist/trumbowyg.css';
import Trumbowyg from 'react-trumbowyg';
import axios from 'axios';
import { Redirect } from 'react-router';
// import './../../../styles/bootstrap.min.css';
import { Container, Row, Col, FormGroup, Label, Input } from 'reactstrap';

export default class TextAdd extends Component {

  constructor(props){
    super(props);

    this.state = {
      categories: [],
      redirect: false
    }
  }

  componentDidMount(){
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
  }

  saveText(){

    let wysiwyg = document.getElementsByName("react-trumbowyg")[0];
    let divWysiwyg = document.querySelector("#react-trumbowyg");

    if(wysiwyg.value == ''){
      this.props.viewMessageFlash('Le contenu du texte ne doit pas être vide.', true);
      divWysiwyg.style.backgroundColor = '#ff00001a';
      setTimeout(function(){divWysiwyg.style.backgroundColor = '#fff';}, 3000)
    }else{
      axios({
        method: 'post',
        url: '/save-text-ajax',
        responseType: 'json',
        data: {title: document.querySelector('#title-text').value, content: wysiwyg.value, id_category: document.querySelector('#select-category-text').value}
      })
      .then((response) => {
        this.props.viewMessageFlash('Texte ajouté avec succès !');
        this.setState({ redirect: true });
        // this.setState({textes: response.data, id_category:url.split("/")[3]});
      })
      .catch( (error) => {
        console.log(error);
      });
    }
    
  }

  render() {

    const { redirect } = this.state;

     if (redirect) {
       return <Redirect to='/texte-liste'/>;
     }

    let options = this.state.categories.map((category, index) =>{
                    return <option key={index} value={category.id}>{category.name}</option>
                  });

    return (
      <div className="container-text-add">
          <Container>
            <Row>
              <div className="main-titles">
                AJOUTER UN TEXTE
              </div>
            </Row>
            <Row style={{marginTop: '20px'}}>
              <Col sm="9">
                <Label for="exampleSelect" sm={2}>Catégorie</Label>
                <FormGroup row>
                  <Col sm={12}>
                    <Input type="select">
                      <option>---</option>
                      {options}
                    </Input>
                  </Col>
                </FormGroup>
              </Col>
              <Col sm="3" style={{textAlign: 'right', marginTop: '16px'}}>
                <div className="btn-forms" onClick={this.saveText.bind(this)}>AJOUTER</div>
              </Col>
            </Row>
            <Row>
              <Col sm="12">
                <Label for="exampleEmail" sm={2}>Titre du texte</Label>
                <FormGroup row>
                  <Col sm={12}>
                    <Input type="text" autoComplete="off" id="title-text" />
                  </Col>
                </FormGroup>
              </Col>
            </Row>
            <Row>
            <Col sm="12">
              <div>
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
                            style={{backgroundColor: 'red'}}
                  />

              </div>
            </Col>
            </Row>
          </Container>
      </div>
    );
  }

}