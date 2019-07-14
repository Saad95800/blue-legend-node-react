module.exports = {

    attributes: {

      date: {
        type: 'string',
        columnType: 'datetime'
      },
      
      owner_serie: {
        model: 'user'
      },

      owner_user: {
        model: 'user'
      }
  
    },
  
  };
  