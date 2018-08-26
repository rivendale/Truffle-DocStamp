pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/DocHashStorage.sol";

contract TestDocHashStorage {

  function testItStoresAValue() public {
    DocHashStorage DocHashStorage = DocHashStorage(DeployedAddresses.DocHashStorage());

    DocHashStorage.adddocs(89,"TestDocHashStorage");

    uint expected = 89;

    Assert.equal(DocHashStorage.getdocs(0), expected, "It should store the value 89.");
  }

}
