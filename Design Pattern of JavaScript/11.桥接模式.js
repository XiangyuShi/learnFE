/**
 * Created by hnsxy on 2016/11/2 0002.
 */
//Bridge:在系统沿着多个维度变化的同时，又不增加其代码复杂度并已达到解耦
//抽象
function changeColor(dom, color, bg) {
    //设置元素的字体颜色
    dom.style.color = color;
    //设置元素的背景颜色
    dom.style.background = bg;
}
var spans = document.getElementsByTagName('span');
spans[0].onmousemove = function () {
    changeColor(this, 'red', '#ddd');
}
spans[0].onmouseout = function () {
    changeColor(this, '#333', '#f5f5f5');
}
spans[1].onmouseover = function () {
    changeColor(this.getElementsByTagName('strong')[0], 'red', '#ddd');
}
spans[1].onmouseout = function () {
    changeColor(this.getElementsByTagName('strong')[0], '#333', '#f5f5f5');
}
/**
 * 多元化对象
 */
//多维变量类
//运动单元
function Speed(x, y) {
    this.x = x;
    this.y = y;
}
Speed.prototype.run = function () {
    console.log('运动起来');
}
//着色单元
function Color(cl) {
    this.color = cl;
}
Color.prototype.draw = function () {
    console.log('绘制色彩');
}
//变形单元
function Shape(sp) {
    this.shape = sp;
}
Shape.prototype.change = function () {
    console.log('改变形状');
}
//说话单元
function Speek(wd) {
    this.word = wd;
}
Speek.prototype.say = function () {
    console.log('书写字体');
}
//创建一个球类
function Ball(x, y, c) {
    //实现运动单元
    this.speed = new Speed(x, y);
    //实现着色单元
    this.color = new Color();
}
Ball.prototype.init = function () {
    //实现运动
    this.speed.run();
    //实现着色
    this.color.draw();
}
//创建一个人物类
function People(x, y, f) {
    this.speed = new Speed(x, y);
    this.font = new Speek(f);
}
People.prototype.init = function () {
    this.speed.run();
    this.font.say();
}
//创建一个精灵类
function Spirite(x, y, c, s) {
    this.speed = new Speed(x, y);
    this.color = new Color(c);
    this.shape = new Shape(s);
}
Spirite.prototype.init = function () {
    this.speed.run();
    this.color.draw();
    this.shape.change();
}
var p = new People(10, 12, 16);
p.init();