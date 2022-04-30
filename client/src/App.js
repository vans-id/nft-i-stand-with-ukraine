import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ethers } from 'moralis/node_modules/ethers';

import './App.css';

import { useMoralis } from 'react-moralis';
import artwork0 from './assets/artwork0.png';
import artwork1 from './assets/artwork1.png';
import artwork2 from './assets/artwork2.png';
import abi from './contract/Contract.json';

import Minting from './components/Minting';
import NFT from './components/NFT';
import Goal from './components/Goal';
import Donations from './components/Donations';
import { Card, VerticalDivider } from './components/Styles';

const CONTRACT_ADDRESS = '0xaFF773f6c748cCD596A28fC16418760fc416a0EC';

function App() {
  const { isAuthenticated, enableWeb3 } = useMoralis();
  const [totalRaised, setTotalRaised] = useState(0);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getContract = async () => {
      const web3provider = await enableWeb3();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, web3provider);

      const totalRaised = await contract.totalRaised();
      const totalEth = ethers.utils.formatEther(totalRaised.toString());

      setTotalRaised(totalEth);

      let eventFilter = contract.filters.Donate();
      let events = await contract.queryFilter(eventFilter);

      setEvents(events);
    };

    getContract();
  }, [isAuthenticated]);

  return (
    <Container>
      <Cover>
        <Header>#IStandWithUkraine</Header>
        <Subheading>Donate to Claim Your FREE NFT</Subheading>
      </Cover>
      <Main>
        <NFTContainer>
          <NFT artwork={artwork0} price='0.01-0.50' title='#000' />
          {/* <Icon src={ic_right} /> */}
          <VerticalDivider />
          <NFT artwork={artwork1} price='0.50-1.00' title='#001' />
          {/* <Icon src={ic_right} /> */}
          <VerticalDivider />
          <NFT artwork={artwork2} price='1.00+' title='#002' />
        </NFTContainer>

        <Minting />
        <Goal totalRaised={totalRaised} />
        <Donations events={events} />
      </Main>

      <Footer>Copyright 2022 - David Jonathan Evan</Footer>
    </Container>
  );
}

export default App;

const NFTContainer = styled(Card)`
  display: flex;
  margin-top: 4rem;
  gap: 2px;
  width: 70vw;
  max-width: 1000px;
`;

const Subheading = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
`;

const Header = styled.div`
  font-size: 4rem;
  font-weight: bold;
  margin: 1rem 0;
`;

const Cover = styled.div`
  width: 100%;
  height: 50vh;
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4)),
    url('https://www.thecoinrepublic.com/wp-content/uploads/2022/03/CryptoPunk-NFT-Is-Latest-Donation-to-Ukraine.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  overflow: hidden;
`;

const Main = styled.div`
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  align-items: center;
`;

// background: #f5d204;
const Container = styled.div`
  margin: 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #efefef;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  height: 40vh;
`;
