import dotenv from 'dotenv';
import { ethers } from 'ethers';
import { AllowanceModule__factory } from '../typechain-types';

dotenv.config();

const RPC_URL = process.env.RPC_ENDPOINT_URL;
const provider = new ethers.JsonRpcProvider(RPC_URL);
const deployer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

async function deployModule() {
  const moduleFactory = new AllowanceModule__factory(deployer);
  const module = await moduleFactory.deploy();
  await module.waitForDeployment();
  console.log(`Module deployed to ${module.target}`);
}

deployModule().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
