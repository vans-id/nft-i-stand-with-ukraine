import React, { useState } from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';
import { useMoralis } from 'react-moralis';
import ic_eth from '../assets/ethereum.svg';
import { ethers } from 'ethers';
import abi from '../contract/Contract.json';
import { Card, PrimaryButton, SecondaryButton, Title } from './Styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { formatter } from './helper';

const CONTRACT_ADDRESS = '0xaFF773f6c748cCD596A28fC16418760fc416a0EC';

const Minting = () => {
  const { authenticate, isAuthenticated, user, Moralis, logout } = useMoralis();
  const [donationVal, setDonationVal] = useState(0.01);
  const [inProgress, setInProgress] = useState(false);
  const [hash, setHash] = useState('');
  const [usdPrice, setUsdPrice] = useState(28.87);

  const checkEtherscan = () => {
    let url = 'https://rinkeby.etherscan.io/tx/' + hash;
    window.open(url, '_blank');
  };

  const donate = async () => {
    try {
      setInProgress(true);

      const sendOptions = {
        contractAddress: CONTRACT_ADDRESS,
        functionName: 'mint',
        abi: abi,
        msgValue: ethers.utils.parseEther(donationVal.toString()).toString(),
      };
      const transaction = await Moralis.executeFunction(sendOptions);
      setHash(transaction.hash);

      await transaction.wait(1).then((receipt) => {
        setInProgress(false);
        toast.success('Your donation has been sent', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
      });
    } catch (error) {
      toast.error(error.message['message'], {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      setInProgress(false);
    }
  };

  return (
    <Container>
      <ToastContainer />
      <IsAuth>
        <Header>
          <Title>DONATE</Title>
          {isAuthenticated && (
            <Wallet>
              {user.get('ethAddress').slice(0, 6) +
                '...' +
                user.get('ethAddress').slice(38, 42)}
            </Wallet>
          )}
        </Header>
        <InputContainer>
          <Icon src={ic_eth} />
          <Input
            placeholder='0.01'
            type='number'
            min='0'
            value={donationVal}
            onChange={(e) => {
              setDonationVal(e.target.value);
              setUsdPrice(formatter.format(e.target.value * 2886.86));
            }}
            step='0.001'
          />
        </InputContainer>

        <ETHtoUSD>*Approximately {usdPrice}</ETHtoUSD>

        {isAuthenticated ? (
          inProgress ? (
            <Actions>
              <ReactLoading
                type='bubbles'
                color='#14150f'
                width={42}
                height={42}
              />
              <SecondaryButton onClick={checkEtherscan}>
                Etherscan
              </SecondaryButton>
            </Actions>
          ) : (
            <Actions>
              <PrimaryButton onClick={donate}>Donate</PrimaryButton>
              <SecondaryButton onClick={logout}>Logout</SecondaryButton>
            </Actions>
          )
        ) : (
          <Actions>
            <PrimaryButton onClick={authenticate}>Connect Wallet</PrimaryButton>
            <SecondaryButton>Learn More</SecondaryButton>
          </Actions>
        )}
      </IsAuth>
    </Container>
  );
};

export default Minting;

const Header = styled.div`
  display: flex;
  margin: 0 0 1rem;
  justify-content: space-between;
  align-items: center;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Wallet = styled.div`
  border: 1px solid #dedfe2;
  border-radius: 2rem;
  padding: 0.5rem 1.5rem;
  color: #999;
`;

const Icon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  text-align: center;
  margin-right: 1rem;
`;

const ETHtoUSD = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  color: #999;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  padding: 1rem;
  outline: none;
  border: 1px solid #dedfe2;
  color: #5b616e;
  border-radius: 4px;
  font-size: 1.5rem;
  background-color: transparent;
  width: 30%;
`;

const IsAuth = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled(Card)`
  margin-top: 4rem;
  width: 70vw;
  max-width: 1000px;
`;
