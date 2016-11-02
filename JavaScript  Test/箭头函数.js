/**
 * Created by hnsxy on 2016/11/2 0002.
 */
var a = [
    "Hydrogen",
    "Helium",
    "Lithium",
    "Beryl­lium"
];

var a2 = a.map(function(s){ return s.length });

var a3 = a.map( s => s.length );
console.log(a2)
console.log(a3)

function Person(){
    this.age = 0;

    setInterval(() => {
        this.age++; // |this| 正确地指向了 person 对象
    }, 1000);
}

var p = new Person();

'use strict';
var obj = {
    i: 10,
    b: () => console.log(this.i, this),
    c: function() {
        console.log( this.i, this)
    }
}
obj.b(); // prints undefined, Window
obj.c(); // prints 10, Object {...}