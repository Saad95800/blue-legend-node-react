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
    let data = {
      'textes': [
        {titre: 'titre1', contenu: 'contenu1'}, 
        {titre: 'titre2', contenu: 'contenu2'}, 
        {titre: 'titre3', contenu: 'contenu3'}
      ]
    };
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
    let texts = [];
    for(let txt of textes){
      if(txt.serie.length > 0){
        texts.push(txt);
      }
    }
    console.log(texts);
    let data = {
      'textes': texts, 
      step: 'text-list'
    };
    render(req, res, data);
  },

  contentRevision: async function (req, res){
    let data = {
      id_texte: req.params.id_texte, 
      step: 'content-review'
    };
    render(req, res, data);
  },

  modeRevision: async function (req, res){
    let data = {
      id_texte: req.params.id_texte, 
      num_content: req.params.num_content, 
      step: 'mode'
    };
    render(req, res, data);
  },

  btnBeginRevision: async function (req, res){
    let serie = await Serie.find({owner_text: req.params.id_texte});
    let data = {
      id_texte: req.params.id_texte, 
      num_content: req.params.num_content, 
      num_mode: req.params.num_mode, 
      serie: serie, 
      step: 'btn-begin'
    };
    render(req, res, data);
  },

  serieRevision: async function (req, res){
    let serie = await Serie.find({id: req.params.id_serie});
    let data = {
      id_texte: req.params.id_texte, 
      num_content: req.params.num_content, 
      num_mode: req.params.num_mode, 
      serie: serie, 
      step: 'serie'
    };
    render(req, res, data);
  },

  getSerieByText: async function (req, res){
    let params = req.allParams();
    let serie = await Serie.findOne({
      id: params.id_serie, 
      owner_text: params.id_text
    }).populate('expression');
    res.json(serie);
  },

  saveTextAjax: async function (req, res){
    let params = req.allParams();
    await Text.create({
      title:params.title, 
      content: params.content, 
      type_text:"text", 
      owner_category: params.id_category 
    });
    return res.ok();
  },

  saveExpression: async function (req, res){
    let params = req.allParams();
    let serie = await Serie.find({ owner_text: params.id_text });
    let number = serie.length + 1;
    await Serie.findOrCreate(
      { owner_text: params.id_text }, 
      { owner_text: params.id_text, name: 'Série '+number }
    )
    .exec(async(err, serie, wasCreated)=> {
      if (err) { return res.serverError(err); }
    
      if(wasCreated) {
        sails.log('Created a new serie: ' + serie.id);
      }
      else {
        sails.log('Found existing serie: ' + serie.id);
      }
      await Expression.create({
        french_value:params.french_value, 
        english_value: params.english_value, 
        owner_texte: params.id_text, 
        owner_serie: serie.id 
      });
      return res.ok();
    });

  },

  saveDataSerie: async function (req, res){
    let params = req.allParams();
    let histoserie = [];
    let id_histoserie = 0;
    if(params.id_histoserie == 0){
      histoserie = await Histoserie.create({
        owner_serie: params.id_serie
      })
      .fetch();
      console.log(histoserie);
      id_histoserie = histoserie.id;
    }else{
      id_histoserie = params.id_histoserie
    }
    let dataserie = await Dataserie.create({
      result: params.result,
      duration: params.duration,
      owner_expression: params.id_expression,
      owner_serie: params.id_serie,
      owner_histoserie: id_histoserie
     })
     .fetch();
     
     console.log(dataserie);
     res.json({id_histoserie: id_histoserie});
  },

  getTextsRevision: async function (req, res){
    let textes = await Text.find().populate('serie');
    let result = [];
    for(let txt of textes){
      if(txt.serie.length > 0){
        result.push(txt);
      }
    }
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
      title: params.title,
      content: params.content,
      owner_category: params.category
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
    let data = {step: 'serie', id_text: req.params.id_texte, series: series};
    render(req, res, data);
  },

  customSeriesList: async function (req, res){
    let series = await Serie.find({owner_text: ''});
    let data = {id_text: '', series: series};
    render(req, res, data);
  },

  addCustomSerie: async function (req, res){
    let expressions = await Expression.find({owner_user: ''});
    let data = {id_text: '', expressions: expressions};
    render(req, res, data);
  }
  
};

