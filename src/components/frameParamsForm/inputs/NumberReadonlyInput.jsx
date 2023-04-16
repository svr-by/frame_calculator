import React from 'react';
import { Grid, TextField } from '@mui/material';

export default function NumberReadonlyInput({ label, value, xs }) {
  return (
    <Grid item xs={xs}>
      <TextField
        label={label}
        type="number"
        variant="filled"
        size="small"
        value={value}
        InputProps={{
          readOnly: true,
        }}
      />
    </Grid>
  );
}
