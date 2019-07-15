module.exports = {

  attributes: {

    dataseries: {
      collection: 'dataserie',
      via: 'owner_recordexpression',
      type: "string"
    },

    owner_expression: {
      model: 'expression'
    },

    owner_texte: {
      model: 'text'
    },

    owner_serie: {
      model: 'serie'
    },

    owner_user: {
      model: 'user'
    }

  }

};
