import React, { Component } from 'react';
import axios from 'axios';
import Trumbowyg from 'react-trumbowyg';

export default class TextEdit extends Component {

    constructor(props){
        super(props);

        this.state = {

        }
    }
    componentWillMount(){
        if(this.props.data.app == 'client'){
            this.props.changeColorItemNav("item-menu-text");
        }
    }

    render(){

        return(
            <div>

                <div className="container-wysiwig" style={{display: 'block', backgroundColor: this.state.wysiwyg_bg_color}}>

                <div>
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
                    <div style={{backgroundColor: this.state.wysiwyg_bg_color}}>
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
                        data={this.state.contentTextArea}
                        placeholder='Entrez votre texte'
                        ref="trumbowyg"
                    />
                    </div>
                </div>

                </div>

            </div>
        );

    }

}