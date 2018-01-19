#! /usr/bin/env node
const path = require('path');
const fs = require('fs');
const exec = require('child_process').exec;
const program = require('commander');
const readline = require('readline');
const deepExtend = require('deep-extend');

let MagaGenerator = function() {
	this.rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});
	this.interface = {
		view: {
			home: `
Magaele
 1) [non-component] style-only module
 2) [non-component] jquery-plugin module
 3) [component] react functional component
 4) [component] react class component
Please choose a template: `
 		}
	};
	this.path = {};
	this.path.root = {
		users: path.resolve(),
		global: path.resolve(path.dirname(process.argv[1]), '../')
	};
	this.path.template = {
		'magaele': {
			'component': {
				'react': {
					'class': './lib/tmpl/element/component/react/class',
					'functional': './lib/tmpl/element/component/react/functional'
				}
			},
			'non-component': {
				'style-only': './lib/tmpl/element/non-component/style-only',
				'jquery-plugin': './lib/tmpl/element/non-component/jquery-plugin'
			}
		}
	}
	this.path.map = {
		'1': this.path.template.magaele['non-component']['style-only'],
		'2': this.path.template.magaele['non-component']['jquery-plugin'],
		'3': this.path.template.magaele.component.react.functional,
		'4': this.path.template.magaele.component.react.class
	};
	this.regex = {
		option: /[1234]/g
	}
};

let MagaGen = new MagaGenerator();

MagaGen.rl.question(MagaGen.interface.view.home, (answer) => {
	if ( MagaGen.regex.option.test(answer) ) {
		console.log(answer);
	} else {
		throw 'option error!';
	}
	MagaGen.rl.close();
});	

MagaGen.rl.on("close", function(){
	process.exit(0);
});