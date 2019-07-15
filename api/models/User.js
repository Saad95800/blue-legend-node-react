import bcrypt from 'bcrypt-nodejs';

module.exports = {

  attributes: {

    username: {
      type: 'string',
      required: true,
      description: 'Full representation of the user\'s name.'
    },

    email: {
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

    confirmed: {
      type: 'boolean'
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
    },

    recordexpression: {
      collection: 'recordexpression',
      via: 'owner_user',
      type: "string"
    }

  },
  customToJSON: function() {
     return _.omit(this, ['password'])
  },
  beforeCreate: function(user, cb){
    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(user.password, salt, null, function(err, hash){
        if(err) return cb(err);
        user.password = hash;
        return cb();
      });
    });
  }


};
