import { ethers } from "ethers";
import { EthersAdapter } from "@safe-global/protocol-kit";
import SafeApiKit from "@safe-global/api-kit";
import { SafeFactory } from "@safe-global/protocol-kit";
import { SafeAccountConfig } from "@safe-global/protocol-kit";

import dotenv from "dotenv";

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

async function main() {
  console.log(await owner1Signer.getAddress());
  const safeFactory = await SafeFactory.create({
    ethAdapter: ethAdapterOwner1,
  });

  const safeAccountConfig: SafeAccountConfig = {
    owners: [
      await owner1Signer.getAddress(),
      "0x986047959F42F6Ed84d2bB20A015A547F1753123",
    ],
    threshold: 2,
    // ... (Optional params)
  };

  const safeSdkOwner1 = await safeFactory.deploySafe({ safeAccountConfig });

  console.log(safeSdkOwner1);
  const safeAddress = await safeSdkOwner1.getAddress();

  console.log("Your Safe has been deployed:");
  console.log(`https://app.safe.global/sep:${safeAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
