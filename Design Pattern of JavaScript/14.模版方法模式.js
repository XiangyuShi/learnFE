/**
 * Created by hnsxy on 2016/11/3 0003.
 */
//Template Method:父类中定义一组操作算法骨架，而将一些实现步骤延迟到子类中，使得子类可以不改变父类的算法结构同时可以重新定义算法中某些实现步骤
//创建基本提示框
//模板类 基础提示框data渲染数据
var Alert = function (data) {
    //没有数据返回，防止后面程序执行
    if (!data)
        return;
    //设置内容
    this.content = data.content;
    //创建提示框面板
    this.panel = document.createElement('div');
    //创建提示内容组件
    this.contentNode = document.createElement('p');
    //创建确定按钮组件
    this.confirmBtn = document.createElement('span');
    //创建关闭按钮组件
    this.closeBtn = document.createElement('b');
    //为提示框面板添加类
    this.panel.className = 'alert';
    //为关闭按钮添加类
    this.closeBtn.className = 'a-close';
    //为确定按钮添加类
    this.confirmBtn.className = 'a-confirm';
    //为确定按钮添加文案
    this.confirmBtn.innerHTML = data.confirm || '确定';
    //为提示内容添加文本
    this.contentNode.innerHTML = this.content;
    //点击确定按钮执行方法，如果data中有success方法则为success方法，否则为空函数
    this.success = data.success || function () {
        };
    //点击关闭按钮执行方法
    this.fail = data.fail || function () {
        };
};
//提示框原型方法
Alert.prototype = {
    //创建方法
    init: function () {
        //生成提示框
        this.panel.appendChild(this.closeBtn);
        this.panel.appendChild(this.contentNode);
        this.panel.appendChild(this.confirmBtn);
        //插入页面中
        document.body.appendChild(this.panel);
        //绑定事件
        this.bindEvent();
        this.show();
    },
    bindEvent: function () {
        var that = this;
        //关闭按钮点击事件
        this.closeBtn.onclick = function () {
            //执行关闭取消方法
            that.fail();
            that.hide();
        }
    },
    hide: function () {
        this.panel.style.display = 'none';
    },
    show: function () {
        this.panel.style.display = 'blocl';
    }
}
//根据模版创建类
//右侧按钮提示框
var RightAlert = function (data) {
    //继承基本提示框构造函数
    Alert.call(this, data);
    //为确认按钮添加right类设置位置为右
    this.confirmBtn.className = this.confirmBtn.className + 'right';
};
RightAlert.prototype = new Alert();
//标题提示框
var TitleAlert = function (data) {
    //继承基本提示框构造函数
    Alert.call(this, data);
    //设置标题内容
    this.title = data.title;
    this.titleNode = document.createElement('h3');
    this.titleNode.innerHTML = this.title;
};
TitleAlert.prototype = new Alert();
//对基本提示框创建方法拓展
TitleAlert.prototype.init = function () {
    this.panel.insertBefore(this.titleNode, this.panel.firstChild);
    Alert.prototype.init.call(this);
};
//继承类也可以作为模板类
//带有取消按钮的弹出框
var CancelAlert = function (data) {
    //继承标题提示框构造函数
    TitleAlert.call(this, data);
    this.cancel = data.cancel;
    this.cancelBtn = document.createElement('span');
    this.cancelBtn.className = 'cancel';
    this.cancelBtn.innerHTML = this.cancel || '取消';
}
CancelAlert.prototype = new Alert();
CancelAlert.prototype.init = function () {
    TitleAlert.prototype.init.call(this);
    this.panel.appendChild(this.cancelBtn);
}
CancelAlert.prototype.bindEvent = function () {
    var that = this;
    TitleAlert.prototype.bindEvent.call(that);
    this.cancelBtn.onclick = function () {
        that.fail();
        that.hide();
    }
}
new CancelAlert({
    title: '提示标题',
    content: '提示内容',
    success: function () {
        console.log('ok');
    },
    fail: function () {
        console.log('cancel');
    }
}).init();