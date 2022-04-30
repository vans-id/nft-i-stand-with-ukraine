import React from 'react';
import styled from 'styled-components';
import ic_eth from '../assets/ethereum.svg';
import { formatter } from './helper';

const NFT = ({ artwork, price, title }) => {
  return (
    <Container>
      <Image src={artwork} />
      <Detail>
        <ETHPrice>
          <ETHIcon src={ic_eth} />
          <Price>{price}</Price>
        </ETHPrice>
        <USDPrice>{formatter.format(price.slice(0, 4) * 2886.86)}</USDPrice>
      </Detail>
    </Container>
  );
};

export default NFT;

const Price = styled.div`
  width: 100%;
  color: #14150f;
  font-weight: 500;
`;

const USDPrice = styled(Price)`
  color: #999;
  font-weight: 400;
  flex: 0.4;
  text-align: end;
`;

const ETHPrice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0.6;
`;

const ETHIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 0.5rem;
`;

const Detail = styled.div`
  display: flex;
  padding-top: 1.5rem;
`;

const Image = styled.img`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  object-fit: contain;
  border-radius: 0.5rem;
`;

const Container = styled.div`
  width: 100%;
  overflow: hidden;
`;
