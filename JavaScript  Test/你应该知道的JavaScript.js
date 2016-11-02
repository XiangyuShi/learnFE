/**
 * Created by hnsxy on 2016/11/2 0002.
 * 引用于http://youbookee.com/2016/08/30/js-you-should-know/
 */
//code one
if (!("a" in window)) {
    var a = 1;
}
alert(a);
/**
 * alert的是”undefined”
 * 首先， 所有的全局变量都是window的属性。 var a = 1 完全等价于window.a = 1。
 *第二， 所有的变量声明都会被提升(hositing)至所在作用域的顶部
 */

//code two
var a = 1,
    b = function a(x) {
        x && a(--x);
    };
alert(a);
/**
 * 变量声明提升
 *函数声明提升。所有的函数声明同变量声明一样都会被提升至当前的作用域顶部。
 * 函数声明会覆盖了变量声明但没有覆盖变量初始化
 */

//code three
function b(x, y, a) {
    arguments[2] = 10;
    alert(a);
}
b(1, 2, 3);
/**
 * 每一个参数在arguments对象中都是一个同名的副本
 */

//code four
var b = 5;
function a() {
    var b = 10;
    alert(this.b);
}
a.call(null);
/**
 *alert 5
 */