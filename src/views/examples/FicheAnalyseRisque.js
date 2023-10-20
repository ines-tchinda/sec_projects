import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Table,} from "reactstrap";

const FicheAnalyseRisque = () => {
  const [tableData, setTableData] = useState([]);

  // Fonction pour charger les données de la table depuis l'API
  const fetchTableData = async () => {
    try {
        const [response1, response2] = await Promise.all([
          axios.get('https://localhost:7119/api/FicheAnalyseRisque/GetAll'),
          axios.get('https://localhost:7119/api/Mesures/GetAll'),
        ]);
    
        // Concaténez les données des deux réponses
        const combinedData = [...response1.data, ...response2.data];
        
    
        // Mettez à jour l'état avec les données combinées
        setTableData(combinedData);
        console.log(combinedData);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
  };

  // Utilisez useEffect pour charger les données au chargement initial du composant
  useEffect(() => {
    fetchTableData();
  }, []); // Le tableau vide [] garantit que cela ne se produit qu'une fois au chargement initial

  return (
    <div>
    <Table className="align-items-center table-white table-flush " responsive striped>
       <thead className="thead-dark">
          <tr>
            <th>Vulnérabilités</th>
            <th>Menaces</th>
            <th>Sources de Menaces</th>
            <th>Risques</th>
            <th>Mesure de sécurité</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((rowData) => (
            <tr key={rowData.id}>
              <td>{rowData.vulnerabilite}</td>
              <td>{rowData.menace}</td>
              <td>{rowData.sourceMenace}</td>
              <td>{rowData.risque}</td>
              <td>{rowData.nom}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default FicheAnalyseRisque;
