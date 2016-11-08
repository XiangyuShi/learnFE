/**
 * Created by hnsxy on 2016/11/4 0004.
 */
//Chain of Responsibility:�������ķ�����������Ľ�����֮�����ϣ�ͨ��ְ�����ϵĶ������Էֽ��������̣�ʵ�������ڶ������֮��Ĵ��ݣ�֪�����һ�������������Ĵ���
/***
 * ����ģ��
 * �첽�������
 * ����data  ��������
 * ����dealType ��Ӧ���ݴ������
 * ����dom   �¼�Դ
 ****/
var sendData = function (data, dealType, dom) {
    var xhr = new XMLHttpRequest(),
        url = 'getData.php?mod=userInfo';
    xhr.onload = function (event) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            dealData(xhr.responseText, dealType, dom);
        } else {
            //ʧ��
        }
    };
    for (var i in data) {
        url += '&' + i + '=' + data[i];
    }
    xhr.open("get", url, true);
    xhr.send(null);
}
/**
 * ��Ӧ��������ģ��
 * ������Ӧ����
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
 * �������ģ��
 * ������ʾ�����
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
 * ����У�����
 */
var createValidataResult = function (data, dom) {
    dom.parentNode.getElementByTagName('span')[0].innerHTML = data;
}