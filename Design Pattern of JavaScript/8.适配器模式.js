/**
 * Created by hnsxy on 2016/11/1 0001.
 */
//Adapter：将一个类（对象）的接口（方法或者属性）转化成另外一个接口，以满足用户需求，使类（对象）之间接口的不兼容问题通过适配器得以解决
//第一种：定义框架
var A = A || {};
//通过ID获取元素
A.g = function (id) {
    return document.getElementById(id);
}
//为元素绑定事件
A.on = function (id, type, fn) {
    //如果传递参数是字符串则以id处理，否则以元素对象处理
    var dom = typeof id === 'string' ? this.g(id) : id;
    //标准DOM2级添加事件方式
    if (dom.addEventListener) {
        dom.addEventListener(type, fn, false);
    }
    //IE DOM2级添加事件方式
    else if (dom.attachEvent) {
        dom.attachEvent('on' + type, fn);
    }
    //简易添加事件方式
    else {
        dom['on' + type] = fn;
    }
}
//窗口加载完成事件
A.on(window, 'load', function () {
    //按钮点击事件
    A.on('mybutton', 'click', function () {
        //do something
    })
})
//异类框架适配器
A.g = function (id) {
    //通过jQuery获取jQuery对象，然后返回第一个成员
    return $(id).get(0);
}
A.on = function (id, type, fn) {
    //如果传递参数是字符串则以id处理，否则以元素对象处理
    var dom = typeof id === 'string' ? $('#' + id) : $(id);
    dom.on(type, fn);
}

//第二种参数适配器
function doSomeThing(obj) {
    var _adapter = {
        name: 'aaa',
        title: 'bbb',
        age: 25,
        color: 'blue',
        size: 100,
        prize: 50
    };
    for (var i in _adapter) {
        _adapter[i] = obj[i] || _adapter[i];
    }
    //或者extend(_adapter,obj) 注：此时可能会添加属性
    //do something
}
// 数据适配  和  服务器数据适配