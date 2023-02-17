var HealthRecord = artifacts.require("./HealthRecord.sol");

module.exports = function(deployer) {
  deployer.deploy(HealthRecord);
};
