import cli from "cli";
import fs from "fs/promises";
import fsCallback from "fs";
import random from "lodash/random";
import { formatUnits, ethers } from "ethers";
import { contractsBytecode } from "./contracts";

const RPC_URL = "https://rpc.scroll.io";

const KEYS_FILENAME = "keys.txt";
const RESULTS_FILENAME = "results.txt";

export const RPC_ETH = "https://eth.llamarpc.com";

export const MAX_GAS_GWEI = 30;

const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

const provider = new ethers.JsonRpcProvider(RPC_URL);

const provider2 = new ethers.JsonRpcProvider(RPC_ETH);


async function getBaseGas() {
  const { gasPrice } = await provider2.getFeeData();
  return formatUnits(gasPrice, "gwei");
}


export async function waitGas() {
  while (true) {
    const gas = parseInt(await getBaseGas());

    cli.spinner(`L1 gas : ${gas}`, true);

    if (gas > MAX_GAS_GWEI) {
      cli.spinner(
        `Gas price is higher than ${MAX_GAS_GWEI} GWEI, waiting 1 minute`,
      );
      await delay(60* 1000);
      cli.spinner("=============", true);
    } else {
      break;
    }
  }
}



async function deploy(key: string) {
  const wallet = new ethers.Wallet(key, provider);

  const contractIndex = random(contractsBytecode.length - 1);
  const contract = contractsBytecode[contractIndex];
  const { abi, bytecode, getConstructorArgs } = contract;
  const constructorArgs = getConstructorArgs();

  const message = `Deploy from address ${wallet.address}`;
  cli.spinner(message);
  const factory = new ethers.ContractFactory(abi, bytecode, wallet);
  const result = await factory.deploy(...constructorArgs);
  await result.waitForDeployment();
  cli.spinner(message, true);

  return result.target;
}

const file = await fs.readFile(KEYS_FILENAME, { encoding: "utf8" });
const keys = file.split("\n").filter(Boolean).map((item) => item.trim());
const logger = fsCallback.createWriteStream(RESULTS_FILENAME);

for (const key of keys) {
  try {
    await waitGas();
    const deployAddress = await deploy(key);
    console.log("Deployed to:", deployAddress);
    logger.write(deployAddress + "\n");
  } catch (error) {
    console.log(`Error: ${error}`);
    logger.write("deploy error\n");
  }
  
  // Интервал задержки между каждым деплоем, случайное число от 60 до 120 секунд
  const delayTimeout = random(10, 100);
  cli.spinner(`Delay: ${delayTimeout} seconds`);
  await delay(delayTimeout * 1000);
  cli.spinner("=============", true);
}

logger.end();
