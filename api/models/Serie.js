module.exports = {

    attributes: {
  
      id_text: {
        type: 'string',
        required: true
      },
  
      name: {
        type: 'string'
      },

      expression: {
        collection: 'expression',
        via: 'owner_serie',
        type: "string"
      },

      owner_text: {
        model: 'text'
      }
  
    },
  
  
  };
  