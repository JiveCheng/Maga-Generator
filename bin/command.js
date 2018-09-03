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
				home: 'Create a Magaele:\n'
				+ ' 1) [non-component] style-only module\n'
				+ ' 2) [non-component] jquery-plugin module\n'
				+ ' 3) [component] react functional component\n'
				+ ' 4) [component] react pure component\n'
				+ ' 5) [component] react class component\n'
				+ 'Create a ReactMagaele:\n'
				+ ' 6) [component] react functional component\n'
				+ ' 7) [component] react pure component\n'
				+ ' 8) [component] react class component\n'
				+ ' 9) [component] react redux container (coming soon...)\n'
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
						'pure': './lib/tmpl/element/component/react/pure',
						'functional': './lib/tmpl/element/component/react/functional'
					},
					'reactmagaele': {
						'class': './lib/tmpl/element/component/reactmagaele/class',
						'pure': './lib/tmpl/element/component/reactmagaele/pure',
						'functional': './lib/tmpl/element/component/reactmagaele/functional'
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
			'4': this.path.template.magaele.component.react.pure,
			'5': this.path.template.magaele.component.react.class,
			'6': this.path.template.magaele.component.reactmagaele.functional,
			'7': this.path.template.magaele.component.reactmagaele.pure,
			'8': this.path.template.magaele.component.reactmagaele.class
		};
		this.map = {
			path: {
				'1': this.path.template.magaele['non-component']['style-only'],
				'2': this.path.template.magaele['non-component']['jquery-plugin'],
				'3': this.path.template.magaele.component.react.functional,
				'4': this.path.template.magaele.component.react.pure,
				'5': this.path.template.magaele.component.react.class,
				'6': this.path.template.magaele.component.reactmagaele.functional,
				'7': this.path.template.magaele.component.reactmagaele.pure,
				'8': this.path.template.magaele.component.reactmagaele.class
			},
			rewrites: {
				'1': ['src/preview.html', 'src/css.scss', 'package.json'],
				'2': ['preview.cshtml', 'css.scss', 'template.cshtml', 'package.json', 'script/module.js'],
				'3': ['template.html', 'preview.js', 'package.json', 'css.scss', 'components/Module.js'],
				'4': ['template.html', 'preview.js', 'package.json', 'css.scss', 'components/Module.js'],
				'5': ['template.html', 'preview.js', 'package.json', 'css.scss', 'components/Module.js'],
				'6': ['preview.js', 'css.scss', 'components/Module.js'],
				'7': ['preview.js', 'css.scss', 'components/Module.js'],
				'8': ['preview.js', 'css.scss', 'components/Module.js']
			}
		}
		this.regex = {
			option: /[12345678]/g
		}
		this.moduleName = this.path.dirname.users.replace(/^\_/g);
		this.categoryName = {
			gd: '柵格（grid）',
			row: '列（row）',
			col: '欄（column）',
			alt: '警訊（alerts）',
			act: '自動完成提示（autocomplete）',
			atp: '回頁首（affix top）',
			bc: '麵包屑（breadcrumb）',
			bn: '橫幅（banner）',
			bst: '訂選位（booking、seats）',
			bt: '按鈕樣式（button）',
			btg: '按鈕組合（button group）',
			cd: '卡片面板（cards、panel）',
			cdt: '計時器（timer）',
			cht: '圖表（charts）',
			cl: '輪播（carousel）',
			clp: '展開 / 收合（collapse）',
			cr: '單複選（checkbox、radio）',
			cy: '月曆（calendar）',
			dmk: '紙娃娃（doll maker）',
			dtm: '目的地選單（destination menu）',
			fcl: '表單控制（form control）',
			ft: '頁尾（footer）',
			hd: '頁首（header）',
			hr: '分隔線（line）',
			ic: '圖示（icon font）',
			int: '輸入元件（input）',
			lb: '標籤徽章（label、badge）',
			lbx: '光箱（lightbox）',
			lig: '列表（list group）',
			mdl: '對話框（modal）',
			mq: '跑馬燈（marquee）',
			ntb: '導航頁籤（nav tabs）',
			nv: '導航（navs）',
			nvb: '導航列（navbar）',
			nvm: '導航選單組（navmenus）',
			pg: '分頁（pagination）',
			pp: '泡泡框（popovers）',
			ps: '進度、步驟條（progress）',
			rli: '結果列表組合（result list）',
			sf: '搜尋與篩選（search、filter）',
			st: '下拉選單（select）',
			tb: '表格（table）',
			th: '標題（title）',
			tp: '提示文字（tips）',
			ua: '使用者頭像（user avatar）',
			cmg: '組合模組（combine group）'
		};
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
						fs.rename(`${this.path.root.users}/.npmignore`, `${this.path.root.users}/.gitignore`)
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
	copy (answer, callback) {
		copydir(path.resolve(this.path.root.global, this.map.path[answer]), this.path.root.users, callback);
	}
	rewriteName (answer) {
		let rewrites = this.map.rewrites[answer];
		if ( Array.isArray(rewrites) && rewrites.length > 0 ) {
			rewrites.forEach(( filename, index ) => {
				let filePath = path.resolve(this.path.root.users, filename);
				pp.preprocessFileSync(filePath, filePath, {
					ModuleName: this.moduleName,
					ModuleReactName: this.moduleName.split('_').map(( val ) => {
						return val.charAt(0).toUpperCase() + val.slice(1);
					}).join(''),
					CategoryName: this.categoryName[this.moduleName.split('_')[0]],
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



