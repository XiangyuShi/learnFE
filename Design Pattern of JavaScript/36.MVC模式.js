/**
 * Created by hnsxy on 2016/11/9 0009.
 */
//MVC:用一种将业务逻辑、数据、视图分离的方式组织架构代码
/**
 * 侧边导航栏
 */
$(function () {
    //初始化MVC对象
    var MVC = MVC || {};
    //初始化数据模型层
    MVC.model = function () {
        var M = {};
        M.data = {
            //左侧侧边栏导航服务器端请求得到的响应数据
            slideBar: [
                {
                    text: "1",
                    icon: "",
                    title: "",
                    content: "",
                    img: "",
                    href: ""
                },
                {
                    text: "2",
                    icon: "",
                    title: "",
                    content: "",
                    img: "",
                    href: ""
                },
                {
                    text: "3",
                    icon: "",
                    title: "",
                    content: "",
                    img: "",
                    href: ""
                },
                {
                    text: "4",
                    icon: "",
                    title: "",
                    content: "",
                    img: "",
                    href: ""
                }, {
                    text: "5",
                    icon: "",
                    title: "",
                    content: "",
                    img: "",
                    href: ""
                }
            ]
        }
        M.conf = {
            //侧边导航动画配置数据
            slideBarCloseAnimate: false
        }
        return {
            /*
             接口方法
             */
        }
    }();
    //初始化视图层
    MVC.view = function () {
        var M = MVC.model;
        var V = {
            //创建侧边导航模块视图
            createSlideBar: function () {
                //导航图标内容
                var html = '',
                //视图渲染数据
                    data = M.getData('sliderBar');
                //屏蔽无效数据
                if (!data || !data.length) {
                    return;
                }
                //创建视图容器
                var dom = $.create('div', {
                    'class': 'slidebar',
                    'id': 'slidebar'
                });
                //视图容器模板
                var tpl = {
                    container: [
                        '<div class="slidebar-inner"><ul>{#content#}</ul></div>',
                        '<a hidefocus href="#" class="slidebar-close" title="收起"/>'
                    ].join(''),
                    //导航图标模块模板
                    item: [].join('')
                };
                for (var i = 0, len = data.length; i < len; i++) {
                    html += $.formateString(tpl.item, data[i]);
                }
                dom.html($.formateString(tpl.container, {content: html}))
                    .appendTo('body');
            }
        }
        return function (v) {
            V[v]();
        }
    }();
    //初始化控制器
    MVC.ctrl = function () {
        var V = MVC.view;
        var M = MVC.model;
        var C = {
            //侧边导航栏模块
            initSlideBar:function () {
                //渲染导航栏模块视图

            }
        };
        C.initSlideBar();
    }();
});