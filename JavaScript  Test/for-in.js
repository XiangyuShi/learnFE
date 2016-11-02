/**
 * Created by hnsxy on 2016/9/26 0026.
 */
function Persion(name) {
    this.name = name;
}
Persion.prototype.describe = function () {
    return 'Name:' + this.name
}
var persion=new Persion('jane')
for(var key in persion){
    console.log(key)
}
console.log('----------')
for(var key in persion){
    if(persion.hasOwnProperty(key))
        console.log(key)
}
console.log('----------')
for(var key in persion){
    if(Object.prototype.hasOwnProperty.call(persion,key)){
        console.log(key)
    }
}