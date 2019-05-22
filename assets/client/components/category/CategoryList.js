import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class CategoryList extends Component {

  constructor(props){
    
    super(props);
    
    let categories = []
    if(this.props.data.app == 'server'){ // AppServer
      categories = this.props.data.categories;
    }
    this.state = {
      categories: categories
    }
  }

  componentDidMount(){
    fetch("/categories-ajax", {
      method: 'post',
    })
    .then((resp) => resp.json())
    .then( (categories) => {
      console.log(categories);
      this.setState({categories: categories});
    });
  }

  render() {

    let categories = this.state.categories.map((category, index) => {
      return <Link
              to={'/textes/category/'+category.id}
              className={this.props.classItem}
              key={index}>
              <div key={category.id} style={{display: 'inline-block', borderRadius: '5px', margin: '10px', width: '120px', height: '120px'}} className="hover-item">
                <div style={{textAlign: 'center'}}>{category.name}</div>
                <div style={{'textAlign': 'center'}}>
                
                <span className="img-item-liste-category"></span>
                
                </div>
              </div>
             </Link>;
    });
      return (
              <div style={styles.containerList}>
                 <h3>Liste des catégories</h3>
                 <div>{categories}</div>
              </div>
      );
    }
  }

  let styles = {
    containerList:{
      padding: '33px',
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '10px'
    }
  }