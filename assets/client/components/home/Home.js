import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {


    render() {
      return (
        <div className="container-home">
            
        </div>
      );
    }
  }
  
  const styles = {
      links:{
          textDecoration: 'none'
        },
      blockItems:{
          read: {backgroundColor: '#E6F8EA'},
          review: {backgroundColor: '#F0F0FE'},
          insight: {backgroundColor: '#FDEBEB'},
          custom: {backgroundColor: '#FFF8D6'}
      }
  }