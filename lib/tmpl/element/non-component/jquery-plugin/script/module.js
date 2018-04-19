/**
 * Define module name here 
 */
const ModuleName = '/* @echo ModuleName */';
/**
 * Props default value write here
 */
const ModuleDefaults =  {
    properties: 'value'
};
/**
 * Define you want to get function returns from outside of scope
 */
const ModuleReturns = [];

class Module {
    constructor (ele, options) {
        this.ele = ele;
        this.$ele = $(ele);
        this.option = options;
    }
    init () {
        // first run here
    }
    methods () {
        return this;
    }
}

export { ModuleName, ModuleDefaults, ModuleReturns, Module };