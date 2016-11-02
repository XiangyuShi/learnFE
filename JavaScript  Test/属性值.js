/**
 * Created by hnsxy on 2016/9/27 0027.
 */
var obj = {0.7: 'abc'}
console.log(Object.keys(obj))
console.log(obj['0.7'])

var obj = {'not a': 123}
console.log(Object.keys(obj))
console.log(obj['not a'])

var arr = [2011, 11, 24]
var b = new (Function.prototype.bind.apply(Date, [null].concat(arr)))
console.log(b)

var counter = {
    count: 0,
    inc: function () {
        'use strict'
        this.count++;
    }
}
var func = counter.inc.bind(counter)
var func1 = counter.inc
var func2 = counter.inc
func2.call(counter, '')
func1.apply(counter, [])
func()
console.log(counter.count)

var PersonProto = {
    describe: function () {
        return 'Person named:' + this.name;
    }
}
var jane = Object.create(PersonProto)
jane.name = 'jane'
console.log(jane.describe())

console.log(Object.getPrototypeOf(jane) === PersonProto)

var proto = {
    foo: 'a'
}
var obj = Object.create(proto)
delete obj.foo
console.log(obj.foo)
delete obj.__proto__.foo
console.log(obj.foo)

var obj = {
    get foo() {
        return 'getter'
    },
    set foo(value) {
        console.log('setter:' + value)
    }
}
obj.foo = 'bla'
console.log(obj.foo)