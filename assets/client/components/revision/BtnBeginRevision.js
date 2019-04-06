import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class btnBeginRevision extends Component {

  constructor(props){
    super(props);

    let id_serie = this.props.id_serie;


    this.state = {
      id_serie: id_serie
    }
  }

  render() {
    console.log(this.props);
    let id_texte = this.props.data.location.pathname.split("/")[3];
    let num_content = this.props.data.location.pathname.split("/")[5];
    let num_mode = this.props.data.location.pathname.split("/")[7];
    let id_serie = this.props.id_serie;

    return (
            <div>
                <Link to={`/revision-serie/texte/${id_texte}/content/${num_content}/mode/${num_mode}/serie/${id_serie}`}><div style={StyleSheet.btnBegin}>Commencer</div></Link>
            </div>
    );

  }
}

let styles = {
  btnBegin: {
    width: '300px',
    height: '150px',
    borderRadius: '30px',
    backgroundColor: 'orange'
  }
}