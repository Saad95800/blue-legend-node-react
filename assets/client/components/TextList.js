import React, { Component } from 'react';

import socketIOClient from 'socket.io-client';
import sailsIOClient from 'sails.io.js';

export default class TextList extends Component {
    render() {

  // var socketIOClient = require('socket.io-client');
  // var sailsIOClient = require('sails.io.js');

  // var io = sailsIOClient(socketIOClient);
  // io.sails.url = 'http://localhost:8080/text/listing';
  // io.socket.get('/text/listing', function serverResponded (body, JWR) {

  //   console.log('Sails responded with: ', body);
  //   console.log('with headers: ', JWR.headers);
  //   console.log('and with status code: ', JWR.statusCode);

  //   io.socket.disconnect();
  // });
      return (
              <div>
                 Liste des textes
              </div>
      );
    }
  }