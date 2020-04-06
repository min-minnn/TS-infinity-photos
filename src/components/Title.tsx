import React from 'react';
import styled from 'styled-components';

const TItle = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: 2rem;
  font-weight: bold;
  padding: 1rem;
  margin-bottom: 1rem;
  border-bottom: 0.25rem solid black;
`;

function Title() {
  return (
    <>
      <TItle>Infinity Photos</TItle>
    </>
  )
}

export default Title;