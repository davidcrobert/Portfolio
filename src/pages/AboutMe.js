import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';

const AboutMeContainer = styled.div`
  background-color: #f9f9f9;
  color: black;
  overscroll-behavior: contain;
  min-height: 100vh;
  font-family: 'Times New Roman', Times, serif;
`;

const ResumeLink = styled.a`
  position: absolute;
  padding: 10px 16px;
  color: black;
  text-decoration: none;
  font-size: 20px;
  text-transform: uppercase;
  transition: transform 0.2s linear;

  &:hover {
    transform: skew(-20deg);
  }
`;

const AboutSection = styled.section`
  width: 100%;
  overflow: hidden;
`;

const AboutParagraph = styled.p`
  padding: 16px;
  font-size: 22px;
  width: 100%;
  margin-top: 4.25vh;

  &.left {
    float: left;
    margin-left: 0;
  }

  &.right {
    float: right;
    text-align: right;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin-right: 0;
  }

  a {
    text-decoration: none;
    color: black;
    font-weight: 600;
    font-style: italic;
    cursor: help;
  }

  @media only screen and (max-width: 800px) {
    width: 75%;
  }
`;

const AboutMe = () => {
  return (
    <AboutMeContainer>
      <Header 
        title="About Me"
        subtitle1="Professionally"
        subtitle2="& Personally"
        backLink="/"
      />

      <div>
        <ResumeLink href="CV-DavidRobert.pdf" target="_blank" rel="noopener noreferrer">résumé</ResumeLink>
      </div>

      <AboutSection>
        <AboutParagraph className="left">I'm a Creative Technologist at <a href="https://antimodular.com/" target="_blank" rel="noopener noreferrer">Antimodular Research</a>, working for the artist Rafael Lozano-Hemmer</AboutParagraph>
        <AboutParagraph className="right">I studied Media Production [concentration in Digital Media] at Toronto Metropolitan University [TMU]</AboutParagraph>
        <AboutParagraph className="left">I use TouchDesigner, Unreal Engine, Unity, physical computing, and the web to create responsive environments</AboutParagraph>
        <AboutParagraph className="right">I'm originally from a small town in southern Ontario [Canada]</AboutParagraph>
        <AboutParagraph className="left">I was a Creative Technologist at TMU's <a href="https://www.ryerson.ca/design-technology-lab/" target="_blank" rel="noopener noreferrer">Design + Technology LAB</a></AboutParagraph>
        <AboutParagraph className="right">I currently live in Montreal [Canada]</AboutParagraph>
        <AboutParagraph className="left">I was a Research Assistant in the <a href="https://www.torontomu.ca/bergmann/research/tripl/" target="_blank" rel="noopener noreferrer">Technology Research in Performance Lab</a> on a project involving improvised human-AI co-performances using the OpenAI API</AboutParagraph>
        <AboutParagraph className="right">I'm interested in food and fashion</AboutParagraph>
        <AboutParagraph className="left">I was previously a Creative Developer Intern at <a href="https://www.jam3.com/" target="_blank" rel="noopener noreferrer">Jam3</a></AboutParagraph>
        <AboutParagraph className="right">I like techno and classical music</AboutParagraph>
        <AboutParagraph className="left">I also used to be a Research Assistant investigating <a href="http://dx.doi.org/10.14236/ewic/EVA2022.39" target="_blank" rel="noopener noreferrer">AR and spatialized sound</a> for user experience in digitally-delivered orchestral music</AboutParagraph>
        <AboutParagraph className="right">I value physical spaces</AboutParagraph>
        <AboutParagraph className="left">My dream work is to extend the lived environment through interactive technology</AboutParagraph>
        <AboutParagraph className="right">I really like projections</AboutParagraph>
      </AboutSection>
    </AboutMeContainer>
  );
};

export default AboutMe;