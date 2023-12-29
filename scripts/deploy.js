async function main() {
  const [deployer] = await ethers.getSigners();

  console.log(`Deploying contract with the account: ${deployer.address}`);

  const blogFactory = await ethers.deployContract("BlogFactory");

  console.log(`Contract address: ${await blogFactory.getAddress()}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });