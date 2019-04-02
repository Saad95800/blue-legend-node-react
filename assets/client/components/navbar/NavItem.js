import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NavItem extends Component {

  constructor(props){
    super(props);
    // this.state = {
    //     isSelected: this.props.isSelected
    // }
  }

  colorClickItem(event){
      this.props.colorClickItem(event);
  }

  colorHoverItem(event){
      this.props.colorHoverItem(event);
  }

  colorMouseOutItem(event){
      this.props.colorMouseOutItem(event);
  }

  render() {
    let color = 'rgb(117, 222, 235, 0)';
    console.log(this.props.url_courante);
    console.log(this.props.url);
    if(this.props.url_courante == this.props.url || this.props.isSelected){
            color = 'rgb(117, 189, 210)';
    }
    return (
        <div className={this.props.classContainer} style={{backgroundColor: color}} >
            <Link
                to={this.props.url}
                className={this.props.classItem} 
                onMouseOver={this.colorHoverItem.bind(this)} 
                onMouseOut={this.colorMouseOutItem.bind(this)} 
                onClick={this.colorClickItem.bind(this)} 
                id={this.props.id}>
            </Link>
        </div>
    );
  }
}
