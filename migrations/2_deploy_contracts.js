// SPDX-License-Identifier: MIT
const SokuCakeToken = artifacts.require("SokuCakeToken");
const SokuSyrupBar = artifacts.require("SokuSyrupBar");
const Masterchef = artifacts.require("Masterchef");
const SousChef = artifacts.require("SousChef");

module.exports = async function (deployer, _network, addresses) {
  const [admin, _] = addresses;
  await deployer.deploy(SokuCakeToken);
  const sokuCakeToken = await SokuCakeToken.deployed();

  await deployer.deploy(
    SokuSyrupBar,
    sokuCakeToken.address
    );
  const sokuSyrupBar = await SokuSyrupBar.deployed();

  await deployer.deploy(
    Masterchef,
    sokuCakeToken.address,
    sokuSyrupBar.address,
    admin,
    web3.utils.toWei('1000'),
    10138065
  );
  const masterChef = await Masterchef.deployed();
  sokuCakeToken.transferOwnership(masterChef.address, {from: addresses[0]});

  await deployer.deploy(
    SousChef,
    sokuSyrupBar.address,
    web3.utils.toWei('2000'),
    10138065,
    10140000
    );
  const sousChef = await SousChef.deployed();
};
