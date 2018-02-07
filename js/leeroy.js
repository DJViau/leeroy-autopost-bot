
// postToLeeroy('testPost')

async function postToLeeroy(postStr) {
	try {

		let gasPrice = await fetch('https://ethgasstation.info/json/ethgasAPI.json').then(r => r.json()).then(d => d.safeLow*100000000)
		let txCount = await w3.eth.getTransactionCount(CONFIG.eth.address)

		let txParams = assembleTxParams(txCount, gasPrice)
		let rawLeeroyPostTx = assembleRawPostTx(postStr, txParams)
		let tx = new EthereumTx(rawLeeroyPostTx)
		let pkBuf = Buffer(CONFIG.eth.privateKey.slice(2), 'hex')

		tx.sign(pkBuf)

		let signedSerializedTx = tx.serialize().toString('hex')

		await w3.eth.sendSignedTransaction(`0x${signedSerializedTx}`)

	} catch (e) {
		handlePostingErrors(e)
	} finally {
		console.log(`${timestamp()} postToLeeroy finally`)
		return
	}
}


function assembleTxParams(txCount, gasPrice) {
	return {
		nonce: w3.utils.toHex(txCount),
		// NOTE: gasLimit range seems to be 35k - 49K, investigate setting dynamically
		gasLimit: w3.utils.toHex(480000),
		gasPrice: w3.utils.toHex(gasPrice),
		to: CONFIG.leeroy.contractAddress,
		chainId: 1
	}
}


function assembleRawPostTx(postStr, txParams) {
	return txutils.functionTx(
		CONFIG.leeroy.abi,
		'post',
		[JSON.stringify({text: postStr})],
		txParams
	)
}

// function assembleRawSignupTx(postStr, txParams) {
// 	return txutils.functionTx(
// 		CONFIG.leeroy.abi,
// 		'registerUsername',
// 		[JSON.stringify({text: postStr})],
// 		txParams
// 	)
// }

function handlePostingErrors(e) {
	console.log('*******')
	console.log(`${timestamp()} ${e.message}`)
	if (e.message === 'Returned error: insufficient funds for gas * price + value') {
		console.log('account needs refilling or gasprice needs adjustment')
		// handleInsufficientGasAndRetry?()
	}
	if (e.message === 'Transaction was not mined within 50 blocks, please make sure your transaction was properly send. Be aware that it might still be mined!') {
		console.log('post prob succeeded, but maybe not?')
		// transactionProbablySucceeded?()
	}
	console.log('*******')
}


module.exports = postToLeeroy;
