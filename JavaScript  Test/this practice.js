/**
 * Created by hnsxy on 2016/11/1 0001.
 */
function fn() {
    this.a = 0;
    this.b = function() {
       console.log(this.a)
    }
}
fn.prototype = {
    b: function() {
        this.a = 20;
        alert(this.a);
    },
    c: function() {
        this.a = 30;
        console.log(this.a);
    }
}
var myfn = new fn();
myfn.b();
myfn.c()