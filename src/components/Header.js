import React, { forwardRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: #f9f9f9;
  border-bottom: black 1px solid;
  width: 100%;
  padding: 7px 10px;
  height: 80px;
  overflow: hidden;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  height: 100%;
  max-width: 100%;
`;

const TitleContainer = styled.div`
  flex: ${props => props.$hasTags ? '0 0 50%' : '0 0 90%'};
  min-width: 0;
  overflow: hidden;
`;

const Title = styled.h1`
  font-size: 25px;
  text-transform: uppercase;
  font-weight: 400;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

const Subtitle = styled.h2`
  font-size: 14px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-transform: uppercase;
  margin: 0;
  margin-left: ${props => props.$second ? '30px' : '0'};
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

const TagsContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: flex-end;
  margin-left: auto;
  margin-right: 20px;
  flex: 0 0 25%;
  overflow: visible;
  min-width: 0;
  max-height: 60px;
  align-content: center;
  
  @media screen and (max-width: 768px) {
    gap: 5px;
    flex: 0 0 20%;
  }
`;

const TagButton = styled.button`
  background: none;
  border: none;
  color: black;
  font-size: 12px;
  text-transform: uppercase;
  cursor: help;
  padding: 2px 5px;
  transition: transform 0.2s linear;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  white-space: nowrap;
  height: 20px;
  
  &:hover {
    transform: skew(-20deg);
  }
  
  ${props => props.$active && `
    border-bottom: 1px solid black;
  `}
  
  @media screen and (max-width: 768px) {
    font-size: 10px;
    padding: 1px 3px;
    height: 16px;
  }
`;

const HeaderButtons = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  flex: 0 0 120px;
  justify-content: flex-end;
  min-width: 0;
  flex-shrink: 0;
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
  white-space: nowrap;

  &:hover {
    transform: ${props => props.$back ? 'skew(20deg)' : 'skew(-20deg)'};
  }
`;

const Header = forwardRef(({ 
  title, 
  subtitle1, 
  subtitle2, 
  year, 
  backLink, 
  backLinkText, 
  showInfoButton, 
  onInfoClick, 
  isInfoOpen,
  tags,
  activeFilter,
  onTagSelect 
}, ref) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <HeaderContainer ref={ref}>
      <HeaderContent>
        <TitleContainer $hasTags={tags && tags.length > 0}>
          <Title>
            {title}
            {year && <span> [{year}]</span>}
          </Title>
          <Subtitle>{subtitle1}</Subtitle>
          <Subtitle $second>{subtitle2}</Subtitle>
        </TitleContainer>
        {tags && onTagSelect && (
          <TagsContainer>
            {tags.map(tag => (
              <TagButton
                key={tag}
                $active={activeFilter === tag}
                onClick={() => onTagSelect(tag)}
              >
                {tag}
              </TagButton>
            ))}
          </TagsContainer>
        )}
        <HeaderButtons>
          {showInfoButton && (
            <HeaderButton onClick={onInfoClick}>
              INFO {isInfoOpen ? '-' : '+'}
            </HeaderButton>
          )}
          {!isHomePage && (
            <Link to={backLink || '/'}>
              <HeaderButton $back>
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