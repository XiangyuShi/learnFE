require('normalize.css/normalize.css');
require('styles/App.scss');

import React from "react";

//获取图片相关数据
var imageDatas = require('../data/imageDatas.json');
//利用自执行函数,讲图片名信息转成图片URL路径信息
imageDatas = (function getImageUrl(imageDataArr) {
  for (var i = 0; i < imageDataArr.length; i++) {
    let singeImageData = imageDataArr[i];
    singeImageData.imageUrl = require('../images/' + singeImageData.fileName);
    imageDataArr[i] = singeImageData;
  }
  return imageDataArr;
})(imageDatas);

var ImgFigure = React.createClass({
  render: function () {
    return (
      <figure>
        <img/>
      </figure>
    )
  }
});
class AppComponent extends React.Component {
  render() {

    return (
      <section className="stage">
        <section className="img-sec">

        </section>
        <nav className="controller-nav">

        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
