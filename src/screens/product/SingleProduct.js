
import { useDispatch, useSelector } from "react-redux";
import * as React from 'react';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from "react-router-dom";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import { useState } from "react";

export default function SingleProduct(props) {
    let product = props.myProduct;
    const dispatch = useDispatch();
    const currentLogin = useSelector(state => state.user.type);
    const [showInfo, setShowInfo] = useState(false);
    let navigate = useNavigate();

    const updateProduct = () => {
        navigate('addProduct/' + product.id);
    };

    const showOneProduct = () => {
        navigate('/oneProduct/' + product.id);
    };

    return (
        <div style={{ position: 'relative', width: 380 }}>
            <img
                srcSet={`${product.imgUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${product.imgUrl}?w=248&fit=crop&auto=format`}
                alt={product.name}
                loading="lazy"
                width={380}
                style={{ display: 'block', width: '100%' }}
            />

            <ImageListItemBar
                title={product.name}
                subtitle={"₪" + product.price + ".00"}
                style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
                actionIcon={
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <IconButton
                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                            aria-label={`info about ${product.name}`}
                            onClick={() => setShowInfo(!showInfo)}
                        >
                            <InfoIcon />
                        </IconButton>
                        <IconButton
                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                            aria-label={`action for ${product.name}`}
                            onClick={currentLogin === "manager" ? updateProduct : showOneProduct}
                        >
                            {currentLogin === "manager" ? <BuildCircleIcon /> : <AddShoppingCartIcon />}
                        </IconButton>
                    </div>
                }
            />
            <Collapse in={showInfo} timeout="auto" unmountOnExit>
                <Box
                    sx={{
                        p: 2,
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        color: 'white',
                        position: 'absolute',
                        bottom: '56px',
                        width: '100%',
                        boxSizing: 'border-box',
                    }}
                >
                    <p style={{ margin: 0 }}>{product.description}</p>
                </Box>
            </Collapse>
        </div>
    );
}
