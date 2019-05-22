import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

export default class CategoryAdd extends Component {

  constructor(props){
    super(props);

    this.state = {
      redirect: false
    }
  }

  ajoutCategory(){



    axios({
      method: 'post',
      url: 'save-category-ajax',
      responseType: 'json',
      data: {name: document.querySelector('#categoryName').value}
    })
    .then((response) => {
      console.log(response);
      if(response){
        this.setState({redirect: true});
      }
    })
    .catch( (error) => {
      console.log(error);
    });

  }

  render() {

    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/categories-liste'/>;
    }

      return (
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <div style={styles.containerForm}>
                 <h3>Ajout Catégorie</h3>
                 <input type="text" id="categoryName"/>
                 <div style={{marginTop: '10px'}}><button onClick={this.ajoutCategory.bind(this)}>Ajouter</button></div>
              </div>
            </div>
      );
    }

  }

  let styles = {
    containerForm:{
      padding: '33px',
      backgroundColor: 'white',
      width: '50%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '10px'
    }
  }