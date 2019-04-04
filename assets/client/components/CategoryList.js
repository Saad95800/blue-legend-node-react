import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class CategoryList extends Component {

  constructor(props){
    super(props);
    
    let categories = []
    if(this.props.data == {}){
      categories = [
        {id_category: 1, name: 'category ajax One'},
        {id_category: 2, name: 'category ajax Two'}
      ];
    }else{
      categories = [
        {id_category: 1, name: 'category One'},
        {id_category: 2, name: 'category Two'}
      ];
    }
    this.state = {
      categories: categories
    }
  }

  render() {

    let categories = this.state.categories.map((category) => {
      return <div key={category.id_category} style={{display: 'inline-block', borderRadius: '5px'}} className="hover-item">
                <div style={{textAlign: 'center'}}>{category.name}</div>
                <div style={{width: '90px', height: '70px', 'textAlign': 'center'}}>
                <Link
                to={'/textes/category/'+category.id_category}
                className={this.props.classItem}
                id={this.props.id}>
                <span className="img-item-liste-category"></span>
                </Link>
                </div>
             </div>;
    });
      return (
              <div>
                 <h3>Liste des textes</h3>
                 {categories}
              </div>
      );
    }
  }