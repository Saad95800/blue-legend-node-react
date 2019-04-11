const ReactDOMServer = require('react-dom/server');
import React from 'react';
import Appserver from '../../assets/client/components/Appserver';
import {StaticRouter } from 'react-router-dom';

let common = (req, res, data = {}) => {
  data.url = req.url;
  data.app = 'server';
  const content = ReactDOMServer.renderToString(<StaticRouter location={req.url} context={{}}><Appserver data={data}/></StaticRouter>);
  res.view('pages/homepage', {body: content});
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

  texte: async function(req, res){
    let texte = await Text.find({id: req.allParams().id_texte});
    let data = {'texte': texte[0]};
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
    let textes = await Text.find(req.allParams());
    res.json(textes);
  },

  getTexteAjax: async function (req, res){
    let texte = await Text.find(req.allParams());
    res.json(texte);
  },

  categoriesAjax: async function (req, res){
    let categories = await Category.find();
    res.json(categories);
  },

  revision: async function (req, res){
    let textes = await Text.find().populate('serie');
    let texts = textes.map(function(text){
                  if(text.serie.length > 0){
                    return text;
                  }
                });
    let data = {'textes': texts, step: 'text-list'};
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
    let serie = await Serie.find({id_text: req.params.id_texte});
    let data = {step: 'btn-begin', id_texte: req.params.id_texte, num_content: req.params.num_content, num_mode: req.params.num_mode, serie: serie};
    common(req, res, data);
  },

  serieRevision: async function (req, res){
    let serie = await Serie.find({id: req.params.id_serie});
    let data = {step: 'serie', id_texte: req.params.id_texte, num_content: req.params.num_content, num_mode: req.params.num_mode, serie: serie};
    common(req, res, data);
  },

  getSerieByText: async function (req, res){
    let serie = await Serie.findOne({owner_text: req.allParams().id_text}).populate('expression');
    res.json(serie);
  },

  saveTextAjax: async function (req, res){
    let params = req.allParams();
    await Text.create({title:params.title, content: params.content, type_text:"text", owner_category: params.id_category });
    return res.ok();
  },

  getTextsRevision: async function (req, res){
    let textes = await Text.find().populate('serie');
    let result = [];
    for(let txt of textes){
      if(txt.serie.length > 0){
        result.push(txt);
      }
    }
    console.log(result);
    res.json(result);
  }
  
};

