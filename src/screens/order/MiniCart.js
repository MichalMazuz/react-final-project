import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { useSelector } from 'react-redux';
import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { useState } from 'react';

export default function MiniCart() {
  const [open, setOpen] = useState(true);
  const currentCart = useSelector(s => s.order.cart)
  return (
    <React.Fragment>

      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />

          <ImageList sx={{ width: 500, height: 450, columnCount: 1 }}>
            {currentCart.map((item) => (
              <ImageListItem key={item.img}>
                <img
                  srcSet={`${item.imgUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.imgUrl}?w=248&fit=crop&auto=format`}
                  alt={item.name}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={"qty:" + item.qty + " price:" + item.price + "₪ finalPrice:" + item.finalPrice}
                  position="below"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
