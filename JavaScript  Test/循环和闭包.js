/**
 * Created by hnsxy on 2016/11/10 0010.
 */
for (var i = 1; i < 6; i++) {
    setTimeout(function timer() {
        console.log(i);
    }, 0)
}

for (var i = 1; i < 6; i++) {
    (function () {
        var j = i
        setTimeout(function timer() {
            console.log(j);
        }, 0)
    })()
}

for (let i = 0; i < 6; i++) {
    setTimeout(function () {
        console.log(i);
    }, 0)
}