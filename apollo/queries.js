import gql from "graphql-tag";

export const proposalAndDistributionQuery = `{
	proposals(first: 25){
		id
		eta
		for
		startBlock
		against
		proposer
		expiry
		state
		title
		description
		signatures
		calldatas
		values
		targets
		votes {
			id
			voter
			option
			weight
		}
	}
	dailyDistributionSnapshots(first: 30) {
		id
		active
		inactive
		delegated
		voters
	}
}`;

export const INDEX_POOLS = gql`
  query indexPools {
    indexPools(first: 2) {
      id
      category {
        id
      }
      size
      name
      symbol
      isPublic
      totalSupply
      totalWeight
      swapFee
      feesTotalUSD
      totalValueLockedUSD
      totalVolumeUSD
      totalSwapVolumeUSD
      tokensList
      tokens {
        id
        token {
          id
          decimals
          name
          symbol
          priceUSD
        }
        ready
        balance
        minimumBalance
        denorm
        desiredDenorm
      }
      dailySnapshots(orderBy: date, orderDirection: desc, first: 90) {
        id
        date
        value
        totalSupply
        feesTotalUSD
        totalValueLockedUSD
        totalSwapVolumeUSD
        totalVolumeUSD
      }
    }
  }
`;

export const INDEX_POOL_D = gql`
  query indexPool($id: Bytes!) {
    indexPool(id: $id) {
      id
      category {
        id
      }
      size
      name
      symbol
      isPublic
      totalSupply
      totalWeight
      swapFee
      feesTotalUSD
      totalValueLockedUSD
      totalVolumeUSD
      totalSwapVolumeUSD
      tokensList
      dailySnapshots(orderBy: date, orderDirection: desc, first: 15) {
        id
        date
        value
        totalSupply
        feesTotalUSD
        totalValueLockedUSD
        totalSwapVolumeUSD
        totalVolumeUSD
      }
      tokens {
        token {
          id
          decimals
          name
          symbol
          priceUSD
        }
        ready
        balance
        minimumBalance
        denorm
        desiredDenorm
      }
    }
  }
`;

export const LIQUID_DEMOCRACY = gql`
  query proposals {
    proposals {
      id
      state
      proposer
      description
      action
      title
      for
      against
      values
    }
  }
`;

export const PROPOSAL = gql`
  query proposal($id: ID!) {
    proposal(id: $id) {
      id
      state
      proposer
      description
      action
      title
      for
      against
      values
      votes {
        id
        voter
        option
        weight
      }
    }
  }
`;
