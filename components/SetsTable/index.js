import { useRouter } from "next/router";
import { Table } from "reactstrap";
import { PropTypes } from "prop-types";
import { getFormattedPrice } from "../../utils/formatters";
import { PrimaryButton } from "../Buttons";
import PriceRatio from "../PriceRatio";

const SetsTable = ({ pools }) => {
  const router = useRouter();

  return (
    <Table
      className="align-items-center table-flush sets-table"
      responsive
      style={{backgroundColor:'#212121'}}
    >
      <thead className="thead-light" >
        <tr>
          <th scope="col" style={{backgroundColor:'#212121'}}>Name</th>
          <th scope="col" style={{backgroundColor:'#212121'}}>Price</th>
          <th scope="col" style={{backgroundColor:'#212121'}}>Market Cap</th>
          <th scope="col" style={{backgroundColor:'#212121'}}>24h</th>
          <th scope="col" style={{backgroundColor:'#212121'}}>1 week</th>
          <th scope="col" style={{backgroundColor:'#212121'}}>1 month</th>
          <th scope="col" style={{backgroundColor:'#212121'}}>3 months</th>
          <th scope="col" style={{backgroundColor:'#212121'}}></th>
        </tr>
      </thead>
      <tbody>
        {pools.map((pool) => (
          <tr
            key={pool.category.id}
            onClick={() =>
              router.push({ pathname: `set/[id]`, query: { id: pool.id } })
            }
          >
            <th scope="row">
              <h3>{pool.name}</h3>
              <p className="mb-0">{pool.symbol}</p>
            </th>
            <td>{getFormattedPrice(pool.totalValueLockedUSD)}</td>
            <td>
              {pool.dailySnapshots[0] && <PriceRatio data={pool} period={24} />}
            </td>
            <td>
              {pool.dailySnapshots[0] && <PriceRatio data={pool} period={24} />}
            </td>
            <td>
             {pool.dailySnapshots[0] &&  <PriceRatio data={pool} period={24} />}
            </td>
            <td>
              {pool.dailySnapshots[0] && <PriceRatio data={pool} period={24} />}
            </td>
            <td>
             
            </td>
             <td>
              <PrimaryButton>Stake</PrimaryButton>
              <PrimaryButton>Buy</PrimaryButton>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

SetsTable.defaultProps = {
  pools: [{}],
};

SetsTable.propTypes = {
  pools: PropTypes.arrayOf(PropTypes.object),
};

export default SetsTable;
