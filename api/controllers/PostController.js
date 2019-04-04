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

let common = (req, res, data = {}) => {
  const context = {};
  Object.assign(data, {url: req.url});
  const content = ReactDOMServer.renderToString(<StaticRouter location={req.url} context={context}><Appserver data={data}/></StaticRouter>);
  res.send(layout(content));
  // res.view('pages/homepage', {body: body});
}

module.exports = {
  accueil: async function (req, res){
    let data = {'textes': [{titre: 'titre1', contenu: 'contenu1'}, {titre: 'titre2', contenu: 'contenu2'}, {titre: 'titre3', contenu: 'contenu3'}]};
    common(req, res, data);
  },
  textes: async function (req, res){

    let data = {};
    if(req.params.id_category == undefined){
      var textes = await Text.find();
      console.log(textes);
      data = {'textes': textes};
    }else{
      var textes = await Text.find();
      data = {'textes': textes};      
    }

    common(req, res, data);
  },
  texte: (req, res) => {
    let data = {'texte': {'id_texte': req.params.id_texte, titre: 'titre1', contenu: 'contenu1'}};
    common(req, res, data);
  },
  ajoutTexte: (req, res) => {
    common(req, res);
  },
  categoryList: (req, res) => {
    let data = {'categories': [
      {id_category: 1, name: 'category One'},
      {id_category: 2, name: 'category Two'}
    ]};
    common(req, res, data);
  },
  revision: (req, res) => {
    common(req, res);
  },
  textesAjax: async function (req, res){
    var textes = await Text.find();
    console.log(textes);
    res.json(textes);
  }
  
};

