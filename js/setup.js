require('../config.js')

/** Utils */
_ = require('lodash')
fetch = require("node-fetch");
timestamp = () => new Date().toLocaleString() + "::"

/** Web3 **/
Web3 = require('web3')
txutils = require('eth-lightwallet').txutils
EthereumTx = require('ethereumjs-tx')
w3 = new Web3(new Web3.providers.HttpProvider(CONFIG.eth.provider))
ethAcct = w3.eth.accounts.privateKeyToAccount(CONFIG.eth.privateKey)

// might not be necessary
// w3.eth.accounts.wallet.add(ethAcct)

// sanity check that private key corresponds to eth address
if (ethAcct.address !== CONFIG.eth.address) {
	throw new Error(`${timestamp()} address & privatekey dont match!`)
} else {
	console.log(`${timestamp()} address & privatekey match!`)
}

/** Twitter */
Twitter = require('twitter')
client = new Twitter(CONFIG.twitter.keys)
isTweet = _.conforms({
  contributors: _.isObject,
  id_str: _.isString,
  text: _.isString
})
