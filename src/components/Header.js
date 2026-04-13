import React, { forwardRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { media, spacing } from '../styles/responsive';

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: #f9f9f9;
  border-bottom: black 1px solid;
  width: 100%;
  padding: 10px ${spacing.pageX};
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px 24px;
  max-width: 100%;
  flex-wrap: wrap;

  ${media.downLaptop} {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: start;
  }

  ${media.downTablet} {
    grid-template-columns: 1fr;
  }
`;

const LeftSide = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 24px;
  flex: 1 1 320px;
  min-width: 0;

  ${media.downLaptop} {
    gap: 16px;
    align-items: flex-start;
  }

  ${media.downTablet} {
    flex-direction: column;
    gap: 10px;
  }
`;

const TitleContainer = styled.div`
  min-width: 0;
  flex: 0 1 auto;
`;

const CenterArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 0 0 auto;
  min-width: 0;
  align-self: flex-start;

  ${media.downLaptop} {
    justify-content: flex-start;
  }

  ${media.downTablet} {
    order: 3;
  }
`;

const RightSide = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  gap: 12px 20px;
  flex: 1 1 320px;
  min-width: 0;
  flex-wrap: wrap;

  ${media.downLaptop} {
    justify-content: flex-start;
  }

  ${media.downTablet} {
    order: 2;
  }
`;

const Title = styled.h1`
  font-size: clamp(22px, 3vw, 28px);
  text-transform: uppercase;
  font-weight: 400;
  margin: 0;
  line-height: 1.05;
`;

const Subtitle = styled.h2`
  font-size: 14px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-transform: uppercase;
  margin: 0;
  margin-left: ${props => props.$second ? '30px' : '0'};
  font-weight: 400;
  line-height: 1.3;

  ${media.downPhone} {
    font-size: 12px;
    margin-left: ${props => props.$second ? '16px' : '0'};
  }
`;

const TagsContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-start;
  flex: 1 1 240px;
  min-width: 0;

  ${media.downTablet} {
    width: 100%;
  }
`;

const TagButton = styled.button`
  background: none;
  border: 1px solid transparent;
  color: black;
  font-size: 12px;
  text-transform: uppercase;
  cursor: help;
  padding: 6px 10px;
  transition: transform 0.2s linear;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  min-height: 34px;
  
  &:hover {
    transform: skew(-20deg);
  }
  
  ${props => props.$active && `
    border-bottom: 1px solid black;
    border-color: black;
  `}
  
  ${media.downPhone} {
    font-size: 10px;
    padding: 5px 8px;
    min-height: 30px;
  }

  ${media.touch} {
    cursor: pointer;
  }
`;

const StatementContainer = styled.div`
  max-width: min(520px, 100%);
  font-size: 14px;
  line-height: 1.4;
  font-family: 'Times New Roman', Times, serif;
  flex: 1 1 320px;

  ${media.downTablet} {
    width: 100%;
    font-size: 13px;
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

  ${media.downDesktop} {
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
  gap: 12px;
  align-items: center;
  flex: 0 0 auto;
  justify-content: flex-start;
  min-width: 0;
  flex-shrink: 0;
`;

const HeaderButton = styled.button`
  color: black;
  text-decoration: none;
  font-size: 18px;
  text-transform: uppercase;
  transition: transform 0.2s linear;
  background: none;
  border: none;
  padding: 6px 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  white-space: nowrap;

  &:hover {
    transform: ${props => props.$back ? 'skew(20deg)' : 'skew(-20deg)'};
  }

  ${media.downPhone} {
    font-size: 16px;
  }

  ${media.touch} {
    cursor: pointer;
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
              onClick={(e) => {
                e.stopPropagation();
                button.onClick();
              }}
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
