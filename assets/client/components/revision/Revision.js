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

    if(this.props.data.app == 'server'){ // AppServer
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
      }else if(this.props.data.step == 'series'){
        step = 'series';
        id_texte = this.props.data.id_texte;
        num_content = this.props.data.num_content;
        num_mode = this.props.data.num_mode;
        serie = this.props.data.serie;
      }

    }else{

      let data = {};
      if(this.props.step == 'text-list'){
        axios({
          method: 'post',
          url: '/textes-ajax',
          responseType: 'json',
          data: data
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
        let num_mode = num_content = this.props.location.pathname.split("/")[5];
        axios({
          method: 'post',
          url: '/get-serie-by-text',
          responseType: 'json',
          data: {id_texte: id_texte}
        })
        .then((response) => {
          console.log(response.data[0].id);
          this.setState({id_texte: id_texte, num_content: num_content, num_mode: num_mode, serie: response.data, id_serie: response.data[0].id});
        })
        .catch( (error) => {
          console.log(error);
        });
      }else if(this.props.step == 'series'){
        let id_texte = this.props.location.pathname.split("/")[3];
        let num_content = this.props.location.pathname.split("/")[5];
        let num_mode = num_content = this.props.location.pathname.split("/")[5];
        // let id_serie = num_content = this.props.location.pathname.split("/")[9];
        axios({
          method: 'post',
          url: '/get-serie-by-text',
          responseType: 'json',
          data: {id_texte: id_texte}
        })
        .then((response) => {
          this.setState({id_texte: id_texte, num_content: num_content, num_mode: num_mode, serie: response.data, id_serie: response.data[0].id});
        })
        .catch( (error) => {
          console.log(error);
        });

      }

    }

    this.state = {
      step: step,
      app: this.props.data.app,
      textes: textes,
      id_texte: id_texte,
      num_content: num_content,
      num_mode: num_mode,
      serie: serie,
      id_serie: id_serie
    }
  }

  // componentDidMount(){


  // }

  render() {

    let contentStep;

    switch(this.state.step){
      case 'text-list':
      contentStep = <TextListRevision data={{'textes': this.state.textes}}/>;
        break;
      case 'content-review':
      contentStep = <ContentRevision data={this.props}/>;
        break;
      case 'mode':
      contentStep = <ModeRevision data={this.props}/>;
        break;
      case 'btn-begin':
      contentStep = <BtnBeginRevision data={this.props} id_serie={this.state.id_serie}/>;
        break;
      case 'serie':
      contentStep = <SerieRevision data={this.props}/>;
        break;
      default:
      contentStep = <TextListRevision data={{'textes': this.state.textes}}/>;
        break;
    }

    return (
            <div>
                Révision
                {contentStep}
            </div>
    );
  }
}