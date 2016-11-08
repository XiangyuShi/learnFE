/**
 * Created by hnsxy on 2016/11/8 0008.
 */
//waiter：通过对多个异步进程监听，来触发未来发生的动作
//等待对象
var Waiter = function () {
    var dfd = [],
        doneArr = [],
        failArr = [],
        slice = Array.prototype.slice,
        that = this;
    //监控对象类
    var Primise = function () {
        //监控对象是否解决成功状态
        this.resolved = false;
        //监控对象是否解决失败状态
        this.rejected = false;
    }
    //监控对象类原型方法
    Primise.prototype = {
        resolve: function () {
            //设置当前监控对象解决成功
            this.resolved = true;
            if (!dfd.length) {
                return;
            }
            for (var i = dfd.length - 1; i >= 0; i--) {
                //如果任意一个监控对象没有被解决或者解决失败则返回
                if (dfd[i]&&!dfd[i].resolved||dfd[i].rejected) {
                    return;
                }
                //清除监控对象
                dfd.splice(i,1);
            }
            _exec(doneArr);
        },
        reject: function () {
            this.rejected=true;
            if (!dfd.length) {
                return;
            }
            //清除所有监控对象
            dfd.splice[0];
            _exec(failArr);
        }
    }
    //创建监控对象
    that.Deferred = function () {
        return new Primise();
    }
    //回调执行方法
    function _exec(arr) {
        var i=0,
            len=arr.length;
        for(;i<len;i++){
            try{
                arr[i]&&arr[i]()
            }catch (e){}
        }
    }

    //监控异步方法 参数：监控对象
    that.when = function () {
        dfd=slice.call(arguments)
        var i=dfd.length;
        //向前遍历监控对象，最后一个监控对象的索引值为length-1
        for(--i;i>=0;i--){
            //如果不存在监控对象，或者监控对象已经解决，或者不是监控对象
            if(!dfd[i]||dfd[i].resolved||dfd[i].rejected||!dfd[i] instanceof Primise){
                dfd.splice(i,1)
            }
        }
        return that;
    }
    //解决成功回调函数添加方法
    that.done = function () {
        //向成功回调函数添加回调方法
        doneArr=doneArr.concat(slice.call(arguments))
        return that;
    }
    //解决失败回调函数添加方法
    that.fail = function () {
        failArr=failArr.concat(slice.call(arguments))
        return that;
    }
}

var waiter=new Waiter();
var first=function () {
    var dtd=waiter.Deferred();
    setTimeout(function () {
        console.log('first finish');
    },5000);
    dtd.resolve();
    return dtd;
}();
var second=function () {
    var dtd=waiter.Deferred();
    setTimeout(function () {
        console.log('second finish');
        dtd.resolve();
    },10000);
    return dtd;
}();

waiter
.when(first,second)
.done(function () {
    console.log('success');
},function () {
    console.log('success again');
})
.fail(function () {
    console.log('fail');
})