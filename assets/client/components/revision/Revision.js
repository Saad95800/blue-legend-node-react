import React, { Component } from 'react';
import TextListRevision from './TextListRevision';
import ContentRevision from './ContentRevision';
import ModeRevision from './ModeRevision';
import BtnBeginRevision from './BtnBeginRevision';
import SerieRevision from './SerieRevision';
import axios from 'axios';

export default class Revision extends Component {

  constructor(props){
    super(props);

    let textes = [];
    let step = this.props.step;
    let id_texte = null;
    let num_content = null;
    let num_mode = null;
    let serie = {};
    let id_serie = 0;

    this.state = {
      step: step,
      app: this.props.data.app,
      textes: textes,
      id_texte: this.props.location.pathname.split("/")[3],
      num_content: this.props.location.pathname.split("/")[5],
      num_mode: this.props.location.pathname.split("/")[7],
      serie: serie,
      id_serie: id_serie,
      infos_content: {
        "1": "Mots",
        "2": "Expressions",
        "3": "Mots & Expressions"
      },
      infos_mode: {
        "1": "Normal",
        "2": "Contre la montre"
      }
    }
  }

  componentDidMount(){

      if(this.props.step == 'text-list'){
        axios({
          method: 'post',
          url: '/textes-revision-ajax',
          responseType: 'json',
          data: {}
        })
        .then((response) => {
          this.setState({textes: response.data});
        })
        .catch( (error) => {
          console.log(error);
        });
      }else if(this.props.step == 'content-review'){
        let id_texte = this.props.location.pathname.split("/")[3];
        this.setState({id_texte: id_texte});
      }else if(this.props.step == 'mode'){
        let id_texte = this.props.location.pathname.split("/")[3];
        let num_content = this.props.location.pathname.split("/")[5];
        this.setState({id_texte: id_texte, num_content: num_content});
      }else if(this.props.step == 'btn-begin'){
        let id_texte = this.props.location.pathname.split("/")[3];
        let num_content = this.props.location.pathname.split("/")[5];
        let num_mode = num_content = this.props.location.pathname.split("/")[7];
        axios({
          method: 'post',
          url: '/get-serie-by-text',
          responseType: 'json',
          data: {id_text: id_texte}
        })
        .then((response) => {
          this.setState({id_texte: id_texte, num_content: num_content, num_mode: num_mode, serie: response.data, id_serie: 1});
        })
        .catch( (error) => {
          console.log(error);
        });
      }else if(this.props.step == 'serie'){
        let id_texte = this.props.location.pathname.split("/")[3];
        let num_content = this.props.location.pathname.split("/")[5];
        let num_mode = this.props.location.pathname.split("/")[7];
        this.setState({id_texte: id_texte, num_content: num_content, num_mode: num_mode});
      }

  }
  render() {

    let contentStep;
    let infos;

    switch(this.state.step){
      case 'text-list':
        contentStep = <TextListRevision data={{'textes': this.state.textes}}/>;
        infos = <div>Quel texte souhaitez-vous réviser ?</div>;
        break;
      case 'content-review':
        contentStep = <ContentRevision data={this.props}/>;
        infos = <div>Texte ></div>;
        break;
      case 'mode':
        contentStep = <ModeRevision data={this.props}/>;
        let content = this.state.infos_content[this.state.num_content];
        infos = <div><span>Texte</span><span> > </span><span>{content} ></span></div>;
        break;
      case 'btn-begin':
        contentStep = <BtnBeginRevision data={this.props} id_serie={this.state.id_serie}/>;
        let mode = this.state.infos_mode[this.state.num_mode];
        infos = <div><span>Texte</span><span> > </span><span>{this.state.infos_content[this.state.num_content]} ></span><span>{mode}</span></div>;
        break;
      case 'serie':
        console.log(this.state);
        contentStep = <SerieRevision data={this.props} num_mode={this.state.num_mode} id_texte={this.state.id_texte}/>;
        infos = <div><span>Texte</span><span> > </span><span>{this.state.infos_content[this.state.num_content]} ></span><span>{this.state.infos_mode[this.state.num_mode]}</span></div>;
        break;
      default:
      contentStep = <TextListRevision data={{'textes': this.state.textes}}/>;
        break;
    }

    return (
            <div>
                <div style={{display: "flex", flexDirection: "row"}}>
                  {infos}
                </div>
                {contentStep}
            </div>
    );
  }
}