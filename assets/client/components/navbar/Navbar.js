import React, { Component } from 'react';
import NavItem from './NavItem';

export default class NavBar extends Component {

  constructor(props){

    super(props);

    this.state = {
      items:[
        {
            url:"/accueil",
            classContainer:"bloc-btn-menu ml10",
            classItem:"menu-item nav-accueil",
            id:"item-menu-home",
            isSelected: false
        },
        {
            url:"/ajout-texte",
            classContainer:"bloc-btn-menu ml60",
            classItem:"menu-item nav-ajout-texte",
            id:"item-menu-add",
            isSelected: false
        },
        {
            url:"/texte-liste",
            classContainer:"bloc-btn-menu ml20",
            classItem:"menu-item nav-lecture",
            id:"item-menu-text",
            isSelected: false
        },
        {
            url:"/categorie-ajout",
            classContainer:"bloc-btn-menu ml20",
            classItem:"menu-item nav-categories",
            id:"item-menu-add-category",
            isSelected: false
        },
        {
            url:"/categories-liste",
            classContainer:"bloc-btn-menu ml20",
            classItem:"menu-item nav-categories",
            id:"item-menu-categories",
            isSelected: false
        },
        {
            url:"/revision",
            classContainer:"bloc-btn-menu ml20",
            classItem:"menu-item nav-revision",
            id:"item-menu-revision",
            isSelected: false
        }
      ],
      url_courante: this.props.data.url

    }
    
  }

  colorClickItem(event){
    // event.preventDefault();
    let newItems = this.state.items.map((item) =>{
      if(item.id == event.target.id){
        item.isSelected = true;
        this.setState({url_courante: item.url})
      }else{
        item.isSelected = false;
      }
      return item;
    });
    this.setState({items: newItems})   

  }

  colorHoverItem(event){
    if(event.target.parentElement.style.backgroundColor != 'rgb(117, 189, 210)'){
      event.target.parentElement.style.backgroundColor = '#a6d1de';
    }
  }

  colorMouseOutItem(event){

    if(event.target.parentElement.style.backgroundColor != 'rgb(117, 189, 210)'){
      event.target.parentElement.style.backgroundColor = 'rgb(117, 222, 235, 0)';
    }

  }

  render() {

    let navitems = this.state.items.map((item) =>{
      return             <NavItem
                            url={item.url}
                            url_courante={this.state.url_courante}
                            classContainer={item.classContainer}
                            classItem={item.classItem}
                            id={item.id}
                            isSelected={item.isSelected}
                            colorHoverItem={this.colorHoverItem.bind(this)} 
                            colorMouseOutItem={this.colorMouseOutItem.bind(this)} 
                            colorClickItem={this.colorClickItem.bind(this)}
                            key={item.id}
                            />
    });

    return (
      <div>
        <nav className="menu-mobile"></nav>
        <nav className="navbar-home">
            {/* <div className="square-menu l1px"></div>
            <div className="circle-menu l1px"></div> */}
            <div className="bloc-btn-menu-mobile ml10" ><div className="menu-item nav-accueil" id="item-menu-home-mobile"></div></div>
            {navitems}
            {/* <div className="square-menu r1px"></div>
            <div className="circle-menu r1px"></div> */}
        </nav>
        <div style={{width: '100%', height: '100%', backgroundColor: 'white', position: 'fixed', top: '75px', borderRadius: '40px'}}></div>
      </div>
    );

  }
}
