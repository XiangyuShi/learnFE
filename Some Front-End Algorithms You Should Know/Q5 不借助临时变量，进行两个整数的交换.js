/**
 * Created by hnsxy on 2016/11/2 0002.
 */
function swap(a , b) {
    b = b - a;
    a = a + b;
    b = a - b;
    return [a,b];
}