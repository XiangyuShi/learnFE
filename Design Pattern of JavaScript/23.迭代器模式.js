/**
 * Created by hnsxy on 2016/11/4 0004.
 */
//Iterator：在不暴露对象内部结构的同时，可以顺序访问聚合对象内部的元素
//迭代器
var Iterator = function (items, container) {
    var container = container && document.getElementById(container) || document,
        items = container.getElementsByTagName(items),
        length = items.length,
        index = 0;
    var splice = [].splice;
    return {
        first: function () {
            index = 0;
            return items[index];
        },
        //获取最后一个元素
        second: function () {
            index = length - 1;
            return items[index];
        },
        pre: function () {
            if (--index > 0) {
                return items[index];
            } else {
                index = 0;
                return null;
            }
        },
        next: function () {
            if (++index < length) {
                return items[index];
            } else {
                index = index - 1;
                return null;
            }
        },
        get: function (num) {
            index = num >= 0 ? num % length : num % length + length;
            return items[index];
        },
        dealEach: function (fn) {
            var args = splice.call(arguments, 1);
            for (var i = 0; i < length; i++) {
                fn.apply(items[i], args);
            }
        },
        dealItem: function (num, fn) {
            fn.apply(this.get(num), splice.call(arguments, 2));
        },
        exclusive: function (num, allFn, numFn) {
            this.dealEach(allFn);
            if (Object.prototype.toString.call(num) === "[object Array]") {
                for (var i = 0, len = num.length; i < len; i++) {
                    this.dealItem(num[i], numFn);
                }
            } else {
                this.dealItem(num, numFn);
            }
        }
    }
}

var demo = new Iterator('li', 'container');
console.log(demo.first());
console.log(demo.pre());
console.log(demo.get(2000));
demo.dealEach(function (text, color) {
    this.innerHTML = text;
    this.style.background = color;
}, 'test', 'pink');
demo.exclusive([2, 3], function () {
    this.innerHTML = '被排除的';
    this.style.background = 'green';
}, function () {
    this.innerHTML = '选中的';
    this.style.background = 'red';
})