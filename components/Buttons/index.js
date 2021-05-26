import { Button } from "reactstrap";
import styled from "styled-components";

export const PrimaryButton = styled(Button)`
  padding: 5px 24px;
  border-radius: 4px;
  color: #00e6cc;
  border: 1px solid #00e6cc;
  filter: drop-shadow(0px 4px 6px rgba(50, 50, 93, 0.11));
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
`;

PrimaryButton.defaultProps = {
  color: "info",
  outline: true,
};

export const GradientButton = styled(Button)`
  background: #7800ff;
  color: ${({ theme }) => `${theme.color.white} !important`};
  font-weight: 600;
  font-size: 16px;
  padding: 15px 36px;
`;

export const AirdropButton = styled(Button)`
  justify-content: center;
  align-items: center;
  padding: 20px 44px;
  position: static;
  color: #ffff;
  width: 243px;
  height: 56px;
  background: #7800ff;
  border-radius: 4px;
`;

export const DefaultButton = styled(Button)`
  background: ${({ theme, background }) =>
    background ? theme.color[background] : theme.color.primary1};
  color: ${({ theme, color }) =>
    `${color ? theme.color[color] : theme.color.white} !important`};
  font-weight: 600;
  font-size: 16px;
  padding: 12px 36px;
  border-radius: 4px;
`;

DefaultButton.defaultProps = {
  color: "",
};

export const OutlinedButton = styled(Button)`
  border: ${({ theme }) => ` 1px solid ${theme.color.default}`};
  border-radius: 4px;
  padding: 16px 30px;
  color: ${({ theme }) => theme.color.default};
  font-size: 16px;
`;

OutlinedButton.defaultProps = {
  color: "",
  outline: true,
};

export const BlueButton = styled(Button)`
  background: ${({ theme }) => theme.color.secondary1};
  color: ${({ theme }) => `${theme.color.white} !important`};
  font-weight: 600;
  font-size: 16px;
  padding: 10px 36px;
`;

BlueButton.defaultProps = {
  color: "",
};
