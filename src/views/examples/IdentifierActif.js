import * as React from 'react';
import { useProject } from 'components/app/Contexts/ProjectContext';
import axios from 'axios';
import { Autocomplete,styled, TextField } from '@mui/material';
import  SimpleCard  from 'components/app/SimpleCard.js';

import {
  Button,
  Grid,
} from "@mui/material";
import { Span } from "components/app/Typography";
import {  useState } from "react";

const Container = styled('div')(({ theme }) => ({
    margin: '100px',
    justifyContent:'center',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
    '& .breadcrumb': {
      marginBottom: '30px',
      [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
    },
  }));

const initialSuggestionActif = [
    'Serveur',
    'ordinateur',
    'personnel',
   
  ];
  const Niveau=[
    'Mineur',
    'significatif',
    'Majeur',
    'critique',
  ];
  const Type =[
    'Actif primordial',
    'Bien support',
  ];


  const IdentifierActif = () => {  
    const { projectId } = useProject();
    const [suggestionsActif, setSuggestionsActif] = useState(initialSuggestionActif);
    const [suggestionsNiveau, setSuggestionsNiveau ] = useState(Niveau);
    const [suggestionsType, setSuggestionsType] = useState(Type);
    const [formData, setFormData] = useState({
      nom: '',
      type: '',
      criticite: '',
      
    });
    const handleChange =  (event, newInputValue, fieldName) => {
        // Si l'utilisateur saisit une nouvelle vulnérabilité, ajoutez-la aux suggestions
        if (newInputValue && !suggestionsActif.find((vul) => vul.label === newInputValue)) {
          setSuggestionsActif([...suggestionsActif, { label: newInputValue }]);
        }
        setFormData({
            ...formData,
           [fieldName]: newInputValue || '',
             });
        };

        const handleNiveauChange = (event, newInputValue, fieldName) => {
          // Si l'utilisateur saisit une nouvelle vulnérabilité, ajoutez-la aux suggestions
          if (newInputValue && !suggestionsNiveau.find((vul) => vul.label === newInputValue)) {
            setSuggestionsNiveau([...suggestionsNiveau, { label: newInputValue }]);
          }
          setFormData({
              ...formData,
             [fieldName]: newInputValue || '',
               });
          };
          const handleTypeChange = (event, newInputValue, fieldName) => {
            // Si l'utilisateur saisit une nouvelle vulnérabilité, ajoutez-la aux suggestions
            if (newInputValue && !suggestionsType.find((vul) => vul.label === newInputValue)) {
              setSuggestionsType([...suggestionsType, { label: newInputValue }]);
            }
            setFormData({
                ...formData,
               [fieldName]: newInputValue || '',
                 });
            };
    

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        // Envoi des données du formulaire à votre API .NET6
        const response = await axios.post(`https://localhost:7119/api/Actifs?projectId=${projectId}`, formData);
  
        //Réponse de l'API 
        console.log('Réponse de l\'API : l\'actif a été ajouté au projet', response.data);
      } catch (error) {
        
        console.error('Erreur lors de la requête POST :', error);
      }
    };

    return (
      <>
      
        <Container component="main" sx={{ mb: 6 }} fluid>
        <SimpleCard>
          <h3 className="mb-0">Identifiez les actifs relatifs au périmètre de votre projet</h3>
         <form onSubmit={handleSubmit}>  
          <Grid container spacing={6}>
          <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 1 }}>
          <Autocomplete
           sx={{ mb: 4 }}
           value={formData.nom}
           onChange={(event, newValue) => {
           handleChange(event, newValue, 'nom'); 
           }}
           options={suggestionsActif.map((option) => option)}
           renderInput={(params) => <TextField {...params} label="Identifiez un actif" variant="outlined" fullWidth />}
           freeSolo
          />
          <Autocomplete
           sx={{ mb: 4 }}
           value={formData.type}
           onChange={(event, newValue) => {
           handleTypeChange(event, newValue, 'type'); 
           }}
           options={suggestionsType.map((option) => option)}
           renderInput={(params) => <TextField {...params} label="Type d'actif" variant="outlined" fullWidth />}
           freeSolo
          />
          <Autocomplete
           sx={{ mb: 4 }}
           value={formData.criticite}
           onChange={(event, newValue) => {
           handleNiveauChange(event, newValue, 'criticite'); 
           }}
           options={suggestionsNiveau.map((option) => option)}
           renderInput={(params) => <TextField {...params} label="Criticité(importance de l'actif)" variant="outlined" fullWidth />}
           freeSolo
          />
         </Grid>
         </Grid>
  
          <Button color="primary" variant="contained" type="submit">
          <i className="ni ni-send" />
            <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
          </Button>
        </form>
        </SimpleCard>
        </Container>
       
        </>

    );
    
  };
  

export default IdentifierActif;
