module.exports = {

  attributes: {

    title: {
      type: 'string',
      required: true
    },

    content: {
      type: 'string',
      required: true
    },

    type_text: {
      type: 'string',
      required: true
    },

    serie: {
      collection: 'serie',
      via: 'owner_text',
      type: "string"
    },

    expression: {
      collection: 'expression',
      via: 'owner_texte',
      type: "string"
    },

    owner_user: {
      model: 'user'
    },

    owner_category: {
      model: 'category'
    }
  },


};
