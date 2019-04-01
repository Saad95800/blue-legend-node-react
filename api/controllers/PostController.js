/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var routes = require('../../assets/client/routes');
// var home = require('../../components/pages/home.js');
// const React = require('react');
const ReactDOMServer = require('react-dom/server');

import React from 'react';
import Home from '../../assets/client/pages/home';

module.exports = {
  home: function(req, res) {
    const body = ReactDOMServer.renderToString( <Home></Home> );
    res.view('pages/homepage', {body: body});
    
  },
  articles: function(req, res) {
    Post.find().exec(function(err, posts){
      renderTo(routes, res.view, '/articles', {title:'articles'}, {items:posts});
    });
  },
  article: function(req, res) {
    Post.findOneById(req.param('id')).exec(function(err, post){
      let title = '';
      if(post){
        title = post.title;
      }
      renderTo(routes, res.view, '/article/'+req.param('id'), {title:title}, {item:post});
    });
  }
};

