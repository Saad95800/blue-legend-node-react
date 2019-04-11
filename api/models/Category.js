module.exports = {

  attributes: {

    name: {
      type: 'string',
      required: true,
    },

    text: {
      collection: 'text',
      via: 'owner_category',
      type: "string"
    },

    owner_user: {
      model: 'user'
    }

  },


};
