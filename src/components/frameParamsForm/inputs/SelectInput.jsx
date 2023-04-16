import React from 'react';
import { Controller } from 'react-hook-form';
import { Grid, TextField, Autocomplete } from '@mui/material';

export default function SelectInput({ name, label, options, useFormObj, xs }) {
  const { control, errors, setValue, clearErrors } = useFormObj;

  const onChange = (e, value) => {
    setValue(name, value);
    clearErrors(name);
  };

  return (
    <Grid item xs={xs}>
      <Controller
        name={name}
        control={control}
        rules={{ required: 'Обязательное поле' }}
        render={({ field }) => (
          <Autocomplete
            {...field}
            options={options.sort((a, b) => a.material - b.material)}
            groupBy={(option) => option.materialName}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                variant="standard"
                size="small"
                error={!!errors[name]}
                helperText={errors[name] ? errors[name]?.message : ''}
              />
            )}
            value={field.value || null}
            onChange={onChange}
          />
        )}
      />
    </Grid>
  );
}
