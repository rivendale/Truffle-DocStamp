# ConsenSysProject #3 Proof of Existence dApp
This application allows users to prove existence of some information by showing a time stamped picture/video. The data is stored in IPFS while the hash and a tag are stored within a smart contract. This enables referencing at a later date to verify the authenticity.

# Installing: 
mkdir Truffle-Projects
cd Truffle-Projects
truffle unbox react
git clone https://github.com/rivendale/Truffle-DocStamp.git
cd Truffle-DocStamp
sudo npm install

truffle compile --all
truffle migrate --reset
npm run start 

# Dependicies utilized: 
sudo npm install webpack
sudo npm install ipfs-api
sudo npm install -E openzeppelin-solidity

