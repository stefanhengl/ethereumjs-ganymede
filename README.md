# ganymede
Ganymede is a Swagger-like frontend that let's you interact with
smart contracts on an ethereum blockchain. Ganymede supports remote
nodes, so you don't need to run a full node of a blockchain yourself.
 
<img width="644" alt="ganymede-screenshot" src="https://user-images.githubusercontent.com/26413131/31316705-23b2eb20-ac33-11e7-997c-75280753e763.png">
 
# Prerequisites
To interact with a contract on a read-only basis,
you need three things: the **contract's abi**, which is
a description of its interface, the **contract's address** on the
blockchain, and a provider that gives you access to the 
blockchain. I use [infura](https://infura.io/register.html)
as a provider.

Operations that change the state of a contract are mined
into the blockchain and require an account 
with funds on the target blockchain. I use
[Meta Mask](https://metamask.io/) to create accounts
with funds on the ropsten test net.

## Abi

Currently **ganymede** only supports build-artifacts created
by truffles. Support for artifacts created by Remix is planned.


# Getting started

Clone the repository, then

    cd ethereumjs-ganymede
    npm install
    npm start
    
Open you browser on [http://localhost:3000/](http://localhost:3000/)
and upload a build-artifact from truffle.

Before you can start playing with you contract, you have
to provide your credentials in the settings dialogue. All your 
data is only stored locally in the browser. Ganymede never
sends your private key anywhere.
