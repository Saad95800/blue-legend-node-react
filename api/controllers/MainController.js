const ReactDOMServer = require('react-dom/server');
import React from 'react';
import Appserver from '../../assets/client/components/Appserver';
import Vitrine from '../../assets/client/components/Vitrine';
import {StaticRouter } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';

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

  renderVitrine: async function (req, res){

    // Envoi de mails
    // await sails.helpers.mailer();
    console.log(req.allParams());
    let data = req.allParams();
    data.url = req.url;
    data.app = 'server';
    const body = ReactDOMServer.renderToString(
                                                <Vitrine data={data}/>
                                              );
    res.view('pages/homepage', {body: body});
  },

  accueil: async function (req, res){
    // await Planning.create({
    //   date: moment().format("YYYY-MM-DD"),
    //   owner_serie: '5d2b53af4343e33070e4af24',
    //   owner_user: req.user.id
    // });
    if(req.isAuthenticated() && req.user != undefined){
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
        data.nbMotsExprApprisToday = '-';
        data.nbMotsExprTotalAppris = '-';
      }
      render(req, res, data);
    }else{
      res.redirect('/');
    }
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

  textes: async function (req, res){
    if(req.isAuthenticated() && req.user != undefined){
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
    }else{
      res.redirect('/');
    }
  },

  texte: async function(req, res){
    if(req.isAuthenticated() && req.user != undefined){
      let data = {};
      let texte = {}
      if(req.user != undefined){
        texte = await Text.findOne({id: req.allParams().id_texte, owner_user: req.user.id});
        let textContent = texte.content;
        texte.contentTextArea = textContent;
        let recordexpressions = await RecordExpression.find({owner_user: req.user.id}).populate('owner_expression')
        textContent = await sails.helpers.textHoverWords.with({
                        textContent: textContent,
                        recordexpressions: recordexpressions
                      });
        texte.content = textContent;
        data = {'texte': texte};
      }
      render(req, res, data);
    }else{
      res.redirect('/');
    }
  },

  ajoutTexte: (req, res) => {
    render(req, res);
  },

  categoryList: async function (req, res){
    if(req.isAuthenticated() && req.user != undefined){
      let data = {};
      if(req.user != undefined){
        let categories = await Category.find({owner_user: req.user.id});
        data = {'categories': categories};
      }else{
        data = {'categories': {}};
      }
      render(req, res, data);
    }else{
      res.redirect('/');
    }
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
      texte = await Text.findOne(filtres);
      let textContent = texte.content;
      texte.contentTextArea = texte.content;
      let recordexpressions = await RecordExpression.find({owner_user: req.user.id}).populate('owner_expression')

      textContent = await sails.helpers.textHoverWords.with({
        textContent: textContent,
        recordexpressions: recordexpressions
      });

      texte.content = textContent;
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
    if(req.isAuthenticated() && req.user != undefined){
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
    }else{
      res.redirect('/');
    }
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
    if(req.isAuthenticated() && req.user != undefined){
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
    }else{
      res.redirect('/');
    }
  },

  serieRevision: async function (req, res){
    if(req.isAuthenticated() && req.user != undefined){
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
    }else{
      res.redirect('/');
    }
  },

  getSerieByText: async function (req, res){
    if(req.isAuthenticated() && req.user != undefined){
      let serie = {};
      if(req.user != undefined){
        let params = req.allParams();
        serie = await Serie.findOne({
          id: params.id_serie, 
          owner_text: params.id_text,
          owner_user: req.user.id
        }).populate('recordexpression');      
      }

      let listRecordExpressions = [];
      for (let recordexpression of serie.recordexpression) {
        recordexpression = await RecordExpression.findOne({id: recordexpression.id}).populate('owner_expression');
        listRecordExpressions.push(recordexpression);
      }

      serie.recordexpression = listRecordExpressions;

      res.json(serie);
    }else{
      res.redirect('/');
    }
  },

  saveTextAjax: async function (req, res){
    if(req.user != undefined){
      let params = req.allParams();
      await Text.create({
        title:params.title, 
        content: params.content, 
        type_text:"text", 
        owner_category: (params.id_category == '')? null : params.id_category,
        owner_user: req.user.id
      });
      return res.ok();
    }else{
      return res.error('Erreur de traitement');
    }
  },

  saveExpressionAjax: async function (req, res){
    if(req.user != undefined){
      let params = req.allParams();
      let serie = await Serie.find(
        { 
          owner_text: params.id_text, 
          owner_user: req.user.id
        })
        .populate('recordexpression')
        .sort([
          { createdAt: 'ASC' },
        ]);
      let number = serie.length + 1;
      let serie_id = null;

      if(serie.length == 0){
        console.log('Aucune série');
        let s = await Serie.create({
          name: 'Série 1',
          owner_text: params.id_text,
          owner_user: req.user.id
        }).fetch();
        serie_id = s.id;
      }else if(serie.length == 1 && serie[0].recordexpression.length < 10){
        console.log('Une seule série');
        serie_id = serie[0].id;
      }else if(serie.length > 1){
        console.log('plus d\'une série');
        let exist = false;
        for(let se of serie){
          if(se.recordexpression.length < 10){
            exist = true;
            serie_id = se.id;
            break;
          }
        }
        if(exist == false){
          var ser = await Serie.create({
            name: 'Série '+number,
            owner_text: params.id_text,
            owner_user: req.user.id
          }).fetch();
          serie_id = ser.id;
        }
      }

        await Expression.findOrCreate(
          {english_value: params.english_value},
          {english_value: params.english_value, french_value:params.french_value}
          )
        .exec(async(err, expression, wasCreated) => {
          if (err) { return res.serverError(err); }
          if(wasCreated){
            sails.log('Nouvelle expression crée: ' + expression.id);
            // await Expression.updateOne({id: expression.id}).set({french_value:params.french_value});
          }else{
            sails.log('Expression éxistante trouvée: ' + expression.id);
          }
         await RecordExpression.findOrCreate(
                                    {
                                      owner_expression: expression.id,
                                      owner_user: req.user.id
                                    },
                                    {
                                    owner_texte: params.id_text, 
                                    owner_serie: serie_id,
                                    owner_expression: expression.id,
                                    owner_user: req.user.id
                                    }
                                  );
          let recordexpressions = await RecordExpression.find({owner_user: req.user.id}).populate('owner_expression');
          let text = await Text.findOne({id: params.id_text});
          let textHoverWords = await sails.helpers.textHoverWords.with({
                                textContent: text.content,
                                recordexpressions: recordexpressions
                              });
          let data = {
            textHoverWords: textHoverWords,
            texte: text.content,
          }
          return res.json(data);
        });

      // await Serie.findOrCreate(
      //   { owner_text: params.id_text, owner_user: req.user.id }, 
      //   { owner_text: params.id_text, name: 'Série '+number, owner_user: req.user.id }
      // )
      // .exec(async(err, serie, wasCreated) => {
      //   if (err) { return res.serverError(err); }
      
      //   if(wasCreated) {
      //     sails.log('Nouvelle série crée: ' + serie.id);
      //   }
      //   else {
      //     sails.log('Série éxistante trouvée: ' + serie.id);
      //     console.log(serie);
      //   }
        
        // await Expression.findOrCreate(
        //   {english_value: params.english_value},
        //   {english_value: params.english_value, french_value:params.french_value}
        //   )
        // .exec(async(err, expression, wasCreated) => {
        //   if (err) { return res.serverError(err); }
        //   if(wasCreated){
        //     sails.log('Nouvelle expression crée: ' + expression.id);
        //     // await Expression.updateOne({id: expression.id}).set({french_value:params.french_value});
        //   }else{
        //     sails.log('Expression éxistante trouvée: ' + expression.id);
        //   }
        //  await RecordExpression.findOrCreate(
        //                             {
        //                               owner_expression: expression.id,
        //                               owner_user: req.user.id
        //                             },
        //                             {
        //                             owner_texte: params.id_text, 
        //                             owner_serie: serie.id,
        //                             owner_expression: expression.id,
        //                             owner_user: req.user.id
        //                             }
        //                           );
        //   let recordexpressions = await RecordExpression.find({owner_user: req.user.id}).populate('owner_expression');
        //   let text = await Text.findOne({id: params.id_text});
        //   let textHoverWords = await sails.helpers.textHoverWords.with({
        //                         textContent: text.content,
        //                         recordexpressions: recordexpressions
        //                       });
        //   let data = {
        //     textHoverWords: textHoverWords,
        //     texte: text.content,
        //   }
        //   return res.json(data);
        // });

      // });
    }else{
      return res.error('Erreur de traitement');
    }

  },

  saveDataSerie: async function (req, res){
    if(req.isAuthenticated() && req.user != undefined){
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
    }else{
      res.redirect('/');
    }
  },

  getTextsRevision: async function (req, res){
    if(req.isAuthenticated() && req.user != undefined){
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
    }else{
      res.redirect('/');
    }
  },

  getSeriesRevision: async function (req, res){
    if(req.user != undefined){
      let series = await Serie.find({owner_text: req.allParams().id_text, owner_user: req.user.id}).populate('recordexpression');
      let result = [];
      for(let serie of series){
        if(serie.recordexpression.length > 0){
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
      let expressions = await RecordExpression.find({owner_user: req.user.id});
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
  },

  checkExpressionExistAjax: async function(req, res){
    let params = req.allParams();
    let selText = params.expression.trim();
    let expression = await Expression.findOne({
      english_value: params.expression.trim()
    });
    if(expression != undefined){
      // L'expression sélectionnée éxiste en bdd
      let recordexpression = await RecordExpression.findOne({
                                owner_expression: expression.id,
                                owner_user: req.user.id
                              })
                              .populate('owner_expression');
      if(recordexpression != undefined){
        // L'expression éxiste dans l'espace membre de l'utilisateur
        return res.json({existApi: 'yes', existUserSpace: 'yes', translation: expression.french_value});
      }else{
        return res.json({existApi: 'yes', existUserSpace: 'no', translation: expression.french_value});
      }
    }else{
        console.log('Appel Deepl API');
      axios({
        method: 'post',
        url: 'https://api.deepl.com/v2/translate?auth_key=3d1a2e4a-99eb-4622-3158-39c43344859b&text='+selText+'&target_lang=fr&source_lang=en',
        responseType: 'json',
        headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Accept': '*/*'}
      })
      .then((response) => {
        Expression.findOrCreate(
          {english_value: selText},
          {english_value: selText, french_value:response.data.translations[0].text}
          )
        .exec(async(err, expression, wasCreated) => {
          if (err) { return res.serverError(err); }
          if(wasCreated){
            sails.log('Nouvelle expression crée: ' + expression.id);
          }
        });
        return res.json({existApi: 'no', existUserSpace: 'no', translation: response.data.translations[0].text});
      })
      .catch( (error) => {
        console.log(error);
        return res.error('Erreur lors de l\'accès à l\'API deepl');
      });
    }

  },

  expressions: async function (req, res){

    if(req.isAuthenticated() && req.user != undefined){
      let expressions = RecordExpression.find({owner_user: req.user.id});
      let data = {
        expressions: expressions
      }
      render(req, res, data);      
    }else{
      res.redirect('/');
    }

  },

  series:  async function (req, res){

    if(req.isAuthenticated() && req.user != undefined){
      let series = Serie.find({owner_user: req.user.id});
      let data = {
        series: series
      }
      render(req, res, data);      
    }else{
      res.redirect('/');
    }

  }

};