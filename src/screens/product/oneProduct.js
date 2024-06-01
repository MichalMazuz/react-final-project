import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProductById } from '../../features/product/productSlice';
import { addToMyCart } from '../../features/order/orderSlice';
import NumberInput from '../order/NumberInput';
import Button from '@mui/material/Button';

export default function OneProduct() {
  const id = useParams().id;
  const product = useSelector((state) => state.product.currentProduct);
  const currentLogin = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  useEffect(() => {
    getOneProduct();
  }, []);

  const getOneProduct = () => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  };

  const addToCart = () => {
    const mini = true;
    dispatch(addToMyCart({ ...product, qty: qty }));
    navigate('/products/' + mini)
  };

  return (
    <>
      <Card sx={{ m: 2, height: '70vh', width: '40vw', marginLeft: '30vw', marginTop: '15vh' }}>
        <CardHeader
          title={product && product.name}
          subheader={product && product.description}
        />
        <CardMedia
          component="img"
          height="200"
          image={product && product.imgUrl}
          alt="product's image"
          sx={{ objectFit: 'contain' }}
        />
        <CardContent>
          <Typography variant="body" color="text.secondary" component="p">
            {product && " price: " + product.price + "₪"}
          </Typography>
          <br />
          <NumberInput myFunc={setQty}></NumberInput>
          <br />
          <Button variant="outlined" sx={{ color: '#1976D2', borderColor: '#1976D2' }} onClick={addToCart}>
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
