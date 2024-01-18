import { ethers } from "ethers";

import SafeApiKit from "@safe-global/api-kit";
import { EthersAdapter } from "@safe-global/protocol-kit";
import { MetaTransactionData } from "@safe-global/safe-core-sdk-types";
import Safe from "@safe-global/protocol-kit";

import dotenv from "dotenv";
dotenv.config();

const RPC_URL = process.env.RPC_ENDPOINT_URL;
const provider = new ethers.JsonRpcProvider(RPC_URL);
const owner1Signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

const ethAdapter = new EthersAdapter({
  ethers,
  signerOrProvider: owner1Signer,
});

const safeService = new SafeApiKit({
  chainId: 11155111n,
});

async function sendEthToSafe(to: string, value: string) {
  const safeAmount = ethers.parseUnits(value, "ether").toString();
  const transactionParameters = {
    to: to,
    value: safeAmount,
  };

  const tx = await owner1Signer.sendTransaction(transactionParameters);
  console.log(`Sent ${value} ETH to ${to}`);
  console.log(
    `Deposit Transaction: https://sepolia.etherscan.io/tx/${tx.hash}`
  );
}

sendEthToSafe("0x9cad58709774357EEF53127BEB71444eD707d0D6", "0.01")
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
