/**
 * Created by hnsxy on 2016/9/26 0026.
 */
'use strict'
function firstWordToUppercase(input) {
    var tmp=input.charAt(0).toUpperCase()
    var inp=input.split('')
    inp.shift()
    var output=inp
    output.unshift(tmp)
    return output.join('')
}
var arr="abd ded ddd".split(" ")
for(var key in arr){
    console.log(firstWordToUppercase(arr[key]));
}

arr.forEach(function (elem) {
    console.log(firstWordToUppercase(elem))
})