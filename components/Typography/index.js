import styled from "styled-components";

const Typography = styled.p`
  font-weight: ${({ weight }) => (weight ? weight : "normal")};
  font-size: ${({ size }) => (size ? size + "px" : "initial")};
  color: ${({ theme, color }) =>
    color ? theme.color[color] : theme.color["default"]};
  margin: 0;
  text-transform: ${({ transform }) => (transform ? transform : "initial")};

  & > span {
    font-weight: ${({ spanWeight }) => (spanWeight ? spanWeight : "inherit")};
    font-size: ${({ spanSize }) => (spanSize ? spanSize + "px" : "inherit")};
    color: ${({ theme, spanColor }) =>
      spanColor ? theme.color[spanColor] : "inherit"};
    text-transform: ${({ spanTransform }) =>
      spanTransform ? spanTransform : "inherit"};
  }
`;

export const LeftTypography = styled.p`
  font-weight: ${({ weight }) => (weight ? weight : "normal")};
  font-size: ${({ size }) => (size ? size + "px" : "initial")};
  background-image: ${({ theme, color }) =>
    color ? theme.color[color] : theme.color["gradient1"]};
  margin: 0;
  text-align:left;
  text-transform: ${({ transform }) => (transform ? transform : "initial")};
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
`;

export const GradientTypography = styled.p`
  font-weight: ${({ weight }) => (weight ? weight : "normal")};
  font-size: ${({ size }) => (size ? size + "px" : "initial")};
  background-image: ${({ theme, color }) =>
    color ? theme.color[color] : theme.color["gradient1"]};
  margin: 0;
  text-transform: ${({ transform }) => (transform ? transform : "initial")};
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
`;

export const ProposalStatusTypography = styled(Typography)`
  color: ${({ status, theme }) =>
    status === "active"
      ? theme.color.success
      : status === "passed"
      ? theme.color.pink1
      : theme.color.danger};
  size: 12px;
  font-weight: 400;
  text-transform: capitalize;
`;

export const TruncateTypography = styled(Typography)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default Typography;
