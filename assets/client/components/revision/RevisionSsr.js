import React, { Component } from 'react';
import TextListRevision from './TextListRevision';
import ContentRevision from './ContentRevision';
import ModeRevision from './ModeRevision';
import BtnBeginRevision from './BtnBeginRevision';
// import SerieRevision from './SerieRevision';
import axios from 'axios';

export default class RevisionSsr extends Component {

  constructor(props){
    super(props);

    let textes = [];
    let step = this.props.step;
    let id_texte = null;
    let num_content = null;
    let num_mode = null;
    let serie = {};
    let id_serie = 0;

    if(this.props.data.step == 'text-list'){
      textes = this.props.data.textes;
      step = 'text-list';
      textes = textes;
    }else if(this.props.data.step == 'content-review'){
      step = 'content-review';
      id_texte = this.props.data.id_texte;
    }else if(this.props.data.step == 'mode'){
      step = 'mode';
      id_texte = this.props.data.id_texte;
      num_content = this.props.data.num_content;
    }else if(this.props.data.step == 'btn-begin'){
      step = 'btn-begin';
      id_texte = this.props.data.id_texte;
      num_content = this.props.data.num_content;
      num_mode = this.props.data.num_mode;
      serie = this.props.data.serie;
    }else if(this.props.data.step == 'serie'){
      step = 'serie';
      id_texte = this.props.data.id_texte;
      num_content = this.props.data.num_content;
      num_mode = this.props.data.num_mode;
      serie = this.props.data.serie;
    }

    this.state = {  
      step: step,
      app: this.props.data.app,
      textes: textes,
      id_texte: id_texte,
      num_content: num_content,
      num_mode: num_mode,
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
        contentStep = <img src="/client/images/89.gif" />;
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