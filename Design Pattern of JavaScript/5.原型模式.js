/**
 * Created by hnsxy on 2016/11/1 0001.
 */
//Prototype：用原型实例指向创建对象的类，使用于创建新的对象的类共享原型对象的属性以及方法。

//图片轮播类
var LoopImages = function (imgArr, container) {
    this.imagesArray = imgArr;//轮播图片数组
    this.container = container;//轮播图片容器
}
LoopImages.prototype = {
    //创建轮播图片
    creatImage: function () {
        console.log('LoopImages createImage function');
    },
    //切换下一张图片
    changeImage: function () {
        console.log('LoopImages changeImage function');
    }
}
//上下滑动切换类
var SlideLoopImg = function (imgArr, container) {
    //构造函数继承图片轮播类
    LoopImages.call(this, imgArr, container);
}
SlideLoopImg.prototype = new LoopImages();
//重写继承的切换下一张图片方法
SlideLoopImg.prototype.changeImage = function () {
    console.log('SlideLoopImage changeImage function');
}
//渐隐切换类
var FadeLoopImg = function (imgArr, container, arrow) {
    LoopImages.call(this, imgArr, container);
    //切换箭头私有变量
    this.arrow = arrow;
}
FadeLoopImg.prototype = new LoopImages();
FadeLoopImg.prototype.changeImage = function () {
    console.log('FadeLoopImage changeImage function');
}
//测试用例
var fadeImg = new FadeLoopImg([], 'slide', []);
console.log(fadeImg.container);
fadeImg.changeImage();