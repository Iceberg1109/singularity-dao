import { Card, CardBody } from "reactstrap";
import formatAddress from "../../utils/format-address";
import Typography from "../Typography";

const ProposalCreatedByPanel = ({ proposer }) => {
  const Voter = ({ address, amount }) => (
    <div className="d-flex justify-content-between">
      <div className="d-flex align-items-center">
        <i className="ni ni-bell-55 mr-2" />
        <Typography>{formatAddress(address)}</Typography>
      </div>
      {amount && <Typography>{amount}</Typography>}
    </div>
  );

  return (
    <Card style={{backgroundColor:'#212121'}}>
      <CardBody>
        <div>
          <Typography>Created by</Typography>
          <Voter address={proposer} />
        </div>
        <div className="mt-4">
          <Typography>Top voters</Typography>
          <Voter address="0xe4fa3c576c...6926" amount={126083.715} />
          <Voter address="0xe4fa3c576c...6926" amount={126083.715} />
          <Voter address="0xe4fa3c576c...6926" amount={126083.715} />
        </div>
      </CardBody>
    </Card>
  );
};

export default ProposalCreatedByPanel;
