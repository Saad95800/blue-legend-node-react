import React, { Component } from 'react';
import axios from 'axios';

export default class serieRevision extends Component {

  constructor(props){
    super(props);

    this.state = {
      numQuestion: 0,
      stepRev: "Question",
      stepRevs: {
        "1": "Question",
        "2": "Validation",
        "3": "Resultat"
      },
      stateQuestion: {
        logoUrlValidation: "",
        logoDisplayValidation: "none",
        messageValidation: "",
        btnValidation: "Valider",
        inputTextValue: "",
        colorMessageValidation: "#26DF38"
      },
      score: 0,
      expressions:[]
    }

  }

  componentDidMount(){
    axios({
      method: 'post',
      url: '/get-serie-by-text',
      responseType: 'json',
      data: {id_texte: this.props.id_texte}
    })
    .then((response) => {
      this.setState({expressions: response.data[0].expression});
    })
    .catch( (error) => {
      console.log(error);
    });
  }

  validate(){
    let res = this.state.expressions[this.state.numQuestion].french_value == document.querySelector("#inputResponse").value;
    let last = this.state.numQuestion == this.state.expressions.length - 1;
    let msg = "Suivant";
    if(last){
      msg = "Résultats";
    }
    if(res){
      this.setState({stateQuestion:{btnValidation: msg, colorMessageValidation: "rgb(38, 223, 56)", messageValidation: "Bonne réponse"}, score: this.state.score+1, stepRev: "Validation"});
    }else{
      this.setState({stateQuestion:{btnValidation: msg, colorMessageValidation: "red", messageValidation: this.state.expressions[this.state.numQuestion].french_value}, stepRev: "Validation"});
    }
  }

  next(){
    if( this.state.numQuestion == this.state.expressions.length - 1){
      this.setState({stateQuestion:{btnValidation: "Résultats", messageValidation: ""}, stepRev: "Resultat"});
    }else{
      this.setState({stateQuestion:{btnValidation: "Valider", messageValidation: ""}, stepRev: "Question", numQuestion: this.state.numQuestion+1});
    }
    document.querySelector("#inputResponse").value = "";
  }

  viewResult(){
    console.log('result');
  }

  render() {
    
    let displayExo = 'block';
    let displayRes = 'none';
    let func = '';
    if(this.state.stepRev == "Question"){
      func = this.validate;
    }else if(this.state.stepRev == "Validation"){
      func = this.next;
    }else{
      func = this.viewResult;
      displayExo = 'none';
      displayRes = 'block';
    }
    let text = '';
    if(this.state.expressions[this.state.numQuestion] !== undefined){
      text = this.state.expressions[this.state.numQuestion].english_value;
    }
    
    return (
            <div>
                <div style={styles.blockSerie}>
                  <div style={{display: displayExo}}>
                    <div style={{paddingTop: "35px",textAlign: "center",fontWeight: "bold",fontSize: "30px"}}>{text}</div>
                    <div style={{textAlign: "center"}}>
                      <input type="text" id="inputResponse" style={{width: "90%", height: "80px", fontSize: "40px", marginTop: "50px"}}/>
                    </div>
                    <div style={{height:"30px", marginLeft:"30px", marginTop:"10px", fontSize: "30px", color: this.state.stateQuestion.colorMessageValidation}}>{this.state.stateQuestion.messageValidation}</div>
                  
                    <div style={{textAlign: "center"}}>
                      <div style={styles.btnSuivant} onClick={func.bind(this)}>{this.state.stateQuestion.btnValidation}</div>
                    </div>
                  </div>
                  <div style={{display: displayRes}}>
                    <div>Score</div>
                    <div>{this.state.score}/{this.state.expressions.length}</div>
                  </div>
                </div>
            </div>
    );

  }
}

let styles = {
  blockSerie: {
    width: "60%",
    minWidth: "600px",
    height: "400px",
    backgroundColor: "#FFFBF1",
    borderRadius: "10px",
    border: "1px solid #c7c7c7",
    marginTop: "30px"
  },
  btnSuivant: {
    display: "inline-flex",
    width: "260px",
    height: "80px",
    borderRadius: "50px",
    backgroundColor: "#26DF38",
    color: "white",
    fontWeight: "block",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    fontSize: "40px",
    marginTop: "50px"
  }
}