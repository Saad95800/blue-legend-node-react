import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

export default class Home extends Component {


    render() {
      return (
        <div className="container-home container-page">

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
                              <div className="text-center home-box-series">5</div>
                            </Col>
                            <Col sm="4">
                              <div className="text-center home-font-subtitles">Séries réalisées</div>
                              <div className="text-center home-box-series">10</div>
                            </Col>
                            <Col sm="4">
                              <div className="text-center home-font-subtitles">Mots & Expr Appris</div>
                              <div className="text-center home-box-series">53</div>
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
                            <div className="text-center" style={{fontSize: '30px', fontWeight:'bold'}}>10</div>
                          </Col>
                          <Col sm="6" style={{paddingLeft: '0px', paddingRight: '0px'}}>
                            <div className="text-center home-font-subtitles-total">Mots & Expr Appris</div>
                            <div className="text-center" style={{fontSize: '30px', fontWeight:'bold'}}>53</div>
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