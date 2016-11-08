/**
 * Created by hnsxy on 2016/11/4 0004.
 */
//Visitor：针对对象结构中的元素，定义在不改变该对象的前提下访问结构中元素的新方法
var Visitor = (function () {
    return {
        //截取方法
        splice: function () {
            //splice方法参数，从原参数的第二个参数开始算起
            var args = Array.prototype.splice.call(arguments, 1);
            //对于第一个参数对象执行splice方法
            return Array.prototype.splice.apply(arguments[0], args);
        },
        //追加数据方法
        push: function () {
            //强化类数组对象，使他拥有length属性
            var len = arguments[0].length || 0;
            var args = this.splice(arguments, 1);
            arguments[0].length = len + arguments.length - 1;
            return Array.prototype.push.apply(arguments[0], args);
        },
        //弹出最后一次添加的元素
        pop: function () {
            return Array.prototype.pop.apply(arguments[0]);
        }
    }
})();

var a = new Object();
console.log(a.length);
Visitor.push(a, 1, 2, 3, 4)
console.log(a.length);
Visitor.push(a, 4, 5, 6)
console.log(a);
console.log(a.length);
Visitor.pop(a)
console.log(a.length);
Visitor.splice(a, 2)
console.log(a);