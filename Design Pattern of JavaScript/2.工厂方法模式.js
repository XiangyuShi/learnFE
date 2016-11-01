/**
 * Created by hnsxy on 2016/11/1 0001.
 */
//工厂方法模式本意是将实际创建对象工作推迟到子类当中。这个核心类就变成了抽象类

//安全模式创建的工厂类
var Factory = function (type, content) {
    if (this instanceof Factory) {
        var s = new this[type](content);
        return s;
    } else {
        return new Factory(type, content);
    }
}
Factory.prototype = {
    Java: function (content) {
        //将内容保存在content中备用
        this.content = content;
        //创建对象，通过闭包，直接执行，将内容按需求的样式插入到页面内
        (function (content) {
            var div = document.createElement('div');
            div.innerHTML = content;
            div.style.color = 'green';
            document.getElementById('container').appendChild(div);
        })(content);
    },
    JavaScript:function (content) {
        //将内容保存在content中备用
        this.content = content;
        //创建对象，通过闭包，直接执行，将内容按需求的样式插入到页面内
        (function (content) {
            var div = document.createElement('div');
            div.innerHTML = content;
            div.style.color = 'yellow';
            document.getElementById('container').appendChild(div);
        })(content);
    },
    UI:function (content) {
        //将内容保存在content中备用
        this.content = content;
        //创建对象，通过闭包，直接执行，将内容按需求的样式插入到页面内
        (function (content) {
            var div = document.createElement('div');
            div.innerHTML = content;
            div.style.border = '1px solid red';
            document.getElementById('container').appendChild(div);
        })(content);
    },
    PHP:function (content) {
        //将内容保存在content中备用
        this.content = content;
        //创建对象，通过闭包，直接执行，将内容按需求的样式插入到页面内
        (function (content) {
            var div = document.createElement('div');
            div.innerHTML = content;
            div.style.border = '1px solid yellow';
            document.getElementById('container').appendChild(div);
        })(content);
    }
};
var data=[
    {type:'JavaScript',content:'js'},
    {type:'PHP',content:'php'},
    {type:'UI',content:'ui'},
    {type:'Java',content:'java'},
];