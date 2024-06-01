
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SingleProduct from './SingleProduct'
import { fetchAllProducts } from '../../features/product/productSlice'
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';
import MiniCart from '../order/MiniCart';
import { useParams } from 'react-router-dom';

export default function ProductList() {
  const arrFromRedux = useSelector((state) => state.product.arrProducts)
  const dispatch = useDispatch()
  const mini = useParams().mini
  useEffect(() => {
    fetchProducts()
  }, [])
  const fetchProducts = async () => {
    dispatch(fetchAllProducts())
    console.log(arrFromRedux)

  }


  return (
    <div>

      {arrFromRedux && <Box
        sx={{
          display: 'grid',
          columnGap: 3,
          rowGap: 1,
          gridTemplateColumns: 'repeat(3, 1fr)',
          marginLeft: 11,
          marginTop: 3

        }}
      >
        {arrFromRedux.map((item) => (
          <ImageListItem key={item.imgUrl}>
            <SingleProduct myProduct={item}></SingleProduct>
          </ImageListItem>
        ))}
      </Box>}
      {mini && <MiniCart></MiniCart>}
    </div>
  )
}