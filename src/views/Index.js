import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { Card, Grid, TextField } from '@mui/material';
import { Box, styled} from '@mui/system';

const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));

const ContentBox = styled(Box)(() => ({
  height: '100%',
  padding: '30px',
  position: 'relative',
  background: 'rgba(0, 0, 0, 0.01)',
}));
const JWTRoot = styled(JustifyBox)(() => ({
  background: '#1A2038',
  minHeight: '100% !important',
  '& .card': {
    maxWidth: 800,
    minHeight: 400,
    margin: '1rem',
    display: 'flex',
    borderRadius: 12,
    alignItems: 'center',
  },
}));


// inital login credentials

const Index = () => {
  const [loading, setLoading] = useState(false);
  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <JWTRoot>
        <Card className="card" xs={10} >
        <Grid container >
          <Grid item sm={6} xs={12}>
            <JustifyBox p={4} height="100%" sx={{ minWidth: 320 }}>
            <img
                      alt="..."
                      src={require("../assets/img/brand/login.jpg")}
                    />
            </JustifyBox>
            
          </Grid>
          <Grid item sm={6} xs={12}>
            <ContentBox>
            <form  autoComplete="off">
            <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="cuid"
                      label="Cuid"
                      variant="outlined"
                      sx={{ mb: 4 }}
                      
                    />

            <TextField
                      fullWidth
                      size="small"
                      name="password"
                      type="password"
                      label="Mot de Passe"
                      variant="outlined"
                      sx={{ mb: 4 }}
                    />
            <LoadingButton
                      type="submit"
                      color="warning"
                      loading={loading}
                      variant="contained"
                      sx={{ my: 2 }}
                    >
                      Se Connecter
                    </LoadingButton>
               </form>
              </ContentBox>
          </Grid>
        </Grid>
        </Card>
    </JWTRoot>
  );
};

export default Index;
