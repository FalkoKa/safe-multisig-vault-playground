import SafeApiKit from '@safe-global/api-kit';
import { EthersAdapter } from '@safe-global/protocol-kit';
import { MetaTransactionData } from '@safe-global/safe-core-sdk-types';
import dotenv from 'dotenv';
import { ethers } from 'ethers';

dotenv.config();

const RPC_URL = process.env.RPC_ENDPOINT_URL;
const provider = new ethers.JsonRpcProvider(RPC_URL);

const owner1Signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

const ethAdapterOwner1 = new EthersAdapter({
  ethers,
  signerOrProvider: owner1Signer,
});

const safeApiKit = new SafeApiKit({
  chainId: 11155111n, // set the correct chainId
  // txServiceUrl: '',
});

async function createTransaction(to: string, value: string) {
  const destination = to;
  const amount = ethers.parseUnits(value, 'ether').toString();

  const safeTransactionData: MetaTransactionData = {
    to: destination,
    data: '0x',
    value: amount,
  };

  const safeTransaction = await safeSdkOwner1.createTransaction({
    transactions: [safeTransactionData],
  });
}
