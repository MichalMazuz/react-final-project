import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CongratCard() {
  const currentLogin = useSelector((s) => s.user.currentUser);
  const navigate = useNavigate();
  const back = () => {
    navigate('/products');
  };

  return (
    <Card
      data-resizable
      sx={{
        textAlign: 'center',
        alignItems: 'center',
        width: '40%',
        marginLeft: '28vw',
        marginTop: '15vh',
        overflow: 'auto',
        resize: 'horizontal',
        '--icon-size': '100px',
      }}
    >
      <CardOverflow variant="solid" color="primary">
        <AspectRatio
          variant="outlined"
          color="primary"
          ratio="1"
          sx={{
            m: 'auto',
            transform: 'translateY(50%)',
            borderRadius: '50%',
            width: 'var(--icon-size)',
            boxShadow: 'sm',
            bgcolor: 'primary.light',
            position: 'relative',
          }}
        >
          <div>
            <img
              src="https://saleinfo.co.il/wp-content/uploads/2021/05/%D7%A7%D7%A4%D7%94-%D7%92%D7%A8%D7%92-%D7%A6%D7%99%D7%9C%D7%95%D7%9D-%D7%9E%D7%90%D7%95%D7%A8-%D7%9E%D7%95%D7%99%D7%90%D7%9C-3.jpg"
              alt="logo"
              loading="lazy"
              width={50}
            />
          </div>
        </AspectRatio>
      </CardOverflow>
      <Typography level="title-lg" sx={{ mt: 'calc(var(--icon-size) / 2)' }}>
        🎊 Congrats {currentLogin?.firstName} 🎊
      </Typography>
      <CardContent sx={{ maxWidth: '40ch' }}>
        The order was successfully.
      </CardContent>
      <CardActions
        orientation="vertical"
        buttonFlex={1}
        sx={{
          '--Button-radius': '40px',
          width: 'clamp(min(100%, 160px), 50%, min(100%, 200px))',
        }}
      >
        <Button onClick={back} variant="plain" color="primary">
          Back to the site
        </Button>
      </CardActions>
    </Card>
  );
}
