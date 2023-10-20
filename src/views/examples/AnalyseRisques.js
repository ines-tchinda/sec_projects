import  SimpleCard  from 'components/app/SimpleCard.js';
import { Autocomplete, styled, TextField, Grid} from '@mui/material';
import React, { useState} from 'react';
//import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import {Button,} from "@mui/material";
import { Span } from "components/app/Typography";
import axios from 'axios';
import { useProject } from 'components/app/Contexts/ProjectContext';
import FicheAnalyseRisque from './FicheAnalyseRisque';
 
const Container = styled('div')(({ theme }) => ({
    margin: '60px',
    justifyContent:'center',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
    '& .breadcrumb': {
      marginBottom: '30px',
      [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
    },
  }));


const initialSuggestionVul = [
  { label: 'Contrôles d\'accès défaillants' },
  { label: 'Défaillances cryptographiques' },
  { label: 'Composants vulnérables et obsolètes' },
  { label: 'Injection SQL' },
  { label: 'Cross site scripting' },
  { label: 'Identification et authentification de mauvaise qualité' },
  { label: 'Manque d\'intégrité des données et du logiciel' },
  { label: 'Echecs de la journalisation et Monitoring de la sécurité ' },
  { label: 'Falsifications de requêtes coté serveur' },
];

const initialSuggestionMen = [
    { label: 'attaques de denis de service' },
    { label: 'Phishing' },
    { label: 'Attaque brute force' },
    { label: 'Attaque MIDM' },
  ];
  const initialSuggestionSm = [
    { label: 'Code malveillant d\'origine inconnue' },
    { label: 'Source humaine interne, malveillante' },
    { label: 'Blackhat' },
    { label: 'script-kiddies' },
  ];
  const initialSuggestionRisk = [
    { label: 'Exposition des données sensibles' },
    { label: 'Usurpation d\'identité' },
    { label: 'Saturation/Indisponibilité de l\'API' },
    { label: 'Atteinte à l\'intégrité des données' },
  ];
  const initialSuggestionMs = [
    { label: 'Limiter le nombre de requêtes journalières que l\'API devra traiter' },
    { label: 'Chiffrer les données en transit à l\'aide du protocole https' },
    { label: 'Logger tous les échecs d\'authentification, les accès refusés et les erreurs de validations des données entrées' },
    { label: 'Limiter les tentatives d\'authentification à 5' },
  ];
  const Niveau=[
    'Mineur',
    'significatif',
    'Majeur',
    'critique',
  ];

const AnalyseRisques = () => {
  const { projectId } = useProject();
  const [suggestionsVul, setSuggestionsVul] = useState(initialSuggestionVul);
  const [suggestionsMen, setSuggestionsMen] = useState(initialSuggestionMen);
  const [suggestionsSm, setSuggestionsSm] = useState(initialSuggestionSm);
  const [suggestionsRisk, setSuggestionsRisk] = useState(initialSuggestionRisk);
  const [suggestionsMs, setSuggestionsMs] = useState(initialSuggestionMs);
  const [suggestionsNiveau, setSuggestionsNiveau ] = useState(Niveau);

  const [formData, setFormData] = useState({
    // Initialisez ici les champs du formulaire
    vulnerabilite: '' ,
    menace: '',
    sourceMenace: '',
    risque: '',
    criticiteRisque:'',
  });
  const [mesureSecurite, setMesureSecurite] = useState({
    nom:'',
  });
  //const [mesureSecurite, setMesureSecurite] = useState('');

  const handleVulChange = (event, newInputValue, fieldName) => {
    // Si l'utilisateur saisit une nouvelle vulnérabilité, ajoutez-la aux suggestions
    if (newInputValue && !suggestionsVul.find((vul) => vul.label === newInputValue)) {
      setSuggestionsVul([...suggestionsVul, { label: newInputValue }]);
    }
    setFormData({
        ...formData,
       [fieldName]: newInputValue || '',
         });
    };
   const handleMenChange = (event, newInputValue, fieldName) => {
    if (newInputValue && !suggestionsMen.find((men) => men.label === newInputValue)) {
        setSuggestionsMen([...suggestionsMen, { label: newInputValue }]);
         }
    setFormData({
     ...formData,
    [fieldName]: newInputValue,
      });
  };
  const handleSmChange = (event, newInputValue, fieldName) => {
    if (newInputValue && !suggestionsSm.find((sm) => sm.label === newInputValue)) {
        setSuggestionsSm([...suggestionsSm, { label: newInputValue }]);
         }
    setFormData({
     ...formData,
    [fieldName]: newInputValue,
      });
  };
  const handleRiskChange = (event, newInputValue, fieldName) => {
    if (newInputValue && !suggestionsRisk.find((risk) => risk.label === newInputValue)) {
        setSuggestionsRisk([...suggestionsRisk, { label: newInputValue }]);
         }
    setFormData({
     ...formData,
    [fieldName]: newInputValue,
      });
  };
  const handleMsChange = (event, newInputValue,fieldName) => {
    if (newInputValue && !suggestionsMs.find((ms) => ms.label === newInputValue)) {
        setSuggestionsMs([...suggestionsMs, { label: newInputValue }]);
         }
         setMesureSecurite({
            ...mesureSecurite,
           [fieldName]: newInputValue,
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envoi des données du formulaire à votre API .NET6
      
      const response1 = await axios.post(`https://localhost:7119/api/FicheAnalyseRisque?projectId=${projectId}`, formData);

      //Réponse de l'API 
      console.log('Réponse de l\'API :', response1.data);
      try {
        // Envoi des données du formulaire à votre API .NET6
        const response2 = await axios.post(`https://localhost:7119/api/Mesures?projectId=${projectId}`, mesureSecurite);
  
        //Réponse de l'API 
        console.log('Réponse de l\'API :', response2.data);
      } catch (error2) {
        
        console.error('Erreur lors de la requête POST :', error2);
      }
    
    } catch (error1) {
      
      console.error('Erreur lors de la requête POST :', error1);
    }
  };


  return (
    <>
    <Container>
     <SimpleCard title="Analyser les risques du projet">
      {console.log(projectId)}
     <form onSubmit={handleSubmit}>  
     <Autocomplete
       sx={{ mb: 4 }}
       value={formData.vulnerabilite}
       onChange={(event, newValue) => {
        handleVulChange(event, newValue, 'vulnerabilite'); 
      }}
      options={suggestionsVul.map((option) => option.label)}
      renderInput={(params) => <TextField {...params} label="Identifiez une Vulnérabilité de votre projet" variant="outlined" fullWidth />}
      freeSolo
     />


    <Autocomplete
      sx={{ mb: 4 }}
      value={formData.menace}
      onChange={(event, newValue) => {
      handleMenChange(event, newValue, 'menace');
      }}
      options={suggestionsMen.map((option) => option.label)}
      renderInput={(params) => <TextField {...params} label="Identifiez une menace" variant="outlined" fullWidth />}
      freeSolo 
    />
    <Autocomplete
      sx={{ mb: 4 }}
      value={formData.sourceMenace}
      onChange={(event, newValue) => {
      handleSmChange(event, newValue, 'sourceMenace');
      }}
      options={suggestionsSm.map((option) => option.label)}
      renderInput={(params) => <TextField {...params} label="Identifiez une source de menace" variant="outlined" fullWidth />}
      freeSolo 
    />
    <Grid container spacing={3}>
    <Grid item xs={9}>
    <Autocomplete
      sx={{ mb: 4 }}
      value={formData.risque}
      onChange={(event, newValue) => {
        handleRiskChange(event, newValue, 'risque');
      }}
      options={suggestionsRisk.map((option) => option.label)}
      renderInput={(params) => <TextField {...params} label="Identifiez un risque" variant="outlined" fullWidth />}
      freeSolo 
    />
    </Grid>
    <Grid item xs={3}>
    <Autocomplete
      sx={{ mb: 4 }}
      value={formData.criticiteRisque}
      onChange={(event, newValue) => {
        handleNiveauChange(event, newValue, 'criticiteRisque');
      }}
      options={suggestionsNiveau.map((option) => option)}
      renderInput={(params) => <TextField {...params} label="Criticité du risque" variant="outlined" fullWidth />}
      freeSolo 
    />
    </Grid>
    </Grid>
   
    <Autocomplete
      sx={{ mb: 4 }}
      value={mesureSecurite.nom}
      onChange={(event, newValue) => {
      handleMsChange(event, newValue, 'nom');
      }}
      options={suggestionsMs.map((option) => option.label)}
      renderInput={(params) => <TextField {...params} label="Formulez une mésure de sécurité" variant="outlined" fullWidth />}
      freeSolo 
    />
    <Button color="primary" variant="contained" type="submit">
          <i className="ni ni-send" />
            <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
          </Button>
          
       </form> 
      </SimpleCard>
    </Container>

    <Container>
    <SimpleCard title="Fiche d'analyse Risques">
     <FicheAnalyseRisque/>
    </SimpleCard>
    </Container>
    </>
  );
};

export default AnalyseRisques;
