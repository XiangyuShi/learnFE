/**
 * Created by hnsxy on 2016/11/8 0008.
 */
//SMD（Synchronous Module Definition）：请求发出后，无论模块是否存在，立即执行后续的逻辑，实现模块开发中对模块的立即引用
//定义模块管理器单体对象
var F = F || {};
/**
 * 定义模版方法（应该放到闭包中）
 * @param str 模块路由
 * @param fn  模块方法
 */
F.define = function (str, fn) {
    //解析模块路由
    var parts = str.split('.'),
    //old当前模块祖父模块，parent当前模块父亲模块
    //如果在闭包中，为了屏蔽模块直接访问，建议将模块添加给闭包内部私有变量
        old = parent = this,
        i = len = 0;
    //如果第一个模块是模块管理器单体对象，则删除
    if (parts[0] === 'F') {
        parts = parts.slice(1);
    }
    //屏蔽对define与module模块方法的重写
    if (parts[0] === 'define' || parts[0] === 'module') {
        return;
    }
    //遍历路由模块并定义每层模块
    for (len = parts.length; i < len; i++) {
        //如果父模块中不存在当前模块
        if (typeof parent[parts[i]] === 'undefined') {
            //声明当前模块
            parent[parts[i]] = {};
        }
        //缓存下一层的祖父模块
        old = parent;
        parent = parent[parts[i]];
    }
    //如果给定模块方法则定义该模块方法
    if (fn) {
        //此时i等于parts.length，所以减1
        old[parts[--i]] = fn();
    }
    return this;
}
//F.string 模块
F.define('string', function () {
    return {
        trim: function (str) {
            return str.replace(/^\s+|\s+$/g, '')
        }
    }
});
console.log(F.string.trim('ceshi'));
F.define('dom', function () {
    var $ = function (id) {
        $.dom = document.getElementById(id)
        return $;
    }
    $.html = function (html) {
        if (html) {
            this.dom.innerHTML = html;
        } else {
            return this.dom.innerHTML;
        }
    }
    return $;
});
console.log(F.dom('test').html());
//模块调用
F.module = function () {
    //将参数转化为数组
    var args = [].slice.call(arguments),
        fn = args.pop(),
        parts = args[0] && args[0] instanceof Array ? args[0] : args,
    //依赖模块列表
        modules = [],
        modIDs = '',
    //依赖模块索引
        i = 0,
    //依赖模块长度
        ilen = parts.length,
        parent, j, jlen;
    while (i < len) {
        if (typeof parts[i] === 'string') {
            parent = this;
            modIDs = parts[i].replace(/^F\./, '').split('.');
            for (j = 0, jlen = modIDs.length; j < jlen; j++) {
                parent = parent[modIDs[j]] || false;
            }
            modules.push(parent);
        } else {
            modules.push(parts[i]);
        }
        i++;
    }
    fn.apply(null, modules);
}
//调用模块
F.module(['dom', document], function (dom, doc) {
    dom('test').html('new add');
    //doc.body.style.background='red';
})
F.module('dom', 'string.trim', function (dom, trim) {
    var html = dom('test').html();
    var str = trim(html);
    console.log("*" + html + "*", "*" + str + "*");
})
