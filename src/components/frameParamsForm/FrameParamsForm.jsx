import React from 'react';
import SelectInput from './inputs/SelectInput';
import NumberInput from './inputs/NumberInput';
import NumberReadonlyInput from './inputs/NumberReadonlyInput';
import { useForm } from 'react-hook-form';
import { Paper, Grid, Typography, Box, Button } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CalculateIcon from '@mui/icons-material/Calculate';
import {
  filterDataByType,
  calcSquare,
  calcCell,
  calcListQty,
  calcPipeQty,
  calcFixQty,
} from './utils';
import data from '../../data/data.json';
import config from '../../data/config.json';

const INPUT_NAMES = {
  list: 'list',
  pipe: 'pipe',
  width: 'width',
  lenght: 'lenght',
  frame: 'frame',
};

export default function FrameParamsForm({ setMaterials }) {
  const {
    control,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const listsOptions = filterDataByType('list', data, config);
  const pipesOptions = filterDataByType('pipe', data, config);
  const frameOptions = filterDataByType('frame', config);
  const widthParams = config.find((item) => item.key === 'width');
  const lenghtParams = config.find((item) => item.key === 'length');

  const watchWidth = watch(INPUT_NAMES.width);
  const watchLength = watch(INPUT_NAMES.lenght);
  const watchPipe = watch(INPUT_NAMES.pipe);
  const watchFrame = watch(INPUT_NAMES.frame);

  const square = calcSquare(watchWidth, watchLength);
  const { cellWidth, cellLength } = calcCell(watchWidth, watchLength, watchPipe, watchFrame);

  const onSubmit = (formData) => {
    const {
      list,
      pipe,
      lenght,
      width,
      frame: { step },
    } = formData;
    const fix = data.find((item) => item.type === 'fix');

    const listQty = calcListQty(square, list.width);
    const listAmount = (listQty * list.price).toFixed(2);

    const pipeQty = calcPipeQty(lenght, width, step);
    const pipeAmount = (pipeQty * pipe.price).toFixed(2);

    const fixQty = calcFixQty(square, list.material, config);
    const fixAmount = (fixQty * fix.price).toFixed(2);

    const materials = [
      { ...list, qty: listQty, amount: listAmount },
      { ...pipe, qty: pipeQty, amount: pipeAmount },
      { ...fix, qty: fixQty, amount: fixAmount },
    ];
    setMaterials(materials);
  };

  const hasErrors = errors && Object.keys(errors).length !== 0;

  return (
    <Grid item xs={12}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2}>
            <Grid item>
              <Typography variant="subtitle1">Материалы:</Typography>
            </Grid>
            <Grid container item spacing={2}>
              <SelectInput
                name={INPUT_NAMES.list}
                label="Лист покрытия"
                options={listsOptions}
                useFormObj={{ control, errors, setValue, clearErrors }}
                xs={6}
              />
              <SelectInput
                name={INPUT_NAMES.pipe}
                label="Труба"
                options={pipesOptions}
                useFormObj={{ control, errors, setValue, clearErrors }}
                xs={6}
              />
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">Параметры каркаса:</Typography>
            </Grid>
            <Grid container item spacing={2}>
              <NumberInput
                name={INPUT_NAMES.width}
                params={widthParams}
                useFormObj={{ control, errors }}
                xs={4}
              />
              <NumberInput
                name={INPUT_NAMES.lenght}
                params={lenghtParams}
                useFormObj={{ control, errors }}
                xs={4}
              />
              <SelectInput
                name={INPUT_NAMES.frame}
                label="Тип конструкции"
                options={frameOptions}
                useFormObj={{ control, errors, setValue, clearErrors }}
                xs={4}
              />
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">Расчетные параметры:</Typography>
            </Grid>
            <Grid container item spacing={2}>
              <NumberReadonlyInput label="Площадь изделия, м.кв." value={square} xs={4} />
              <NumberReadonlyInput label="Ширина ячейки, м" value={cellWidth} xs={4} />
              <NumberReadonlyInput label="Длина ячейки, м" value={cellLength} xs={4} />
            </Grid>
            <Grid container justifyContent="center" spacing={2} item mt={1}>
              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<CalculateIcon />}
                  disabled={hasErrors}
                >
                  Рассчитать стоимость
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" startIcon={<DeleteOutlineIcon />} onClick={reset}>
                  Очистить
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
}
