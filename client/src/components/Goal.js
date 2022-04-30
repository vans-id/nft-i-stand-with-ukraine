import React from 'react';
import styled from 'styled-components';
import { formatter } from './helper';
import { Card, Title } from './Styles';

const Goal = ({ totalRaised }) => {
  const getPercentRaised = () => {
    if (totalRaised > 0)
      return (((totalRaised * 2881.28) / 100000) * 100).toFixed(2);
    return 0;
  };

  return (
    <Container>
      <Title>TOTAL VALUE</Title>
      <GoalText>
        {formatter.format(totalRaised * 2881.28)}
        <GoalLimit>/ $100,000</GoalLimit>
      </GoalText>
      <ProgressContainer>
        <Progress progress={getPercentRaised()}></Progress>
      </ProgressContainer>
    </Container>
  );
};

export default Goal;

const Progress = styled.div`
  background-color: #005ab4;
  width: ${(props) => `${props.progress}%`};
  min-width: 2px;
  border-radius: 4px;
  color: #14150f;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ProgressContainer = styled.div`
  height: 0.5rem;
  width: 70vw;
  max-width: 1000px;
  background-color: #e6eff8;
  margin-top: 2rem;
  display: flex;
  border-radius: 4px;
`;

const GoalText = styled.h1`
  margin: 1rem 0 0;
  font-size: 3rem;
`;

const GoalLimit = styled.span`
  font-size: 1rem;
  color: #5b616e;
  font-weight: 400;
`;

const Container = styled(Card)`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
`;
