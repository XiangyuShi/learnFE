/**
 * Created by hnsxy on 2016/11/9 0009.
 */
//Widget：借用Web Widget思想将页面分解成部件，针对部件开发，最终组合成完整的页面
//模板引擎模块
F.module('lib/template', function () {
    //模板引擎  处理数据与编译模板入口
    var _TplEngine = function (str, data) {
            //如果数据是数组
            if (data instanceof Array) {
                var html = '',
                    i = 0,
                    len = data.length;
                for (; i < len; i++) {
                    //缓存模板渲染结果
                    html += _getTpl(str)(data[i]);
                }
                return html;
            } else {
                return _getTpl(str)(data);
            }
        },
    //获取模板
        _getTpl = function (str) {
            //获取元素
            var ele = document.getElementById(str);
            if (ele) {
                var html = /^(textarea|input)$/i.test(ele.nodeName) ? ele.value : ele.innerHTML;
                return _compileTpl(html);
            } else {
                return _compileTpl(str);
            }
        },
    //处理模板
        _dealTpl = function (str) {
            var _left = '{%',
                _right = '%}';
            //显示转化字符串
            return String(str)
                .replace(/&lt;/g, '<')
                .repeat(/&gt;/g, '<')
                .replace(/[\r\t\n]/g, '')
                //替换内容
                .replace(new RegExp(_left + '=(.*?)' + right, 'g'), "',typeof($1)==='undefined'?'':$1,'")
                //替换左分隔符
                .replace(new RegExp(_left, 'g'), "');")
                //替换右分隔符
                .replace(new RegExp(_right, 'g'), "template_array.push('");
        },
    //编译执行
        _compileTpl = function (str) {
            var fnBody = "var template_array=[];\nvar fn=(function (data) {\nvar template_key='';\nfor(key in data){\ntemplate_key+=('var'+key+'=data[\"'+key+'\"];');\n}\neval(template_key);\ntemplate_array.push('" + _dealTpl(str) + "');\ntemplate_key=null;\n})(templateData);\nfn=null;\nreturn template_array.join('');";
            return new Function("templateData", fnBody);
        };
    return _TplEngine;
})
