import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {


    render() {
      return (
        <div className="container-home">
            <div className="row">
                <div className="col-sm-5">
                    <Link to="/texte-liste" style={styles.links}>
                            <div className="block-option-home" style={styles.blockItems.read}>
                                <div className="text-center grey-theme-color">LECTURE</div>
                                <div className="item-read sizeImg2"></div>
                            </div>
                    </Link>
                </div>
                <div className="col-sm-5">
                    <Link to="/revision" style={styles.links}>
                        <div className="block-option-home" style={styles.blockItems.review}>
                            <div className="text-center grey-theme-color">REVISION</div>
                            <div className="item-review sizeImg2"></div>
                        </div>
                    </Link>
                </div>
                <div className="col-sm-5">
                    <Link to="/ajout-texte" style={styles.links}>
                        <div className="block-option-home" style={styles.blockItems.insight}>
                            <div className="text-center grey-theme-color">STATISTIQUES</div>
                            <div className="item-insight sizeImg2" ></div>
                        </div>
                    </Link>
                </div>
                <div className="col-sm-5">
                    <Link to="/ajout-texte" style={styles.links}>
                        <div className="block-option-home" style={styles.blockItems.custom}>
                            <div className="text-center grey-theme-color">PERSONNALISER</div>
                            <div className="item-custom sizeImg2"></div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
      );
    }
  }
  
  const styles = {
      links:{
          textDecoration: 'none'
        },
      blockItems:{
          read: {backgroundColor: '#E6F8EA'},
          review: {backgroundColor: '#F0F0FE'},
          insight: {backgroundColor: '#FDEBEB'},
          custom: {backgroundColor: '#FFF8D6'}
      }
  }