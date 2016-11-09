/**
 * Created by hnsxy on 2016/11/8 0008.
 */
//AMD(Asynchronous Module Definition)：请求发出后，继续其他业务逻辑，知道模块加载完成执行后续的逻辑，实现模块开发中对模块加载完成后的引用
/**
 * 创建闭包环境
 */
~(function (F) {
    var moduleCache = {};
})(function () {
    return window.F = {};
})();
/**
 * 创建与调度模块
 * @param  url  参数为模块url
 * @param  deps  参数为依赖模块
 * @param  callback  参数为模块主函数
 */
F.module = function (url, modDeps, modCallback) {
    var args = [].slice.call(arguments),
    //获取模块构造函数（参数数组中最后一个参数成员）
        callback = args.pop(),
    //获取依赖模块（紧邻回调函数参数，且数据类型为数组）
        deps = (args.length && args[args.length - 1] instanceof Array) ? args.pop() : [],
        url = args.length ? args.pop() : null,
        params = [],
        depsCount = 0,
        i = 0,
        len;
    if (len = deps.length) {
        while (i < len) {
            //闭包保存i
            (function (i) {
                //增加未加载依赖模块数量统计
                depsCount++;
                loadModule(deps[i], function (mod) {
                    //依赖模块序列中添加依赖模块接口引用
                    params[i] = mod;
                    //依赖模块未加载完成，依赖模块数量统一减1
                    depsCount--;
                    if (depsCount === 0) {
                        //在模块缓存器中矫正该模块，并执行构造函数
                        setModule(url, params, callback);
                    }
                });
            })(i);
            i++;
        }

    }//无依赖模块，直接执行回调函数
    else {
        setModule(url, [], callback);
    }
}
/**
 * 加载模块
 * loadModule
 * setModule
 */
var moduleCache = {},
    setModule = function (moduleName, params, callback) {
        //模块容器，模块文件加载完成回调函数
        var _module, fn;
        if (moduleCache[moduleName]) {
            //获取模块
            _module = moduleCache[moduleName];
            //设置模块已经加载完成
            _module.status = 'loaded';
            //矫正模块接口
            _module.exports = callback ? callback.apply(_module, param) : null;
            //执行模块文件加载完成回调函数
            while (fn = _module.onload.shift()) {
                fn(_module.exports);
            }
        } else {
            //模块不存在,直接执行回调函数
            callback && callback.apply(null, params);
        }
    },
    /**
     * 异步加载依赖模块所在模块
     */
    loadModule = function (moduleName, callback) {
        //依赖模块
        var _module;
        //如果依赖模块被要求加载过
        if (moduleCache[moduleName]) {
            //获取该模块信息
            _module = moduleCache[moduleName];
            //如果模块加载完成
            if (_module.status === 'loaded') {
                //执行模块加载完成回调函数
                setTimeout(callback(_module.exports), 0);
            } else {
                //缓存该模块所处文件加载完成回调函数
                _module.onload.push(callback);
            }
        }//模块第一次被依赖引用
        else {
            //缓存该模块初始化信息
            moduleCache[moduleName] = {
                moduleName: moduleName,
                status: 'loading',
                exports: null,
                onload: [callback]
            };
            //加载模块对应文件
            loadScript(getUrl(moduleName));
        }
    },
    getUrl = function (moduleName) {
        //拼接完整的文件路径字符串，如：'lab/ajax'=>'lib/ajax.js'
        return String(moduleName).replace(/\.js$/g, '') + '.js';
    },
    loadScript = function (src) {
        //创建script元素
        var _script = document.createElement('script');
        _script.type = 'text/JavaScript';
        _script.charset = 'UTF-8';
        _script.async = true;
        _script.src = src;
        document.getElementsByTagName('head')[0].appendChild(_script);
    };
