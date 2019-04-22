import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class modeRevision extends Component {

  constructor(props){
    super(props);
  }

  render() {
    let url = this.props.data.location.pathname;
    let id_texte = url.split("/")[3];
    let id_serie = url.split("/")[5];
    let num_content = url.split("/")[7];
    
    return (
      <div>
      <h3>Quel mode ?</h3>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <Link to={`/revision-btn-begin/texte/${id_texte}/serie/${id_serie}/content/${num_content}/mode/1`} id={1}><div style={styles.itemBtn}>Normal</div></Link>
        <Link to={`/revision-btn-begin/texte/${id_texte}/serie/${id_serie}/content/${num_content}/mode/2`} id={2}><div style={styles.itemBtn}>Contre la montre</div></Link>
      </div>
  </div>
    );

  }
}

let styles = {
  itemBtn: {
    display: 'inline-flex',
    width: '100px',
    height: '50px',
    border: '1px solid',
    margin: '10px',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  }
}