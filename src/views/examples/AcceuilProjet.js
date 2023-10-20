//import { useState } from "react";
import React from "react";
import {
    Button,
    Card,
    CardHeader,
    Progress,
    Table,
    Container,
    Row,
    Col,
    UncontrolledTooltip,
  } from "reactstrap";

  import { Link } from 'react-router-dom';
  
  import Header from "components/Headers/Header.js";
  import InfoProjet from "./InfoProjet";
  
  const AcceuilProjet = (props) => {
    const [open,setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
      };
      const updateOpenState = (newValue) => {
        setOpen(newValue);
      };
    
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--10" fluid>
          
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Projets en cours... Ce Mois</h3>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Projet</th>
                      <th scope="col">Membres</th>
                      <th scope="col">Niveau de conformité</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Eshop</th>
                      <td>
                      <div className="avatar-group">
                      <a className="avatar avatar-sm"
                          href="#p"
                          id="tooltip731399078"
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="ni ni-single-02" />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip731399078"
                        >
                          membre1
                        </UncontrolledTooltip>
                        <a className="avatar avatar-sm"
                          href="#p"
                          id="tooltip491083084"
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="ni ni-single-02" />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip491083084"
                        >
                          membre2
                        </UncontrolledTooltip>
                        <a className="avatar avatar-sm"
                          href="#p"
                          id="tooltip528540780"
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="ni ni-single-02" />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                         target="tooltip528540780"
                        >
                          membre3
                        </UncontrolledTooltip>
                      </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">30%</span>
                          <div>
                            <Progress
                              max="100"
                              value="30"
                              barClassName="bg-gradient-warning"
                            />
                          </div>
                        </div>
                      </td>
                      <td>
                      <div className="col text-right">
                      <Button
                        color="warning"
                        size="sm"
                        onClick={handleClickOpen}
                      >
                        <Link to = "/" ></Link>
                        Voir plus
                      </Button>
                      </div>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
        </Container>
        <InfoProjet open={open} updateOpenState={updateOpenState}/>
      </>
    );
  };
  
  export default AcceuilProjet;
  