import { useState, useEffect } from 'react';
import Image from 'next/image';

import { useUnsplashApi } from '@/hooks/index';

import {
  Typography,
  Container,
  ImageList,
  ImageListItem,
  Button,
  TextField,
  LinearProgress
} from '@material-ui/core';

export default function Home() {
  const { isLoading, error, sendRequest, clearError } = useUnsplashApi();
  const [photos, setPhotos] = useState([]);
  const [term, setTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [statusText, setStatusText] = useState('Please select an action.');

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

        if (total === 0) {
          setStatusText(
            'Sorry, no photos were found for this search term. Please try again.'
          );
          setPhotos([]);
        } else {
          setPhotos(results);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (debouncedTerm) {
      setPhotos([]);
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
      <Container sx={{ mt: '5rem', textAlign: 'center' }}>
        <Image
          src="/logo.svg"
          alt="What I Decide"
          layout="intrinsic"
          width={150}
          height={83}
        />
        <Typography align="center">
          If you must choose, choose wisely
        </Typography>
      </Container>
      <Container
        sx={{
          height: '20vh',
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

      {isLoading && <LinearProgress color="secondary" />}
      {error && <Typography>{error}</Typography>}

      {photos.length > 0 && (
        <Container sx={{}}>
          <ImageList variant="masonry" cols={4} gap={10}>
            {photos.map(photo => (
              <ImageListItem key={photo.id}>
                <Image
                  src={photo.urls.regular}
                  alt={photo.alt_description}
                  layout="intrinsic"
                  width={photo.width}
                  height={photo.height}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Container>
      )}

      {!isLoading && photos.length === 0 && (
        <Typography color="secondary" align="center">
          {statusText}
        </Typography>
      )}
    </Container>
  );
}
