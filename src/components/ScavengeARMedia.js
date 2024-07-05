import React from 'react';
import styled from 'styled-components';

const GifContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin: 20px 0;
  z-index: 101;
`;

const Gif = styled.img`
  width: calc(33.333% - 7px);
  height: auto;
  z-index: 101;
`;

const ScavengeGifs = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 20px 0;
  z-index: 101;
`;

const ScanvengeDoc = styled.img`
  width: calc(50% - 5px);
  height: auto;
`;

const ScavengeARMedia = () => {
  return (
    <div>
      <GifContainer>
        <Gif src="/assets/MultiUser.gif" alt="Multi-user interaction"/>
        <Gif src="/assets/QuestList.gif" alt="Quest list"/>
        <Gif src="/assets/SignUp.gif" alt="Sign up process"/>
      </GifContainer>
      
      <ScavengeGifs>
        <ScanvengeDoc src="/assets/EV1.gif" alt="Evolution 1"/>
        <ScanvengeDoc src="/assets/EV2.gif" alt="Evolution 2"/>
        <ScanvengeDoc src="/assets/EV3.gif" alt="Evolution 3"/>
        <ScanvengeDoc src="/assets/EV4.gif" alt="Evolution 4"/>
      </ScavengeGifs>
    </div>
  );
};

export default ScavengeARMedia;