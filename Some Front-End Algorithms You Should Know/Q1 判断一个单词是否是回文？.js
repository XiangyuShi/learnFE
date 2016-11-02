/**
 * Created by hnsxy on 2016/11/2 0002.
 */
function checkPalindrom(str) {
    return str == str.split('').reverse().join('');
}
console.log(checkPalindrom('abcba'));
console.log(checkPalindrom('abc'));