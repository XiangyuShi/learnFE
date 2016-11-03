/**
 * Created by hnsxy on 2016/10/20 0020.
 */
//简单工厂模式就是创建对象
//LoginAlert、LoginConfirm、LoginPrompt3个类

function createPop(type, text) {
    var o = new Object();
    o.content = text;
    o.show = function () {
        //显示方法
    }
    if (type == 'alert') {
        //警示框差异部分
        console.log('警示框')
    }
    if (type == 'prompt') {
        //提示框差异部分
    }
    if (type == 'confirm') {
        //确认框差异部分
    }
    return o;

}

var userNameAlart = createPop('alert', '用户名只能是26个字母和数字');

//体育用品工厂模式
//篮球基类
var Basketball = function () {
    this.intro = '篮球';
}
Basketball.prototype = {
    getMember: function () {
        console.log('5个队员')
    },
    getBallSize: function () {
        console.log('篮球很大')
    }
}
//足球基类
var Football = function () {
    this.intro = '足球';
}
Football.prototype = {
    getMember: function () {
        console.log('11个队员')
    },
    getBallSize: function () {
        console.log('足球很大')
    }
}
//运动工厂
var SportsFactory = function (name) {
    switch (name) {
        case 'NBA':
            return new Basketball();
        case 'worldCup':
            return new Football();
    }
}
var football = SportsFactory('worldCup');
console.log(football)
console.log(football.intro)
football.getMember()