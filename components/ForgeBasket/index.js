import { Card, Col, Progress, Row } from "reactstrap";
import styled from "styled-components";
import { OutlinedButton } from "../Buttons";
import Typography from "../Typography";
import { useRouter } from "next/router";

const CustomProgress = styled(Progress)`
  .progress-bar {
    background-color: ${({ theme }) =>
      `${theme.color.interactive3} !important`};
  }
  height: 8px !important;
  margin-bottom: 10px !important;
`;

const ForgeBasket = ({ data }) => {
    const router = useRouter();

  const DepositTypography = () => (
    <div className="d-flex justify-content-between">
      <Typography color="text2" size={14} weight={400}>
        SDAO LP deposited
      </Typography>
      <Typography color="text1" size={14} weight={600}>
        0.0000 LP
      </Typography>
    </div>
  );

  return (
    <Card className="p-4 forge-card">
      <Row>
        <Col className="col-auto">
          <img
            src="https://singularitydao.ai/wp-content/uploads/2020/11/graphAsset-11.png"
            width={40}
            height={40}
          />
        </Col>
        <Col>
          <Typography color="text1" size={24} weight={600}>
            Index DEFI
          </Typography>
        </Col>
      </Row>
      <div className="mt-2">
        <div className="d-flex justify-content-between">
          <Typography color="gray" size={12} weight={400}>
            Label
          </Typography>
          <Typography color="gray" size={12} weight={400}>
            18%
          </Typography>
        </div>
      </div>
      <DepositTypography />
      <DepositTypography />
      <div className="text-align-center mt-3">
        <OutlinedButton color="interactive2" onClick={() =>
              router.push({ pathname: `swap`})
            }>Swap/ Add Liquidity/ Stake</OutlinedButton>
      </div>
    </Card>
  );
};

export default ForgeBasket;
