'use strict';

const db=require('mongoskin').db('mongodb://localhost:27017/coin');  

exports.fdata= function(){
	return db;
}
//'mongodb://square:square@ds129422.mlab.com:29422/squareweb'
//mongodb://192.168.0.101:27017/squarepixel