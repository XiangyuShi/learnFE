/**
 * Created by hnsxy on 2016/9/7 0007.
 */
'use strict'

var Koa = require('koa')
var path = require('path')
var wechat = require('./weChat/g')
var util = require('./libs/util')
var wechat_file = path.join('./config/wechat.txt')
var config = {
    wechat: {
        appID: 'wx79156eb72622e6a6',
        appSecret: '78b0937daa816a6a74374ceb1b3da66a',
        token: 'hnsxy000',
        getAccessToken: function () {
            return util.readFileAsync(wechat_file)
        },
        saveAccessToken: function (data) {
            data = JSON.stringify(data)
            return util.writeFileAsync(wechat_file, data)
        }
    }
}

var app = new Koa()
app.use(wechat(config.wechat))

app.listen(1234)
console.log('listening :1234')