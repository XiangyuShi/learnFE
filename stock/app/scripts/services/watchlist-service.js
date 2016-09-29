'use strict';

/**
 * @ngdoc service
 * @name stockDogApp.WatchlistService
 * @description
 * # WatchlistService
 * Service in the stockDogApp.
 */
angular.module('stockDogApp')
  .service('WatchlistService', function WatchlistService() {
    //[1] 辅助方法：从localStorage中加载监视列表
    var loadModel = function () {
      var model = {
        watchlist: localStorage['StockDog.watchlists'] ? JSON.parse(localStorage['StockDog.watchlists']) : [],
        nextId: localStorage['StockDog.nextId'] ? JSON.parse(localStorage['StockDog.nextId']) : 0
      };
      return model;
    };
    //[2]辅助方法：将监视列表保存到localStorage中
    var saveModel = function () {
      localStorage['StockDog.watchlists'] = JSON.stringify(Model.watchlists);
      localStorage['StockDog.nextId'] = Model.nextId;
    };
    //[3]辅助方法：使用loadsh找到指定的id的监视列表
    var findById = function (listId) {
      return _.find(Model.watchlist, function (watchlist) {
        return watchlist.id === parseInt(listId);
      });
    };
    //[4]返回所有监视列表或者按指定的Id进行查找
    this.query = function (listId) {
      if (listId) {
        return findById(listId);
      } else {
        return Model.watchlists;
      }
    };
    //[5]在监视列表模型中保存一个新的监视列表
    this.save = function (watchlist) {
      watchlist.id = Model.nextId++;
      Model.watchlists.push(watchlist);
      saveModel();
    }
    //[6]从监视列表模型中移除指定的监视列表
    this.remove = function (watchlist) {
      _.remove(Model.watchlists, function (list) {
        return list.id === watchlist.id;
      });
      saveModel();
    };
    //[7]为这个单例服务初始化模型
    var Model = loadModel();
  });
