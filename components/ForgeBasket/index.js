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

const ForgeBasket = ({ data, title }) => {
  const router = useRouter();
  return (
    <Card className="p-4 forge-card" style={{borderRadius:8}}>
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
      <DetailLabel title="Total Stake" desc="45000 LP" />
      <DetailLabel title="APY" desc="18%" />
      <DetailLabel title="Your stake" desc="40.0 LP" />
      <div className="text-align-center mt-3">
        <OutlinedButton color="interactive2" onClick={() => router.push({ pathname: `withdraw` })}>
          Withdraw
        </OutlinedButton>
        <OutlinedButton color="interactive2" onClick={() => router.push({ pathname: `stake` })}>
          Stake
        </OutlinedButton>
      </div>
      <hr />
      <DetailLabel title="SDAO LP deposited" desc="0.0000 LP" />
      <div className="text-align-center mt-3">
        <OutlinedButton color="interactive2" onClick={() => router.push({ pathname: `stake` })}>
          Claim
        </OutlinedButton>
      </div>
      {/* </Card> */}
    </Card>
  );
};

export default ForgeBasket;
