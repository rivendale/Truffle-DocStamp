pragma solidity 0.4.24;

import './zeppelin/lifecycle/Killable.sol';

contract DocHashStorage is Killable {

  struct DocInfo {
    string ipfsHash;
    string HashTag;
  }

  struct User {
    bytes32 name;
    uint numdocs;
    DocInfo[10] docs;
  }

  mapping (address => User) public users;

  uint public id; // Stores user id temporarily

  modifier onlyMaxDocs {
  // check to see if user has reached maximum documents stored
  require(users[msg.sender].numdocs < 5);
  _;
  }

  modifier onlyExistingUser {
    // Check if user exists or terminate

    require(!(users[msg.sender].name == 0x0));
    _;
  }

  modifier onlyValidName(bytes32 name) {
    // Only valid names allowed
    require(!(name == 0x0));
    _;
  }

  function adddocs(string _ipfsHash, string _HashTag) {
    uint currdoc = users[msg.sender].numdocs;
    users[msg.sender].docs[currdoc].ipfsHash = _ipfsHash;
    users[msg.sender].docs[currdoc].HashTag = _HashTag;
    users[msg.sender].numdocs += 1;
    if(users[msg.sender].numdocs > 4) {
      users[msg.sender].numdocs = 0;
    }

  }

  function getdocs(uint docnum) public view returns (string, string) {
    return (users[msg.sender].docs[docnum].ipfsHash, users[msg.sender].docs[docnum].HashTag);
  }

  function getnumdocs() public view returns (uint) {
    return users[msg.sender].numdocs;
  }


  function login() constant
  public
  onlyExistingUser
  returns (bytes32) {
    return (users[msg.sender].name);
  }

  function signup(bytes32 name)
  public
  payable
  onlyValidName(name)
  returns (bytes32) {
    // Check if user exists.
    // If yes, return user name.
    // If no, check if name was sent.
    // If yes, create and return user.

    if (users[msg.sender].name == 0x0)
    {
        users[msg.sender].name = name;

        return (users[msg.sender].name);
    }

    return (users[msg.sender].name);
  }

  function update(bytes32 name)
  public
  payable
  onlyValidName(name)
  onlyExistingUser
  returns (bytes32) {
    // Update user name.
    if (users[msg.sender].name != 0x0)
    {
        users[msg.sender].name = name;

        return (users[msg.sender].name);
    }
  }



}
