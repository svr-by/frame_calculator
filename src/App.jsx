import React, { useState } from 'react';
import { Grid, Typography, IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FrameParamsForm from './components/frameParamsForm/FrameParamsForm';
import ResultsTable from './components/resultsTable/ResultsTable';

export default function App() {
  const [materials, setMaterials] = useState([]);
  const [cart, setCart] = useState([]);

  const handleAddToCart = (order) => {
    setCart(cart.concat(order));
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      spacing={4}
      sx={{ maxWidth: 600, mx: 'auto', p: '1rem', position: 'relative' }}
    >
      <IconButton color="inherit" edge="end" sx={{ position: 'absolute', top: '2rem', right: 0 }}>
        <Badge badgeContent={cart.length} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <Grid item mt={4}>
        <Typography variant="h5" align="center">
          Калькулятор расчёта плоского каркаса
        </Typography>
      </Grid>
      <FrameParamsForm setMaterials={setMaterials} />
      <ResultsTable
        materials={materials}
        reset={() => setMaterials([])}
        addToCart={handleAddToCart}
      />
    </Grid>
  );
}
