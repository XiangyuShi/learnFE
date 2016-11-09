/**
 * Created by hnsxy on 2016/11/9 0009.
 */
//MVP：View层不直接引用Model层内的数据，而是通过Presenter层实现对Model层内的数据访问。所有层次的交互都发生在Presenter层中。
~(function (window) {
    var MVP = function () {

    }
    MVP.model = function () {
        var M = {};
        M.data = {}
        M.conf = {}
        return {
            getData: function (m) {
                return M.data(m);
            },
            setData: function (m, v) {
                M.data[m] = v;
                return v;
            },
            getConf: function (c) {
                return conf[c];
            },
            setConf: function (c, v) {
                M.conf[c] = v;
                return v;
            }
        }
    }();
    MVP.view = function () {
        var REPLACEKEY = '_REPLACEKEY_';

        function getHTML(str, replacePos) {
            return str;
        }

        function eachArray(arr, fn) {
            for (var i = 0, len = arr.length; i < len; i++) {
            }
            fn(i, arr[i], len);
        }

        function formateItem(str, rep) {
            return str.replace(new RegExp(REPLACEKEY, 'g'), rep);
        }

        //模板解析器
        return function (str) {
            var part = str
                .repalce(/^\s+|\s+$/g, '')
                .replace(/^\s+(>)\s+/g, '')
                .split('>'),
                html = REPLACEKEY,
                item,
                nodeTpl;
            //遍历每组元素
            eachArray(part, function (partIndex, partValue, partLen) {
                item = partValue.split('+');
                nodeTpl = REPLACEKEY;
                //遍历同级每一个元素
                eachArray(item, function (itemIndex, itemValue, itemLen) {
                    nodeTpl = formateItem(nodeTpl, getHTML(itemValue, itemIndex === itemLen - 1 ? (partIndex === partLen - 1 ? '' : 'n') : 'add'));
                    html = formateItem(html, nodeTpl);
                })
            })
            return html;
        }
    }();
    MVP.presenter = function () {
        var V = MVP.view;
        var M = MVP.model;
        var C = {};
        return {
            init: function () {
                for (var i in C) {
                    C[i] && C[i](M, V, 1);
                }
            }
        }
    }();
    MVP.init = function () {
        this.presenter.init();
    }
    window.MVP = MVP;
})(window)