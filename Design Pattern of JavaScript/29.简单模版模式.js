/**
 * Created by hnsxy on 2016/11/8 0008.
 */
//Simple template:通过格式化字符串拼凑出视图，避免创建视图时大量节点操作，优化内存开销
A.view = function (name) {
    var v = {
        code: '<pre><code>{#code#}</code></pre>',
        img: '<img src="{#src#}" alt="{#alt#}" title="{#title#}"/>',
        part: '<div id="{#id#}" class="{#class#}">{#part#}</div>',
        theme: [
            '<div>',
            '<h1>{#title#}</h1>',
            '{#content#}',
            '</div>'
        ].join('')
    }
    if (Object.prototype.toString.call(name) === "[object Array]") {
        var tpl = ''
        for (var i = 0, len = name.length; i < len; i++) {
            tpl += arguments.callee(name[i]);
        }
        return tpl;
    } else {
        return v[name] ? v[name] : ('<' + name + '>{#' + name + '#}</' + name + '>')
    }
}
var A = A || {}

A.strategy = {
    listPart: function (data) {
        tpl = A.view(['h2', 'p', 'ul'])
        litpl = A.formateString(A.view('li'), {li: A.view(['strong', 'span'])})
    }
}
