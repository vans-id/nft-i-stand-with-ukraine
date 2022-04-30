import React from 'react';
import styled from 'styled-components';
import { ethers } from 'moralis/node_modules/ethers';
import { Card, HorizontalDivider } from './Styles';
import { formatter } from './helper';

const Donations = ({ events }) => {
  return (
    <Container>
      <Headers>
        <Header flex={0.1}></Header>
        <Header flex={0.2}>DONATOR LIST</Header>
        <SubHeader flex={0.3}>Amount</SubHeader>
        <SubHeader flex={0.4}>Time</SubHeader>
      </Headers>

      <HorizontalDivider />

      <DonationsContainer>
        {events.length > 0 ? (
          events.map((event, index) => (
            <span key={index}>
              <Donation>
                <ProfileImageContainer>
                  <ProfileImage
                    src={`https://avatars.dicebear.com/api/pixel-art-neutral/${event.blockNumber}.svg`}
                  />
                </ProfileImageContainer>
                <From>
                  {event.args[0].slice(0, 6) +
                    '...' +
                    event.args[0].slice(38, 42)}
                </From>
                <Amount>
                  <span>
                    {ethers.utils.formatEther(event.args[2].toString()) +
                      ' ETH'}
                  </span>
                  <AmountInUSD>
                    {formatter.format(
                      ethers.utils.formatEther(event.args[2].toString()) *
                        2886.23
                    ) + ' USD'}
                  </AmountInUSD>
                </Amount>
                <Timestamp>
                  {new Date(event.args[1] * 1000).toLocaleString()}
                </Timestamp>
              </Donation>
              <HorizontalDivider />
            </span>
          ))
        ) : (
          <>
            <Donation>
              <span>Gathering donation history...</span>
            </Donation>
            <HorizontalDivider />
          </>
        )}
      </DonationsContainer>
    </Container>
  );
};

export default Donations;

const AmountInUSD = styled.span`
  color: #999;
  font-size: 0.9rem;
`;

const Timestamp = styled.div`
  flex: 0.4;
  display: flex;
  justify-content: flex-end;
`;

const Amount = styled.div`
  flex: 0.3;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  font-size: 1.2rem;
`;

const From = styled.div`
  flex: 0.2;
`;

const ProfileImage = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
`;

const ProfileImageContainer = styled.div`
  flex: 0.1;
  display: flex;
  justify-content: center;
`;

const Donation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
`;

const DonationsContainer = styled.div``;

const Header = styled.div`
  flex: ${(props) => `${props.flex}`};
  font-weight: 500;
  display: flex;
  align-items: center;
`;

const SubHeader = styled(Header)`
  display: flex;
  justify-content: end;
  color: #999;
`;

const Headers = styled.div`
  display: flex;
  width: 100%;
`;

const Container = styled(Card)`
  display: flex;
  flex-direction: column;
  margin-top: 4rem;
  width: 70vw;
  max-width: 1000px;
`;
