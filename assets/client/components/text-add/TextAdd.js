import React, { Component } from 'react';
import '../../../../node_modules/react-trumbowyg/dist/trumbowyg.css';
import Trumbowyg from 'react-trumbowyg';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Container, Row, Col, FormGroup, Label, Input } from 'reactstrap';

export default class TextAdd extends Component {

  constructor(props){
    super(props);

    this.state = {
      categories: [],
      redirect: false,
      wysiwyg_title: '',
      wysiwyg_content: '',
      selected_category: '',
      wysiwyg_bg_color: ''
    }
  }

  componentDidMount(){

    this.textAreaWysiwyg = document.getElementsByName("react-trumbowyg")[0];
    this.divWysiwyg = document.querySelector("#react-trumbowyg");
    this.inputTitleText = document.querySelector("#title-text");
    this.selectCategory = document.querySelector("#select-category-text");

    this.setState({
      wysiwyg_content: document.getElementsByName("react-trumbowyg")[0].value,
      wysiwyg_bg_color: document.querySelector("#react-trumbowyg").style.backgroundColor
    });

    this.divWysiwyg.addEventListener("paste", () => {
      this.setState({wysiwyg_content: this.textAreaWysiwyg.value});
    });
    this.divWysiwyg.addEventListener("keyup", () => {
      this.setState({wysiwyg_content: this.textAreaWysiwyg.value});
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
  }

  saveText(){

    
    let divWysiwyg = document.querySelector("#react-trumbowyg");

    if(this.state.wysiwyg_content == ''){
      this.props.viewMessageFlash('Le contenu du texte ne doit pas être vide.', true);
      divWysiwyg.style.backgroundColor = '#ff00001a';
      setTimeout(function(){divWysiwyg.style.backgroundColor = '#fff';}, 3000)
    }else{
      axios({
        method: 'post',
        url: '/save-text-ajax',
        responseType: 'json',
        data: {title: this.state.wysiwyg_title, content: this.state.wysiwyg_content, id_category: this.state.selected_category}
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
                    <Input type="select" id="select-category-text" onChange={()=>{this.setState({selected_category: this.selectCategory.value})}}>
                      <option key="0" value="0">---</option>
                      {options}
                    </Input>
                  </Col>
                </FormGroup>
              </Col>
              <Col sm="3" style={{textAlign: 'right', marginTop: '16px'}}>
                <div className="btn-forms" onClick={this.saveText.bind(this)}>Ajouter</div>
              </Col>
            </Row>
            <Row>
              <Col sm="12">
                <Label for="title-text" sm={2}>Titre du texte</Label>
                <FormGroup row>
                  <Col sm={12}>
                    <Input type="text" onChange={() => {this.setState({wysiwyg_title: this.inputTitleText.value})}} autoComplete="off" id="title-text" />
                  </Col>
                </FormGroup>
              </Col>
            </Row>
            <Row>
            <Col sm="12">
              <div className="container-wysiwig" style={{backgroundColor: this.state.wysiwyg_bg_color}}>
                  <Trumbowyg id='react-trumbowyg'
                            onChange={() =>{
                              this.setState({wysiwyg_content: this.textAreaWysiwyg.value})
                            }} 
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
                            data={this.state.wysiwyg_content}
                            placeholder='Entrez votre texte'
                            ref="trumbowyg"
                  />

              </div>
            </Col>
            </Row>
            </div>
          </Container>
      </div>
    );
  }

}