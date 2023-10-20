import React, { useState } from 'react';
import axios from 'axios';
import { useProject } from 'components/app/Contexts/ProjectContext';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function InputFileUpload() {
  const { projectId } = useProject();
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  
  const handleFileChange = (event) => {
    // Accéder au fichier sélectionné 
    const file = event.target.files[0];
    setSelectedFile(file);
      };
    const handleUpload = async () => {
      try {
        const formData = new FormData();
        formData.append('file', selectedFile);
  
        // Envoyez le fichier au serveur
        const response = await axios.post('API_MiniO/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        // Récupérez l'URL du fichier du serveur
        const uploadedFileUrl = response.data.fileUrl;
         await axios.put('https://localhost:7119/api/Projects/id?id=projectId', { id: projectId, dossier_d_instruction: uploadedFileUrl });
        // Mettre à jour l'état pour afficher l'URL du fichier
        setFileUrl(uploadedFileUrl);
      } catch (error) {
        console.error('Erreur lors de l\'envoi du fichier :', error);
      }
  };
  return (
    <>
    <Grid container spacing={6} justifyContent="center">
    <Grid item xs={5}>
        <label>
          <Button
            component="span"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            onClick={handleUpload}
          >
            Dossier d'instruction
          </Button>
          <VisuallyHiddenInput type="file" onChange={handleFileChange} />
        </label>
      </Grid>
      {fileUrl && (
        <Grid item xs={12}>
          <p>Lien du fichier téléchargé : <a href={fileUrl} target="_blank" rel="noopener noreferrer">{fileUrl}</a></p>
        </Grid>
      )}
    
    <Grid item xs={5}>
    <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
    Matrice des flux
    <VisuallyHiddenInput type="file" />
  </Button>
  </Grid>
  <Grid item xs={5}>
    <Button component="label" variant="contained" sx={{ mb: 4 }} startIcon={<CloudUploadIcon />}>
    Document d'architecture
    <VisuallyHiddenInput type="file" />
  </Button>
  </Grid>
  <Grid item xs={5}>
    <Button component="label" variant="contained" sx={{ mb: 4 }} startIcon={<CloudUploadIcon />}>
    cahier de charge
    <VisuallyHiddenInput type="file" />
  </Button>
  </Grid>
  </Grid>
  </>
  );
}