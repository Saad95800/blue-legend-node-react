/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

const ReactDOMServer = require('react-dom/server');
import React from 'react';
import Appserver from '../../assets/client/components/Appserver';
import layout from '../../assets/client/layout';
import {StaticRouter } from 'react-router-dom';

module.exports = {
  home: function(req, res) {
    const context = {};
    const data = {url: req.url};
    const content = ReactDOMServer.renderToString(<StaticRouter location={req.url} context={context}><Appserver data={data}/></StaticRouter>);
    res.send(layout(''));
    // res.view('pages/homepage', {body: body});
  }
};

