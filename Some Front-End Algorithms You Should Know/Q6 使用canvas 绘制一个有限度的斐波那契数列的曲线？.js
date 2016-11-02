/**
 * Created by hnsxy on 2016/11/2 0002.
 */
function getFibonacci(n) {
    var fibarr = [];
    var i = 0;
    while(i<n) {
        if(i<=1) {
            fibarr.push(i);
        }else{
            fibarr.push(fibarr[i-1] + fibarr[i-2])
        }
        i++;
    }

    return fibarr;
}