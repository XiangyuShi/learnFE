/**
 * Created by hnsxy on 2016/11/7 0007.
 */
//Operate of Responsibility：通过在对象方法中将当前对象返回，实现对同一个对象多个方法的链式调用。从而简化对该对象的多个方法的多次调用时，对该对象的多次引用。
var A = function (selector, context) {
    return new A.fn.init(selector, context);
}
A.fn=A.prototype={
    constructor:A,
    init:function (selector, context) {
        
    }
}
A.extend = A.fn.extend = function () {
    var i = 1,
        len = arguments.length,
        target = arguments[0],
        j;
    if (i == len) {
        target = this;
        i--;
    }
    for (; i < len; i++) {
        for (j in arguments[i]) {
            target[j] = arguments[i][j];
        }
    }
    return target;
}

A.fn.extend({
    //添加事件
    on: (function () {
        //标准浏览器DOM2事件
        if (document.addEventListener) {
            return function (type, fn) {
                var i = this.length - 1;
                for (; i >= 0; i--) {
                    this[i].addEventListener(type, fn, false);
                }
                return this;
            }
        }//IE浏览器DOM2级事件
        else if (document.attachEvent) {
            return function (type, fn) {
                var i = this.length - 1;
                for (; i >= 0; i--) {
                    this[i].addEvent('on' + type, fn);
                }
                return this;
            }
        }//不支持DOM2级事件浏览器添加事件
        else {
            return function (type, fn) {
                var i = this.length - 1;
                for (; i >= 0; i--) {
                    this[i]['on' + type] = fn;
                }
                return this;
            }
        }
    })()
});
A.extend({
    //将'-'分割线转化成驼峰式，如：border-color -> borderColor
    camelCase: function (str) {
        return str.replace(/\-(\w)/g, function (all, letter) {
            return letter.toUpperCase();
        });
    }
});
A.fn.extend({
    css: function () {
        var arg = arguments,
            len = arg.length;
        if (this.length < 1) {
            return this;
        }
        if (len === 1) {
            if (typeof arg[0] === 'string') {
                //IE
                if (this[0].currentStyle) {
                    return this[0].currentStyle[name];
                } else {
                    return getComputedStyle(this[0], false)[name];
                }
            }
            else if (typeof arg[0] === 'object') {
                for (var i in arg[0]) {
                    for (var j = this.length - 1; j >= 0; j--) {
                        this[j].style[A.camelCase(i)] = arg[0][i];
                    }
                }
            }
        } else if (len === 2) {
            for (var j = this.length - 1; j >= 0; j--) {
                this[j].style[A.camelCase(arg[0])] = arg[1];
            }
        }
        return this;
    }
})
A.fn.extend({
    attr: function () {
        var arg = arguments,
            len = arg.length;
        if (this.length < 1) {
            return this;
        }
        if (len === 1) {
            if (typeof arg[0] === 'string') {
                return this[0].getAttribute(arg[0]);
            } else if (typeof arg[0] === 'object') {
                for (var i in arg[0]) {
                    for (var j = this.length - 1; j >= 0; j--) {
                        this[j].setAttribute(i, arg[0][i]);
                    }
                }
            }
        } else if (len === 2) {
            for (var j = this.length - 1; j >= 0; j--) {
                this[j].setAttribute(arg[0], arg[1]);
            }
        }
        return this;
    }
})
A.fn.extend({
    html: function () {
        var arg = arguments,
            len = arg.length;
        if (len === 0) {
            return this[0] && this[0].innerHTML;
        } else {
            for (var i = this.length - 1; i >= 0; i--) {
                this[i].innerHTML = arg[0];
            }
        }
        return this;
    }
})
A('div')
.css({
    height:'30px',
    border:'1px solide #000',
    'backgroud-color':'red'
})
.attr('class','demo')
.html('add demo text')
.on('click',function () {
    console.log('clicked');
})