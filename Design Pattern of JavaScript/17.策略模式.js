/**
 * Created by hnsxy on 2016/11/4 0004.
 */
//Strategy：将定义一组算法封装起来，使其互相之间可以替换。封装的算法具有一定的独立性，不会随客户端变化而变化
//价格策略对象
var PriceStrategy = function () {
    var stragtegy = {
        return30: function (price) {
            return +price + parseInt(price / 100) * 30;
        },
        return50: function (price) {
            return +price + parseInt(price / 100) * 50;
        },
        percent90: function (price) {
            return price * 100 * 90 / 10000;
        },
        percent80: function (price) {
            return price * 100 * 80 / 10000;
        },
        percent50: function (price) {
            return price * 100 * 50 / 10000;
        }
    }
    //调用接口
    return function (algorithm, price) {
        return stragtegy[algorithm] && stragtegy[algorithm](price);
    }
}();

var price = PriceStrategy('return50', '314.55');
console.log(price);

/**
 * 缓冲函数
 * 表单验证的正则算法
 */