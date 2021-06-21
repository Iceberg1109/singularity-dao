import { Card, Col, Progress, Row } from "reactstrap";
import styled from "styled-components";
import { OutlinedButton } from "../Buttons";
import Typography from "../Typography";
import { useRouter } from "next/router";
import { DetailLabel } from "../TokenFunctionPanelStake/Label";
import { ChainId, Token, WETH, Fetcher } from "@uniswap/sdk";
import IUniswapV2ERC20 from "@uniswap/v2-core/build/IUniswapV2ERC20.json";
import { useUser } from "../UserContext";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { ContractAddress } from "../../assets/constants/addresses";
import StakingRewardABI from "../../assets/constants/abi/StakingReward.json";
import web3 from "web3";

const CustomProgress = styled(Progress)`
  .progress-bar {
    background-color: ${({ theme }) => `${theme.color.interactive3} !important`};
  }
  height: 8px !important;
  margin-bottom: 10px !important;
`;

const ForgeBasket = ({ data, title, poolId, liquidity, apy, share, tokens }) => {
  const router = useRouter();
  const { chainId, account, library } = useUser();
  const [balance, setBalance] = useState("...");

  useEffect(() => {
    if (!chainId) return;
    getPairData();
  }, [tokens, chainId]);

  const getPairData = async () => {
    try {
      if (!chainId || !account) return;
      // GET PAIR
      console.log("tokens", tokens[0], chainId);
      const token1 = new Token(chainId, tokens[0], 18);
      const token2 = new Token(chainId, tokens[1], 18);
      const pair = await Fetcher.fetchPairData(token1, token2);
      console.log(title, "pair dataa", pair);
      // GET RESERVES
      const liquidityToken = pair.liquidityToken;
      const reserve0 = pair.reserve0;
      const reserve1 = pair.reserve1;
      console.log("liquidityToken", liquidityToken);
      console.log("reserve0", reserve0.toSignificant(6));
      console.log("reserve1", reserve1.toSignificant(6));
      // BALANCE OF LIQUIDITY TOKEN IN STAKING
      const signer = await library.getSigner(account);
      const lpToken = new ethers.Contract(liquidityToken.address, IUniswapV2ERC20.abi, signer);
      const balance = await lpToken.callStatic.balanceOf(account);
      console.log("converted balance", web3.utils.fromWei(balance.toString(), "gwei"));
      setBalance(balance);
    } catch (error) {
      console.log(title, "pair erorrrr", error);
    }
  };

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
      <div className="mt-2">
        <DetailLabel title="Liquidity" desc={`$ ${liquidity}`} />
        <DetailLabel title="APY(approx.)" desc={`${apy} %`} />
        <DetailLabel title="Your share" desc={`${share} %`} />
        <DetailLabel title="Balance" desc={`${balance} SDAO LP`} />
      </div>

      <div className="text-align-center mt-3">
        <OutlinedButton
          color="interactive2"
          onClick={() => router.push({ pathname: `pools/add/${tokens[0]}/${tokens[1]}` })}
        >
          Add Liquidity
        </OutlinedButton>
      </div>
    </Card>
  );
};

export default ForgeBasket;
