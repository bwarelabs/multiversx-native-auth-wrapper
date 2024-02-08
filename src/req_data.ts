export const requestData = String.raw`{"query":"query ($contracts: [String!], $proposalId: Int, $type: String) {\n  governanceContracts(contracts: $contracts, type: $type) {\n    ... on GovernanceEnergyContract {\n      address\n      vetoPercentageLimit\n      votingPowerDecimals\n      shard\n      __typename\n      feeToken {\n        decimals\n        assets {\n          website\n          description\n          status\n          pngUrl\n          svgUrl\n          __typename\n        }\n        ticker\n        name\n        __typename\n      }\n      minEnergyForPropose\n      feesCollectorAddress\n      energyFactoryAddress\n      proposals(proposalId: $proposalId) {\n        proposalId\n        description {\n          ... on DescriptionV0 {\n            title\n            strapiId\n            __typename\n          }\n          ... on DescriptionV1 {\n            title\n            shortDescription\n            strapiId\n            __typename\n          }\n          __typename\n        }\n        actions {\n          gasLimit\n          destAddress\n          functionName\n          arguments\n          __typename\n        }\n        proposer\n        feePayment {\n          tokenIdentifier\n          tokenNonce\n          __typename\n        }\n        proposalStartBlock\n        minimumQuorumPercentage\n        votingDelayInBlocks\n        votingPeriodInBlocks\n        withdrawPercentageDefeated\n        totalQuorum\n        status\n        votes {\n          upVotes\n          downVotes\n          downVetoVotes\n          abstainVotes\n          quorum\n          totalVotes\n          upPercentage\n          downPercentage\n          abstainPercentage\n          downVetoPercentage\n          __typename\n        }\n        hasVoted\n        userVoteType\n        userVotingPower\n        __typename\n      }\n    }\n    ... on GovernanceTokenSnapshotContract {\n      address\n      vetoPercentageLimit\n      votingPowerDecimals\n      shard\n      __typename\n      feeToken {\n        decimals\n        assets {\n          website\n          description\n          status\n          pngUrl\n          svgUrl\n          __typename\n        }\n        ticker\n        name\n        __typename\n      }\n      minFeeForPropose\n      proposals(proposalId: $proposalId) {\n        proposalId\n        description {\n          ... on DescriptionV0 {\n            title\n            strapiId\n            __typename\n          }\n          ... on DescriptionV1 {\n            title\n            shortDescription\n            strapiId\n            __typename\n          }\n          __typename\n        }\n        actions {\n          gasLimit\n          destAddress\n          functionName\n          arguments\n          __typename\n        }\n        proposer\n        feePayment {\n          tokenIdentifier\n          tokenNonce\n          __typename\n        }\n        proposalStartBlock\n        minimumQuorumPercentage\n        votingDelayInBlocks\n        votingPeriodInBlocks\n        withdrawPercentageDefeated\n        totalQuorum\n        status\n        votes {\n          upVotes\n          downVotes\n          downVetoVotes\n          abstainVotes\n          quorum\n          totalVotes\n          upPercentage\n          downPercentage\n          abstainPercentage\n          downVetoPercentage\n          __typename\n        }\n        hasVoted\n        userVoteType\n        userVotingPower\n        __typename\n      }\n    }\n    __typename\n  }\n}\n","variables":{}}`;