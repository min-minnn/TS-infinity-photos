import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import PhotoItems from './PhotoItems';
import { useIntersection } from './hooks/useIntersectionObserver';

export interface Photo {
  id: string,
  urls: {
    small : string
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

const Loading = styled.h3`
  display: flex;
  justify-content: center;
  color: blue;
`;

const Photos: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [error, setError] = useState(null);

  const pageNumber: React.MutableRefObject<number> = useRef<number>(1);
  const ref: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  

  const intersection = useIntersection(ref, {
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  });

  const LoadPhotos = async() => {
    try{
      const response = await axios.get('https://api.unsplash.com/photos', {
        params: {
          client_id: 'ai20XrS30ug4nKcGlAimB68MZ4YMPsNFeEL17YVuSYw',
          page: pageNumber.current
        }})
        if(photos.length === 0) {
          setPhotos(response.data);
        } else {
          setPhotos([...photos, ...response.data]);
        }
        } catch (e) {
      setError(e);
    }
    pageNumber.current++;
  }

  useEffect(() => {
    if (intersection && intersection.isIntersecting) {
      LoadPhotos();
    }
      return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intersection])

  if(error) return <h4>error</h4>

  return(
    <PhotoBlock>
      {photos.map(photo => (
        <PhotoItems key={photo.id} photos={photo} />
      ))}
      <div ref={ref}>
        {intersection? <Loading>loading</Loading> : null}
      </div>
    </PhotoBlock>
  )
}

export default Photos;