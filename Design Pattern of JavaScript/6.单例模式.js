/**
 * Created by hnsxy on 2016/11/1 0001.
 */
//Singleton：只允许实例化一次的对象类。用于命名空间，模块管理，小型代码库，静态变量。

//无法修改的静态变量
var Conf = (function () {
    var conf = {
        MAX_NUM: 100,
        MIN_NUM: 1,
        COUNT: 1000
    }
    //返回取值器对象
    return {
        //取值器对象
        get: function (name) {
            return conf[name] ? conf[name] : null;
        }
    }
})();
var count = Conf.get('COUNT');
console.log(count);

//惰性单例
//惰性载入单例
var LazySingle = (function () {
    //单例实例引用
    var _instance = null;
    //单例
    function Single() {
        /*这里定义私有属性和方法*/
        return {
            publicMethod: function () {

            },
            publicProperty: '1.0'
        }
    }
    //获取单例对象接口
    return function () {
        //如果为创建单例将创建单例
        if (!_instance) {
            _instance = Single();
        }
        //返回单例
        return _instance;
    }
})();

console.log(LazySingle().publicProperty);