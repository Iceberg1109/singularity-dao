import { Card, Col, Progress, Row } from "reactstrap";
import styled from "styled-components";
import { OutlinedButton } from "../Buttons";
import Typography from "../Typography";
import { useRouter } from "next/router";
import {DetailLabel} from "../TokenFunctionPanelStake/Label";

const CustomProgress = styled(Progress)`
  .progress-bar {
    background-color: ${({ theme }) => `${theme.color.interactive3} !important`};
  }
  height: 8px !important;
  margin-bottom: 10px !important;
`;

const ForgeBasket = ({ data, title,apy }) => {
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
      <DetailLabel title="APY" desc={apy} />
      <DetailLabel title="Your stake" desc="40.0 SDAO" />
      <div className="text-align-center mt-3">
        <OutlinedButton color="interactive2" onClick={() => router.push({ pathname: `asset_stake/withdraw` })}>
          Withdraw
        </OutlinedButton>
        <OutlinedButton color="interactive2" onClick={() => router.push({ pathname: `asset_stake/deposit` })}>
          Stake
        </OutlinedButton>
      </div>
      <hr />
      <DetailLabel title="SDAO earned" desc="0.0000 SDAO" />
      <div className="text-align-center mt-3">
        <OutlinedButton color="interactive2" onClick={() => router.push({ pathname: `asset_stake/claim` })}>
          Claim
        </OutlinedButton>
      </div>
      {/* </Card> */}
    </Card>
  );
};

export default ForgeBasket;
