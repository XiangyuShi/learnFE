/**
 * Created by hnsxy on 2016/11/1 0001.
 */
//Facade：为一组复杂的子系统接口提供一个更高级的统一接口，通过这个接口使得对子系统接口的访问更容易

function addEvent(dom, type, fn) {
    //对于支持DOM2级事件处理程序addEventListener方法的浏览器
    if (dom.addEventListener) {
        dom.addEventListener(type, fn, false);
    }
    //对于不支持addEventListener方法但是支持attachEvent方法的浏览器
    else if (dom.attachEvent) {
        dom.attachEvent('on' + type, fn);
    }
    //对于两个方法都不支持的浏览器，但支持on+'事件名'的浏览器
    else {
        dom['on' + type] = fn;
    }
}
var myInput=document.getElementById('myInput');
addEvent(myInput,'click',function () {
    console.log('绑定第一个事件');
})
addEvent(myInput,'click',function () {
    console.log('绑定第二个事件');
})
