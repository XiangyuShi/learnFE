/**
 * Created by hnsxy on 2016/9/12 0012.
 */
function sync(fn) {
    return fn();
}

try {
    sync(null);
    // Do something.
} catch (err) {
    console.log('Error: %s', err.message);
}