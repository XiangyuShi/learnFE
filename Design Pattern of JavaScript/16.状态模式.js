/**
 * Created by hnsxy on 2016/11/4 0004.
 */
//State:当一个对象的内部状态发生改变时，会导致其行为的改变，这看起来像是改变了对象
//创建超级玛丽状态类
var MarryState = function () {
    //内部状态私有变量
    var _currentState = {},
        states = {
            jump: function () {
                console.log('jump');
            },
            move: function () {
                console.log('move');
            },
            shoot: function () {
                console.log('shoot');
            },
            squat: function () {
                console.log('squat');
            }
        };
    var Action = {
        changeState: function () {
            var arg = arguments;
            _currentState = {};
            if (arg.length) {
                for (let i = 0, len = arg.length; i < len; i++) {
                    _currentState[arg[i]] = true;
                }
            }
            return this;
        },
        goes: function () {
            console.log('触发一次动作');
            for (let i in _currentState) {
                states[i] && states[i]();
            }
            return this;
        }
    }
    return {
        change: Action.changeState,
        goes: Action.goes
    }
}

var marry = new MarryState();
marry.change('jump', 'shoot')
    .goes()
    .goes()
    .change('shoot')
    .goes();