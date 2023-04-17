import React from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Grid,
  Paper,
  Box,
  Button,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CountUp from 'react-countup';

export default function ResultTable({ materials, addToCart, reset }) {
  const calcTotalAmount = (materials) => {
    const totalAmount = materials.reduce((amount, material) => amount + +material.amount, 0);
    return totalAmount.toFixed(2);
  };

  const handleAddToCart = () => {
    addToCart([materials]);
    reset();
  };

  return (
    <Grid item sx={{ width: '100%' }}>
      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Наименование</TableCell>
                <TableCell align="right">Ед.</TableCell>
                <TableCell align="right">Кол-во</TableCell>
                <TableCell align="right">Сумма</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {materials && materials.length ? (
                materials.map((mateial, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {mateial.name}
                    </TableCell>
                    <TableCell align="right">{mateial.unit}</TableCell>
                    <TableCell align="right">{mateial.qty}</TableCell>
                    <TableCell align="right">{mateial.amount}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell>Укажите материалы и параметры перекрытия</TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle1">Итого:</Typography>
                </TableCell>
                <TableCell />
                <TableCell />
                <TableCell align="right">
                  <Typography variant="subtitle1">
                    <CountUp
                      start={0}
                      end={calcTotalAmount(materials)}
                      prefix="р."
                      decimals={2}
                      separator=","
                      duration={1}
                    />
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        {materials.length ? (
          <Box sx={{ display: 'flex', gap: '1rem', justifyContent: 'center', p: '1rem' }}>
            <Button
              startIcon={<ShoppingCartIcon />}
              variant="contained"
              onClick={handleAddToCart}
              disabled={!materials.length}
            >
              Добавить в корзину
            </Button>
            <Button
              startIcon={<DeleteOutlineIcon />}
              variant="outlined"
              onClick={reset}
              disabled={!materials.length}
            >
              Очистить
            </Button>
          </Box>
        ) : (
          ''
        )}
      </Paper>
    </Grid>
  );
}
