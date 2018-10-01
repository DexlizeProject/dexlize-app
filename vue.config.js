const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? '/' : '/',
  devServer: {
    proxy: ''
  },
    // configureWebpack:{
    // plugins:[
    //     new BundleAnalyzerPlugin()
    // ]
    // }
  // protocol_types: [{
  // 	'protocol_name': 'PUB',
  // 	'description': {
  // 		'en':'',
  // 		'zh':'PUB是DApp Pub团队...'
  // 	},
  // 	'type': 'bancor',
  // 	'status': 'open',
  // 	'social_media': {
  // 		'github': '',
  // 		'facebook': '',
  // 		'reddit': '',
  // 		'weibo': ''
  // 	},
  // 	'white_paper_url': {
  // 		'en': '',
  // 		'zh': 'https://dapp.mytokenpocket.vip/%E5%9F%BA%E4%BA%8E%E7%8F%AD%E6%9F%AF%E7%9A%84%E5%AE%9E%E7%94%A8%E5%A2%9E%E5%BC%BA%E5%9E%8B%E9%80%9A%E8%AF%81%E5%8D%8F%E8%AE%AE.pdf',
  // 	},
  // 	'links': {
  // 		'DApp Pub': 'https://dapp.pub/',
  // 		'Dexlize': 'https://www.dexlize.org'
  // 	}
  // }, {
  // 	'protocol_name': 'Kyubey',
  // 	'description': {
  // 		'en':'',
  // 		'zh':''
  // 	},
  // 	'type': 'bancor',
  // 	'status': 'open',
  // 	'social_media': {
  // 		'twitter': '',
  // 		'telegram': '',
  // 		'wechat': '',
  // 		'github': '',
  // 		'facebook': '',
  // 		'reddit': ''
  // 	},
  // 	'white_paper_url': {
  // 		'en': '',
  // 		'zh': '',
  // 	},
  // 	'link_url': {
  // 		'Kyubey Network': 'https://kyubey.network/',
  // 		'Dexlize': 'https://www.dexlize.org'
  // 	}
  // }
  // ],
  // PUB: {
  // 	trading_pairs: [
  // 		symbol: 'PUB',
  //     name: 'DApp PUB',
  // 		description: {
  // 			en: 'PUB Token is ',
  // 			zh: ''
  // 		},
  // 		social_media: {
  // 			twitter: 'https://twitter.com/dapppub',
  // 			telegram: 'https://t.me/DappPub',
  // 			wechat: '',
  // 			github: 'https://github.com/dappub',
  // 			facebook: '',
  // 			reddit: 'https://www.reddit.com/user/dapppub',
  //       medium: 'https://medium.com/dapppub'
  // 		}
  //   ], [
  //     symbol: 'TPT',
  // 		description: {
  // 			en: 'TPT is TokenPocket Token',
  // 			zh: 'TPT 即 TokenPocket Token，是TokenPocket生态中代表TP用户以及开发者权益的应用型通证，也是连接钱包、用户以及项目开发者的重要纽带。'
  // 		},
  // 		social_media: {
  // 			twitter: '',
  // 			telegram: '',
  // 			wechat: '',
  // 			github: '',
  // 			facebook: '',
  // 			reddit: '',
  //       medium: ''
  // 		}
  //   ]
  // },
  // Kyubey: {
  //   trading_pairs: [
  //     symbol: 'KBY',
  //     name: 'Kyubey Network',
  //     description: {
  // 			en: 'KBY Token is ',
  // 			zh: 'KBY 将使用 Kyubey 协议合约和团购合约发行。 Kyubey 协议将设置价格与发行量的函数为一次函数，类似 P3D 的价格曲线。\
  //       * 价格增加速率：10^-10 / KBY\n \
  //       * 初始价格：0.002 EOS/KBY\n \
  //       * 初始 dummy 发行量：20M\n \
  //       * 初始 dummy 储备金：20k\n \
  //       * 一期募集金额 80k EOS，时间：10.29th\n \
  //       * 二期募集金额 200k EOS，预计时间：2019 年 Q1，当项目进度到达 20% 时之后，具体时间待定。\n \
  //       '
  // 		},
  // 		social_media: {
  // 			twitter: 'https://twitter.com/dapppub',
  // 			telegram: 'https://t.me/DappPub',
  // 			wechat: '',
  // 			github: 'https://github.com/dappub',
  // 			facebook: '',
  // 			reddit: 'https://www.reddit.com/user/dapppub',
  //       medium: 'https://medium.com/dapppub'
  // 		}
  //   ]
  // }
};
