// //Require bitcore
// var bitcore = require('bitcore-node');

// //Services
// var Bitcoin = bitcore.services.Bitcoin;
// var Web = bitcore.services.Web;

// var myNode = new bitcore.Node({
//   network: 'livenet',
//   services: [
//     {
//       name: 'bitcoind',
//       module: Bitcoin,
//     //   config: {
//     //     spawn: {
//     //       datadir: '/home/<username>/.bitcoin',
//     //       exec: '/home/<username>/bitcore-node/bin/bitcoind'
//     //     }
//     //   }
//     }
//     // {
//     //   name: 'web',
//     //   module: Web,
//     //   config: {
//     //     port: 3001
//     //   }
//     // }
//   ]
// });

// exports.balance=function(a){
//     myNode.services.bitcoind.getAddressBalance(a, false, function(err, total) {
//         console.log(total.balance); //Satoshi amount of this address
//         return total.balance;
//       });
// }