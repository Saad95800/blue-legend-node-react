module.exports = {

  attributes: {

    userName: {
      type: 'string',
      required: true,
      description: 'Full representation of the user\'s name.'
    },

    emailAddress: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true
    },

    password: {
      type: 'string',
      required: true,
      protect: true,
    },

    text: {
      collection: 'text',
      via: 'owner_user',
      type: "string"
    },

    category: {
      collection: 'category',
      via: 'owner_user',
      type: "string"
    },

    histoserie: {
      collection: 'histoserie',
      via: 'owner_user',
      type: "string"
    },

    serie: {
      collection: 'serie',
      via: 'owner_user',
      type: "string"
    }

  },


};
