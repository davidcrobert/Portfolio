import React, { forwardRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

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

const LeftSide = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  flex: 1;
  min-width: 0;
`;

const TitleContainer = styled.div`
  min-width: 0;
  overflow: hidden;
  flex-shrink: 0;
`;

const CenterArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  flex: 0 0 auto;
  min-width: 0;
  align-self: stretch;
  height: 100%;
  padding-bottom: 6px; /* nudge toward the bottom edge */
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
  flex: 1;
  min-width: 0;
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
  flex: 0 0 auto;
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

const StatementContainer = styled.div`
  max-width: clamp(500px, 30vw, 500px);
  font-size: 14px;
  line-height: 1.4;
  font-family: 'Times New Roman', Times, serif;
  flex-shrink: 1;

  @media screen and (max-width: 880px) {
    display: none;
  }
`;

const AnimatedTextContainer = styled.div`
  font-size: 14px;
  font-family: 'Times New Roman', Times, serif;
  white-space: nowrap;
  display: grid;
  grid-template-columns: 60px 20px 60px 20px 60px;
  align-items: center;
  position: relative;
  margin-left: auto;
  margin-right: 100px;

  @media screen and (max-width: 1100px) {
    display: none;
  }
`;

const AnimatedWord = styled.span`
  display: inline-block;
  text-align: center;
  position: absolute;
  width: 60px;
  transition: transform 1.2s ease-in-out;
  transform: ${props => props.$position === 0
    ? 'translateX(0)'
    : props.$position === 1
      ? 'translateX(80px)'
      : 'translateX(160px)'};
  left: 0;
`;

const Arrow = styled.span`
  display: inline-block;
  text-align: center;
`;

//place buttons at the bottom of the header

const HeaderButtons = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  flex: 0 0 auto;
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

const AnimatedText = () => {
  const words = ['human', 'tech', 'human'];
  const [positions, setPositions] = useState([0, 1, 2]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPositions(prev => {
        // Create a new random arrangement
        const newPositions = [0, 1, 2];

        // Fisher-Yates shuffle
        for (let i = newPositions.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [newPositions[i], newPositions[j]] = [newPositions[j], newPositions[i]];
        }

        // Make sure it's different from previous
        if (JSON.stringify(newPositions) === JSON.stringify(prev)) {
          // If by chance we got the same arrangement, swap first two
          [newPositions[0], newPositions[1]] = [newPositions[1], newPositions[0]];
        }

        return newPositions;
      });
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Create array of words with their target positions
  const wordElements = words.map((word, originalIndex) => {
    const currentPosition = positions.indexOf(originalIndex);
    return (
      <AnimatedWord key={originalIndex} $position={currentPosition}>
        {word}
      </AnimatedWord>
    );
  });

  return (
    <AnimatedTextContainer>
      {wordElements}
      <Arrow style={{ gridColumn: 2 }}>↔</Arrow>
      <Arrow style={{ gridColumn: 4 }}>↔</Arrow>
    </AnimatedTextContainer>
  );
};

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
  onTagSelect,
  hideBackButton,
  statement,
  showAnimatedText,
  customButtons
}, ref) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <HeaderContainer ref={ref}>
      <HeaderContent>
        <LeftSide>
          <TitleContainer>
            <Title>
              {title}
              {year && <span> [{year}]</span>}
            </Title>
            <Subtitle>{subtitle1}</Subtitle>
            <Subtitle $second>{subtitle2}</Subtitle>
          </TitleContainer>
          {showAnimatedText && <AnimatedText />}
        </LeftSide>
        <CenterArea>
          {Array.isArray(customButtons) && customButtons.map((button, idx) => (
            <HeaderButton
              key={idx}
              onClick={button.onClick}
              title={button.title}
            >
              {button.label}
            </HeaderButton>
          ))}
        </CenterArea>
        <RightSide>
          {statement && <StatementContainer>{statement}</StatementContainer>}
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
            {!isHomePage && !hideBackButton && (
              <Link to={backLink || '/'}>
                <HeaderButton $back>
                  {backLinkText || 'back'}
                </HeaderButton>
              </Link>
            )}
          </HeaderButtons>
        </RightSide>
      </HeaderContent>
    </HeaderContainer>
  );
});

export default Header;
