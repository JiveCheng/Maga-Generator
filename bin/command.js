#! /usr/bin/env node
const path = require('path');
const fs = require('fs');
const program = require('commander');
const readline = require('readline');
const deepExtend = require('deep-extend');
const copydir = require('copy-dir');
const pp = require('preprocess');
const remoteOriginUrl = require('remote-origin-url');

const MagaGenerator = class {
	constructor() {
		this.rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout
		});
		this.interface = {
			view: {
				home: 'Create a Magaele\n'
				+ ' 1) [non-component] style-only module\n'
				+ ' 2) [non-component] jquery-plugin module\n'
				+ ' 3) [component] react functional component\n'
				+ ' 4) [component] react class component\n'
				+ 'Please choose a template: '
	 		}
		};
		this.path = {};
		this.path.root = {
			users: path.resolve(),
			global: path.resolve(path.dirname(process.argv[1]), '../')
		};
		this.path.dirarr = {
			users: this.path.root.users.split(path.sep),
			global: this.path.root.global.split(path.sep)
		}
		this.path.dirname = {
			users: this.path.dirarr.users[this.path.dirarr.users.length - 1],
			global: this.path.dirarr.global[this.path.dirarr.global.length - 1]
		}
		this.path.template = {
			'magaele': {
				'component': {
					'react': {
						'class': './lib/tmpl/element/component/react/class',
						'functional': './lib/tmpl/element/component/react/functional'
					}
				},
				'non-component': {
					'style-only': './lib/tmpl/element/non-component/style-only/normal',
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
		this.map = {
			path: {
				'1': this.path.template.magaele['non-component']['style-only'],
				'2': this.path.template.magaele['non-component']['jquery-plugin'],
				'3': this.path.template.magaele.component.react.functional,
				'4': this.path.template.magaele.component.react.class
			},
			rewrites: {
				'1': ['preview.cshtml', 'css.scss', 'template.cshtml', 'package.json'],
				'2': ['preview.cshtml', 'css.scss', 'template.cshtml', 'package.json', 'script/module.js'],
				'3': ['template.html', 'preview.js', 'package.json', 'css.scss', 'components/Module.js'],
				'4': ['template.html', 'preview.js', 'package.json', 'css.scss', 'components/Module.js']
			}
		}
		this.regex = {
			option: /[1234]/g
		}
		this.moduleName = this.path.dirname.users.replace(/^\_/g);
	}
	init () {
		this.rl.on("close", function(){
			process.exit(0);
		});
		this.rl.question(this.interface.view.home, ( answer ) => {
			if ( this.regex.option.test(answer) ) {
				this.copy(answer, (err) => {
					if( !err ){
						console.log('success!');
						this.rewriteName(answer);
						this.rl.close();
					} else {
						console.log(err);
					}
				});
			} else {
				throw 'option error!';
			}
			
		});	
	}
	copy ( answer, callback ) {
		copydir(path.resolve(this.path.root.global, this.map.path[answer]), this.path.root.users, callback);
	}
	rewriteName ( answer ) {
		let rewrites = this.map.rewrites[answer];
		if ( Array.isArray(rewrites) && rewrites.length > 0 ) {
			rewrites.forEach(( filename, index ) => {
				let filePath = path.resolve(this.path.root.users, filename);
				pp.preprocessFileSync(filePath, filePath, {
					ModuleName : this.moduleName,
					ModuleReactName: this.moduleName.split('_').map(( val ) => {
						return val.charAt(0).toUpperCase() + val.slice(1);
					}).join(''),
					RepoUrl: 'http://git.liontech.com.tw/' + this.moduleName + '.git',
				});
			});
		} else {
			throw 'no file have to modify';
		}
	}
};

let MagaGen = new MagaGenerator();

MagaGen.init();



