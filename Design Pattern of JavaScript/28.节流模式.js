/**
 * Created by hnsxy on 2016/11/8 0008.
 */
//Throttler:对重复的业务逻辑进行节流控制，执行最后一次操作并取消其他操作，以提高性能
//节流器
var throttle = function () {
    //获取第一个参数
    var isClear = arguments[0], fn;
    //如果第一个参数是boolean类型，那么第一个参数则表示是否清除计时器
    if (typeof isClear === 'boolean') {
        fn = arguments[1];
        //函数的计时器句柄存在，则清除该计时器
        fn._throttleID && clearTimeout(fn._throttleID);
    } else {
        fn = isClear;
        param = arguments[1];
        //对执行的参数适配默认值
        var p = extend({
            context: null,
            args: [],
            time: 300
        }, param)
        arguments.callee(true, fn)
        fn._throttleID = setTimeout(function () {
            fn.apply(p.context, p.args)
        }, p.time)
    }
}
//返回顶部按钮动画
function moveScroll() {
    var top = $(document).scrollTop();
    $.('#back').animate({top: top + 300},400,'easeOutCubic')
}
//监听页面滚动事件
$(window).on('scroll', function () {
    throttle(moveScroll)
})