import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useProject } from 'components/app/Contexts/ProjectContext';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DescriptionIcon from '@material-ui/icons/Description';
import { makeStyles } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const useStyles = makeStyles((theme) => ({
    button: {
      backgroundColor: orange[600], // Couleur orange
      borderRadius: theme.shape.borderRadius, // Bords arrondis
      color: 'white', // Couleur du texte en blanc
      '&:hover': {
        backgroundColor: orange[800], // Couleur orange plus foncée au survol
      },
    },
  }));

export default function GestionEvidence({open2, updateOpenState2}) {
    const classes = useStyles();
  const [evidences, setEvidences] = useState();
  const { mesureProjectId } = useProject();
  const handleClose2 = () => {
    updateOpenState2(false);
  };
  const handleDownloadEvidence = (nom) => {
    try {
        axios.get(`https://localhost:7119/api/Files/fileName?fileName=${nom}`)
          .then((response) => {
            const fileUrl = response.data;
            // Déclenche le téléchargement du fichier en redirigeant l'utilisateur vers l'URL du fichier.
            window.open(fileUrl, '_blank');
            console.log(fileUrl);
          })

      } catch (error) {
        console.error('Erreur lors du téléchargement du fichier :', error);
      }
  };
  const handleDeleteEvidence = (nom,id) => {
    try {
        axios.post(`https://localhost:7119/api/Evidences/RemoveEvidence?nom=${nom}&EvidenceId=${id}`)
          .then((response) => {
            const updatedEvidences = evidences.filter((evidence) => evidence.id !== id);
            setEvidences(updatedEvidences);
            console.log(response.data);
          })
      } catch (error) {
        console.error('Erreur lors de la suppression du fichier :', error);
      }
  };
  
  useEffect(() => {
    axios
      .get(`https://localhost:7119/api/Evidences/GetByMesureProjectId?mesureProjectId=${mesureProjectId}`)
      .then((response) => {
        setEvidences(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des évidences :', error);
      });
  }, [mesureProjectId]);

  return (
    <div>
      <BootstrapDialog
        maxWidth="lg"
        onClose={handleClose2}
        aria-labelledby="customized-dialog-title"
        open={open2}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Ajouter/supprimer l'/les évidence(s)
        </DialogTitle>
        <DialogContent dividers style={{ padding: 50, display: 'flex', alignItems: 'center', width: 600  }}>
        {evidences && evidences.map((evidence) => (
        <div 
        key={evidence.id}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px' }}>
          <DescriptionIcon
            style={{ fontSize: 100, marginBottom: '16px' }}
            onClick={() => handleDownloadEvidence(evidence.nom)}
          />
          <Button
            type="submit"
            className={classes.button} 
            variant="contained"
            onClick={() => handleDeleteEvidence(evidence.nom,evidence.id)}
            style={{ backgroundColor: 'dark', borderRadius: '10px', color: 'white', width:'100px' }}
          >
            Supprimer
          </Button>
        </div>
      ))}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose2}>
            QUITTER
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}