import React, { useState } from 'react';
import axios from 'axios';
import { useProject } from 'components/app/Contexts/ProjectContext';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import FileUpload from "react-material-file-upload";





const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function AjoutEvidence({open, updateOpenState}) {
  const [file, setFile] = useState();
  const { mesureProjectId } = useProject();
  const handleClose = () => {
    updateOpenState(false);
  };
  const handleUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file[0]);
      console.log(mesureProjectId);
      await axios.post(`https://localhost:7119/api/Evidences?mesureProjectId=${mesureProjectId}&nom=evidence`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Fichier téléchargé avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'envoi du fichier :', error);
    } finally {
      handleClose(); // Fermez la boîte de dialogue une fois la requête terminée (qu'elle ait réussi ou échoué).
    }
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Ajouter l'/les évidence(s) pour la mésure de sécurité
        </DialogTitle>
        <DialogContent>
        <FileUpload
        value={file}
        onChange={(file) => {
            setFile(file);
            handleUpload(file);  
          }}
        multiple={true}
        maxFileSize={10}
        maxUploadFiles={0}
        bannerProps={{ elevation: 0, variant: "outlined" }}
        containerProps={{ elevation: 0, variant: "outlined" }}
        accept=".pdf,.png,.jpg"
      />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            QUITTER
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}