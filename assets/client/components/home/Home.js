import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';

export default class Home extends Component {

    constructor(props){
      super(props);

      let nbSeriesToday = '';
      let nbSerieRealiseesToday = '';
      let nbSeriesTotalRealisees = '';
      let nbMotsExprApprisToday = '-';
      let nbMotsExprTotalAppris = '-';

      if(this.props.data.app == 'server'){
        nbSeriesToday = this.props.data.nbSeriesToday;
        nbSerieRealiseesToday = this.props.data.nbSerieRealiseesToday;
        nbSeriesTotalRealisees = this.props.data.nbSeriesTotalRealisees;
        nbMotsExprApprisToday = this.props.data.nbSeriesTotalRealisees;
        nbMotsExprTotalAppris = this.props.data.nbSeriesTotalRealisees;
      }
      this.state = {
        nbSeriesToday: nbSeriesToday,
        nbSerieRealiseesToday: nbSerieRealiseesToday,
        nbSeriesTotalRealisees: nbSeriesTotalRealisees,
        nbMotsExprApprisToday: nbMotsExprApprisToday,
        nbMotsExprTotalAppris: nbMotsExprTotalAppris
      }
    }

    componentDidMount(){
      axios({
        method: 'post',
        url: '/get-data-home-ajax',
        responseType: 'json',
        data: {}
      })
      .then((response) => {
        console.log(response);
        if(response.statusText == 'OK'){
          this.setState({
            nbSeriesToday: response.data.nbSeriesToday, 
            nbSerieRealiseesToday: response.data.nbSerieRealiseesToday,
            nbSeriesTotalRealisees: response.data.nbSeriesTotalRealisees,
            nbMotsExprApprisToday: response.data.nbMotsExprApprisToday,
            nbMotsExprTotalAppris: response.data.nbMotsExprTotalAppris
          });
        }
      })
      .catch( (error) => {
        console.log(error);
      });
    }

    render() {
      return (
        <div className="container-home container-page display-flex-center">

            <div>
              <Container>
                <Row>
                  <div className="main-titles">
                    DASHBOARD
                  </div>
                </Row>
                <Row style={{marginTop: '20px'}}>
                  <Col sm={{ size: 8, order: 2, offset: 2 }}>
                    <div className="home-block-today">
                      <Row>
                        <div className="text-center" style={{fontSize: '30px', fontWeight: 'bold'}}>Activités du jour</div>
                      </Row>
                      <Row style={{marginTop: '20px'}}>
                            <Col sm="4">
                              <div className="text-center home-font-subtitles">Séries à réaliser</div>
                              <div className="text-center home-box-series">{this.state.nbSeriesToday}</div>
                            </Col>
                            <Col sm="4">
                              <div className="text-center home-font-subtitles">Séries réalisées</div>
                              <div className="text-center home-box-series">{this.state.nbSerieRealiseesToday}</div>
                            </Col>
                            <Col sm="4">
                              <div className="text-center home-font-subtitles">Mots & Expr Appris</div>
                              <div className="text-center home-box-series">{this.state.nbMotsExprApprisToday}</div>
                            </Col>             
                      </Row>
                    </div>                    
                  </Col>
                  <Col sm="4">
                      <div className="home-block-total">
                        <Row>
                          <div className="text-center" style={{fontSize: '30px', fontWeight: 'bold'}}>Total</div>
                        </Row>
                        <Row  style={{marginTop: '20px'}}>
                          <Col sm="6" style={{paddingLeft: '0px', paddingRight: '0px'}}>
                            <div className="text-center home-font-subtitles-total">Séries réalisées</div>
                            <div className="text-center" style={{fontSize: '30px', fontWeight:'bold'}}>{this.state.nbSeriesTotalRealisees}</div>
                          </Col>
                          <Col sm="6" style={{paddingLeft: '0px', paddingRight: '0px'}}>
                            <div className="text-center home-font-subtitles-total">Mots & Expr Appris</div>
                            <div className="text-center" style={{fontSize: '30px', fontWeight:'bold'}}>{this.state.nbMotsExprTotalAppris}</div>
                          </Col>
                        </Row>
                      </div>
                  </Col>
                </Row>
                <Row style={{marginTop: '20px'}}>
                  <Col sm="3">
                    <Link to={'/texte-liste'} className="home-item-nav home-item-nav-lecture">
                      <div className="home-title-nav home-title-nav-lecture text-center">Lecture</div>
                      <div className="home-logo-item home-logo-item-lecture"></div>
                    </Link>
                  </Col>
                  <Col sm="3">
                    <Link to={'/planning'} className="home-item-nav home-item-nav-planning">
                      <div className="home-title-nav home-title-nav-planning text-center">Planning</div>
                      <div className="home-logo-item home-logo-item-planning"></div>
                    </Link>
                  </Col>
                  <Col sm="3">
                    <Link to={'/custom-series-list'} className="home-item-nav home-item-nav-custom">
                      <div className="home-title-nav home-title-nav-custom text-center">Séries pers</div>
                      <div className="home-logo-item home-logo-item-custom"></div>
                    </Link>
                  </Col>
                  <Col sm="3">
                    <Link to={'/revision'} className="home-item-nav home-item-nav-revision">
                      <div className="home-title-nav home-title-nav-revision text-center">Révision</div>
                      <div className="home-logo-item home-logo-item-revision"></div>
                    </Link>
                  </Col>
                </Row>
              </Container>
            </div>
        </div>
      );
    }
  }