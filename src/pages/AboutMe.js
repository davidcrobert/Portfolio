import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import { media, spacing } from '../styles/responsive';

const AboutMeContainer = styled.div`
  background-color: #f9f9f9;
  color: black;
  overscroll-behavior: contain;
  min-height: 100vh;
  font-family: 'Times New Roman', Times, serif;
`;

const AboutSection = styled.section`
  width: 100%;
  padding: 20px ${spacing.pageX} 40px;
  display: grid;
  gap: 12px;
`;

const AboutParagraph = styled.p`
  padding: 16px 0;
  font-size: 22px;
  width: min(100%, 760px);
  margin-top: 0;

  &.left {
    justify-self: start;
  }

  &.right {
    justify-self: end;
    text-align: right;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  a {
    text-decoration: none;
    color: black;
    font-weight: 600;
    font-style: italic;
    cursor: help;
  }

  ${media.downTablet} {
    width: 100%;
    font-size: 18px;
    padding: 10px 0;

    &.left,
    &.right {
      justify-self: stretch;
      text-align: left;
    }
  }

  ${media.downPhone} {
    font-size: 16px;
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

      <AboutSection>
        <AboutParagraph className="left">I'm a Creative Technologist at <a href="https://antimodular.com/" target="_blank" rel="noopener noreferrer">Atelier Lozano-Hemmer</a>, working for the artist Rafael Lozano-Hemmer</AboutParagraph>
        <AboutParagraph className="right">I also make my own art</AboutParagraph>
        <AboutParagraph className='left'>I was previously a Media Artist in Residence at <a href="https://www.fabrica.it/en/" target="_blank" rel="noopener noreferrer">Fabrica</a> </AboutParagraph>
        <AboutParagraph className="right">I studied Media Production [concentration in Digital Media] at Toronto Metropolitan University [TMU]</AboutParagraph>
        <AboutParagraph className="left">I use AI & Python & the web & physical computing & Unreal & Unity & whatever else to create experiences</AboutParagraph>
        <AboutParagraph className="right">I'm originally from a small town in southern Ontario [Canada]</AboutParagraph>
        <AboutParagraph className="left">I was a Creative Technologist at TMU's <a href="https://www.ryerson.ca/design-technology-lab/" target="_blank" rel="noopener noreferrer">Design + Technology LAB</a></AboutParagraph>
        <AboutParagraph className="right">I currently live in Montreal [Canada]</AboutParagraph>
        <AboutParagraph className="left">I was a Research Assistant in the <a href="https://www.torontomu.ca/bergmann/research/tripl/" target="_blank" rel="noopener noreferrer">Technology Research in Performance Lab</a> on a project involving improvised human-AI co-performances using the OpenAI API</AboutParagraph>
        <AboutParagraph className="right">I'm passionate about architecture & performance & film & fashion (& technology)</AboutParagraph>
        <AboutParagraph className="left">I was previously a Creative Developer Intern at <a href="https://www.jam3.com/" target="_blank" rel="noopener noreferrer">Jam3</a></AboutParagraph>
        <AboutParagraph className="right">I like techno and classical music</AboutParagraph>
        <AboutParagraph className="left">I was also a Research Assistant investigating <a href="http://dx.doi.org/10.14236/ewic/EVA2022.39" target="_blank" rel="noopener noreferrer">AR and spatialized sound</a> for user experience in digitally-delivered orchestral music</AboutParagraph>
        <AboutParagraph className="right">I value physical spaces</AboutParagraph>
        <AboutParagraph className="left">My dream work is to extend the lived environment through interactive technology</AboutParagraph>
        <AboutParagraph className="right">Honestly tech just really excites me</AboutParagraph>
      </AboutSection>
    </AboutMeContainer>
  );
};

export default AboutMe;
