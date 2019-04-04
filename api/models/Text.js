module.exports = {

  attributes: {

    title: {
      type: 'string',
      required: true,
      description: 'Full representation of the user\'s name.'
    },

    content: {
      type: 'string',
      required: true
    },

    type: {
      type: 'string',
      required: 'true'
    },

    id_category: {
      type: 'string',
      required: false
    }

  },


};
