/**
 * Created by hnsxy on 2016/11/9 0009.
 */
//MVVM:model-view-viewModel,为视图层定做一套视图模型，并在视图模型中创建属性和方法，为视图层绑定数据并实现交互
//VM层
~(function () {
    var window = this || (0, eval)('this');
    var FONTSIZE = function () {
        return parseInt(document.body.currentStyle ? document.body.currentStyle['fontSize'] : getComputedStyle(document.body, false)['fontSize']);
    }();
    var VM = function () {
        //组件创建策略对象
        var Method = {
            //进度条
            progressbar: function (dom, data) {
                var progress = document.createElement('div'),
                    param = data.data;
                progress.style.width = (param.position || 100) + '%';
                dom.className += 'ui-progressbar';
                dom.appendChild(progress);
            },
            //滑动条
            slider: function (dom, data) {
                var bar = document.createElement('span'),
                    progress = document.createElement('div'),
                    totleText = null,
                    progressText = null,
                    patam = data.data,
                    width = dom.clientWidth,
                    left = dom.offsetLeft,
                    realWidth = (param.position || 100) * width / 100;
                dom.innerHTML = '';
                if (param.totle) {
                    text = document.createElement('b');
                    progressText = document.createElement('em');
                    text.innerHTML = param.totle;
                    dom.appendChild(text);
                    dom.appendChild(progressText);
                }
                setStyle(realWidth);
                dom.className += 'ui-slider';
                dom.appendChild(progress);
                dom.appendChild(bar);
                function setStyle(w) {
                    progress.style.width = w + 'px';
                    bar.style.left = w - FONTSIZE / 2 + 'px';
                    if (progressText) {
                        progressText.style.left = w - FONTSIZE / 2 * 2.4 + 'px';
                        progressText.innerHTML = parseFloat(w / width * 100).toFixed(2) + '%';
                    }
                }

                bar.onmousedown = function () {
                    document.onmousemove = function (event) {
                        var e = event || window.event;
                        var w = e.clientX - left;
                        setStyle(w < width ? (w > 0 ? w : 0) : width);
                    }
                    document.onselectstart = function () {
                        return false;
                    }
                }
                document.onmouseup = function () {
                    document.onmousemove = null;
                    document.onselectstart = null;
                }
            }
        }

        function getBindData() {

        }

        return function () {
            var dom = document.body.getElementsByTagName('*'),
                ctx = null;
            for (var i = 0; i < dom.length; i++) {
                ctx = getBindData(doms[i]);
                ctx.type && Method[ctx.type] && Method[ctx.type](dom[i], ctx);
            }
        }
    }();
    window.VM = VM;
})();