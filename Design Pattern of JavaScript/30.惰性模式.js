/**
 * Created by hnsxy on 2016/11/8 0008.
 */
//layier：减少每次代码执行时的重复性的分支判断，通过对对象重定义来屏蔽原对象中的分支判断
/**
 * 第一种：加载时通过闭包执行该方法对其重新定义，会使页面加载时占用一定资源
 */
var A = {};
A.on = function (dom, type, fn) {
    if (document.addEventListener) {
        return function (dom, type, fn) {
            dom.addEventListener(type, fn, false)
        }
    }
    else if (document.attachEvent) {
        return function (dom, type, fn) {
            dom.attachEvent('on' + type, fn)
        }
    }
    else {
        return function (dom, type, fn) {
            dom['on' + type] = fn;
        }
    }
}
console.log(A.on);

/**
 * 第二种：基于第一种延迟执行，惰性执行
 */
A.on = function (dom, type, fn) {
    if (document.addEventListener) {
        A.on = function (dom, type, fn) {
            dom.addEventListener(type, fn, false)
        }
    }
    else if (document.attachEvent) {
        A.on = function (dom, type, fn) {
            dom.attachEvent('on' + type, fn)
        }
    }
    else {
        A.on = function (dom, type, fn) {
            dom['on' + type] = fn;
        }
    }
    A.on(dom, type, fn);
};
A.on(document.body, 'click', function () {
    alert(11)
})