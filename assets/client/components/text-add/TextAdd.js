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
      wysiwyg_bg_color: '',
      type_text: 'text',
      file_name_pdf: '',
      view_pdf: false
    }
  }

  componentDidMount(){

    this.textAreaWysiwyg = document.getElementsByName("react-trumbowyg")[0];
    this.divWysiwyg = document.querySelector("#react-trumbowyg");
    this.inputTitleText = document.querySelector("#title-text");
    this.selectCategory = document.querySelector("#select-category-text");
    this.typeText = document.querySelector("#type-text");

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
    
    if(this.state.wysiwyg_content == ''){
      let divWysiwyg = document.querySelector("#react-trumbowyg");
      this.props.viewMessageFlash('Le contenu du texte ne doit pas être vide.', true);
      divWysiwyg.style.backgroundColor = '#ff00001a';
      setTimeout(function(){divWysiwyg.style.backgroundColor = '#fff';}, 3000);
      return;
    }
    if(this.state.wysiwyg_title == ''){
      let titleWysiwyg = document.querySelector("#title-text");
      this.props.viewMessageFlash('Le titre du texte ne doit pas être vide.', true);
      titleWysiwyg.style.backgroundColor = '#ff00001a';
      setTimeout(function(){titleWysiwyg.style.backgroundColor = '#fff';}, 3000);
      return;
    }

    axios({
      method: 'post',
      url: '/save-text-ajax',
      responseType: 'json',
      data: {
        title: this.state.wysiwyg_title, 
        content: this.state.wysiwyg_content, 
        id_category: this.state.selected_category
      }
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

  changeTypeText(type){
    this.setState({type_text: type})
  }

  uploadAndViewPdfFile(e){
    console.log(e.target.files[0]);
    let file  = e.target.files[0];

    let formData = new FormData();
    formData.append('file', file);

    axios({
      method: 'post',
      url: '/upload-file-pdf-ajax',
      responseType: 'json',
      data: formData
    })
    .then((response) => {
      console.log(response);
      this.props.viewMessageFlash('Fichier uploadé avec succès !');
      let arrayLength = response.data.file[0].fd.split("\\").length;
      this.setState({ file_name_pdf: response.data.file[0].fd.split("\\")[arrayLength-1], view_pdf: true });
    })
    .catch( (error) => {
      console.log(error);
    });
  }

  render() {

    const { redirect } = this.state;

     if (redirect) {
       return <Redirect to='/texte-liste'/>;
     }

    let options = this.state.categories.map((category, index) =>{
                    return <option key={index} value={category.id}>{category.name}</option>
                  });
    let classBtnTypeText = "btn btn-primary btn-sm active";
    let classBtnTypePdf = "btn btn-primary btn-sm notActive";

    let contentForm =               
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
    
    if(this.state.type_text == 'pdf'){
      classBtnTypePdf = "btn btn-primary btn-sm active";
      contentForm =
      <div className="full-width">
        <h3 className="text-center color">Choisissez un fichier PDF.</h3>
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="display-flex-center">
          <input
              type="file" 
              id="main-input" 
              className="form-control form-input form-style-base"
              onChange={(e) => {this.uploadAndViewPdfFile(e)}}
              />
            <h4 id="fake-btn" className="form-input fake-styled-btn text-center truncate"><span className="margin">Choisir un fichier</span></h4>
          </div>
        </div>
      </div>
      if(this.state.view_pdf == true){
        let src = "http://localhost:1337/7/web/viewer.html?file="+this.state.file_name_pdf;
        contentForm = <iframe className="iframe-pdf" src={src}></iframe>
      }
    }

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
                <Label for="select-category-text">Catégorie</Label>
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
                <Label for="title-text">Titre du texte</Label>
                <FormGroup row>
                  <Col sm={12}>
                    <Input type="text" onChange={() => {this.setState({wysiwyg_title: this.inputTitleText.value})}} autoComplete="off" id="title-text" />
                  </Col>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm="12">
                <Label for="title-text">Type du texte</Label>
                <FormGroup row>
                  <Col sm={12}>
                    <form>
                      <div className="form-group">
                        <div className="input-group">
                          <div id="radioBtn" className="btn-group">
                            <a 
                              className={classBtnTypeText}
                              data-toggle="type" 
                              data-title="text"
                              onClick={() => {this.changeTypeText('text')}}>
                                Texte
                            </a>
                            <a 
                              className={classBtnTypePdf}
                              data-toggle="type" 
                              data-title="pdf"
                              onClick={() => {this.changeTypeText('pdf')}}>
                                PDF
                            </a>
                          </div>
                          <input type="hidden" name="happy" id="happy"/>
                        </div>
                      </div>
                    </form>
                  </Col>
                </FormGroup>
              </Col>
            </Row>
            <Row>
            <Col sm="12">
              {contentForm}
            </Col>
            </Row>
            </div>
          </Container>
      </div>
    );
  }

}