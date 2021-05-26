import { Table } from "reactstrap";
import { PropTypes } from "prop-types";
import { getFormattedPrice } from "../../utils/formatters";
import { PrimaryButton } from "../Buttons";
import PriceRatio from "../PriceRatio";
import web3 from "web3";

const TokensTable = ({ tokens,totalSupply }) => {
    

  console.log(totalSupply)

  const allocation = (balance)=>{

    let allocation = balance;
    return allocation *4;
  }


  return (
    <Table
      className="align-items-center table-flush sets-table"
      responsive
      hover
    >
      <thead className="thead-light" style={{backgroundColor:'#212121'}}>
        <tr>
          <th scope="col" style={{backgroundColor:'#212121'}}>Token name</th>
          <th scope="col" style={{backgroundColor:'#212121'}}>Quantity per set</th>
          <th scope="col" style={{backgroundColor:'#212121'}}>Token price</th>
          <th scope="col" style={{backgroundColor:'#212121'}}>Denorm</th>
          <th scope="col" style={{backgroundColor:'#212121'}}>Change %</th>
          <th scope="col" style={{backgroundColor:'#212121'}}>Token price per set</th>
        </tr>
      </thead>
      <tbody>
        {tokens.map((token) => (
          <tr key={token.token.id} style={{backgroundColor:'#212121'}}>
            <th scope="row">
              <h3>{token.name}</h3>
              <p className="mb-0">{token.token.symbol}</p>
            </th>
            <td>{parseFloat(web3.utils.fromWei(token.balance,"ether")).toFixed(4)}</td>
            <td>
            <td>${parseFloat(token.token?.priceUSD).toFixed(4)}</td>
            </td>
            <td>
              {allocation(web3.utils.fromWei(token.denorm)).toFixed(2)}%
            </td>
             <td>
              </td>
            <td>
             ${parseFloat(token.token?.priceUSD).toFixed(4)}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

TokensTable.defaultProps = {
  tokens: [],
};

TokensTable.propTypes = {
  tokens: PropTypes.arrayOf(PropTypes.object),
};

export default TokensTable;
