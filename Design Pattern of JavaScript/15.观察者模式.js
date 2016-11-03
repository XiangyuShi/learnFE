/**
 * Created by hnsxy on 2016/11/3 0003.
 */
//Observer：发布-订阅者模式或者消息机制，定义了一种依赖关系，解决了主体对象与观察者之间功能的耦合
//将观察者放在闭包中，当页面加载就立即运行
var Observer = (function () {
    //防止消息队列暴露而被篡改 所以将消息容器作为静态私有变量保存
    var _messages = {};
    return {
        //注册信息接口
        regist: function (type, fn) {
            //如果消息不存在，创建一个该消息类型
            if (typeof _messages[type] === 'undefined') {
                //将动作推入到该消息对应的动作执行队列中
                _messages[type] = [fn];
            } else {
                _messages[type].push(fn);
            }
        },
        //发布消息
        fire: function (type, args) {
            //如果消息没有被注册，则返回
            if (!_messages[type])
                return;
            var events = {
                    type: type,
                    args: args || {}
                },
                i = 0,
                len = _messages[type].length;
            for (; i < len; i++) {
                _messages[type][i].call(this, events);
            }
        },
        //移除消息接口
        remove: function (type, fn) {
            //如果消息动作队列存在
            if (_messages[type] instanceof Array) {
                var i = _messages[type].length - 1;
                for (; i >= 0; i--) {
                    _messages[type][i] === fn && _messages[type].splice(i, 1);
                }
            }
        }
    }
})();
Observer.regist('test', function (e) {
    console.log(e.type, e.args.msg);
})
Observer.fire('test', {msg: '传递参数'});

/**
 * 对象间解耦
 */
//学生类
var Student = function (result) {
    var that = this;
    that.result = result;
    that.say = function () {
        console.log(that.result);
    }
};
Student.prototype.answer = function (question) {
    Observer.regist(question, this.say);
}
Student.prototype.sleep = function (question) {
    console.log(this.result + ' ' + question + '已被注销');
    Observer.remove(question, this.say);
}
var Teacher = function () {

};
Teacher.prototype.ask = function (question) {
    console.log('问题是' + question);
    Observer.fire(question);
}
var student1 = new Student('学生1回答问题'),
    student2 = new Student('学生2回答问题'),
    student3 = new Student('学生3回答问题');
student1.answer('什么是设计模式');
student1.answer('简述观察者模式');
student2.answer('什么是设计模式');
student3.answer('什么是设计模式');
student3.answer('简述观察者模式');
student3.sleep('简述观察者模式');
var teacher = new Teacher();
teacher.ask('什么是设计模式');
teacher.ask('简述观察者模式');