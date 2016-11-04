/**
 * Created by hnsxy on 2016/11/4 0004.
 */
//Chain of Responsibility:解决请求的发送者与请求的接受者之间的耦合，通过职责链上的多个对象对分解请求流程，实现请求在多个对象之间的传递，知道最后一个对象完成请求的处理
/***
 * 请求模块
 * 异步请求对象
 * 参数data  请求数据
 * 参数dealType 响应数据处理对象
 * 参数dom   事件源
 ****/
var sendData = function (data, dealType, dom) {
    var xhr = new XMLHttpRequest(),
        url = 'getData.php?mod=userInfo';
    xhr.onload = function (event) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            dealData(xhr.responseText, dealType, dom);
        } else {
            //失败
        }
    };
    for (var i in data) {
        url += '&' + i + '=' + data[i];
    }
    xhr.open("get", url, true);
    xhr.send(null);
}
/**
 * 响应数据适配模块
 * 处理响应数据
 */
var dealDate = function (data, dealType, dom) {
    var dataType = Object.prototype.toString.call(data);
    switch (dealType) {
        case 'sug':
            if (dataType === "[object Array]") {
                return createSug(data, dom);
            }
            if (dataType === "[object Object]") {
                let newData = [];
                for (var i  in data) {
                    newData.push(data[i]);
                }
                return createSug(newData, dom);
            }
            return createSug([data], dom);
            break;
        case 'validata':
            return createValidataResult(data, dom);
            break;
    }
}
/**
 * 创建组件模块
 * 创建提示框组件
 */
var createSug = function (data, dom) {
    var i = 0,
        len = data.length,
        html = '';
    for (; i < len; i++) {
        html += '<li>' + data[i] + '</li>';
    }
    dom.parentNode.getElementByTagName('ul')[0].innerHTML = html;
}
/**
 * 创建校验组件
 */
var createValidataResult=function (data, dom) {
    dom.parentNode.getElementByTagName('span')[0].innerHTML = data;
}