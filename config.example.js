CONFIG = {
  checkingInterval: 10, // in minutes
  eth: {
    address: '',
    privateKey: '',
    provider: 'https://mainnet.infura.io/XXX',
  },
  twitter: {
    userHandleToRepost: '',
    keys: {
      consumer_key: '',
      consumer_secret: '',
      access_token_key: '',
      access_token_secret: ''
    }
  },
  leeroy: {
    contractAddress: '0xCB04fBB44bB2Aa0e3D402D0BDe2De60b2De028af',
    abi: require('./leeroy-contract-abi')
  },
};
