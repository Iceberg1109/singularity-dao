import { Row, Col, CardHeader, CardBody } from "reactstrap";
import styled from "styled-components";
import Typography from "../../components/Typography";

const Tab = styled(Typography)`
  color: ${({ theme, active }) =>
    active ? theme.color.purple : theme.color.gray2};
  font-weight: ${({ active }) => (active ? 600 : 400)};
  font-size: 14px;
  cursor: pointer;
`;

const Tabs = ({ activeTab, setActiveTab, tabs }) => {
  return (
    <Row>
      {tabs.map((tab, index) => (
        <Col className="col-auto" key={index}>
          <Tab active={activeTab === index} onClick={() => setActiveTab(index)}>
            {tab}
          </Tab>
        </Col>
      ))}
    </Row>
  );
};

export default Tabs;
