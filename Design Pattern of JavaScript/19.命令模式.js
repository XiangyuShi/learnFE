/**
 * Created by hnsxy on 2016/11/4 0004.
 */
//Command:将请求与实现解耦并封装成独立对象，从而使不同的请求对客户端的实现参数化
//绘图命令
var ConvasCommand = (function () {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    var Action = {
        //填充色彩
        fillStyle: function (c) {
            ctx.fillStyle = c;
        },
        //填充矩形
        fillRect: function (x, y, width, height) {
            ctx.fillRect(x, y, width, height);
        },
        //描边色彩
        strokeStyle: function (c) {
            ctx.strokeStyle = c;
        },
        //描边矩形
        strokeRect: function (x, y, width, height) {
            ctx.strokeRect(x, y, width, height);
        }
        //...
    }
    return {
        //命令接口
        excute: function (msg) {
            if (!msg)
                return;
            if (msg.length) {
                for (let i = 0, len = msg.length; i < len; i++)
                    arguments.callee(msg[i]);
            }
            else {
                msg.param = Object.prototype.toString.call(msg.param) === "[object Array]" ? msg.param : [msg.param];
                Action[msg.command].apply(Action, msg.param);
            }
        }
    }
})();

ConvasCommand.excute([
    {command: 'fillStyle', param: 'red'},
    {command: 'fillRect', param: [20, 20, 100, 100]}
]);
