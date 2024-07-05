import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';

const NotFoundContainer = styled.div`
  background-color: #f9f9f9;
  color: black;
  overscroll-behavior: contain;
  /* min-height: 100vh; */
  font-family: 'Times New Roman', Times, serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <Header 
        title="404"
        subtitle1="Lost"
        subtitle2="& Not Yet Found"
        backLink="/"
        backLinkText="Home"
      />
    </NotFoundContainer>
  );
};

export default NotFound;