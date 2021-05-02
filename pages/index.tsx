import React, { useState, useEffect } from 'react';
import { useUnsplashApi } from '@/hooks/index';
import { Typography } from '@material-ui/core';

export default function Home() {
  const { isLoading, error, sendRequest, clearError } = useUnsplashApi();
  const [photo, setPhoto] = useState();

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const responseData = await sendRequest({ photoId: 'ESEnXckWlLY' });
        setPhoto(responseData);
        console.log(`responseData`, responseData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPhoto();
  }, [sendRequest]);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <>
      {error && <Typography>{error}</Typography>}
      {photo && <img src={photo.urls?.full} />}
    </>
  );
}
