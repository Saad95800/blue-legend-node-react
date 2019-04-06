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
  data.url = req.url;
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
      data = {'textes': textes};
    }else{
      var textes = await Text.find({'id_category': req.params.id_category});
      data = {'textes': textes, 'id_category': req.params.id_category};      
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

  categoryList: async function (req, res){
    let categories = await Category.find();
    let data = {'categories': categories};
    common(req, res, data);
  },

  textesAjax: async function (req, res){
    var textes = await Text.find(req.allParams());
    res.json(textes);
  },

  categoriesAjax: async function (req, res){
    var categories = await Category.find();
    res.json(categories);
  },

  revision: async function (req, res){
    var textes = await Text.find();
    let data = {'textes': textes, step: 'text-list'};
    common(req, res, data);
  },

  contentRevision: async function (req, res){
    let data = {step: 'content-review', id_texte: req.params.id_texte};
    common(req, res, data);
  },

  modeRevision: async function (req, res){
    let data = {step: 'mode', id_texte: req.params.id_texte, num_content: req.params.num_content};
    common(req, res, data);
  },

  btnBeginRevision: async function (req, res){
    let serie = await Serie.find({id_texte: req.params.id_texte});
    let data = {step: 'btn-begin', id_texte: req.params.id_texte, num_content: req.params.num_content, num_mode: req.params.num_mode, serie: serie};
    common(req, res, data);
  },

  serieRevision: async function (req, res){
    let serie = await Serie.find({id_serie: req.params.id_serie});
    let data = {step: 'serie', id_texte: req.params.id_texte, num_content: req.params.num_content, num_mode: req.params.num_mode, serie: serie};
    common(req, res, data);
  },

  getSerieByText: async function (req, res){
    let serie = await Serie.find({id_text: req.params.id_texte});
    res.json(serie);
  }
  
};

