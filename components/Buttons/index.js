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
  padding: 5px 36px;
  border-radius: 8px;
`;

GradientButton.defaultProps = {
  color: "",
};

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
  background: ${({ theme, background }) => (background ? theme.color[background] : theme.color.primary1)};
  color: ${({ theme, color }) => `${color ? theme.color[color] : theme.color.white} !important`};
  border-color: ${({ theme, borderColor }) =>
    `${borderColor ? theme.color[borderColor] : theme.color.white} !important`};
  font-weight: 600;
  font-size: 16px;
  padding: 12px 36px;
  border-radius: 4px;
`;

DefaultButton.defaultProps = {
  color: "",
};

export const OutlinedButton = styled(Button)`
  border: ${({ theme, color }) => ` 1px solid ${color ? theme.color[color] : theme.color.default}`};
  border-radius: 8px;
  padding: 10px 36px;
  color: ${({ theme, color }) => (color ? theme.color[color] : theme.color.default)};
  font-size: 14px;

  &:hover {
    color ${({ theme, color }) => (color ? theme.color[color] : theme.color.default)};
  }
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

export const LinkButton = styled(Button)`
  background: ${({ theme }) => theme.color.grayLight};
  color: ${({ theme }) => `${theme.color.link1} !important`};
  font-weight: 600;
  font-size: 14px;
  padding: 0px;
`;
