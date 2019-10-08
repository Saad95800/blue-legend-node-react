import React, { Component } from 'react';
import axios from 'axios';

export default class SerieList extends Component {

  constructor(props){
    super(props);
  }

  componentWillMount(){
    if(this.props.data.app == 'client'){
      this.props.changeColorItemNav("item-menu-serie");
    }
  }

  render() {

    return (
            <div className="container-serie-list container-page display-flex-center">

            </div>
    );
  }

}