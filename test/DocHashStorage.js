var DocHashStorage = artifacts.require("./DocHashStorage.sol");

contract('DocHashStorage', function(accounts) {

  it("...should store the value 89.", function() {
    return DocHashStorage.deployed().then(function(instance) {
      DocHashStorageInstance = instance;

      return DocHashStorageInstance.adddocs(89,"test", {from: accounts[0]});
    }).then(function() {
      return DocHashStorageInstance.getdocs(0);
    }).then(function(storedData) {
      assert.equal(storedData, 89, "The value 89 was not stored.");
    });
  });

});
