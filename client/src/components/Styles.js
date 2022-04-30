import styled from 'styled-components';

const Card = styled.div`
  background-color: #f4f4f5;
  box-shadow: rgb(218 218 222) 1px 1px 2px, rgb(255 255 255) -1px -1px 2px;
  border-radius: 1rem;
  padding: 2rem;
`;

const VerticalDivider = styled.hr`
  padding: 0px;
  border-width: 0px 1px;
  border-left-style: solid;
  border-left-color: rgb(226, 226, 229);
  border-right-style: solid;
  border-right-color: rgb(255, 255, 255);
  border-top-style: initial;
  border-top-color: initial;
  border-bottom-style: initial;
  border-bottom-color: initial;
  margin: 0 2rem;
`;

const HorizontalDivider = styled.hr`
  padding: 0px;
  border-width: 1px;
  border-top-style: solid;
  border-top-color: rgb(226, 226, 229);
  border-bottom-style: solid;
  border-bottom-color: rgb(255, 255, 255);
  border-left-style: initial;
  border-left-color: initial;
  border-right-style: initial;
  border-right-color: initial;
  margin: 1rem 0;
`;

const Button = styled.div`
  padding: 0.5rem 2rem;
  margin-left: 1rem;
  border-radius: 1.5rem;
  text-align: center;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s ease-in-out;
`;

const PrimaryButton = styled(Button)`
  background-color: #f9c00d;
  color: #14150f;
  font-weight: 500;

  &:hover {
    background-color: #facd3d;
  }
`;

const SecondaryButton = styled(Button)`
  background-color: transparent;
  border: 1px solid #0158b9;
  color: #0158b9;

  &:hover {
    background-color: #e6eef8;
  }
`;

const Title = styled.h4`
  margin: 0;
  font-weight: 500;
`;

export {
  Card,
  VerticalDivider,
  HorizontalDivider,
  PrimaryButton,
  SecondaryButton,
  Title,
};
