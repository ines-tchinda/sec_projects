import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useProject } from 'components/app/Contexts/ProjectContext';
// @material-ui/icons
import BugReport from "@material-ui/icons/BugReport";
//import Code from "@material-ui/icons/Code";
//import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import "assets/css/ClickableDiv.css"

export default function Checklist () {
    const [mesures, setMesures] = useState([]);
    const { projectId } = useProject();
    const { setMesureProject } = useProject();
    useEffect(() => {
      axios.get(`https://localhost:7119/api/Mesures/project/${projectId}`)
        .then((response) => {
          // Met à jour l'état avec la liste des projets récupérés depuis l'API
          setMesures(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des Mesures de sécurité :', error);
        });
    },  [projectId]);
    const mesuresParCategorie = mesures.reduce((acc, mesure) => {
      const { categorie, ...rest } = mesure;
      if (!acc[categorie]) {
        acc[categorie] = [];
      }
      acc[categorie].push(rest);
      return acc;
    }, {});


  return (
    <div>
       <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
        <CustomTabs
         title="CheckList Sécurité:"
         headerColor="warning"
         tabs={Object.entries(mesuresParCategorie).map(([categorie, mesures]) => ({
         tabName: categorie,
         tabIcon: BugReport,
         tabContent: (
        <Tasks
           checkedIndexes={mesures.map((_, index) => index)}  
           tasksIndexes={mesures.map((_, index) => index)}
           tasks={mesures.map(mesure => (
            <div 
            key={mesure.id}
            className="clickable"
            onClick={() => setMesureProject(mesure.mesureProjectId)}>
              {mesure.nom}
            </div>
            ))}
        />
           ),
          }))}
          />
        </GridItem>
      </GridContainer>
    </div>
  );
}