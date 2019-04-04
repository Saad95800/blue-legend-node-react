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

  },


};
