import React from 'react';
import { Grid, Typography } from '@mui/material';
import FrameParamsForm from './components/FrameParamsForm';
import ResultsTable from './components/ResultsTable';

export default function App() {
  return (
    <Grid container direction="column" alignItems="center" spacing={4}>
      <Grid item mt={4}>
        <Typography variant="h4">Расчета каркаса с покрытием листов</Typography>
      </Grid>
      <FrameParamsForm />
      <ResultsTable />
    </Grid>
  );
}
