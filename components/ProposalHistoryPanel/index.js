import { Card, CardBody } from "reactstrap";
import Typography from "../Typography";

const ProposalHistoryPanel = () => {
  const StatusBlock = ({ status, date }) => (
    <div className="d-flex align-items-center justify-content-between mt-3">
      <div className="d-flex align-items-center">
        <i className="ni ni-bell-55 mr-3" />
        <div>
          <Typography transform="capitalize">{status}</Typography>
          <Typography>{date}</Typography>
        </div>
      </div>
      <i className="ni ni-bell-55 mr-2" />
    </div>
  );
  return (
    <Card style={{backgroundColor:'#212121'}}>
      <CardBody>
        <Typography>Proposal history</Typography>
        <div className="mt-3">
          <StatusBlock status="created" date="Apr 14, 2021 - 7pm UTC" />
          <StatusBlock status="active" date="Apr 14, 2021 - 7pm UTC" />
        </div>
      </CardBody>
    </Card>
  );
};

export default ProposalHistoryPanel;
