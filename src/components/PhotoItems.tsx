import React from 'react';
import styled from 'styled-components';
import { Photo } from './Photos';

interface PhotoItemProps {
  photos : Photo
}

const PhotoItem = styled.img`
  margin-right: 1rem;
  margin-bottom: 1rem;
`;

const PhotoItems: React.FC<PhotoItemProps> = ({ photos }) => {
  return (
    <>
      <PhotoItem src={photos.urls.small} />
    </>
  )
}

export default PhotoItems;