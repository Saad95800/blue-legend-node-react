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

  'GET /': {controller: 'MainController', action: 'renderVitrine'},
  'GET /accueil': {controller: 'MainController', action: 'accueil'},

  'GET /ajout-texte': {controller: 'MainController', action: 'ajoutTexte'},

  'GET /texte-liste': {controller: 'MainController', action: 'textes'},
  'GET /texte/:id_texte': {controller: 'MainController', action: 'texte'},
  'POST /textes-ajax': {controller: 'MainController', action: 'textesAjax', csrf: false},
  'POST /get-texte-ajax': {controller: 'MainController', action: 'getTexteAjax', csrf: false},
  'POST /save-text-ajax': {controller: 'MainController', action: 'saveTextAjax', csrf: false},
  'POST /update-texte-ajax': {controller: 'MainController', action: 'updateTextAjax', csrf: false},
  
  'GET /categories-liste': {controller: 'MainController', action: 'categoryList'},
  'GET /categorie-ajout': {controller: 'MainController', action: 'categoryAdd'},
  'GET /textes/category/:id_category': {controller: 'MainController', action: 'textes'},
  'POST /categories-ajax': {controller: 'MainController', action: 'categoriesAjax', csrf: false},
  'POST /save-category-ajax': {controller: 'MainController', action: 'saveCategoryAjax', csrf: false},

  'GET /revision': {controller: 'MainController', action: 'revision'},
  'GET /revision-serie-list/text/:id_text': {controller: 'MainController', action: 'serieListrevision'},
  // 'GET /revision-content/texte/:id_texte': {controller: 'MainController', action: 'contentRevision'},
  'GET /revision-content/text/:id_text/serie/:id_serie': {controller: 'MainController', action: 'contentRevision'},
  'GET /revision-mode/texte/:id_texte/serie/:id_serie/content/:num_content': {controller: 'MainController', action: 'modeRevision'},
  'GET /revision-btn-begin/texte/:id_texte/serie/:id_serie/content/:num_content/mode/:num_mode': {controller: 'MainController', action: 'btnBeginRevision'},
  'GET /revision-serie/texte/:id_texte/serie/:id_serie/content/:num_content/mode/:num_mode': {controller: 'MainController', action: 'serieRevision'},
  'GET /custom-series-list': {controller: 'MainController', action: 'customSeriesList'},
  'GET /add-custom-serie': {controller: 'MainController', action: 'addCustomSerie'},
  'GET /expressions': {controller: 'MainController', action: 'expressions'},
  'GET /series': {controller: 'MainController', action: 'series'},
  'GET /register-confirmation/:id_user': {controller: 'AuthController', action: 'validateUser'},
  'POST /get-serie-by-text-ajax': {controller: 'MainController', action: 'getSerieByText', csrf: false},
  'POST /textes-revision-ajax': {controller: 'MainController', action: 'getTextsRevision', csrf: false},
  'POST /series-revision-ajax': {controller: 'MainController', action: 'getSeriesRevision', csrf: false},
  'POST /save-expression-ajax': {controller: 'MainController', action: 'saveExpressionAjax', csrf: false},
  'POST /save-dataserie': {controller: 'MainController', action: 'saveDataSerie', csrf: false},
  'POST /save-user-ajax': {controller: 'AuthController', action: 'register', csrf: false},
  'POST /get-data-home-ajax': {controller: 'MainController', action: 'getDataHomeAjax', csrf: false},
  'POST /get-data-navbar-ajax': {controller: 'MainController', action: 'getDataNavbarAjax', csrf: false},
  'POST /update-histoserie-ajax': {controller: 'MainController', action: 'updateHistoserieAjax', csrf: false},
  'POST /check-expression-exist-ajax': {controller: 'MainController', action: 'checkExpressionExistAjax', csrf: false},
  'POST /upload-file-pdf-ajax': {controller: 'MainController', action: 'uploadFilePdfAjax', csrf: false},
  'POST /login': {controller: 'AuthController', action: 'login', csrf: false},
  'POST /logout': {controller: 'AuthController', action: 'logout', csrf: false},
  
  // 'GET /login': { view: 'login' },
  // 'POST /login': 'AuthController.login',
  // '/logout': 'AuthController.logout',
  // 'GET /register': { view: 'register' },
  //  ╔╦╗╦╔═╗╔═╗  ╦═╗╔═╗╔╦╗╦╦═╗╔═╗╔═╗╔╦╗╔═╗   ┬   ╔╦╗╔═╗╦ ╦╔╗╔╦  ╔═╗╔═╗╔╦╗╔═╗
  //  ║║║║╚═╗║    ╠╦╝║╣  ║║║╠╦╝║╣ ║   ║ ╚═╗  ┌┼─   ║║║ ║║║║║║║║  ║ ║╠═╣ ║║╚═╗
  //  ╩ ╩╩╚═╝╚═╝  ╩╚═╚═╝═╩╝╩╩╚═╚═╝╚═╝ ╩ ╚═╝  └┘   ═╩╝╚═╝╚╩╝╝╚╝╩═╝╚═╝╩ ╩═╩╝╚═╝
  '/terms':                   '/legal/terms',
  // '/logout':                  '/api/v1/account/logout',


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
