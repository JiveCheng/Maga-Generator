const ModuleName = '/* @echo ModuleName */';
const ModuleDefaults =  {
    properties: value
};
const ModuleReturns = [];

class Module {
    constructor (ele, options) {
        this.ele = ele;
        this.$ele = $(ele);
        this.option = options;
    }
    init () {
        return this;
    }
    methods () {
        return this;
    }
}

export { ModuleName, ModuleDefaults, ModuleReturns, Module };