import { Card, CardBody, CardFooter, Col, Row } from "reactstrap";
import { PropTypes } from "prop-types";
import { PrimaryButton } from "../Buttons";

function FeaturedSet({ indexPool }) {
    return (
        <Card className="p-4" style={{backgroundColor:'#212121'}}>
            <CardBody className="p-0">
                <Row className="mb-3">
                    <Col className="col-auto">
                        <img className="featured-set-img" alt="..." src="https://singularitydao.ai/wp-content/uploads/2020/11/graphAsset-11.png" />
                    </Col>
                    <Col>
                        <h3>{indexPool.name}</h3>
                        <p className="m-0 text-sm">
                            <span className="text-success mr-2">$0.12</span>
                            <span className="text-nowrap">+3.32%</span>
                        </p>
                    </Col>
                </Row>
                <p>SingularityDAO brings DeFi and decentralized AI together in a new framework aimed at radically increasing the liquidity available to crypto assets of all types and sizes — and leveraging this liquidity to create financial value and facilitate growth for utility-token-based technology projects.</p>
            </CardBody>
            <CardFooter className="d-flex justify-content-end pr-0 pb-0" style={{backgroundColor:'#212121'}}>
                <PrimaryButton>Explore</PrimaryButton>
            </CardFooter>
        </Card>
    )
}

FeaturedSet.defaultProps = {
    indexPool: {}
};
  
FeaturedSet.propTypes = {
    indexPool: PropTypes.object
};

export default FeaturedSet;