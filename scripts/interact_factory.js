const contract = require("../artifacts/contracts/Blogger.sol/BlogFactory.json");
const network = "sepolia";
const ALCHEMY_API_KEY =  // node provider API_Key
const WALLET_PRIVATE_KEY = //wallet PRIVATE_KEY
const CONTRACT_ADDRESS = //deployed contract address

//Provider 
const provider = new ethers.AlchemyProvider(network,ALCHEMY_API_KEY);

//Signer
const signer = new ethers.Wallet(WALLET_PRIVATE_KEY,provider);

//Contract
const factory_contract = new ethers.Contract(CONTRACT_ADDRESS,contract.abi,signer);

const main = async () => {
    //create new blog
    const new_blog = await blog_factory_contract.create_new_blog(50000,"bl_01");
    await new_blog.wait();

    //return blogs
    const deployed_blogs = await factory_contract.return_blogs();
    console.log(deployed_blogs);
} 

main();