import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: #f9f9f9;
  border-bottom: black 1px solid;
  width: 100%;
  padding: 7px 10px;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const TitleContainer = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-size: 25px;
  text-transform: uppercase;
  font-weight: 400;
  margin: 0;
  word-wrap: break-word;
`;

const Subtitle = styled.h2`
  font-size: 14px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-transform: uppercase;
  margin: 0;
  ${props => props.second && `margin-left: 30px;`}
  font-weight: 400;
`;

const HeaderButtons = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;
`;

const HeaderButton = styled.button`
  color: black;
  text-decoration: none;
  font-size: 20px;
  text-transform: uppercase;
  transition: transform 0.2s linear;
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;

  &:hover {
    transform: ${props => props.back ? 'skew(20deg)' : 'skew(-20deg)'};
  }
`;

const Header = forwardRef(({ title, subtitle1, subtitle2, year, backLink, backLinkText, showInfoButton, onInfoClick, isInfoOpen }, ref) => {
  return (
    <HeaderContainer ref={ref}>
      <HeaderContent>
        <TitleContainer>
          <Title>
            {title}
            {year && <span> [{year}]</span>}
          </Title>
          <Subtitle>{subtitle1}</Subtitle>
          <Subtitle second>{subtitle2}</Subtitle>
        </TitleContainer>
        <HeaderButtons>
          {showInfoButton && (
            <HeaderButton onClick={onInfoClick}>
              INFO {isInfoOpen ? '-' : '+'}
            </HeaderButton>
          )}
          {backLink && (
            <Link to={backLink}>
              <HeaderButton back>
                {backLinkText || 'back'}
              </HeaderButton>
            </Link>
          )}
        </HeaderButtons>
      </HeaderContent>
    </HeaderContainer>
  );
});

export default Header;