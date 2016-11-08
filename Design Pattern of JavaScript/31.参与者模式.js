/**
 * Created by hnsxy on 2016/11/8 0008.
 */
//participator：在特定的作用域中执行给定的函数，并将参数原封不动地传递
/**
 * 函数柯里化
 */
function curry(fn) {
    var Slice = [].slice;
    var args = Slice.call(arguments, 1);
    return function () {
        //将参数转化为数组
        var addArgs = Slice.call(arguments),
        //拼接函数
            allArgs = args.concat(addArgs);
        //返回新函数
        return fn.apply(null, allArgs)
    }
}
//加法器
function add(num1, num2) {
    return num1 + num2;
}
function add5(num) {
    return add(5, num);
}
console.log(add(1, 2));
console.log(add5(6));
var add5 = curry(add, 5);
console.log(add5(7));
var add7and8 = curry(add, 7, 8);
console.log(add7and8());
//重写bind
function bind(fn, context) {
    var Slice = Array.prototype.slice,
        args = Slice.call(arguments, 2);
    return function () {
        //将参数转化为数组
        var addArgs = Slice.call(arguments),
        //拼接函数
            allArgs = args.concat(addArgs);
        //返回新函数
        return fn.apply(context, allArgs)
    }
}
var demoData1 = {
        text: '第一组数据'
    },
    demoData2 = {
        text: '第二组数据'
    };
var bindFn = bind(demoFn, btn, demoData1);
var bindFn = bind(demoFn, btn, demoData1, demoData2);
var bindFn = bind(demoFn, p, demoData1);
