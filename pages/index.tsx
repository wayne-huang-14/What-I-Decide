import { useState } from 'react';

import { useUnsplashApi } from '@/hooks/index';

import {
  Typography,
  Container,
  ImageList,
  ImageListItem,
  Button,
  TextField
} from '@material-ui/core';

export default function Home() {
  const { isLoading, error, sendRequest, clearError } = useUnsplashApi();
  const [photos, setPhotos] = useState([]);

  const handleOnClick = async () => {
    try {
      const responseData = await sendRequest({
        query: 'bikes',
        perPage: 20,
        color: 'white',
        orientation: 'portrait'
      });

      const { total, results } = responseData;
      setPhotos(results);
      console.log(`responseData`, responseData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container maxWidth="lg">
      <Container
        sx={{
          height: '30vh',
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center'
        }}
      >
        <Button variant="outlined" onClick={handleOnClick}>
          Inspire Me
        </Button>
        <TextField id="search" label="I want to see..." size="small" />
      </Container>

      {isLoading && <Typography>Loading.....</Typography>}
      {error && <Typography>{error}</Typography>}

      {photos.length > 0 && (
        <Container sx={{}}>
          <ImageList variant="masonry" cols={4} gap={10}>
            {photos.map(photo => (
              <ImageListItem key={photo.id}>
                <img
                  src={photo.urls.regular}
                  alt={photo.alt_description}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Container>
      )}
    </Container>
  );
}
