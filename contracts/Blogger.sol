//SPDX-License-Identifier: Unlicensed

pragma solidity >= 0.8.0 < 0.9.0;

contract Blog {
    uint blog_fee;
    string id;
    struct BlogPost{
        address payable author;
        string blog_id;
        mapping(address => bool) approved_reader;
    }
    mapping(string => BlogPost) fetch_blog;

    constructor(uint _blogFee,string memory _id,address payable _author) {
        blog_fee = _blogFee;
        id = _id;
        BlogPost storage blog_post = fetch_blog[_id];
        blog_post.author = _author;
        blog_post.blog_id = _id;
    }

    modifier onlyOwner() {
        BlogPost storage blog_post = fetch_blog[id];
        require(msg.sender == blog_post.author,"you are not the blog author");
        _;
    }

    function can_read() public view returns(bool) {
        BlogPost storage blog_post = fetch_blog[id];
        if(blog_post.approved_reader[msg.sender] || msg.sender == blog_post.author){
            return true;
        } else {
            return false;
        }
    }

    function read_post() public payable {
        BlogPost storage blog_post = fetch_blog[id];
        require(!blog_post.approved_reader[msg.sender],"you are already approved!");
        require(msg.sender != blog_post.author,"you are the author!");
        require(msg.value == blog_fee,"minimum fee required");
        blog_post.approved_reader[msg.sender] = true;
    }

    function contract_balance() public view onlyOwner returns(uint) {
        return address(this).balance;
    }

    function withdraw() public payable onlyOwner {
        BlogPost storage blog_post = fetch_blog[id]; 
        (bool sent,) = blog_post.author.call{value:address(this).balance}("");
        require(sent,"Failure! Ether not sent");
    }

}

contract BlogFactory{
    Blog[] deployed_blogs;
    function create_new_blog(uint _blogFee,string memory _id) public{
        Blog newBlog = new Blog(_blogFee,_id,payable(msg.sender));
        deployed_blogs.push(newBlog);
    }

    function return_blogs() public view returns(Blog[] memory) {
        return deployed_blogs;
    }
}
