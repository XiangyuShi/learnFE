/**
 * Created by hnsxy on 2016/11/7 0007.
 */
//Interpreter:对于一种语言，给其文法表示形式，并定义一种解释器，通过使用这种解释器来解释语言中定义的句子
//获取兄弟元素名称
function getSublingName(node) {
    //如果存在兄弟结点
    if (node.previousSibling) {
        var name = '',
            count = 1,
            nodeName = node.nodeName,
            sibling = node.previousSibling;
        while (sibling) {
            //如果结点为元素，并且结点类型与前一个兄弟元素类型相同，并且前一个兄弟元素名称存在
            if (sibling.nodeType == 1 && sibling.nodeType === node.nodeType && sibling.nodeName) {
                //如果结点名称和前一个兄弟元素名称相同
                if (nodeName == sibling.nodeName) {
                    name += ++count;
                } else {
                    count = 1;
                    name += '|' + sibling.nodeName.toUpperCase();
                }
            }
            //向前获取前一个兄弟元素
            sibling = sibling.previousSibling;
        }
        return name;
    } else {
        return '';
    }
}
//XPath解释器
var Interpreter = (function () {
    function getSublingName(node) {
        //...
    }

    return function (node, wrap) {
        var path = [],
            wrap = wrap || document;
        //如果当前结点等于同期结点
        if (node === wrap) {
            //容器结点为元素
            if (wrap.nodeType == 1) {
                path.push(wrap.nodeName.toUpperCase());
            }
            return path;
        }
        //如果当前结点的父节点不等于容器结点
        if (node.parentNode !== wrap) {
            //对当前结点的父节点执行遍历操作
            path = arguments.callee(node.parentNode, wrap);
        }
        else {
            if(wrap.nodeType==1){
                path.push(wrap.nodeName.toUpperCase());
            }
        }
        //获取元素的兄弟元素名称统计
        var sublingNames=getSublingName(node);
        if(node.nodeType==1){
            path.push(node.nodeName.toUpperCase()+sublingNames);
        }
        return path;
    }
})();

var path=Interpreter(document.getElementById('span7'));
console.log(path.join('>'));