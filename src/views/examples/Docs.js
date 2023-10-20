import React, { useState } from 'react';
import axios from 'axios';
import { useProject } from 'components/app/Contexts/ProjectContext';
import FileUpload from "react-material-file-upload";

export default function Docs() {
  const [file1, setFile1] = useState();
  const [file2, setFile2] = useState();
  const [file3, setFile3] = useState();
  const [file4, setFile4] = useState();

const { projectId } = useProject();
 
    const handleUpload = async (file,champ) => {
      try {
        const formData = new FormData();
        formData.append('file', file[0]);
        await axios.post(`https://localhost:7119/api/Files?ProjectId=${projectId}&champ=${champ}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        console.log('Fichier téléchargé avec succès');
      } catch (error) {
        console.error('Erreur lors de l\'envoi du fichier :', error);
      }
    };
  return (
    <div className="App">
      <label>Ajoutez le dossier d'instruction:</label>  
      <FileUpload
        value={file1}
        onChange={(file) => {
            setFile1(file); 
            handleUpload(file, "Dossier_d_instruction"); 
          }}
        multiple={false}
        maxFileSize={10}
        maxUploadFiles={0}
        bannerProps={{ elevation: 0, variant: "outlined" }}
        containerProps={{ elevation: 0, variant: "outlined" }}
        accept=".pdf,.png,.jpg"
      />
      <label>Ajoutez la matrice des flux:</label>  
      <FileUpload
        value={file3}
        onChange={(file) => {
            setFile3(file); 
            handleUpload(file, "matrice_des_flux"); 
          }}
        multiFile={false}
        maxFileSize={10}
        maxUploadFiles={0}
        bannerProps={{ elevation: 0, variant: "outlined" }}
        containerProps={{ elevation: 0, variant: "outlined" }}
        accept=".pdf,.png,.jpg"
      />
      <label>Ajoutez le document d'architecture:</label>  
      <FileUpload
        value={file4}
        onChange={(file) => {
            setFile4(file); 
            handleUpload(file, "Doc_architecture"); 
          }}
        multiFile={false}
        maxFileSize={10}
        maxUploadFiles={0}
        bannerProps={{ elevation: 0, variant: "outlined" }}
        containerProps={{ elevation: 0, variant: "outlined" }}
        accept=".pdf,.png,.jpg"
      />
       <label>Ajoutez le document de faisabilité technique:</label>  
      <FileUpload
        value={file4}
        onChange={(file) => {
            setFile4(file); 
            handleUpload(file, "Doc_faisabilite_technique"); 
          }}
        multiFile={false}
        maxFileSize={10}
        maxUploadFiles={0}
        bannerProps={{ elevation: 0, variant: "outlined" }}
        containerProps={{ elevation: 0, variant: "outlined" }}
        accept=".pdf,.png,.jpg"
      />
      <label>Ajoutez le cahier de charge:</label>  
      <FileUpload
        value={file2}
        onChange={(file) => {
            setFile2(file); 
            handleUpload(file,"cahier_de_charge"); 
          }}
        multiFile={false}
        maxFileSize={10}
        maxUploadFiles={0}
        bannerProps={{ elevation: 0, variant: "outlined" }}
        containerProps={{ elevation: 0, variant: "outlined" }}
        accept=".pdf,.png,.jpg"
      />
    </div>
    
  );
}
