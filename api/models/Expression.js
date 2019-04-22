module.exports = {

  attributes: {

    french_value: {
      type: 'string',
      required: true,
    },

    english_value: {
      type: 'string',
      required: true,
    },

    dataseries: {
      collection: 'dataserie',
      via: 'owner_expression',
      type: "string"
    },

    owner_texte: {
      model: 'text'
    },

    owner_serie: {
      model: 'serie'
    }

  }

};
