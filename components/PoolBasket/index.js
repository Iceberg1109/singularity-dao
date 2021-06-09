import { Card, Col, Progress, Row } from "reactstrap";
import styled from "styled-components";
import { OutlinedButton } from "../Buttons";
import Typography from "../Typography";
import { useRouter } from "next/router";
import DetailLabel from "../TokenFunctionPanelStake/DetailLabel";

const CustomProgress = styled(Progress)`
  .progress-bar {
    background-color: ${({ theme }) => `${theme.color.interactive3} !important`};
  }
  height: 8px !important;
  margin-bottom: 10px !important;
`;

const ForgeBasket = ({ data, title, poolId, liquidity, apy, share, balance }) => {
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
          <img src="https://www.singularitydao.ai/file/2021/04/singularitydao-image.png" width={40} height={40} />
        </Col>
        <Col>
          <Typography color="text1" size={24} weight={600}>
            {title}
          </Typography>
        </Col>
      </Row>
      <div className="mt-2">
        <DetailLabel title="Liquidity" desc={`$ ${liquidity}`} />
        <DetailLabel title="APY(approx.)" desc={`${apy} %`} />
        <DetailLabel title="Your share" desc={`${share} %`} />
        <DetailLabel title="Balance" desc={`${balance} SDAO LP`} />
      </div>

      <div className="text-align-center mt-3">
        <OutlinedButton color="interactive2" onClick={() => router.push({ pathname: `add_liquidity` })}>
          Add Liquidity
        </OutlinedButton>
      </div>
    </Card>
  );
};

export default ForgeBasket;
