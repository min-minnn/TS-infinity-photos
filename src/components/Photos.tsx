import React, { useState, useEffect, useRef, RefObject } from 'react';
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

interface paramsProps {
  client_id: string,
  page: number,
  per_page: number
}

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
  const pageNumber: React.MutableRefObject<number> = useRef<number>(0);
  const ref: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const intersection = useIntersection(ref, {
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  });

  const LoadPhotos = async() => {
    const response = await axios.get('https://api.unsplash.com/photos', {
      params: {
        client_id: '8ef4aJi0nfuZjm6Ulw5AxeIL0HKNJRFQNAzpL8jQ0dQ',
        page: pageNumber.current,
        per_page: 10
      }})
    return response;
  }

  useEffect(() => {
    if (intersection && intersection.isIntersecting) {
      setTimeout(async() => {
        const response = await LoadPhotos();
        setPhotos([...photos, ...response.data]);
      }, )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intersection])

  return(
    <PhotoBlock>
      {photos.map(photo => (
        <PhotoItems key={photo.id} photos={photo} />
      ))}
      <div ref={ref}>
        {intersection ? <Loading>loading</Loading> : null}
      </div>
    </PhotoBlock>
  )
}

export default Photos;