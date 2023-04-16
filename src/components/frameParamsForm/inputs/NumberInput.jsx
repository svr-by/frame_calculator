import React from 'react';
import { Controller } from 'react-hook-form';
import { Grid, TextField } from '@mui/material';

export default function NumberInput({ name, params, useFormObj, xs }) {
  const { name: label, step, min, max } = params;
  const { control, errors } = useFormObj;

  return (
    <Grid item xs={xs}>
      <Controller
        name={name}
        control={control}
        rules={{
          required: { value: true, message: 'Обязательное поле' },
          min: { value: min, message: `Минималное значение ${min}` },
          max: { value: max, message: `Максималное значение ${max}` },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label={label}
            type="number"
            variant="standard"
            size="small"
            autoComplete="off"
            inputProps={{
              min,
              step,
            }}
            error={!!errors[name]}
            helperText={errors[name] ? errors[name]?.message : ''}
            value={field.value || ''}
          />
        )}
      />
    </Grid>
  );
}
