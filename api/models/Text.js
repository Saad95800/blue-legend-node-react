module.exports = {

  attributes: {

    title: {
      type: 'string',
      required: true
    },

    content: {
      type: 'string'
    },

    type_text: {
      type: 'string',
      required: true
    },

    file_name: {
      type: 'string'
    },

    file_name_server: {
      type: 'string'
    },

    serie: {
      collection: 'serie',
      via: 'owner_text',
      type: "string"
    },

    recordexpression: {
      collection: 'recordexpression',
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
