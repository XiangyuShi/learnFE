/**
 * Created by hnsxy on 2016/11/2 0002.
 */
function findMaxDuplicateChar(str) {
    if (str.length == 1) {
        return str;
    }
    let charObj = {};
    for (let i = 0; i < str.length; i++) {
        if (!charObj[str.charAt(i)]) {
            charObj[str.charAt(i)] = 1
        } else {
            charObj[str.charAt(i)] += 1
        }
    }
    console.log(charObj)
    let maxChar = '',
        maxValue = 1
    for (var k in charObj) {
        if (charObj[k] >= maxValue) {
            maxChar = k
            maxValue = charObj[k]
        }
    }
    console.log(maxValue)
    return maxChar
}
console.log(findMaxDuplicateChar('abcabca'))