import SafeApiKit from '@safe-global/api-kit';
import { EthersAdapter } from '@safe-global/protocol-kit';
import { MetaTransactionData } from '@safe-global/safe-core-sdk-types';
import dotenv from 'dotenv';
import { ethers } from 'ethers';
import Safe from '@safe-global/protocol-kit';

dotenv.config();

const RPC_URL = process.env.RPC_ENDPOINT_URL;
const provider = new ethers.JsonRpcProvider(RPC_URL);
const SAFE_ADDRESS = '';
const owner1Signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

const ethAdapter = new EthersAdapter({
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

  const safeSdk = await Safe.create({ ethAdapter, safeAddress: SAFE_ADDRESS });

  const safeTransaction = await safeSdk.createTransaction({
    transactions: [safeTransactionData],
  });
}
