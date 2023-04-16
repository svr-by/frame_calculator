import React from 'react';
import { Grid, Typography } from '@mui/material';
import FrameParamsForm from './components/frameParamsForm/FrameParamsForm';
import ResultsTable from './components/resultsTable/ResultsTable';

export default function App() {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      spacing={4}
      sx={{ 'max-width': 600, mx: 'auto' }}
    >
      <Grid item mt={4}>
        <Typography variant="h4" align="center">
          Расчета каркаса с покрытием листов
        </Typography>
      </Grid>
      <FrameParamsForm />
      <ResultsTable />
    </Grid>
  );
}
