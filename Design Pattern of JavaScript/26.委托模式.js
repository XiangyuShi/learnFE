/**
 * Created by hnsxy on 2016/11/8 0008.
 */
//Entrust:多个对象接收并处理同一请求，他们将请求委托给另外一个对象统一处理请求。
/**
 * <div id="article">
 *     <p>一段文字</p>
 * </div>
 */
var article = document.getElementById('article')
article.onclick = function () {
    var e = e || window.event
    var tar = e.target || e.srcElement
    if (tar.nodeName.toLowerCase() === 'p')
        tar.innerHTML = '我要改变这些内容'
}
var p = document.createElement('p')
p.innerHTML = '新增一段内容'
article.appendChild(p)
/**
 * 内存外泄
 */
g('btn_container').onclick=function (e) {
    var target=e&&e.target||window.event.srcElement;
    if(target.id==='btn'){
        g('btn_container').innerHTML='触发了事件'
    }
}
/**
 * 数据分发
 */
var Deal={
    banner:function () {

    },
    aside:function () {

    },
    article:function () {

    },
    member:function () {

    },
    message:function () {

    }
}
$.get('/deal.php',function (res) {
    for(var i in res){
        Deal[i]&&Deal[i](res[i])
    }
});