import React, { Component } from 'react';
import '../../../../node_modules/react-trumbowyg/dist/trumbowyg.css';
import Trumbowyg from 'react-trumbowyg';
import axios from 'axios';
import { Redirect } from 'react-router';

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
        data: {title: document.querySelector('#title-text').value, content: wysiwyg.value, id_category: document.querySelector('#category-text').value}
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
      <div style={styles.containerForm}>

          <div style={{width: '100%'}}>
            <div>Ajoutez votre texte dans la zone ci dessous</div>

            <div style={{display: 'flex', flexDirection: 'row',justifyContent: 'flex-start'}}>
              <button onClick={this.saveText.bind(this)}>Enregistrer</button>
              <select id="category-text" style={{marginLeft: '20px'}}>{options}</select>
            </div>
            <div>
              <div>Titre</div>
              <input type="text" id="title-text" style={{width: '100%'}}/>
            </div>
          </div>
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

let styles = {
  containerForm:{
    padding: '33px',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '10px'
  }
}