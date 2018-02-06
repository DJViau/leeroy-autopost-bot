require('../config.js')

/** Web3 **/
Web3 = require('web3')
txutils = require('eth-lightwallet').txutils
EthereumTx = require('ethereumjs-tx')
w3 = new Web3(new Web3.providers.HttpProvider(CONFIG.eth.provider))
ethAcct = w3.eth.accounts.privateKeyToAccount(CONFIG.eth.privateKey)

/** Twitter */
Twitter = require('twitter')
client = new Twitter(CONFIG.twitter.keys)
_ = require('lodash')
isTweet = _.conforms({
  contributors: _.isObject,
  id_str: _.isString,
  text: _.isString
})

/** Logging */
timestamp = () => new Date().toLocaleString() + "::"
