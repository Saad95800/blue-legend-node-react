/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  'GET /': {controller: 'PostController', action: 'renderVitrine'},
  'GET /accueil': {controller: 'PostController', action: 'accueil'},

  'GET /ajout-texte': {controller: 'PostController', action: 'ajoutTexte'},

  'GET /texte-liste': {controller: 'PostController', action: 'textes'},
  'GET /texte/:id_texte': {controller: 'PostController', action: 'texte'},
  'POST /textes-ajax': {controller: 'PostController', action: 'textesAjax', csrf: false},
  'POST /get-texte-ajax': {controller: 'PostController', action: 'getTexteAjax', csrf: false},
  'POST /save-text-ajax': {controller: 'PostController', action: 'saveTextAjax', csrf: false},
  'POST /update-texte-ajax': {controller: 'PostController', action: 'updateTextAjax', csrf: false},
  
  'GET /categories-liste': {controller: 'PostController', action: 'categoryList'},
  'GET /categorie-ajout': {controller: 'PostController', action: 'categoryAdd'},
  'GET /textes/category/:id_category': {controller: 'PostController', action: 'textes'},
  'POST /categories-ajax': {controller: 'PostController', action: 'categoriesAjax', csrf: false},
  'POST /save-category-ajax': {controller: 'PostController', action: 'saveCategoryAjax', csrf: false},

  'GET /revision': {controller: 'PostController', action: 'revision'},
  'GET /revision-serie-list/text/:id_text': {controller: 'PostController', action: 'serieListrevision'},
  // 'GET /revision-content/texte/:id_texte': {controller: 'PostController', action: 'contentRevision'},
  'GET /revision-content/text/:id_text/serie/:id_serie': {controller: 'PostController', action: 'contentRevision'},
  'GET /revision-mode/texte/:id_texte/serie/:id_serie/content/:num_content': {controller: 'PostController', action: 'modeRevision'},
  'GET /revision-btn-begin/texte/:id_texte/serie/:id_serie/content/:num_content/mode/:num_mode': {controller: 'PostController', action: 'btnBeginRevision'},
  'GET /revision-serie/texte/:id_texte/serie/:id_serie/content/:num_content/mode/:num_mode': {controller: 'PostController', action: 'serieRevision'},
  'GET /custom-series-list': {controller: 'PostController', action: 'customSeriesList'},
  'GET /add-custom-serie': {controller: 'PostController', action: 'addCustomSerie'},
  'POST /get-serie-by-text-ajax': {controller: 'PostController', action: 'getSerieByText', csrf: false},
  'POST /textes-revision-ajax': {controller: 'PostController', action: 'getTextsRevision', csrf: false},
  'POST /series-revision-ajax': {controller: 'PostController', action: 'getSeriesRevision', csrf: false},
  'POST /save-expression-ajax': {controller: 'PostController', action: 'saveExpression', csrf: false},
  'POST /save-dataserie': {controller: 'PostController', action: 'saveDataSerie', csrf: false},

  //  ╔╦╗╦╔═╗╔═╗  ╦═╗╔═╗╔╦╗╦╦═╗╔═╗╔═╗╔╦╗╔═╗   ┬   ╔╦╗╔═╗╦ ╦╔╗╔╦  ╔═╗╔═╗╔╦╗╔═╗
  //  ║║║║╚═╗║    ╠╦╝║╣  ║║║╠╦╝║╣ ║   ║ ╚═╗  ┌┼─   ║║║ ║║║║║║║║  ║ ║╠═╣ ║║╚═╗
  //  ╩ ╩╩╚═╝╚═╝  ╩╚═╚═╝═╩╝╩╩╚═╚═╝╚═╝ ╩ ╚═╝  └┘   ═╩╝╚═╝╚╩╝╝╚╝╩═╝╚═╝╩ ╩═╩╝╚═╝
  '/terms':                   '/legal/terms',
  '/logout':                  '/api/v1/account/logout',


  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝
  // …


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝
  // Note that, in this app, these API endpoints may be accessed using the `Cloud.*()` methods
  // from the Parasails library, or by using those method names as the `action` in <ajax-form>.
  '/api/v1/account/logout':                           { action: 'account/logout' },
  'PUT   /api/v1/account/update-password':            { action: 'account/update-password' },
  'PUT   /api/v1/account/update-profile':             { action: 'account/update-profile' },
  'PUT   /api/v1/account/update-billing-card':        { action: 'account/update-billing-card' },
  'PUT   /api/v1/entrance/login':                        { action: 'entrance/login' },
  'POST  /api/v1/entrance/signup':                       { action: 'entrance/signup' },
  'POST  /api/v1/entrance/send-password-recovery-email': { action: 'entrance/send-password-recovery-email' },
  'POST  /api/v1/entrance/update-password-and-login':    { action: 'entrance/update-password-and-login' },
  'POST  /api/v1/deliver-contact-form-message':          { action: 'deliver-contact-form-message' },

};
