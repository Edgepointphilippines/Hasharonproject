import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardActionArea from '@mui/material/CardActionArea'

const CustomCard = ({ title, description, image }) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: '16px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          image={image}
          alt={title}
          sx={{
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
            objectFit: 'cover', 
            height: 300,
          }}
        />
        <CardContent
          sx={{
            backgroundColor: '#fafafa', // Subtle light background for the content
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '150px', // Ensures content fits nicely with padding
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              fontWeight: 'bold',
              color: '#333', // Darker color for better readability
              marginBottom: '12px',
              fontSize: '1.25rem', // Slightly larger for emphasis
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#555', // A softer color for description
              lineHeight: 1.5, // Improved line spacing for readability
              flexGrow: 1,
              fontSize: '1rem', // Consistent font size
            }}
          >
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default CustomCard
