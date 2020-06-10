let BolaoEsportivo = artifacts.require("./BolaoEsportivo.sol");

module.exports = function(deployer) {
  deployer.deploy(BolaoEsportivo);
};
