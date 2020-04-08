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

const Photos: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  const fetchMorePhotos = () => {
    setTimeout(() => {
      setLoading(true);
      try {
        axios.get('https://api.unsplash.com/photos/random', {
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
    }, 2000)
  };

  useEffect(() => {
    fetchMorePhotos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photos])

  if(loading) return <h4>loading...</h4>;
  if(error) return <h4>error</h4>

  return(
    <PhotoBlock>
      {photos.map(photo => (
        <PhotoItems key={photo.id} photos={photo} />
      ))}
    </PhotoBlock>
  )
}

export default Photos;