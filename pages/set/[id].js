import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Col, Row, Card, Container } from "reactstrap";
import Admin from "../../layouts/Admin.js";
import { getFormattedPrice, getFormattedDate } from "../../utils/formatters";
import { PrimaryButton } from "../../components/Buttons";
import styled from "styled-components";
import TokensTable from "../../components/TokensTable";
import priceData from "../../variables/static-price.json";
import PriceChart from "../../components/PriceChart";
import Typography, { GradientTypography } from "../../components/Typography";
import TokenFunctionPanel from "../../components/TokenFunctionPanel/index.js";
import { client } from "../../apollo/client.js";
import { INDEX_POOLS, INDEX_POOL_D } from "../../apollo/queries.js";

const IndexSymbolText = styled.span`
  font-weight: bold;
  font-size: 14px;
  color: ${({ theme }) => theme.color.gray};
  margin-left: 12px;
`;

const DetailTitle = styled(GradientTypography)`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 15px;
`;

const DetailDescription = styled(Typography)`
  font-size: 14px;
  color:#D5D5D5;
  padding-left: 6px;
`;

const Index = () => {
  const [indexPools, setIndexPools] = useState();
  const [tokens, setTokens] = useState();
  const [pool, setPool] = useState({});
  const [dailySnapshots, setDailySnapshots] = useState([]);
  const [date, setdate] = useState();
  const [latest, setlatest] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const fetchData = async () => {
      const {
        data: { indexPools },
      } = await client.query({
        query: INDEX_POOLS,
      });

      const { query } = router;

      const res = await client.query({
        query: INDEX_POOL_D,
        variables: {
          id: query.id,
        },
      });

      setPool(res?.data?.indexPool);
      // setIndexPools(indexPools);
      setTokens(res?.data?.indexPool.tokens);
      setDailySnapshots(res?.data?.indexPool.dailySnapshots.reverse());

      console.log("snapshots");
      console.log(res?.data?.indexPool.dailySnapshots);
      // console.log("pool");

      setlatest(res?.data?.indexPool.dailySnapshots.length);

      if (res?.data?.indexPool.dailySnapshots.lenght > 0) {
        setdate(
          getFormattedDate(
            res?.data?.indexPool.dailySnapshots[1].date * 1000,
            true
          )
        );
      }

      //  console.log("tokens")
      // console.log(res?.data?.indexPool.tokens)
    };

    fetchData();
  }, [router.isReady]);

  return (
    <Container className="my-4">
      <Row className="mb-2 p-2">
        <Col lg={8} className="align-items-center">
          <Card className="p-4 mb-0 pb-5" style={{backgroundColor:'#212121'}}>
            <Row>
              <Col className="d-flex mb-3">
                <img
                  width={48}
                  height={48}
                  className="mr-3"
                  src="https://indexed.finance/static/media/degen-light-circular.06683fe0.png"
                  alt="Index DEFI"
                />
                <Typography weight="bold" size={28}>
                  {pool.name}
                  <IndexSymbolText>{pool.symbol}</IndexSymbolText>
                </Typography>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col className="col-auto">
                <Typography size={12} color="gray">
                  Market cap
                </Typography>
                <Typography size={14}>
                  {pool && getFormattedPrice(pool.totalValueLockedUSD)}
                </Typography>
              </Col>
              <Col>
                <Typography size={12} color="gray">
                  Inception date
                </Typography>
                <Typography size={14}>{date}</Typography>
              </Col>
            </Row>

            <Row>
              <Col className="d-inline-flex align-items-baseline">
                <Typography size={36}>
                  {pool.dailySnapshots &&
                    getFormattedPrice(
                      pool.dailySnapshots.length > 0 &&
                        pool.dailySnapshots[pool.dailySnapshots.length - 1]
                          .value
                    )}
                </Typography>
                <Typography size={20} color="success" className="ml-3">
                  + 49.53%
                </Typography>
              </Col>
            </Row>

            <Row className="chart mt-4">
              <Col>
                {pool?.dailySnapshots && (
                  <PriceChart snapshots={dailySnapshots} style={{backgroundColor:'#212121'}}/>
                )}
              </Col>
            </Row>
          </Card>
        </Col>

        <Col lg={4}>
          <TokenFunctionPanel indexpool={pool} pooltokens={tokens} />
        </Col>
      </Row>

      <div>
        <Typography size={20} weight={600} className="mb-2">
          Index token specs
        </Typography>
        <Row className="p-2">
          <Col>
            <Card>
              <TokensTable tokens={tokens} totalSupply={pool.totalSupply} />
            </Card>
          </Col>
        </Row>
      </div>
      <div>
        <Row className="p-2" >
          <Col>
            <Card className="p-4" style={{backgroundColor:'#212121'}}>
              <div className="mb-4">
                <DetailTitle>Summary</DetailTitle>
                <DetailDescription>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </DetailDescription>
              </div>
              <div className="mb-4">
                <DetailTitle>Objective</DetailTitle>
                <DetailDescription>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </DetailDescription>
              </div>
              <div>
                <DetailTitle>Methodology</DetailTitle>
                <DetailDescription>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </DetailDescription>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

Index.layout = Admin;

export default Index;
