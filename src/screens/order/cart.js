import { Card, Typography, Box, Button, Grid, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertDialog from '../user/alertDialog';
import { addQty, removeQty, removeFromCart } from '../../features/order/orderSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#1e88e5',
    },
    background: {
      default: '#e3f2fd',
      paper: '#ffffff',
    },
    text: {
      primary: '#0d47a1',
      secondary: '#1e88e5',
    },
  },
});

export default function Cart(props) {
  const cartFromRedux = useSelector((state) => state.order.cart);
  const itemsFromRedux = useSelector((state) => state.order.numOfItems);
  const priceFromRedux = useSelector((state) => state.order.finalPrice);
  const currentUserFromRedux = useSelector((state) => state.user.currentUser);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const completePay = () => {
    if (currentUserFromRedux)
      navigate('/payment');
    else {
      setShow(true);
    }
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const incraeseQty = (id) => {
    const c = cartFromRedux.find(x => x.id == id)
    if (10 > c.qty)
      dispatch(addQty(id))
  }

  const decraeseQty = (id) => {
    dispatch(removeQty(id))
  }

  const deleteFromCart = (id) => {
    dispatch(removeFromCart(id))
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2} component="main" sx={{ marginTop: '1vh', width: '100%' }}>
        {cartFromRedux && cartFromRedux.map((item) => (
          <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
            <Item>
              <img src={item.imgUrl} alt={item.name} style={{ maxWidth: '100%', height: 'auto' }} />
              <Typography component="h1" variant="h5" color="primary">
                {item.name}
              </Typography>
              <Typography color="primary">Content: {item.content}</Typography>
              <Typography color="primary">Qty: {item.qty}</Typography>
              <Typography color="primary">Price per Unit: {item.price}</Typography>
              <Typography variant="h6" color="primary">Final Price: {item.finalPrice}</Typography>
              <Typography >
                <IconButton aria-label="delete" onClick={() => deleteFromCart(item.id)} sx={{ color: '#1976d2' }}>
                  <DeleteIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => decraeseQty(item.id)} sx={{ color: '#1976d2' }}>
                  <RemoveCircleOutlineIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => incraeseQty(item.id)} sx={{ color: '#1976d2' }}>
                  <ControlPointIcon />
                </IconButton>
              </Typography>
            </Item>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
        <Card sx={{
          height: '30vh',
          width: '30vw',
          backgroundColor: 'white',
          border: '2px solid #1976d2',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <ul style={{ listStyleType: 'none', color: '#1976d2', padding: 0, textAlign: 'center' }}>
            <Typography variant="h5" color="primary">Amount of items: {itemsFromRedux}</Typography>
            <Typography variant="h5" color="primary">Final price: {priceFromRedux}</Typography>
          </ul>
        </Card>
        {itemsFromRedux !== 0 && <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2, backgroundColor: '#1976d2', color: '#ffffff' }}
          onClick={completePay}
          size="small"
        >
          Confirm Order
        </Button>}
      </Box>
      {show && <AlertDialog />}
    </ThemeProvider>
  );
}
