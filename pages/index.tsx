import { useState, useEffect } from 'react';

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
  const [term, setTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState(term);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, [term]);

  useEffect(() => {
    const search = async () => {
      try {
        const responseData = await sendRequest({
          query: debouncedTerm,
          perPage: 20,
          orientation: 'portrait'
        });

        const { total, results } = responseData;
        setPhotos(results);
      } catch (err) {
        console.log(err);
      }
    };

    if (debouncedTerm) {
      search();
    }
  }, [debouncedTerm]);

  const getRandomTerm = () => {
    const terms = ['people', 'books', 'landscape', 'nature'];
    const randomIndex = Math.floor(Math.random() * 4);
    return terms[randomIndex];
  };

  const handleOnClick = async () => {
    try {
      const randomTerm = getRandomTerm();
      const responseData = await sendRequest({
        query: randomTerm,
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

  const handleOnSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
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
        <TextField
          id="search"
          label="I want to see..."
          size="small"
          value={term}
          onChange={handleOnSearch}
        />
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
