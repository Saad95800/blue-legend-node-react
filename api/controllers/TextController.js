const ReactDOMServer = require('react-dom/server');
import React from 'react';
import Appserver from '../../assets/client/components/Appserver';
import {StaticRouter } from 'react-router-dom';
import moment from 'moment';

moment.locale('fr');

let render = (req, res, data = {}) => {
  if(req.isAuthenticated() && req.user != undefined){
    data.url = req.url;
    data.app = 'server';
    data.user = req.user;
    const body = ReactDOMServer.renderToString(
                                                <StaticRouter location={req.url} context={{}}>
                                                  <Appserver data={data}/>
                                                </StaticRouter>
                                              );
    res.view('pages/homepage', {body: body});
  }else{
    res.redirect('/');
  }
}

module.exports = {


};