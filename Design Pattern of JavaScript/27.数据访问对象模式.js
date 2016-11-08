/**
 * Created by hnsxy on 2016/11/8 0008.
 */
//Data access object-DAO：抽象和封装对数据源的访问与存储，DAO通过对数据源链接的管理，方便对数据的访问与存储
/**
 * 本地存储类
 */
var BaseLocalStorage = function (preId, timeSign) {
    this.preId = preId;
    this.timeSign = timeSign;
}
BaseLocalStorage.prototype = {
    status: {
        SUCCESS: 0,
        FALLURE: 1,
        OVERFLOW: 2,
        TIMEOUT: 3
    },
    storage: localStorage || window.localStorage,
    getKey: function (key) {
        return this.preId + key;
    },
    set: function (key, value, callback, time) {
        var status = this.status.SUCCESS,
            key = this.getKey(key);
        try {
            //参数时间参数时获取时间戳
            time = new Date(time).getTime() || time.getTime();
        } catch (e) {
            time = new Date().getTime() + 1000 * 60 * 60 * 24 * 31;
        }
        try {
            //向数据库添加数据
            this.storage.setItem(key, time + this.timeSign + value)
        } catch (e) {
            status = this.status.OVERFLOW;
        }
        callback && callback.call(this, status, key, value)
    },
    get: function (key, callback) {
        var status = this.status.SUCCESS,
            key = this.getKey(key),
            value = null,
            timeSignLen = this.timeSign.length,
            that = this,
            index,
            time,
            result;
        try {
            value = that.storage.getItem(key)
        } catch (e) {
            result = {
                status: that.status.FALLURE,
                value: null
            };
            callback && callback.call(this, result.status, result.value)
            return result;
        }
        if (value) {
            index = value.indexOf(that.timeSign)
            time = +value.slice(0, index)
            if (new Date(time).getTime() > new Date().getTime() || time == 0) {
                value = value.slice(index + timeSignLen)
            } else {
                value = null;
                status = that.status.TIMEOUT;
                that.remove(key)
            }
        } else {
            status = that.status.FALLURE;
        }
        result = {
            status: status,
            value: value
        };
        callback && callback.call(this, result.status, result.value)
        return result;
    },
    remove: function (key, callback) {
        var status = this.status.FALLURE,
            key = this.getKey(key),
            value = null;
        try {
            value = this.storage.getItem(key);
        } catch (e) {
            if (value) {
                try {
                    this.storage.removeItem(key)
                    status = this.status.SUCCESS
                }
                catch (e) {
                }
            }
        }
        callback && callback.call(this, status, status > 0 ? null : value.slice(value.indexOf(this.timeSign) + this.timeSign.length))
    }
}

var LS = new BaseLocalStorage('LS_', '20170101');
LS.set('a', 'xiaoming', function () {
    console.log(arguments);
})
LS.get('a', function () {
    console.log(arguments);
})
LS.remove('a', function () {
    console.log(arguments);
})
LS.remove('a', function () {
    console.log(arguments);
})
LS.get('a', function () {
    console.log(arguments);
})

