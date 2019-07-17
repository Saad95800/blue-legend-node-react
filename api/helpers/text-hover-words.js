module.exports = {


  friendlyName: 'Text hover words',


  description: 'Renvoie un texte avec des mots cliquables',

  sideEffects: 'cacheable',

  async: true,

  inputs: {
    textContent: {
      type: 'string',
      example: '<span>hello</span>',
      description: 'Le contenu du texte à transformer',
      required: true
    },

    recordexpressions: {
      type: 'ref',
      example: [{toto: 'toto'}],
      description: 'Un tableau contenant la liste des mots à rendre cliquable',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    for(let recordexpression of inputs.recordexpressions){
      let english_value = recordexpression.owner_expression.english_value;
      let french_value = recordexpression.owner_expression.french_value;
      inputs.textContent = inputs.textContent.split(' '+english_value+' ');
      inputs.textContent = inputs.textContent.join( ' <span class="block-hover-word"><span class="hover-word">'+english_value+'</span><span class="hover-word-french">'+french_value+'</span><span class="popup-hover-word"></span></span> ');
      inputs.textContent = inputs.textContent.split('>'+english_value+' ');
      inputs.textContent = inputs.textContent.join( '><span class="block-hover-word"><span class="hover-word">'+english_value+'</span><span class="hover-word-french">'+french_value+'</span><span class="popup-hover-word"></span></span> ');
      inputs.textContent = inputs.textContent.split(' '+english_value+'<');
      inputs.textContent = inputs.textContent.join( ' <span class="block-hover-word"><span class="hover-word">'+english_value+'</span><span class="hover-word-french">'+french_value+'</span><span class="popup-hover-word"></span></span><');
      inputs.textContent = inputs.textContent.split(' '+english_value+'.');
      inputs.textContent = inputs.textContent.join( ' <span class="block-hover-word"><span class="hover-word">'+english_value+'</span><span class="hover-word-french">'+french_value+'</span><span class="popup-hover-word"></span></span>.');
    }
    return inputs.textContent;
  }


};

