import React, { Component } from 'react';
import axios from 'axios';
import ReactCountdownClock from 'react-countdown-clock';
import {capitalizeFirstLetter} from './../functions';

export default class serieRevision extends Component {

  constructor(props){
    super(props);

    this.timer = 0;
    this.durationCount = 5;
    
    this.state = {  
      id_histoserie: 0,
      numQuestion: 0,
      inputResponse: '',
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
      expressions:[],
      clock: 'enabled',

      minutes: 0,
      seconds: 0,
      millis: 0,
      running: false
    }

    // this.startTimer();
    
    this._handleStartClick = this._handleStartClick.bind(this);
    this._handleStopClick = this._handleStopClick.bind(this);
    this._handleResetClick = this._handleResetClick.bind(this);

    
  }

  componentDidMount(){
    let url = this.props.data.location.pathname.split('/');
    this._handleStartClick();
    axios({
      method: 'post',
      url: '/get-serie-by-text-ajax',
      responseType: 'json',
      data: {id_text: url[3], id_serie: url[5]}
    })
    .then((response) => {
      console.log(response);
      this.setState({expressions: response.data.recordexpression});
    })
    .catch( (error) => {
      console.log(error);
    });
  }

  validate(){
    this._handleStopClick();
    if(this.state.stepRev == 'Question'){
      let res = this.state.expressions[this.state.numQuestion].french_value.toLowerCase() == document.querySelector("#inputResponse").value.toLowerCase();
      let last = (this.state.numQuestion == this.state.expressions.length - 1);
      let msg = "Suivant";
      if(last){
        msg = "Résultats";
      }
      if(res){
        this.setState({
          stateQuestion:{
            btnValidation: msg, 
            colorMessageValidation: "rgb(38, 223, 56)", 
            messageValidation: "Bonne réponse"
          }, 
          score: this.state.score+1, 
          stepRev: "Validation", 
          clock: 'disabled'
        });
      }else{
        this.setState({
                    stateQuestion:{
                      btnValidation: msg, 
                      colorMessageValidation: "red", 
                      messageValidation: this.state.expressions[this.state.numQuestion].french_value
                    }, 
                    stepRev: "Validation",
                    clock: 'disabled'
                  });
      }
      let url = this.props.data.location.pathname.split('/');
      axios({
        method: 'post',
        url: '/save-dataserie',
        responseType: 'json',
        data: {
            result: res, 
            id_serie: url[5], 
            id_histoserie: this.state.id_histoserie, 
            duration: this.state.seconds, 
            id_expression: this.state.expressions[this.state.numQuestion].id
          }
      })
      .then((response) => {
        if(this.state.id_histoserie == 0){
          this.setState({id_histoserie: response.data.id_histoserie});
        }
      })
      .catch( (error) => {
        console.log(error);
      });
    }

  }

  next(){
    if( this.state.numQuestion == this.state.expressions.length - 1){
      this.setState({
        stateQuestion:{
          btnValidation: "Résultats", 
          messageValidation: ""
        }, 
        stepRev: "Resultat",
        inputResponse: ''
      });

      axios({
        method: 'post',
        url: '/update-histoserie-ajax',
        responseType: 'json',
        data: {
          id_histoserie: this.state.id_histoserie,
          completed: true,
          score: this.state.score,
          id_serie: this.props.data.location.pathname.split('/')[5]
        }
      })
      .then((response) => {
        if(this.state.id_histoserie == 0){
          this.setState({id_histoserie: response.data.id_histoserie});
        }
      })
      .catch( (error) => {
        console.log(error);
      });

    }else{
      this._handleResetClick();
      this._handleStartClick();
      this.setState({
        stateQuestion:{
          btnValidation: "Valider", 
          messageValidation: ""
        }, 
        stepRev: "Question", 
        numQuestion: this.state.numQuestion+1, 
        clock: 'enabled',
        inputResponse: ''
      });
    }
    document.querySelector("#inputResponse").value = "";
  }

  viewResult(){
    console.log('result');
  }

  verifKey(e){
    let keycode = (e.keyCode ? e.keyCode : e.which);
    if(keycode == '13'){
      if(this.state.stepRev == 'Question'){
        this.validate();
      }else{
        this.next();
      }
    }
  }

  restart(){
    this.setState({
      numQuestion: 0,
      stepRev: "Question",
            stateQuestion: {
              logoUrlValidation: "",
              logoDisplayValidation: "none",
              messageValidation: "",
              btnValidation: "Valider",
              inputTextValue: "",
              colorMessageValidation: "#26DF38"
            },
      score: 0,
      clock: 'enabled'
    });
    this._handleResetClick();
    this._handleStartClick();
  }

  /////////////////////////////////////////////////////

  _handleStartClick(event) {
    var _this = this;
    if (!this.state.running) {
        this.interval = setInterval(() => {
            this.tick();
        }, 100)

        this.setState({running: true})
    }
}

_handleStopClick(event) {        
    if (this.state.running) {
        clearInterval(this.interval);
        this.setState({running: false})
    }
}

_handleResetClick(event) {
    this._handleStopClick();
    this.update(0, 0, 0);
}

tick() {
    let millis = this.state.millis + 1;
    let seconds = this.state.seconds;
    let minutes = this.state.minutes;

    if (millis === 10) {
        millis = 0;
        seconds = seconds + 1;
    }

    if (seconds === 60) {
        millis = 0;
        seconds = 0;
        minutes = minutes + 1;
    }

    this.update(millis, seconds, minutes);
}

zeroPad(value) {
    return value < 10 ? `0${value}` : value;
}

update(millis, seconds, minutes) {
    // this.setState({
    //     millis: millis,
    //     seconds: seconds,
    //     minutes: minutes
    // });
}
////////////////////////////////////////////////////////////
  render() {
    let displayExo = 'block';
    let displayRes = 'none';
    /** Fonction a éxécuter lors de l'appuis sur le bouton vert */
    let func = '';
    if(this.state.stepRev == "Question"){
      func = this.validate;
    }else if(this.state.stepRev == "Validation"){
      func = this.next;
    }else{
      func = this.viewResult;
      displayExo = 'none';
      displayRes = 'flex';
    }
    /************************* */
    let text = '...';
    if(this.state.expressions[this.state.numQuestion] !== undefined){
      text = this.state.expressions[this.state.numQuestion].owner_expression.english_value;
    }
    console.log("toto");
    console.log(this.state.expressions);
    console.log("tata");
    let clock = '';
    if(this.props.num_mode == 2){
      let count = 0;
      if(this.state.clock == 'enabled'){
        count = this.durationCount;
      }
      clock = <ReactCountdownClock 
                seconds={count}
                color="#ffd23d"
                alpha={0.9}
                size={100}
                onComplete={this.validate.bind(this)} /> 

    }
    return (
            <div>
                <div id="clock" style={{position: 'fixed', top: '78px', right: '80px'}}>{clock}</div>
                <div style={styles.blockSerie}>
                  <div style={{display: displayExo}}>
                    <div style={{paddingTop: "35px",textAlign: "center",fontWeight: "bold",fontSize: "30px"}}>{capitalizeFirstLetter(text)}</div>
                    <div style={{textAlign: "center"}}>
                      <input 
                        type="text" 
                        id="inputResponse" 
                        value={this.state.inputResponse} 
                        style={{width: "90%", height: "80px", fontSize: "40px", marginTop: "50px"}} 
                        onChange={ () => {this.setState({ inputResponse: document.querySelector("#inputResponse").value})} }
                        onKeyPress={this.verifKey.bind(this)}
                        autoComplete="off"
                      />
                    </div>
                    <div style={{height:"30px", marginLeft:"30px", marginTop:"10px", fontSize: "30px", color: this.state.stateQuestion.colorMessageValidation}}>{this.state.stateQuestion.messageValidation}</div>
                  
                    <div style={{textAlign: "center"}}>
                      <div style={styles.btnSuivant} onClick={func.bind(this)}>{this.state.stateQuestion.btnValidation}</div>
                    </div>
                  </div>
                  <div style={{display: displayRes, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                    <div>
                      <div>Score</div>
                      <div style={{textAlign: 'center', fontWeight: 'bold', fontSize: '100px'}}>
                        {this.state.score}/{this.state.expressions.length}
                      </div>
                      <button onClick={this.restart.bind(this)}>Recommencer</button>
                    </div>
                  </div>
                </div>

                {/* <div className="segments">
                    <span className="mins">{this.zeroPad(this.state.minutes)}:</span> 
                    <span className="secs">{this.zeroPad(this.state.seconds)} </span> 
                    <span className="millis">.0{this.state.millis}</span>
                </div> */}

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