import React, { useCallback } from "react";
import { Card } from "theme-ui";
import Typography from "components/Typography";
import { useUser } from "../UserContext";
import styled from "styled-components";

const StyledCard = styled(Card)`
  background: ${({ theme }) => theme.color.light};
  padding: 1rem;
`;

function Txn({ hash, href }) {
  return (
    <Typography>
      <a href={href} target="_blank" rel="noreferrer noopener">
        {hash}
        <span className="ml-2">
          <i className="fas fa-external-link-alt"></i>
        </span>
      </a>
    </Typography>
  );
}

export default function PendingTxn({ txn }) {
  const { chainId, network } = useUser();
  if (!txn) return null;

  const txnHref = useCallback(
    (txnHash) => {
      if (!chainId) return "#";
      return `https://${chainId === 1 ? "" : network.toLowerCase() + "."}etherscan.io/tx/${txnHash}`;
    },
    [chainId, txn]
  );

  const txnItem = useCallback(() => {
    if (typeof txn === "string") {
      return <Txn hash={txn} href={txnHref(txn)} />;
    }
    if (Array.isArray(txn)) {
      return txn.map((el) => <Txn key={el} hash={el} url={txnHref(el)} />);
    }
  }, [txn]);

  return (
    <StyledCard className="rounded mt-4">
      <Typography>Pending Transaction{Array.isArray(txn) ? "s" : ""}</Typography>
      <Typography>{txnItem()}</Typography>
    </StyledCard>
  );
}
