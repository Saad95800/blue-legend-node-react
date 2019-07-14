const ReactDOMServer = require('react-dom/server');
import React from 'react';
import Appserver from '../../assets/client/components/Appserver';
import Vitrine from '../../assets/client/components/Vitrine';
import {StaticRouter } from 'react-router-dom';
import moment from 'moment';

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
    await Planning.create({
      date: moment().format("YYYY-MM-DD"),
      owner_serie: '5d2b53af4343e33070e4af24',
      owner_user: req.user.id
    });
    let data = {};
    if(req.user != undefined){
      var begin = moment(moment().format("YYYY-MM-DD")).unix(); // Date de début d'aujourd'hui
      var end = moment(moment().format("YYYY-MM-DD")).add(1, 'days').unix(); // Date de fin d'aujourd'hui
      let nbSeriesToday = await Planning.count({owner_user: req.user.id, date: {'>=': begin, '<': end} });
      let nbSerieRealiseesToday = await Histoserie.count({completed: true, owner_user: req.user.id, date_creation: {'>=': begin, '<': end}});  
      let nbSeriesTotalRealisees = await Histoserie.count({completed: true, owner_user: req.user.id});
      data.nbSeriesToday = nbSeriesToday;
      data.nbSerieRealiseesToday = nbSerieRealiseesToday;
      data.nbSeriesTotalRealisees = nbSeriesTotalRealisees;
    }
    render(req, res, data);
  },

  textes: async function (req, res){
    let data = {};
    if(req.user != undefined){
      if(req.params.id_category == undefined){
        var textes = await Text.find({owner_user: req.user.id});
        data = {'textes': textes};
      }else{
        var textes = await Text.find({'owner_category': req.params.id_category, owner_user: req.user.id});
        data = {'textes': textes, 'id_category': req.params.id_category};      
      }      
    }
    render(req, res, data);
  },

  texte: async function(req, res){
    let data = {};
    if(req.user != undefined){
      let texte = await Text.find({id: req.allParams().id_texte, owner_user: req.user.id});
      data = {'texte': texte[0]};
    }
    render(req, res, data);
  },

  ajoutTexte: (req, res) => {
    render(req, res);
  },

  categoryList: async function (req, res){
    let data = {};
    if(req.user != undefined){
      let categories = await Category.find({owner_user: req.user.id});
      data = {'categories': categories};
    }else{
      data = {'categories': {}};
    }
    render(req, res, data);
  },

  categoryAdd: async function (req, res){
    render(req, res);
  },

  saveCategoryAjax: async function (req, res){
    if(req.user != undefined){
      await Category.create({
        name: req.allParams().name,
        owner_user: req.user.id
      });
      return res.ok();
    }else{
      return res.error('Erreur de traitement');
    }
  },

  textesAjax: async function (req, res){
    if(req.user != undefined){
      let textes = await Text.find({
        owner_category: req.allParams().id_category,
        owner_user: req.user.id
      });
      return res.json(textes);
    }else{
      return res.error('Erreur de traitement');
    }
  },

  getTexteAjax: async function (req, res){
    let texte = {};
    if(req.user != undefined){
      let filtres = req.allParams();
      filtres.owner_user = req.user.id;
      texte = await Text.find(filtres);
    }
    return res.json(texte);
  },

  categoriesAjax: async function (req, res){
    let categories = {};
    if(req.user != undefined){
      categories = await Category.find({owner_user: req.user.id});
    }
    return res.json(categories);
  },

  revision: async function (req, res){
    let data = {
      'textes': {}, 
      step: 'text-list'
    };
    if(req.user != undefined){
      let textes = await Text.find({owner_user: req.user.id}).populate('serie');
      let texts = [];
      for(let txt of textes){
        if(txt.serie.length > 0){
          texts.push(txt);
        }
      }
      data.textes = texts;
    }

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
    let data = {};
      if(req.user != undefined){
      let serie = await Serie.find({owner_text: req.params.id_texte, owner_user: req.user.id});
      data = {
        id_texte: req.params.id_texte, 
        num_content: req.params.num_content, 
        num_mode: req.params.num_mode, 
        serie: serie, 
        step: 'btn-begin'
      };
    }
    render(req, res, data);
  },

  serieRevision: async function (req, res){
    let data = {};
    if(req.user != undefined){
      let serie = await Serie.find({id: req.params.id_serie, owner_user: req.user.id});
      data = {
        id_texte: req.params.id_texte, 
        num_content: req.params.num_content, 
        num_mode: req.params.num_mode, 
        serie: serie, 
        step: 'serie'
      };
    }
    render(req, res, data);
  },

  getSerieByText: async function (req, res){
    let serie = {};
    if(req.user != undefined){
      let params = req.allParams();
      serie = await Serie.findOne({
        id: params.id_serie, 
        owner_text: params.id_text,
        owner_user: req.user.id
      }).populate('expression');      
    }

    res.json(serie);
  },

  saveTextAjax: async function (req, res){
    if(req.user != undefined){
      let params = req.allParams();
      await Text.create({
        title:params.title, 
        content: params.content, 
        type_text:"text", 
        owner_category: params.id_category,
        owner_user: req.user.id
      });
      return res.ok();
    }else{
      return res.error('Erreur de traitement');
    }
  },

  saveExpression: async function (req, res){
    if(req.user != undefined){
      let params = req.allParams();
      let serie = await Serie.find({ owner_text: params.id_text, owner_user: req.user.id });
      let number = serie.length + 1;
      await Serie.findOrCreate(
        { owner_text: params.id_text, owner_user: req.user.id }, 
        { owner_text: params.id_text, name: 'Série '+number, owner_user: req.user.id }
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
    }else{
      return res.error('Erreur de traitement');
    }

  },

  saveDataSerie: async function (req, res){
    if(req.user != undefined){
      let params = req.allParams();
      let histoserie = [];
      let id_histoserie = 0;
      if(params.id_histoserie == 0){
        histoserie = await Histoserie.create({
          owner_serie: params.id_serie,
          owner_user: req.user.id,
          date_creation: moment().unix()
        })
        .fetch();
        id_histoserie = histoserie.id;
      }else{
        id_histoserie = params.id_histoserie
      }
      let dataserie = await Dataserie.create({
        result: params.result,
        duration: params.duration,
        owner_expression: params.id_expression,
        owner_serie: params.id_serie,
        owner_histoserie: id_histoserie,
        owner_user: req.user.id
      })
      .fetch();
      return res.json({id_histoserie: id_histoserie});
    }else{
      return res.error('Erreur de traitement');
    }
  },

  getTextsRevision: async function (req, res){
    if(req.user != undefined){
      let textes = await Text.find({owner_user: req.user.id}).populate('serie');
      let result = [];
      for(let txt of textes){
        if(txt.serie.length > 0){
          result.push(txt);
        }
      }
      return res.json(result);
    }else{
      return res.error('Erreur de traitement');
    }
  },

  getSeriesRevision: async function (req, res){
    if(req.user != undefined){
      let series = await Serie.find({owner_text: req.allParams().id_text, owner_user: req.user.id}).populate('expression');
      let result = [];
      for(let serie of series){
        if(serie.expression.length > 0){
          result.push(serie);
        }
      }
      return res.json(result);
    }else{
      return res.error('Erreur de traitement');
    }
  },

  updateTextAjax: async function (req, res){

    let updatedText = false;
    if(req.user != undefined){
      let params = req.allParams();
      updatedText = await Text.updateOne({ id: params.id_text, owner_user: req.user.id })
      .set({
        title: params.title,
        content: params.content,
        owner_category: params.category
      });      
    }else{
      updatedText = false;
    }

    if (updatedText) {
      sails.log('Mise à jour réussie !');
      return res.ok();
    }else {
      sails.log('Le texte à mettre à jour n\'éxiste pas dans la base de données.');
      return  res.error('Le texte à mettre à jour n\'éxiste pas dans la base de données.');
    }
  },

  serieListrevision: async function (req, res){
    let data = {};
    if(req.user != undefined){
      let params = req.allParams();
      let series = await Serie.find({owner_text: params.id_text, owner_user: req.user.id});
      data = {
        step: 'serie', 
        id_text: req.params.id_texte, 
        series: series
      };
    }

    render(req, res, data);
  },

  customSeriesList: async function (req, res){
    let data = {};
    if(req.user != undefined){
      let series = await Serie.find({owner_text: '', owner_user: req.user.id});
      data = {id_text: '', series: series};
    }
    render(req, res, data);
  },

  addCustomSerie: async function (req, res){
    let data = {};
    if(req.user != undefined){
      let expressions = await Expression.find({owner_user: '', owner_user: req.user.id});
      data = {id_text: '', expressions: expressions};
    }
    render(req, res, data);
  },
  
  saveUser: async function (req, res){
    let params = req.allParams();
    let user = await User.create({
      username: params.username,
      email: params.email,
      password: params.password
    }).fetch();
    return res.json(user);
  },
  
  getDataHomeAjax: async function (req, res){

    var begin = moment(moment().format("YYYY-MM-DD")).unix(); // Date de début d'aujourd'hui
    var end = moment(moment().format("YYYY-MM-DD")).add(1, 'days').unix(); // Date de fin d'aujourd'hui

    let nbSeriesToday = await Planning.count({owner_user: req.user.id, date: {'>=': begin, '<': end} });
    let nbSerieRealiseesToday = await Histoserie.count({completed: true, owner_user: req.user.id, date_creation: {'>=': begin, '<': end}});
    // let nbMotsExprApprisToday = await Dataserie.count({owner_user: req.user.id, date: {'>=': begin, '<': end}, groupBy:'owner_expression'});
    let nbSeriesTotalRealisees = await Histoserie.count({completed: true, owner_user: req.user.id});
    // let nbMotsExprTotalAppris = await Dataserie.count({owner_user: req.user.id});

    let data = {
      nbSeriesToday: nbSeriesToday,
      nbSerieRealiseesToday: nbSerieRealiseesToday,
      nbMotsExprApprisToday: '-',
      nbSeriesTotalRealisees: nbSeriesTotalRealisees,
      nbMotsExprTotalAppris: '-'
    }
    return res.json(data);
  },

  updateHistoserieAjax: async function(req, res){

    let params = req.allParams();
    let result = await Histoserie.updateOne({
      id: params.id_histoserie
    }).set({
      completed: params.completed,
      score: params.score
    });

    if (result) {
      return res.ok();
    }
    else {
      return res.error('Cette historique de série n\'éxiste pas');
    }
  },

  getDataNavbarAjax: async function(req, res){
    return res.json(req.user);
  }

};