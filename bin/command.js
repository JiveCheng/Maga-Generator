#! /usr/bin/env node
const path = require('path');
const fs = require('fs');
const exec = require('child_process').exec;
const program = require('commander');
const readline = require('readline');
const deepExtend = require('deep-extend');


console.log(path.resolve(), path.dirname(process.argv[1]));

let MagaGenerator = function(options) {
	this.rl = readline.createInterface({
		input:process.stdin,
		output:process.stdout
	});
	this.interfaceString = {
		home: `
Please choose a module template:
 1) [non-component] style-only module of Magaele
 2) [non-component] jquery-plugin module of Magaele
 3) [component] react functional component of Magaele
 4) [component] react class component of Magaele
 `
	};
	this.path = {
		module: path.resolve(),
		runtime: path.dirname(process.argv[1])
	};
};

// rl.question(interfaceString.home, (answer) => {
	
// 	rl.close();
// });	

// rl.on("close", function(){
// 	// 结束程序
	
// 	process.exit(0);
// });
console.log('runstart');
