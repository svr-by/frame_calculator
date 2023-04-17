import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import FrameParamsForm from './components/frameParamsForm/FrameParamsForm';
import ResultsTable from './components/resultsTable/ResultsTable';

export default function App() {
  const [materials, setMaterials] = useState([]);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      spacing={4}
      sx={{ maxWidth: 600, mx: 'auto' }}
    >
      <Grid item mt={4}>
        <Typography variant="h5" align="center">
          Калькулятор расчёта плоского каркаса
        </Typography>
      </Grid>
      <FrameParamsForm setMaterials={setMaterials} />
      <ResultsTable materials={materials} />
    </Grid>
  );
}
