module.exports = {


  friendlyName: 'Email sender',


  description: 'Envoie un email',

  sideEffects: 'cacheable',

  async: true,

  inputs: {
    template: {
      type: 'string',
      example: '<span>hello</span>',
      description: 'Le template d\'email à choisir',
      required: true
    },

    data: {
      type: 'ref',
      example: [{toto: 'toto'}],
      description: 'Un tableau contenant la liste des mots à rendre cliquable',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    sails.hooks.email.send(
        inputs.template, 
        {
        Name: inputs.data[0].username,
        id_user: inputs.data[0].id
        },
        {
        to: inputs.data[0].email,
        subject: "Confirmation de votre compte utilisateur"
        },
        function(err) {console.log(err || "Mail Sent!");}
        )
  }


};