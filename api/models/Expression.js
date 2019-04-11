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

    owner_texte: {
      model: 'text'
    },

    owner_serie: {
      model: 'serie'
    }

  }


};
