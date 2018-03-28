import { ModuleName, ModuleDefaults, ModuleReturns, Module } from './script/module.js';
const root = ((root) => {
    if (typeof root === 'object' && (root.self === root || root.global === global) && root) {
        return root;
    }
})(self || global || {});

const $ = (($) => {
    if (typeof $ === 'function') {
        return $;
    } else {
        throw new Error('You must import jQuery');
    }
})(root.jQuery);

$.fn[ModuleName] = function () {
    let args = Array.prototype.slice.call(arguments, 0);
    let method = args[0];
    let options = args.slice(1).length <= 0 ? void 0 : args.slice(1, args.length);
    let isReturnMethod = this.length === 1 && typeof method === 'string' && ModuleReturns.indexOf(method) !== -1;
    let methodRunner = function (method, options, uesReturn) {
        let $this = $(this);
        let module = $this.data(ModuleName);
        if (module) {
            if (typeof method === 'string' && !uesReturn) {
                module[method].apply(module, options);
            } else if (typeof method === 'string' && !!uesReturn) {
                return module[method].apply(module, options);
            } else {
                throw new Error('unsupported options!');
            }
        } else {
            throw new Error('You must run first this plugin!');
        }
    };
    if (isReturnMethod) {
        return methodRunner.call(this, method, options, isReturnMethod);
    } else {
        return this.each(function () {
            let $this = $(this);
            let module = $this.data(ModuleName);
            let opts = null;
            if (module) {
                methodRunner.call(this, method, options);
            } else {
                opts = $.extend(true, {}, ModuleDefaults, (typeof method === 'object' && method), (typeof options === 'object' && options));
                module = new Module(this, opts);
                $this.data(ModuleName, module);
                module.init();
            }
        });
    }
};