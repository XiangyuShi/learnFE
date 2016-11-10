/**
 * Created by hnsxy on 2016/9/26 0026.
 */
// function f() {
//     var result=[]
//     for(var i=0;i<3;i++){
//         var func=function () {
//             return i
//         }
//         result.push(func)
//     }
//     return result
// }
//
// console.log(f()[1]())

function f2() {
    var result=[]
    for(var i=0;i<3;i++){
        (function () {
            var j=i
            var func =function () {
                return j
            }
            result.push(func)
        }())
    }
    return result
}
console.log(f2()[1]())

/*
经典DOM事件
 */
// var list_obj = document.getElementsByTagName('li');
// for (var i = 0; i <= list_obj.length; i++) {
//
//     (function(i){
//         //var p = i
//         list_obj[i].onclick = function() {
//             alert(i);
//         }
//     })(i);
// }