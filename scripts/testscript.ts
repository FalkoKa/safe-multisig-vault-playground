import { ethers } from 'ethers';
import { EthersAdapter } from '@safe-global/protocol-kit';
import SafeApiKit from '@safe-global/api-kit';
import { SafeFactory } from '@safe-global/protocol-kit';

import dotenv from 'dotenv';

dotenv.config();

const RPC_URL = 'provider url';
const provider = new ethers.JsonRpcProvider(RPC_URL);

const owner1Signer = new ethers.Wallet(
  process.env.OWNER_1_PRIVATE_KEY!,
  provider
);
const owner2Signer = new ethers.Wallet(
  process.env.OWNER_2_PRIVATE_KEY!,
  provider
);
const owner3Signer = new ethers.Wallet(
  process.env.OWNER_3_PRIVATE_KEY!,
  provider
);

async function setupEnvironment() {
  const ethAdapterOwner1 = new EthersAdapter({
    ethers,
    signerOrProvider: owner1Signer,
  });

  const safeApiKit = new SafeApiKit({
    chainId: 1n, // set the correct chainId
    txServiceUrl: '', // optional?
  });

  const safeFactory = await SafeFactory.create({
    ethAdapter: ethAdapterOwner1,
  });
}

// sample signers
