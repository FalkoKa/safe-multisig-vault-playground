import SafeApiKit from '@safe-global/api-kit';
import { EthersAdapter } from '@safe-global/protocol-kit';
import { MetaTransactionData } from '@safe-global/safe-core-sdk-types';
import dotenv from 'dotenv';
import { ethers } from 'ethers';
import Safe from '@safe-global/protocol-kit';

dotenv.config();

const RPC_URL = process.env.RPC_ENDPOINT_URL;
const provider = new ethers.JsonRpcProvider(RPC_URL);
const SAFE_ADDRESS = '0x9b7a9C49280a6AEAB7b9375ac0Cb5BEFd861F75B';
const owner1Signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

const ethAdapter = new EthersAdapter({
  ethers,
  signerOrProvider: owner1Signer,
});

const safeService = new SafeApiKit({
  chainId: 11155111n,
});

async function executeTranaction() {
  const safeSdkOwner1 = await Safe.create({
    ethAdapter,
    safeAddress: SAFE_ADDRESS,
  });
}

executeTranaction()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
