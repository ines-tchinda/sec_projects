import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CreateProject from 'views/examples/CreateProject';
//import DocProjet from 'views/examples/DocProjet';
import Membres from 'views/examples/Membres';
import Docs from 'views/examples/Docs';


const steps = ['Décrire le projet', 'Ajouter la documentation', 'Fin'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <CreateProject />;
    case 1:
      return <Docs />;
    case 2:
      return < Membres/>;
    default:
      throw new Error('Unknown step');
  }
}

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <>
    <React.Fragment>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 8 }} fluid>
        <Paper variant="outlined" sx={{ my: { xs: 8, md: 2 }, p: { xs: 8, md: 1 } }}>
          <Typography component="h1" variant="h4" align="center">
            Contexte du projet
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 8, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Merci pour la diligence.
              </Typography>
              <Typography variant="subtitle1">
              Votre Projet est en cours de création.
              Nous allons envoyer une alerte à l'équipe
              ITNSecurity pour finaliser la phase d'établissement
              du contexte de votre Projet. 
              Vous serez notifié très bientot!!!
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Terminer' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </React.Fragment>
    </>
  );
}