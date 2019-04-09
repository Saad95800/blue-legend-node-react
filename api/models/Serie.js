module.exports = {

    attributes: {
  
      id_text: {
        type: 'string',
        required: true
      },

      expression: {
        collection: 'expression',
        via: 'owner',
        type: "string"
      }
  
    },
  
  
  };
  