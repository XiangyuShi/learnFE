/**
 * Created by hnsxy on 2016/11/9 0009.
 */
//Widget：借用Web Widget思想将页面分解成部件，针对部件开发，最终组合成完整的页面
//模板引擎模块
window.me = window.me || {};
window.me.template = (function (window, document, undefined) {

    /**
     * 内容替换
     * @param str
     * @private
     */
    function _dealTpl(str) {
        var _left = '{%',
            _right = '%}';

        return String(str)
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/[\r\t\n]/g, '')
            .replace(new RegExp(_left + '=(.*?)' + _right, 'g'), "',typeof($1)==='undefined'?'':$1,'")
            .replace(new RegExp(_left, 'g'), "');")
            .replace(new RegExp(_right, 'g'), "template_array.push('");
    }

    /**
     * 编译模版
     * @param str
     * @private
     */
    function _compileTpl(str) {
        var fnBody = "var template_array=[];\n" +
            "var fn=(function(data){\n" +
            "var template_key='';\n" +
            "for(key in data) {\n" +
            "template_key+=('var ' + key+'=data[\"'+key+'\"];');\n" +
            "}\n" +
            "eval(template_key);\n" +
            "template_array.push('" + _dealTpl(str) + "');\n" +
            "template_key=null;\n" +
            "})(templateData);\n" +
            "fn = null;\n" +
            "return template_array.join('');";

        return new Function('templateData', fnBody);
    }

    /**
     * 获取模版
     * @param str
     * @private
     */
    function _getTpl(str) {
        var ele = document.getElementById(str);

        if (ele) {
            var html = /^(texttarea|input)$/i.test(ele.nodeName) ? ele : ele.innerHTML;
            return _compileTpl(html);
        } else {
            return _compileTpl(str);
        }
    }


    return {
        /**
         * 模版引擎，处理数据于编译模版的入口
         * @param str
         * @param data
         * @private
         */
        tplEngine: function (str, data) {
            if (data instanceof Array) {
                var html = '',
                    i = 0,
                    len = data.length;

                for (; i < len; i++) {
                    html += _getTpl(str)(data[i]);
                }

                return html;
            } else {
                return _getTpl(str)(data);
            }
        }
    }
}(window, document, undefined));

var data = {
    tagCloud: [
        {
            is_selected: true,
            title: '设计模式',
            text: '设计模式吧啦吧吧啦吧啦吧啦'
        },
        {
            is_selected: false,
            title: 'html',
            text: 'hmtlbababababababababab'
        },
        {
            is_selected: null,
            title: 'CSS',
            text: 'cssbababababababbabababa'
        },
        {
            is_selected: '',
            title: 'Javascript',
            text: 'jsbabababababababababab'
        }
    ]
};

var html = window.me.template.tplEngine('demo_tag', data);

console.log(html);