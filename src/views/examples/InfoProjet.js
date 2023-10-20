import * as React from 'react';
import { useState, useEffect } from "react";
import axios from 'axios';
import { Button, Grid} from "@mui/material";

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function InfoProjet({open, updateOpenState}) {
    
    const [projetData, setProjetData] = useState({
        nom: '',
        objectif: '',
        dateGoLive: dayjs(),
        statut: '',
        dossier_d_instruction: '',
        matrice_des_flux: '',
        doc_architecture: '',
        doc_faisabilite_technique: '',
        cahier_de_charge: '',
        Niveau_de_conformite: '',

      });  

  const [id, setId] = useState(1);
 
  const handleClose = () => {
    updateOpenState(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://localhost:7119/api/Projects/GetById?id=${id}`);
        setProjetData(response.data);
        
          console.log('Réponse de l\'API :', projetData);
        
      } catch (error) {
        console.error('Erreur lors de la requête GET :', error);
      }
    };
    fetchData();
  }, [id]);
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://localhost:7119/api/Projects', projetData);

      setProjetData(response.data);
      if(response.data){
        console.log('Réponse de l\'API : projet modifié avec succès');
      }
    
    } catch (error) {
      
      console.error('Erreur lors de la requête PUT :', error);
    }
  };


  return (
    <div>
      <Dialog open={open} 
      onClose={handleClose}>
        <DialogTitle>DONNEES DU PROJET</DialogTitle>
        <DialogContent style={{ padding: 50, display: 'flex', alignItems: 'center', width: 600  }}>
        <Grid container spacing={6}>
          <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 1 }}>  
          <TextField
           xs={12}
           autoFocus
           margin="dense"
           label="Nom du projet"
           type="text"
           fullWidth
           variant="outlined"
           value={projetData.nom}
           onChange={(e) => setProjetData({ ...projetData, nom: e.target.value })}
          />
          <TextField
           autoFocus
           margin="dense"
           label="Objectifs du projet"
           type="text"
           fullWidth
           variant="outlined"
           value={projetData.objectif}
           onChange={(e) => setProjetData({ ...projetData, objectif: e.target.value })}
          />
          
          </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>QUITTER</Button>
          <Button onClick={handleClose}>MODIFIER</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
