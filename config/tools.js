const fs = require('fs');

// 读取less全局变量至less-loader
const getLessVariables = fileList => {
    let variables = {};
    fileList.forEach(file => {
        let themeContent = fs.readFileSync(file, 'utf-8');
        themeContent.split('\n').forEach(function(item) {
            if (item.startsWith('//') || item.indexOf('/*') > -1) return;
            let _pair = item.split(':');
            if (_pair.length < 2) return;
            let key = _pair[0].replace('\r', '').replace('@', '');
            if (!key) return;
            let value = _pair[1]
                .replace(';', '')
                .replace('\r', '')
                .replace(/^\s+|\s+$/g, '')
                .replace(/(\s*\/\/.*)/g, '');
            variables[key] = value;
        });
    });
    return variables;
};

// 插件：保存时clear日志
class CleanTerminalPlugin {
    constructor(options = {}) {
        this.time = 0;
    }

    apply(compiler) {
        this.useCompilerHooks(compiler);
    }

    useCompilerHooks(compiler) {
        compiler.hooks.afterCompile.tap('CleanTerminalPlugin', () => this.clearConsole());
    }

    clearConsole() {
        if (this.time > 2) {
            console.clear();
        } else {
            this.time++;
        }
    }
}

module.exports = {
    getLessVariables,
    CleanTerminalPlugin
};
