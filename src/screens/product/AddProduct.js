import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { addProduct, fetchProductById, putProduct } from "../../features/product/productSlice";

const defaultTheme = createTheme();

export default function AddProduct() {
  const { id } = useParams();
  const product = useSelector((state) => state.product.currentProduct);
  const dispatch = useDispatch();
  let nav = useNavigate();
  const add = id ? false : true
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    content: '',
    price: '',
    imgUrl: '',
    company: '',
    prodDate: '',
    isCooling: false
  });



  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (!add && product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        content: product.content || '',
        price: product.price || '',
        imgUrl: product.imgUrl || '',
        company: product.company || '',
        prodDate: product.prodDate || '',
        isCooling: product.isCooling || false
      });
    }
  }, [product]);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, dirtyFields, isValid },
  } = useForm({ mode: 'onBlur' });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (product) {
      dispatch(putProduct({ id, newProduct: formData }));
    } else {
      dispatch(addProduct(formData));
    }
    nav('/');
  };

  const buttonName = product ? 'Update' : 'Add';
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '50vh', width: '60vw', marginLeft: '20vw' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${!add && product ? product.imgUrl : 'https://gregcafe.co.il/wp-content/uploads/2023/03/%D7%92%D7%91%D7%A2%D7%AA-%D7%A9%D7%9E%D7%95%D7%90%D7%9C-1.jpg'})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              {buttonName} Product
            </Typography>
            <Box component="form" onSubmit={(e) => handleSubmit(onSubmit(e))} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                value={add ? '' : formData.name}
                onChange={handleChange}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                autoComplete="description"
                value={add ? '' : formData.description}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="content"
                label="Content"
                name="content"
                autoComplete="content"
                value={add ? '' : formData.content}
                onChange={handleChange}

              />
              <TextField
                margin="normal"
                type='number'
                required
                fullWidth
                id="price"
                label="Price"
                name="price"
                autoComplete="price"
                value={add ? '' : formData.price}
                onChange={handleChange}

              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="company"
                label="Company"
                name="company"
                autoComplete="company"
                value={add ? '' : formData.company}
                onChange={handleChange}

              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="prodDate"
                label="Production Date"
                name="prodDate"
                autoComplete="prodDate"
                value={add ? '' : formData.prodDate}
                onChange={handleChange}

              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="imgUrl"
                label="Image URL"
                name="imgUrl"
                autoComplete="imgUrl"
                value={add ? '' : formData.imgUrl}
                onChange={handleChange}

              />
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Is Cooling"
                name="isCooling"
                checked={add ? '' : formData.isCooling}
                onChange={handleChange}
                id="isCooling"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}

              >
                {buttonName}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
