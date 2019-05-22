const ReactDOMServer = require('react-dom/server');
import React from 'react';
import Appserver from '../../assets/client/components/Appserver';
import Vitrine from '../../assets/client/components/Vitrine';
import {StaticRouter } from 'react-router-dom';

let render = (req, res, data = {}) => {
  data.url = req.url;
  data.app = 'server';
  const body = ReactDOMServer.renderToString(
                                              <StaticRouter location={req.url} context={{}}>
                                                <Appserver data={data}/>
                                              </StaticRouter>
                                            );
  res.view('pages/homepage', {body: body});
}

module.exports = {

  renderVitrine: async function (req, res){
    let data = {};
    data.url = req.url;
    data.app = 'server';
    const body = ReactDOMServer.renderToString(
                                                <Vitrine data={data}/>
                                              );
    res.view('pages/homepage', {body: body});
  },

  accueil: async function (req, res){
    let data = {'textes': [{titre: 'titre1', contenu: 'contenu1'}, {titre: 'titre2', contenu: 'contenu2'}, {titre: 'titre3', contenu: 'contenu3'}]};
    render(req, res, data);
  },

  textes: async function (req, res){

    let data = {};
    if(req.params.id_category == undefined){
      var textes = await Text.find();
      data = {'textes': textes};
    }else{
      var textes = await Text.find({'owner_category': req.params.id_category});
      data = {'textes': textes, 'id_category': req.params.id_category};      
    }

    render(req, res, data);
  },

  texte: async function(req, res){
    let texte = await Text.find({id: req.allParams().id_texte});
    let data = {'texte': texte[0]};
    render(req, res, data);
  },

  ajoutTexte: (req, res) => {
    render(req, res);
  },

  categoryList: async function (req, res){
    let categories = await Category.find();
    let data = {'categories': categories};
    render(req, res, data);
  },

  categoryAdd: async function (req, res){
    render(req, res);
  },

  saveCategoryAjax: async function (req, res){
    await Category.create({name: req.allParams().name});
    return res.ok();
  },

  textesAjax: async function (req, res){
    let textes = await Text.find({owner_category: req.allParams().id_category});
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
    render(req, res, data);
  },

  contentRevision: async function (req, res){
    let data = {step: 'content-review', id_texte: req.params.id_texte};
    render(req, res, data);
  },

  modeRevision: async function (req, res){
    let data = {step: 'mode', id_texte: req.params.id_texte, num_content: req.params.num_content};
    render(req, res, data);
  },

  btnBeginRevision: async function (req, res){
    let serie = await Serie.find({id_text: req.params.id_texte});
    let data = {step: 'btn-begin', id_texte: req.params.id_texte, num_content: req.params.num_content, num_mode: req.params.num_mode, serie: serie};
    render(req, res, data);
  },

  serieRevision: async function (req, res){
    let serie = await Serie.find({id: req.params.id_serie});
    let data = {step: 'serie', id_texte: req.params.id_texte, num_content: req.params.num_content, num_mode: req.params.num_mode, serie: serie};
    render(req, res, data);
  },

  getSerieByText: async function (req, res){
    let params = req.allParams();
    console.log(params);
    let serie = await Serie.findOne({id: params.id_serie, owner_text: params.id_text}).populate('expression');
    console.log(serie);
    res.json(serie);
  },

  saveTextAjax: async function (req, res){
    let params = req.allParams();
    await Text.create({title:params.title, content: params.content, type_text:"text", owner_category: params.id_category });
    return res.ok();
  },

  saveExpression: async function (req, res){
    let params = req.allParams();
    let serial = await Serie.find({ owner_text: params.id_text });
    let number = serial.length + 1;
    await Serie.findOrCreate({ owner_text: params.id_text }, { owner_text: params.id_text, name: 'Série '+number })
                            .exec(async(err, serie, wasCreated)=> {
                              if (err) { return res.serverError(err); }
                            
                              if(wasCreated) {
                                sails.log('Created a new serie: ' + serie.id);
                              }
                              else {
                                sails.log('Found existing serie: ' + serie.id);
                              }
                              await Expression.create({french_value:params.french_value, english_value: params.english_value, owner_texte: params.id_text, owner_serie: serie.id });
                              return res.ok();
                            });

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
  },

  getSeriesRevision: async function (req, res){
    let series = await Serie.find({owner_text: req.allParams().id_text}).populate('expression');
    let result = [];
    for(let serie of series){
      if(serie.expression.length > 0){
        result.push(serie);
      }
    }
    res.json(result);
  },

  updateTextAjax: async function (req, res){
    let params = req.allParams();
    var updatedText = await Text.updateOne({ id: params.id_text })
    .set({
      content: params.content
    });
    
    if (updatedText) {
      sails.log('Mise à jour réussie !');
      res.ok();
    }
    else {
      sails.log('Le texte à mettre à jour n\'éxiste pas dans la base de données.');
      res.error('Le texte à mettre à jour n\'éxiste pas dans la base de données.');
    }
  },

  serieListrevision: async function (req, res){
    let params = req.allParams();
    let series = await Serie.find({owner_text: params.id_text});
    // console.log(params);
    // console.log(series);
    let data = {step: 'serie', id_text: req.params.id_texte, series: series};
    render(req, res, data);
  }
  
};

