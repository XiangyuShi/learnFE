/**
 * Created by hnsxy on 2016/11/4 0004.
 */
//Mediator:通过中介者对象封装一系列对象之间的交互，使对象之间不再互相引用，降低他们之间的耦合。有时中介者对象也可以改变对象之间的交互
var Mediator = function () {
    var _msg = {};
    return {
        register: function (type, action) {
            if (_msg[type])
                _msg[type].push(action)
            else {
                _msg[type] = []
                _msg[type].push(action)
            }
        },
        send: function (type) {
            if (_msg[type]) {
                for (let i = 0, len = _msg[type].length; i < len; i++)
                    _msg[type][i] && _msg[type][i]()
            }
        }
    }
}()

Mediator.register('demo', function () {
    console.log('first');
})
Mediator.register('demo', function () {
    console.log('second');
})
Mediator.send('demo')