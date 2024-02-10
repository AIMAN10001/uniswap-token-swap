const { SwapRouter } = require("@uniswap/universal-router-sdk");
const {
  TradeType,
  Ether,
  Token,
  CurrencyAmount,
  Percent,
} = require("@uniswap/sdk-core");
const { Trade: V2Trade } = require("@uniswap/v2-sdk");
const {
  Pool,
  nearestUsableTick,
  TickMath,
  TICK_SPACINGS,
  FeeAmount,
  Trade: V3Trade,
  Route: RouteV3,
} = require("@uniswap/v3-sdk");

const { MixedRouteTrade, Trade: RouterTrade } = require("@uniswap/router-sdk");
const IUniswapV3Pool = require("@uniswap/v3-core/artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json");
const JSBI = require("jsbi");
const erc20Abi = require("./abis__erc20.json");

const hardhat = require("hardhat");
const provider = hardhat.ethers.provider;
//
const ETHER = Ether.onChain(1);
const WETH = new Token(
  1,
  "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
  18,
  "WETH",
  "Wrapped Ether"
);

const USDC = new Token(
  1,
  "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
  6,
  "USDC",
  "USD Coin"
);

const wethContract = new hardhat.ethers.Contract(
  WETH.address,
  erc20Abi,
  provider
);
const usdcContract = new hardhat.ethers.Contract(
  USDC.address,
  erc20Abi,
  provider
);

async function getPool(tokenA, tokenB, feeAmount, provider) {
  const [token0, token1] = tokenA.sortsBefore(tokenB)
    ? [tokenA, tokenB]
    : [tokenB, tokenA];

  const poolAddress = Pool.getAddress(token0, token1, feeAmount);

  const contract = new ethers.Contract(poolAddress, IUniswapV3Pool, provider);

  let liquidity = await contract.liquidity();

  let { sqrtPriceX96, tick } = await contract.slot0();

  liquidity = JSBI.BigInt(liquidity.toString());
  sqrtPriceX96 = JSBI.BigInt(sqrtPriceX96.toString());

  console.log("CALLING_POOL----------------");

  return new Pool(token0, token1, feeAmount, sqrtPriceX96, liquidity, tick, [
    {
      index: nearestUsableTick(TickMath.MIN_TICK, TICK_SPACINGS[feeAmount]),
      liquidityNet: liquidity,
      liquidityGross: liquidity,
    },

    {
      index: nearestUsableTick(TickMath.MIN_TICK, TICK_SPACINGS[feeAmount]),
      liquidityNet: JSBI.multiply(liquidity, JSBI.BigInt("-1")),
      liquidityGross: liquidity,
    },
  ]);
}

function swapOptions(options) {
  return Object.assign(
    {
      slippageTolerance: new Percent(5, 1000),
      recipient: RECIPIENT,
    },
    options
  );
}

function buildTrade(trade) {
  return new RouterTrade({
    v2Routes: trades
      .filter((trade) => trade instanceof V2Trade)
      .map((trade) => ({
        routev2: trade.route,
        inptAmmount: trade.inptAmmount,
        outputAmmount: trade.outputAmmount,
      })),
    v3Routes: trades
      .filter((trade) => trade instanceof V3Trade)
      .map((trade) => ({
        routev3: trade.route,
        inptAmmount: trade.inptAmmount,
        outputAmmount: trade.outputAmmount,
      })),
    mixedRoutes: trades
      .filter((trade) => trade instanceof V3Trade)
      .map((trade) => ({
        mixedRoute: trade.route,
        inptAmmount: trade.inptAmmount,
        outputAmmount: trade.outputAmmount,
      })),
    tradeType: trades[0].tradeType,
  });
}

const RECIPIENT = "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B";

async function main() {
  const signer = await hardhat.ethers.getImpersonatedSigner(RECIPIENT);

  const WETH_USDC_V3 = await getPool(WETH, USDC, FeeAmount.MEDIUM);

  const inputEther = hardhat.ethers.utils.parseEther("1").toString();

  const trade = await V3Trade.fromRoute(
    new RouteV3([WETH_USDC_V3], ETHER, USDC),
    CurrencyAmount.fromRawAmount(ETHER, inputEther),
    TradeType.EXACT_INPUT
  );

  const routerTrade = buildTrade([trade]);

  const opts = swapOptions({});

  const params = SwapRouter.swapERC20CallParameters(routerTrade, opts);

  let ethBalance;
  let wethBalance;
  let usdcBalance;
  ethBalance = await provider.getBalance(RECIPIENT);
  wethBalance = await wethContract.balanceOf(RECIPIENT);
  console.log("--BEFORE");
  console.log("ethBlance", hardhat.ethers.utils.formatUnits(ethBalance, 18));
  console.log("wethBlance", hardhat.ethers.utils.formatUnits(wethBalance, 18));
  console.log("usdcBlance", hardhat.ethers.utils.formatUnits(usdcBalance, 6));

  const tx = await signer.sendTransaction({
    data: params.calldata,
    to: "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B",
    value: params.value,
    from: RECIPIENT,
  });

  const receipt = await tx.wait();

  console.log("---SUCCESS");
  console.log("STATUS", receipt.status);

  console.log(WETH_USDC_V3);
  console.log(trade);
  console.log(routerTrade);
  console.log(opts);
  console.log(params);

  ethBalance = await provider.getBalance(RECIPIENT);
  wethBalance = await wethContract.balanceOf(RECIPIENT);
  usdcBalance = await usdcContract.balanceOf(RECIPIENT);
  console.log("-------------------AFTER");
  console.log("ethBlance", hardhat.ethers.utils.formatUnits(ethBalance, 18));
  console.log("wethBlance", hardhat.ethers.utils.formatUnits(wethBalance, 18));
  console.log("usdcBlance", hardhat.ethers.utils.formatUnits(usdcBalance, 6));
}

//   node scripts/deploy.js

main()
  .then(() => process.exit(0))

  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
