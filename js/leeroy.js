require('./setup')

// sanity check that private key corresponds to eth address
if (
  ethAcct.address !== CONFIG.eth.address ||
  ethAcct.privateKey !== CONFIG.eth.privateKey
) {
  throw new Error(`${timestamp()} address & privatekey dont match!`)
} else {
  console.log(`${timestamp()} address & privatekey match!`)
}

// might not be necessary
w3.eth.accounts.wallet.add(ethAcct)

w3.eth.getTransactionCount(CONFIG.eth.address).then((txCount, err) => {

  console.log(`${timestamp()} ${txCount} transactions for ${CONFIG.eth.address}`)

  let txParams = {
    nonce: w3.utils.toHex(txCount),
    gasLimit: w3.utils.toHex(500000),
    gasPrice: w3.utils.toHex(1000000000), // 1 gwei
    to: CONFIG.leeroy.contractAddress,
    chainId: 1
  }

  // let leeroyTestUserName = `leeroyTestBot${(Math.random() * 100000).toFixed(0)}`
  // console.log(`${timestamp()} attemtping to create ${leeroyTestUserName}`)
  // let rawTx = txutils.functionTx(
  //   CONFIG.leeroy.abi,
  //   'registerUsername',
  //   leeroyTestUserName,
  //   txParams
  // )

	// NOTE: currently posting empty tweets
	let rawTx = txutils.functionTx(
		CONFIG.leeroy.abi,
		'post',
		'hello world',
		txParams
	)

  let tx = new EthereumTx(rawTx)

  let privateKeyBuffer = Buffer(CONFIG.eth.privateKey.slice(2), 'hex')

  tx.sign(privateKeyBuffer)

  let serializedTx = tx.serialize().toString('hex')

	// NOTE: even when successful, getting following error (way before 50 blocks is reached)
	// Unhandled rejection Error: Transaction was not mined within 50 blocks, please make sure your transaction was properly send. Be aware that it might still be mined!
  w3.eth.sendSignedTransaction(`0x${serializedTx}`, loggingCallback)
})

function loggingCallback(e, r) {
	if (e) {
		console.log(e)
	}
	else {
		console.log(r)
	}
}
