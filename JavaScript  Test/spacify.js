/**
 * Created by hnsxy on 2016/9/21 0021.
 */
function spacify(str) {
    return str.split('').join(' ');
}
console.log(spacify("hello"));


String.prototype.spacify = function () {
    return this.split('').join(" ");
}
console.log("hello".spacify());

// function log(msg) {
//     console.log(msg)
// }
//
// log(1)

// function log() {
//     console.log.apply(console,arguments)
// }
//
// log('1','2')

function log() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift('(app)');
    console.log.apply(console, args)
}

log(1);

var User = {
    count: 1,
    getCount: function () {
        return this.count;
    }
}

console.log(User.getCount())

var func = User.getCount;
console.log(func())

var func2 = User.getCount.bind(User)
console.log(func2())

Function.prototype.bind = Function.prototype.bind || function (context) {
        var that = this;
        return function () {
            return that.apply(context, arguments)
        }
    }