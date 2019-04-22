import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SerieListRevision extends Component {

  constructor(props){
    super(props);
  }

  render() {
    let textes = '';

    if(this.props.data.series.length > 0){
      textes = this.props.data.series.map( (serie, index) => {
        let link = '/revision-content/text/'+serie.owner_text+'/serie/'+serie.id;
        let serieName = serie.name.length > 20 ? serie.name.substring(0, 20)+'...' : serie.name;
        return <Link
                to={link}
                id={index}>
                  <div key={serie.id} style={{display: 'inline-block', borderRadius: '5px', margin: '10px', width: '120px'}} className="hover-item">
                    <div style={{textAlign: 'center'}}>{serieName}</div>
                    <div style={{'textAlign': 'center'}}>
                    <span className="img-item-liste-texte"></span>
                    </div>  
                  </div>
                </Link>;
      });
    }


    return (
            <div>
              {textes}
            </div>
    );

  }
}