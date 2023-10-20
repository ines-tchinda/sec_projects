import * as React from 'react';
import axios from 'axios';
import { Autocomplete} from '@mui/material';

import { useProject } from 'components/app/Contexts/ProjectContext';
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
} from "reactstrap";
import {
  Button,
  Grid,
  styled,
} from "@mui/material";
import { Span } from "components/app/Typography";
import {  useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

const Niveau=[
  'Mineur',
  'significatif',
  'Majeur',
  'critique',
]
const Type =[
  'Actif primordial',
  'Bien support',
]

const TextField = styled(TextValidator)(() => ({
    width: "100%",
    marginBottom: "16px",
  }));
  
  const ActifProjet = () => {  
    const { setProject } = useProject();
    const [suggestionsNiveau, setSuggestionsNiveau ] = useState(Niveau);
    const [suggestionsType, setSuggestionsType] = useState(Type);
    const [formData, setFormData] = useState({
      
      nom: '',
      type: '',
      criticite: '',
    });
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
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
        const response = await axios.post('https://localhost:7119/api/Actifs', formData);

        setProject(response.data);
        if(response.data){
          console.log('Réponse de l\'API : projet crée avec succès');
        }
      
      } catch (error) {
        
        console.error('Erreur lors de la requête POST :', error);
      }
    };

    return (
      <>
        <Container component="main" sx={{ mb: 6 }} fluid>
        <Card className="shadow" justifyContent="center">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Identifiez les actifs liés au périmètre du projet</h3>
              </CardHeader>
              <CardBody>
        <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
          <Grid container spacing={6}>
            <Grid item lg={12} md={6} sm={12} xs={12} sx={{ mt: 1 }}>
              <TextField
                type="text"
                name="nom"
                label="Nom de l'actif"
                id="standard-basic"
                value={formData.nom}
                onChange={handleChange}
                errorMessages={["this field is required"]}
                validators={["required"]}
              />
  
              <Autocomplete
              sx={{ mb: 4 }}
              value={formData.type}
              onChange={(event, newValue) => {
              handleTypeChange(event, newValue, 'type');
               }}
              options={suggestionsType.map((option) => option.label)}
              renderInput={(params) => <TextField {...params} label="type d'actif" variant="outlined" fullWidth />}
              freeSolo 
              />
              
              <Autocomplete
              sx={{ mb: 4 }}
              value={formData.criticite}
              onChange={(event, newValue) => {
              handleNiveauChange(event, newValue, 'criticite');
               }}
              options={suggestionsNiveau.map((option) => option.label)}
              renderInput={(params) => <TextField {...params} label="Niveau de criticté de l'actif" variant="outlined" fullWidth />}
              freeSolo 
              />
            </Grid>
          </Grid>
  
          <Button color="primary" variant="contained" type="submit">
          <i className="ni ni-send" />
            <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
          </Button>
        </ValidatorForm>
        </CardBody>
        </Card>
        </Container>
        </>
    );
  };
  

export default ActifProjet;
