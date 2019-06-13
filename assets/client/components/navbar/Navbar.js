import React, { Component } from 'react';
import NavItem from './NavItem';

export default class NavBar extends Component {

  constructor(props){

    super(props);

    this.state = {
      items:[
        // {
        //     url:"/ajout-texte",
        //     classContainer:"bloc-btn-menu",
        //     classItem:"menu-item nav-ajout-texte",
        //     id:"item-menu-add",
        //     style: {},
        //     isSelected: false
        // },
        {
            url:"/texte-liste",
            classContainer:"bloc-btn-menu",
            classItem:"menu-item nav-lecture",
            id:"item-menu-text",
            style: {},
            isSelected: false
        },
        // {
        //     url:"/categorie-ajout",
        //     classContainer:"bloc-btn-menu",
        //     classItem:"menu-item nav-categories",
        //     id:"item-menu-add-category",
        //     style: {},
        //     isSelected: false
        // },
        {
            url:"/categories-liste",
            classContainer:"bloc-btn-menu",
            classItem:"menu-item nav-categories",
            id:"item-menu-categories",
            style: {},
            isSelected: false
        },
        {
            url:"/revision",
            classContainer:"bloc-btn-menu",
            classItem:"menu-item nav-revision",
            id:"item-menu-revision",
            style: {},
            isSelected: false
        },
        {
            url:"/planning",
            classContainer:"bloc-btn-menu",
            classItem:"menu-item nav-planning",
            id:"item-menu-planning",
            style: {},
            isSelected: false
        },
        {
            url:"/statistiques",
            classContainer:"bloc-btn-menu",
            classItem:"menu-item nav-statistiques",
            id:"item-menu-statistiques",
            style: {},
            isSelected: false
        }
      ],
      itemsLeft:[
        {
            url:"/accueil",
            classContainer:"bloc-btn-menu-left",
            classItem:"menu-item-left nav-item-left",
            id:"item-menu-accueil",
            style: {},
            isSelected: false
        },
        {
            url:"/info-user",
            classContainer:"bloc-btn-menu-left",
            classItem:"menu-item-left nav-item-left",
            id:"item-menu-info-user",
            style: {},
            isSelected: false
        },
        {
            url:"/parametres",
            classContainer:"bloc-btn-menu-left",
            classItem:"menu-item-left nav-item-left",
            id:"item-menu-parametres",
            style: {},
            isSelected: false
        }
      ],
      url_courante: this.props.data.url,
      menuMobileView: false
    }
    
  }

  colorClickItem(event){

    console.log(event.target);
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
    if(event.target.parentElement.style.backgroundColor != 'rgb(32, 96, 250)'){
      event.target.parentElement.style.backgroundColor = 'rgb(32, 96, 250)';
    }
  }

  colorMouseOutItem(event){
    if(event.target.parentElement.style.backgroundColor == 'rgb(32, 96, 250)'
        && window.location.href.split('/')[3] != event.target.href.split('/')[3]){
      event.target.parentElement.style.backgroundColor = 'rgb(59, 116, 254)';
    }
  }

  displayMenuMobile(event){
    console.log(this.state.menuMobileView);
    if(this.state.menuMobileView == true){
      this.setState({menuMobileView: false});
    }else{
      this.setState({menuMobileView: true});
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
                            style={item.style}
                            isSelected={item.isSelected}
                            colorHoverItem={this.colorHoverItem.bind(this)} 
                            colorMouseOutItem={this.colorMouseOutItem.bind(this)} 
                            colorClickItem={this.colorClickItem.bind(this)}
                            key={item.id}
                          />
    });
    let navitemsLeft = this.state.itemsLeft.map((item) =>{
      return             <NavItem
                            url={item.url}
                            url_courante={this.state.url_courante}
                            classContainer={item.classContainer}
                            classItem={item.classItem}
                            id={item.id}
                            style={item.style}
                            isSelected={item.isSelected}
                            colorHoverItem={this.colorHoverItem.bind(this)} 
                            colorMouseOutItem={this.colorMouseOutItem.bind(this)} 
                            colorClickItem={this.colorClickItem.bind(this)}
                            key={item.id}
                          />
    });

    let displayMenuMobile = {left: '-160px'};
    if(this.state.menuMobileView == true){
      displayMenuMobile = {left: '0px'};
    }
    return (
      <div>
        <nav className="menu-mobile" style={displayMenuMobile}></nav>
        <nav className="navbar-home-mobile">
          <div className="bloc-btn-menu-mobile ml10" onClick={this.displayMenuMobile.bind(this)}><div className="menu-item nav-accueil" id="item-menu-home-mobile"></div></div>
        </nav>
        <nav className="navbar-home">
            <NavItem
                            url={'/'}
                            url_courante={this.state.url_courante}
                            classContainer={'bloc-btn-menu-vitrine'}
                            classItem={'menu-item-vitrine nav-vitrine'}
                            id={'item-vitrine'}
                            style={''}
                            isSelected={false}
                            colorClickItem={this.colorClickItem.bind(this)}
                            colorHoverItem={() => {}}
                          />
            {navitems}
        </nav>
        <nav className="navbar-home-left">
          {navitemsLeft}
        </nav>
        <div className="block-corner-radius">
          <div className="corner-radius"></div>
        </div>
      </div>
    );

  }
}
