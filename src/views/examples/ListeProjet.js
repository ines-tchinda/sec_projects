import { Link } from 'react-router-dom';
import { useProject } from 'components/app/Contexts/ProjectContext';
// reactstrap components
import {
  Card,
  CardHeader,
  //CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  //Pagination,
  //PaginationItem,
  //PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListeProjet = () => {
  const [projets, setProjets] = useState([]);
  const { setProject } = useProject();

  useEffect(() => {
    axios.get('https://localhost:7119/api/Projects/Projets')
      .then((response) => {
        // Met à jour l'état avec la liste des projets récupérés depuis l'API
        setProjets(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des projets :', error);
      });
  }, []);
  

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Dark table */}
        <Row className="mt-3">
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent border-0">
                <h3 className="text-white mb-0">Liste des Projets</h3>
              </CardHeader>
              <Table
                className="align-items-center table-flush"
                stripe="3n"
                responsive
              >
                <thead className="thead-orange">
                  <tr>
                    <th scope="col">Projet</th>
                    <th scope="col">Date du Go Live</th>
                    <th scope="col">Statut</th>
                    <th scope="col">Membres</th>
                    <th scope="col">Niveau de conformité</th>
                    <th scope="col">Dossier d'instruction</th>
                    <th scope="col">Cahier de Charge</th>
                    <th scope="col">Matrice des flux</th>
                    <th scope="col">Document d'architecture</th>
                    <th scope="col">Document de faisabilité technique</th>
                    <th scope="col">Options</th> 
                  </tr>
                </thead>
                <tbody>
                {projets.map((projet) => (
                  <tr key={projet.id}>
                    <th scope="row">
                      <Media className="align-items-center">
                        <a
                          className="avatar rounded-circle mr-3"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="ni ni-archive-2" />
                        </a>
                        <Media>
                          <span className="mb-0 text-sm">
                          {projet.nom}
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td>{projet.dateGoLive}</td>
                    <td>{projet.statut === 0 ? "Projet en cours de création" : "Projet OK"}</td>
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
                        <span className="mr-2">{projet.niveauDeConformite}%</span>
                        <div>
                          <Progress
                            max="100"
                            value={projet.niveauDeConformite}
                            barClassName={
                              projet.niveauDeConformite >= 0 && projet.niveauDeConformite <= 50
                                ? 'bg-gradient-danger'
                                : projet.niveauDeConformite > 50 && projet.niveauDeConformite <= 70
                                ? 'bg-gradient-warning'
                                : projet.niveauDeConformite > 70 && projet.niveauDeConformite <= 85
                                ? 'bg-gradient-info'
                                : 'bg-gradient-success'
                            }
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                    <div className="d-flex align-items-center">
                    {projet.dossier_d_instruction ? (
                       <a className="avatar rounded-circle mr-3"
                          href={`https://api-s3.orange.cm/g-risk/${projet.dossier_d_instruction}`}
                          target="_blank"
                          rel="noreferrer">
                       <i className="ni ni-book-bookmark" />
                       </a>
                      ) : null}
                    </div>
                    </td>
                    <td>
                    <div className="d-flex align-items-center">
                    {projet.cahier_de_charge ? (
                    <a className="avatar rounded-circle mr-3"
                          href={`https://api-s3.orange.cm/g-risk/${projet.cahier_de_charge}`}
                          target="_blank"
                          rel='noreferrer noopener'
                        >
                          <i className="ni ni-book-bookmark" />
                        </a>
                         ) : null}
                    </div>
                    </td>
                    <td>
                    <div className="d-flex align-items-center">
                    {projet.matrice_des_flux ? ( 
                    <a className="avatar rounded-circle mr-3"
                           href={`https://api-s3.orange.cm/g-risk/${projet.matrice_des_flux}`}
                           target="_blank"
                           rel='noreferrer noopener'
                        >
                          <i className="ni ni-book-bookmark" />
                        </a>
                         ) : null}
                    </div>
                    </td>
                    <td>
                    <div className="d-flex align-items-center">
                    {projet.doc_architecture ? (
                    <a className="avatar rounded-circle mr-3"
                           href={`https://api-s3.orange.cm/g-risk/${projet.doc_architecture}`}
                           target="_blank"
                           rel='noreferrer noopener'
                        >
                          <i className="ni ni-book-bookmark" />
                        </a>
                         ) : null}
                    </div>
                    </td>
                    <td>
                    <div className="d-flex align-items-center">
                    {projet.doc_faisabilite_technique ? (
                    <a className="avatar rounded-circle mr-3"
                          href={`https://api-s3.orange.cm/g-risk/${projet.doc_faisabilite_technique}`}
                          target="_blank"
                          rel='noreferrer noopener'
                        >
                          <i className="ni ni-book-bookmark" />
                        </a>
                         ) : null}
                    </div>
                    </td>
                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only text-light"
                          href="#"
                          role="button"
                          size="sm"
                          color="warning"
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                        <DropdownItem
                            onClick={(e) => e.preventDefault()}
                          >
                           <Link to="/projet/IdentifierActif"
                           onClick={() => setProject(projet.id)}>
                            Définir le périmètre du Projet
                            </Link>
                          </DropdownItem>
                          <DropdownItem
                            onClick={(e) => e.preventDefault()}
                          >
                            <Link to="/projet/AnalyseRisques"
                            onClick={() => setProject(projet.id)}>
                            Analyser les risques du Projet
                            </Link>
                          </DropdownItem>
                          <DropdownItem
                            onClick={(e) => e.preventDefault()}
                          >
                            <Link to="/projet/Checklist"
                            onClick={() => setProject(projet.id)}>
                            Consulter la checklist du Projet
                            </Link>
                          </DropdownItem>
                          <DropdownItem
                            onClick={(e) => e.preventDefault()}
                          >
                            <Link to="/projet/ProjectView"
                            onClick={() => setProject(projet.id)}>
                            Suivi du risque résiduel du Projet
                            </Link>
                          </DropdownItem>
                          <DropdownItem
                            href="#"
                            onClick={(e) => e.preventDefault()}
                          >
                            Modifier les données projet
                          </DropdownItem>
                          <DropdownItem
                            href="#"
                            onClick={(e) => e.preventDefault()}
                          >
                            Supprimer le Projet
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default ListeProjet;
