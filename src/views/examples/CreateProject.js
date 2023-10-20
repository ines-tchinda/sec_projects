import * as React from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
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

// core components

const TextField = styled(TextValidator)(() => ({
    width: "100%",
    marginBottom: "16px",
  }));
  
  const CreateProject = () => {  
    const { setProject } = useProject();
    const [formData, setFormData] = useState({
      // Initialisez ici les champs du formulaire
      nom: '',
      objectif: '',
      dateGoLive: dayjs(),
    });
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        // Envoi des données du formulaire à votre API .NET6
        const response = await axios.post('https://localhost:7119/api/Projects', formData);

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
                <h3 className="mb-0">Nouveau projet</h3>
              </CardHeader>
              <CardBody>
        <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
          <Grid container spacing={6}>
            <Grid item lg={12} md={6} sm={12} xs={12} sx={{ mt: 1 }}>
              <TextField
                type="text"
                name="nom"
                label="Nom du projet"
                id="standard-basic"
                value={formData.nom}
                onChange={handleChange}
                errorMessages={["this field is required"]}
                validators={["required"]}
              />
  
              <TextField
                type="text"
                name="objectif"
                label="Objectifs du projet"
                value={formData.objectif}
                onChange={handleChange}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
  
             
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    sx={{ mb: 4 }}
                    label="Date GO LIVE prévue"
                    value={formData.dateGoLive}
                    onChange={(newDate) => handleChange({ target: { name: 'dateGoLive', value: newDate } })}
                    renderInput={(params) => <TextField {...params} />}
                   />     
              </LocalizationProvider>
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
  

export default CreateProject;
