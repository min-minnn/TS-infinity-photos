import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import PhotoItems from './PhotoItems';

export interface Photo {
  id: string,
  urls: {
    small : any
  }
};

const PhotoBlock = styled.div`
  height: 100%;
  overflow: auto;
  img{
    &:hover {
      filter: brightness(50%);
    }
  }
`;

const Loading = styled.h4`
  padding: 1rem;
`;

const Error = styled.h4`
  padding: 1rem;
`;

const Photos: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  const fetchMorePhotos = async() => {
    try {
      setLoading(true);
      await axios.get('https://api.unsplash.com/photos/random', {
        params: {
          client_id: 'XjG_79dJXuU7Zx5TRHZBBmSTuqTdcAs_LtyesusCJNU',
          count: 30
        }
      })
      .then((response) => {
        setPhotos(photos.concat(response.data));
      }); 
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMorePhotos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return(
    <PhotoBlock>
      {photos.map(photo => (
        <PhotoItems key={photo.id} photos={photo} />
      ))}
      {loading && <Loading>Loading...</Loading>}
      {error && <Error>error</Error>}
    </PhotoBlock>
  )
}

export default Photos;