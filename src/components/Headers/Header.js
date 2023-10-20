import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "assets/css/Header.css"

const Header = () => {
  return (
    <>
      <div className="header pb-8 pt-5 pt-md-8 header-color ">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="6">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                           <Link
                            className="h4 mb-0 text-dark text-uppercase d-none d-lg-inline-block"
                            to="/">Créer un nouveau Projet</Link>
                                 
                        </CardTitle>
                        
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape header-color text-dark rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              
              <Col lg="6" xl="6">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          <Link
                            className="h4 mb-0 text-dark text-uppercase d-none d-lg-inline-block"
                            to="/">Ajouter des membres à un projet</Link>
                        </CardTitle>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape header-color text-dark rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
