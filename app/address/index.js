var bitcore = require('bitcore-lib');



// var value = new Buffer('correct horse battery staple');
// var hash = bitcore.crypto.Hash.sha256(value);
// var bn = bitcore.crypto.BN.fromBuffer(hash);

// var address = new bitcore.PrivateKey(bn).toAddress();

// var wif = 'L2rL7wHbDuKh2r8yHDTsi2frcNCpwb7HYxEtYSanRFFWympQwsKr';




exports.fdata=function(){
  var privateKey = new bitcore.PrivateKey();
  
  var address = privateKey.toAddress();
  //var address = new bitcore.PrivateKey(wif).toAddress();
  return address;
}