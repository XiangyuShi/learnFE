/**
 * Created by hnsxy on 2016/9/26 0026.
 */
var num = 99;
function t() {
    var num = 88;
    var str = 'hello';

    function a() {
        var str = 'world';
        console.log(str);//world
        console.log(num);//88
    }

    a();
}
t();