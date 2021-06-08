import { Card, Col, Progress, Row } from "reactstrap";
import styled from "styled-components";
import { OutlinedButton } from "../Buttons";
import Typography from "../Typography";
import { useRouter } from "next/router";

const CustomProgress = styled(Progress)`
  .progress-bar {
    background-color: ${({ theme }) => `${theme.color.interactive3} !important`};
  }
  height: 8px !important;
  margin-bottom: 10px !important;
`;

const ForgeBasket = ({ data, title }) => {
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
      <Card className="mt-3">
        <div className="d-flex justify-content-between p-2">
          <Typography color="gray" size={12} weight={400}>
            Total Stake
          </Typography>
          <Typography color="gray" size={12} weight={400}>
            45000 LP
          </Typography>
        </div>
        <div className="d-flex justify-content-between p-2">
          <Typography color="gray" size={12} weight={400}>
            APY
          </Typography>
          <Typography color="gray" size={12} weight={400}>
            18%
          </Typography>
        </div>
        <div className="d-flex justify-content-between p-2">
          <Typography color="gray" size={12} weight={400}>
            Your stake
          </Typography>
          <Typography color="gray" size={12} weight={400}>
            40.0 LP
          </Typography>
        </div>
        <div className="text-align-center mt-3 mb-3">
          <OutlinedButton color="interactive2" onClick={() => router.push({ pathname: `stake` })}>
            Withdraw
          </OutlinedButton>
          <OutlinedButton color="interactive2" onClick={() => router.push({ pathname: `stake` })}>
            Stake
          </OutlinedButton>
        </div>
      </Card>
      <Card className="p-2">
        <DepositTypography />
        <div className="text-align-center mt-3">
          <OutlinedButton color="interactive2" onClick={() => router.push({ pathname: `stake` })}>
            Claim
          </OutlinedButton>
        </div>
      </Card>
    </Card>
  );
};

export default ForgeBasket;
