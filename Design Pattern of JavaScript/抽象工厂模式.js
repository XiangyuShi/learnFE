/**
 * Created by hnsxy on 2016/11/1 0001.
 */
//定义一个产品簇，并声明一些必备的方法，如果类中没有去重写就会抛出错误。抽象工厂是一个实现子类继承父类的方法，我们通过传递子类以及要继承父类（抽象类）的名称，并且在抽象工厂方法中又增加了一次对抽象类存在性的判断。如果存在，子类通过寄生式继承。

//抽象工厂方法
var VehicleFactory = function (subType, superType) {
    //判断抽象工厂中是否有该抽象类
    if (typeof VehicleFactory[superType] === 'function') {
        //缓存类
        function F() {

        };
        //继承父类属性和方法
        F.prototype = new VehicleFactory[superType]();
        //将子类constructor指向子类
        subType.constructor = subType;
        //子类原型继承‘父类’
        subType.prototype = new F();
    } else {
        throw new Error('未创建该抽象类');
    }
}
//小汽车抽象类
VehicleFactory.Car = function () {
    this.type = 'car';
};
VehicleFactory.Car.prototype = {
    getPrice: function () {
        return new Error('抽象方法不能调用');
    },
    getSpeed: function () {
        return new Error('抽象方法不能调用');
    }
};
//公交车抽象类
VehicleFactory.Bus = function () {
    this.type = 'bus';
};
VehicleFactory.Bus.prototype = {
    getPrice: function () {
        return new Error('抽象方法不能调用');
    },
    getSpeed: function () {
        return new Error('抽象方法不能调用');
    }
};
//货车抽象类
VehicleFactory.Truck = function () {
    this.type = 'truck';
};
VehicleFactory.Truck.prototype = {
    getPrice: function () {
        return new Error('抽象方法不能调用');
    },
    getSpeed: function () {
        return new Error('抽象方法不能调用');
    }
};
//宝马汽车类
var BMW = function (price, speed) {
    this.price = price;
    this.speed = speed;
}
VehicleFactory(BMW, 'Car');
BMW.prototype.getPrice = function () {
    return this.price;
}
BMW.prototype.getSpeed = function () {
    return this.speed;
}
//宇通汽车类
//奔驰汽车类

var bmw = new BMW(1000000, 200);
console.log(bmw.getPrice());
console.log(bmw.type);