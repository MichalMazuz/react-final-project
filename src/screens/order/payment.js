import React, { useState, useEffect } from 'react';
import { Box, Card, FormControl, FormLabel, OutlinedInput, RadioGroup, Stack, Typography, Button, Alert } from '@mui/material';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import SimCardRoundedIcon from '@mui/icons-material/SimCardRounded';
import { styled } from '@mui/system';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addOrder } from '../../features/order/orderSlice';

const FormGrid = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function Payment() {
  const [paymentType, setPaymentType] = useState('creditCard');
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [name, setName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [expirationError, setExpirationError] = useState(false);
  const cartFromRedux = useSelector((state) => state.order.cart);
  const currentUserFromRedux = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUserFromRedux) {
      setName(currentUserFromRedux.name); // Assuming the name property exists in currentUserFromRedux
    }
  }, [currentUserFromRedux]);

  const handlePaymentTypeChange = (event) => {
    setPaymentType(event.target.value);
  };

  const handleCardNumberChange = (event) => {
    const value = event.target.value.replace(/\D/g, '');
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    if (value.length <= 16) {
      setCardNumber(formattedValue);
    }
  };

  const handleCvvChange = (event) => {
    const value = event.target.value.replace(/\D/g, '');
    if (value.length <= 3) {
      setCvv(value);
    }
  };

  const handleExpirationDateChange = (event) => {
    const value = event.target.value.replace(/\D/g, '');
    const formattedValue = value.replace(/(\d{2})(?=\d{2})/, '$1/');
    if (value.length <= 4) {
      setExpirationDate(formattedValue);
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const formatDate = (date) => {
    const formattedDate = date.replaceAll('.', '-');
    return formattedDate;
  };

  const getFutureDate = (daysToAdd) => {
    const today = new Date();
    today.setDate(today.getDate() + daysToAdd);
    return today.toLocaleDateString().replaceAll('.', '-');
  };

  const validateExpirationDate = (date) => {
    const [month, year] = date.split('/').map(Number);
    if (!month || !year) return false;

    const today = new Date();
    const expDate = new Date(`20${year}`, month - 1); // Assuming the year is in YY format

    return expDate >= today;
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    const isExpirationValid = validateExpirationDate(expirationDate);

    if (cardNumber && cvv && expirationDate && name && isExpirationValid) {
      const newOrder = {
        userId: currentUserFromRedux.id,
        orderDate: formatDate(new Date().toLocaleDateString()),
        dueDate: getFutureDate(10),
        cart: cartFromRedux
      };

      dispatch(addOrder(newOrder));
      navigate('/congrat')
    } else if (!isExpirationValid) {
      setExpirationError(true);
    }
  };

  return (
    <Stack spacing={{ xs: 3, sm: 7 }} useFlexGap>
      <FormControl component="fieldset" sx={{ width: '60%' }}>
        <RadioGroup
          aria-label="Payment options"
          name="paymentType"
          value={paymentType}
          onChange={handlePaymentTypeChange}
          sx={{
            flexDirection: { sm: 'column', md: 'row' },
            gap: 2,
          }}
        >
          <Card
            raised={paymentType === 'creditCard'}
            sx={{
              maxWidth: { sm: '80%', md: '10%' },
              flexGrow: 1,
              outline: '1px solid',
              outlineColor: paymentType === 'creditCard' ? 'primary.main' : 'divider',
              backgroundColor: paymentType === 'creditCard' ? 'background.default' : '',
            }}
          />
          <Card
            raised={paymentType === 'bankTransfer'}
            sx={{
              maxWidth: { sm: '100%', md: '50%' },
              flexGrow: 1,
              outline: '1px solid',
              outlineColor: paymentType === 'bankTransfer' ? 'primary.main' : 'divider',
              backgroundColor: paymentType === 'bankTransfer' ? 'background.default' : '',
            }}
          />
        </RadioGroup>
      </FormControl>
      {paymentType === 'creditCard' && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              p: 3,
              height: { xs: 300, sm: 350, md: 375 },
              marginLeft: '18.2vw',
              marginTop: '8vh',
              width: '60%',
              borderRadius: '20px',
              border: '2px solid ',
              borderColor: 'primary.main',
              backgroundColor: 'background.paper',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="subtitle2" sx={{ color: 'primary.main', fontSize: 'large' }}>Credit card</Typography>
              <CreditCardRoundedIcon sx={{ color: 'primary.main' }} />
            </Box>
            <SimCardRoundedIcon
              sx={{
                fontSize: { xs: 48, sm: 56 },
                transform: 'rotate(90deg)',
                color: 'primary.main',
              }}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 2,
              }}
            >
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="card-number" required>
                  Card number
                </FormLabel>
                <OutlinedInput
                  id="card-number"
                  autoComplete="card-number"
                  placeholder="0000 0000 0000 0000"
                  required
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  error={isSubmitted && !cardNumber}
                />
              </FormGrid>
              <FormGrid sx={{ maxWidth: '20%' }}>
                <FormLabel htmlFor="cvv" required>
                  CVV
                </FormLabel>
                <OutlinedInput
                  id="cvv"
                  autoComplete="CVV"
                  placeholder="123"
                  required
                  value={cvv}
                  onChange={handleCvvChange}
                  error={isSubmitted && !cvv}
                />
              </FormGrid>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="card-name" required>
                  Name
                </FormLabel>
                <OutlinedInput
                  id="card-name"
                  autoComplete="card-name"
                  placeholder="John Smith"
                  required
                  value={name}
                  onChange={handleNameChange}
                  error={isSubmitted && !name}
                />
              </FormGrid>
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="card-expiration" required>
                  Expiration date
                </FormLabel>
                <OutlinedInput
                  id="card-expiration"
                  autoComplete="card-expiration"
                  placeholder="MM/YY"
                  required
                  value={expirationDate}
                  onChange={handleExpirationDateChange}
                  error={(isSubmitted && !expirationDate) || expirationError}
                />
              </FormGrid>
            </Box>
            {expirationError && (
              <Alert severity="error">
                The expiration date is invalid or has already passed.
              </Alert>
            )}
          </Box>
        </Box>
      )}
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 2, alignSelf: 'center' }}
        onClick={handleSubmit}
      >
        בצע תשלום
      </Button>
    </Stack>
  );
}
