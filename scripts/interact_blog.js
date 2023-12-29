const contract = require('../artifacts/contracts/Blogger.sol/Blog.json');
const network = "sepolia";
const ALCHEMY_API_KEY =  // node provider API_Key
const WALLET_PRIVATE_KEY = //wallet PRIVATE_KEY
const CONTRACT_ADDRESS = //deployed contract address

//Provider 
const provider = new ethers.AlchemyProvider(network,ALCHEMY_API_KEY);

//Signer
const signer = new ethers.Wallet(WALLET_PRIVATE_KEY,provider);

//Contract
const blog_contract = new ethers.Contract(BLOG_ADDRESS,contract.abi,signer);

const main = async () => {
    //can i read the blog !
    const can_read = await blog_contract.can_read();
    console.log(can_read);
    //read the blog
    const read_post = await blog_contract.read_post();
    await read_post.wait();
} 

main();