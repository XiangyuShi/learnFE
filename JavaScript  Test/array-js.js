/**
 * Created by hnsxy on 2016/9/21 0021.
 */
['_', 't', 'a', 'n', 'i', 'f', ']'].forEach(function (value, index, array) {
    this.push(String.fromCharCode(value.charCodeAt() + index + 2))
}, out = [])
var out1 = out.join('')

console.log(out1)


max = -Infinity
satisfied = [10, 12, 10, 8, 5, 23].some(function (value, index, array) {
    if (value > max) max = value
    return value < 10
})
console.log(max)

var a = function () {
    this.b = 1
}
a();
console.log(b)
a.b = 2
a.prototype.b = 3
var c = new a()
console.log(c.b)