import * as React from 'react';

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
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

// core components

const TextField = styled(TextValidator)(() => ({
    width: "100%",
    marginBottom: "16px",
  }));
  
  const Membres = () => {
    const [state, setState] = useState({ date: new Date() });
  
    useEffect(() => {
      ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
        if (value !== state.password) return false;
  
        return true;
      });
      return () => ValidatorForm.removeValidationRule("isPasswordMatch");
    }, [state.password]);
  
    const handleSubmit = (event) => {
      // console.log("submitted");
      // console.log(event);
    };
  
    const handleChange = (event) => {
      event.persist();
      setState({ ...state, [event.target.name]: event.target.value });
    };
    const {
        Cuid,
        role,
      } = state;

    return (
      <>
        <Container component="main" maxWidth="sm" sx={{ mb: 8 }} fluid>
        <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Ajouter les parties prenantes du projet</h3>
              </CardHeader>
              <CardBody>
        <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
          <Grid container spacing={6}>
            <Grid item lg={12} md={6} sm={12} xs={12} sx={{ mt: 1 }}>
              <TextField
                type="text"
                name="Cuid"
                label="Cuid"
                onChange={handleChange}
                value={Cuid || ""}
                errorMessages={["this field is required"]}
                validators={["required", "minStringLength:8", "maxStringLength: 8"]}
              />
              <TextField
                name="role"
                type="text"
                label="Role"
                value={role || ""}
                onChange={handleChange}
                validators={["required"]}
                errorMessages={["this field is required"]}/>
            </Grid>
          </Grid>
  
          <Button color="primary" variant="contained" type="submit">
          <i className="ni ni-fat-add" />
            <Span sx={{ pl: 1, textTransform: "capitalize" }}>Valider</Span>
          </Button>
        </ValidatorForm>
        </CardBody>
        </Card>
        </Container>
        </>
    );
  };
  

export default Membres;
