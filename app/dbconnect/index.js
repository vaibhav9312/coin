'use strict';

const db=require('mongoskin').db('mongodb://192.168.0.111:27017/coin');  

exports.fdata= function(){
	return db;
}
//'mongodb://coin:contents@ds115198.mlab.com:15198/coincontents'
//mongodb://192.168.0.101:27017/squarepixel