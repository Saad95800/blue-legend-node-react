import React, { Component } from 'react';
import {Row, Col, FormGroup, Label, Input} from 'reactstrap';


export default class Vitrine extends Component {
  
  constructor(props){
    super(props);
  }
  
  render() {

    return (
          <div className="vitrine-container">
            <nav className="header-nav-vitrine">
              <div className="size100">
                <div className="col-sm-3 col-xs-5">
                  <div className="display-flex-center">
                    <div className="display-flex-center main-logo-vitrine"></div>
                  </div>
                </div>
                <div className="col-xs-7 col-sm-4 col-sm-offset-5">
                  <div className="flex-row" style={{height: '68px', alignItems: 'center'}}>
                    <div className="btn-vitrine display-flex-center">CONNEXION</div>
                    <div onClick={this.viewPopupSignup} className="btn-vitrine display-flex-center">INSCRIPTION</div>
                  </div>
                </div>
              </div>
            </nav>
            <section className="block1 img-vitrine-blocks">
              <div className="size100">
                <div className="img-vitrine-block1 size100">
                </div>
                <div>
                  <Row style={{height: '580px'}}>
                      <Col sm="6" style={{height: '100%'}}>
                        <div className="size100 display-flex-center">
                          <div className="img-block1-logo"></div>
                        </div>
                      </Col>
                      <Col sm="6" style={{height: '100%'}}>
                        <div className="display-flex-center flex-column size100">
                          <div className="img-block1-book"></div>
                          <p className="text-block1-msg text-border" style={{margin: '15px 0px'}}>
                            Apprend l'anglais efficacement. Par la lecture.
                          </p>
                          <div className="btn-vitrine display-flex-center" style={{width: '300px', height: '100px', borderRadius: '50px', fontSize: '2em'}}>Commencer</div>
                        </div>
                      </Col>
                    </Row>
                </div>
              </div>
            </section>
            <section className="block2 img-vitrine-blocks">
                <div className="size100" style={{backgroundColor: '#F8FAFE'}}>
                  <Row style={{height: '100%'}}>
                    <Col sm="6" style={{height: '100%'}}>
                      <div className="display-flex-center size100" style={{padding: '0px 20px'}}>
                        <div className="flex-column">
                          <p style={{fontSize: '55px'}} className="text-center font-weight-bold">Qu'est-ce que Blue Legend ?</p>
                          <p style={{fontSize: '30px'}} className="text-center font-weight-bold">Blue Legend est une application web et mobile permettant d'apprendre l'anglais à travers la lecture de textes en leur donnant la possibilité de traduire chaque expressions et mots de vocabulaire et de les réviser grâce à des séries de révisions ludiques et intéractives.</p>
                        </div>
                      </div>
                    </Col>
                    <Col sm="6" style={{height: '100%'}}>
                      <div className="img-vitrine-block2 size100"></div>
                    </Col>
                  </Row>
                </div>
            </section>
            <section className="block3 img-vitrine-blocks">
              <div className="img-vitrine-block3 size100">
                <Row style={{height:'100%'}}>
                  <div className="col-sm-6 col-sm-offset-6" style={{height:'100%'}}>
                    <div className="size100 text-border display-flex-center flex-column">
                      <p style={{fontSize: '55px', color: '#fff'}} className="text-center font-weight-bold">Apprend en lisant tes textes et contenus préférés.</p>
                      <p style={{fontSize: '30px', color: '#fff'}} className="text-center font-weight-bold">Choisis les livres et contenus qui te passionnent. Lis tes textes et enregistre les mots de vocabulaire et expression que tu souhaites.</p>
                    </div>
                  </div>                  
                </Row>
              </div>
            </section>
            <section className="block4 img-vitrine-blocks">
              <div className="size100">
                <Row style={{height:'100%'}}>
                  <div className="col-sm-6" style={{height:'100%'}}>
                    <div className="size100 display-flex-center flex-column">
                      <p style={{fontSize: '55px'}} className="text-center font-weight-bold">Apprend efficacement ton vocabulaire.</p>
                      <p style={{fontSize: '30px'}} className="text-center font-weight-bold">Révise ton vocabulaire avec des séries de révision intéractives.</p>
                    </div>
                  </div>
                  <div className="col-sm-6" style={{height:'100%'}}>
                    <div className="img-vitrine-block4 size100"></div>
                  </div>                
                </Row>
              </div>
            </section>
            <section className="block5 img-vitrine-blocks">
              <div className="size100" style={{backgroundColor: '#fff'}}>
                <Row style={{height:'100%'}}>
                  <div className="col-sm-6" style={{height:'100%'}}>
                    <div className="size100 display-flex-center">
                      <div className="img-vitrine-block5" style={{height:'80%', width: '80%'}}></div>
                    </div>
                  </div>
                  <div className="col-sm-6" style={{height:'100%'}}>
                    <div className="size100 display-flex-center flex-column">
                      <p style={{fontSize: '55px'}} className="text-center font-weight-bold">Met-toi au défi en jouant contre la montre.</p>
                      <p style={{fontSize: '30px'}} className="text-center font-weight-bold">Tu as la possibilité de mettre au chronomètre lors de chacune de tes séries de révision afin de te mettre au défi et de voir la qualité de ton apprentissage.</p>
                    </div>
                  </div>                
                </Row>
              </div>
            </section>
            <section className="block6 img-vitrine-blocks">
              <div className="size100">
                <Row style={{height:'100%'}}>
                  <div className="col-sm-6" style={{height:'100%'}}>
                    <div className="size100 display-flex-center flex-column">
                      <p style={{fontSize: '55px'}} className="text-center font-weight-bold">Mémorise durablement grâce à la méthode de répétitions espacés</p>
                    </div>
                  </div>
                  <div className="col-sm-6" style={{height:'100%'}}>
                    <div className="display-flex-center size100">
                      <div className="img-vitrine-block6" style={{width:'90%', height: '90%'}}></div>
                    </div>
                  </div>    
                </Row>
              </div>
            </section>
            <section className="block7 img-vitrine-blocks">
              <div className="size100" style={{backgroundColor: '#fff'}}>
                <Row style={{height:'100%'}}>
                  <div className="col-sm-6" style={{height:'100%'}}>
                    <div className="size100 display-flex-center">
                      <div className="img-vitrine-block7" style={{height:'80%', width: '80%'}}></div>
                    </div>
                  </div>
                  <div className="col-sm-6" style={{height:'100%'}}>
                    <div className="size100 display-flex-center flex-column">
                      <p style={{fontSize: '55px'}} className="text-center font-weight-bold">En ligne ou hors ligne, révise tes textes où que tu soit.</p>
                      <p style={{fontSize: '30px'}} className="text-center font-weight-bold">Notre application est disponible pour tout type d'appareils et est utilisable en mode hors-ligne. C'est une progressive web app, ce qui signifie qu'elle est multi plate-forme et fonctionne sur IOS et Android.</p>
                    </div>
                  </div>                
                </Row>
              </div>
            </section>
            <section className="block8 footer-vitrine">
              <div className="size100">
                <Row style={{height: '100%'}}>
                  <div className="col-sm-5" style={{height: '100%'}}>
                    <div className="size100 display-flex-center flex-row">
                      <div className="img-block1-logo" style={{width: '180px', height: '150px'}}></div>
                      <div className="main-logo-vitrine"></div>
                    </div>
                  </div>
                  <div className="col-sm-7" style={{height: '100%'}}>
                    <div className="size100 display-flex-center flex-column" style={{alignItems: 'flex-start'}}>
                      <p for="newsletter" sm={3} className="text-border" style={{textAlign: 'left', fontSize: '20px', width: '100%'}}>Abonne-toi et soit informé de toutes les nouvelles fonctionnalités à venir</p>
                      <FormGroup row style={{width: '80%', marginTop: '20px'}}>
                        <Col sm={12}>
                          <Input type="text" autoComplete="off" id="newsletter" />
                        </Col>
                      </FormGroup>
                    </div>
                  </div>
                </Row>
              </div>
            </section>
          </div>
    );
  }
}