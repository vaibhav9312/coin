'use strict';

const db=require('mongoskin').db('mongodb://coin:contents@ds115198.mlab.com:15198/coincontents');  

exports.fdata= function(){
	return db;
}
//'mongodb://square:square@ds129422.mlab.com:29422/squareweb'
//mongodb://192.168.0.101:27017/squarepixel