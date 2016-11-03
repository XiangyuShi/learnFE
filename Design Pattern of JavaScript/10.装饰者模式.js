/**
 * Created by hnsxy on 2016/11/2 0002.
 */
//Decorator：在不改变原对象的基础上，通过对其进行包装拓展（添加属性或者方法）使原有对象可以满足用户的复杂需求
//装饰者
var decorator = function (input, fn) {
    //获取事件源
    var input = document.getElementById(input);
    //若事件源已经绑定事件
    if (typeof input.onclick === 'function') {
        //缓存事件原有回调函数
        var oldClickFn = input.onclick;
        //为事件源定义新的事件
        input.onclick = function () {
            //事件源原有回调函数
            oldClickFn();
            //执行事件源新增回调函数
            fn();
        }
    } else {
        //事件源未绑定事件，直接为事件源添加新增回调函数
        input.onclick = fn;
    }
    //做其他事情
}
//电话输入框功能装饰
decorator('tel_input', function () {
    document.getElementById('tel_demo_text').style.display = 'none';
});
//姓名输入框功能装饰
decorator('name_input', function () {
    document.getElementById('name_demo_text').style.display = 'none';
});
//地址输入框功能装饰
decorator('adress_input', function () {
    document.getElementById('adress_demo_text').style.display = 'none';
});