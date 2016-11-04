/**
 * Created by hnsxy on 2016/11/4 0004.
 */
//Memento：在不破坏对象的封装性的前提下，在对象之外捕获并保存该对象内部的状态以便日后对象使用或者对象恢复到以前的某一个状态
//Page备忘录类
var Page=function () {
    var cache={}
    return function (page, fn) {
        //判断该页数据是否在缓存中
        if(cache[page]){
          //恢复到该页状态，显示该页内容
            showPage(page,cache[page])
            //执行成功回调函数
            fn&&fn()
        }else{
            $.post('./data/getNewData.php',{page:page},function (res) {
                if(res.errNo==0){
                    showPage(page,res.data)
                    cache[page]=res.data
                    fn&&fn()
                }else{
                    //处理异常
                }
            })
        }
    }
}()