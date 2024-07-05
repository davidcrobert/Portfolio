import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Sketch from '../components/Sketch';
import Header from '../components/Header';

const IndexContainer = styled.div`
  background-color: #f9f9f9;
  color: black;
  overscroll-behavior: contain;
  height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Times New Roman', Times, serif;
  overflow: hidden;
`;

const Nav = styled.nav`
  margin: 0;
  margin-top: -35px;
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
  row-gap: 25px;
  align-content: center;
  justify-content: space-around;
  text-align: center;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 20px;
  }
`;

const NavLink = styled(Link)`
  color: black;
  text-decoration: none;
  font-size: 20px;
  text-transform: uppercase;
  transition: transform 0.2s linear;
  margin: 15px;

  &:hover {
    cursor: help;
    transform: rotateX(50deg);
  }

  @media screen and (max-width: 768px) {
    font-size: 18px;
    margin: 10px;
  }
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  padding: 0px 15px;
  margin-bottom: -5px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding-bottom: 15px;
  }
`;

const FooterLink = styled(Link)`
  color: black;
  text-decoration: none;
  font-size: 20px;
  text-transform: uppercase;
  transition: transform 0.2s linear;

  &:hover {
    cursor: help;
  }

  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`;

const ContactLink = styled.a`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-transform: lowercase;
  padding-bottom: 20px;
  color: black;
  text-decoration: none;
  font-size: 20px;
  transition: transform 0.2s linear;

  &:hover {
    cursor: help;
    transform: skew(-20deg);
  }

  @media screen and (max-width: 768px) {
    font-size: 18px;
    padding-bottom: 0;
  }
`;

const LeftSkew = styled(FooterLink)`
  &:hover {
    transform: skew(20deg);
  }
`;

function Home() {
  return (
    <IndexContainer>
      <Sketch />
      <Header 
        title="David Robert"
        subtitle1="Creative technologist"
        subtitle2="& Arts Worker"
      />
      
      <Nav>
        <NavLink to="/installation">↳ Installation</NavLink>
        <NavLink to="/virtual-environments">↳ Virtual Environments</NavLink>
        <NavLink to="/web">↳ Web</NavLink>
      </Nav>

      <Footer>
        <LeftSkew to="/about">About Me</LeftSkew>
        <ContactLink 
          href="mailto:david.connor.r@gmail.com"
        >
          david.connor.r[at]gmail.com
        </ContactLink>
      </Footer>
    </IndexContainer>
  );
}

export default Home;