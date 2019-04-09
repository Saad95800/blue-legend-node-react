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
    let id_texte = this.props.data.location.pathname.split("/")[3];
    let num_content = this.props.data.location.pathname.split("/")[5];
    let num_mode = this.props.data.location.pathname.split("/")[7];
    let id_serie = this.props.id_serie;

    return (
            <div style={{textAlign: 'center'}}>
                <Link style={{textDecoration: 'none', display: 'inline-block'}} to={`/revision-serie/texte/${id_texte}/content/${num_content}/mode/${num_mode}/serie/${id_serie}`}><div style={styles.btnBegin}>Commencer</div></Link>
            </div>
    );

  }
}

let styles = {
  btnBegin: {
    marginTop: '30px',
    width: '400px',
    height: '150px',
    borderRadius: '80px',
    backgroundColor: '#FFD23D',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '30px'
  }
}