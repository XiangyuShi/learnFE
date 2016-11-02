/**
 * Created by hnsxy on 2016/11/2 0002.
 */
let unique = function(arr) {
    let hashTable = {}
    let data = []
    for(let i=0,l=arr.length;i<l;i++) {
        if(!hashTable[arr[i]]) {
            hashTable[arr[i]] = true
            data.push(arr[i])
        }
    }
    return data
}
let arr=[1,13,24,11,11,14,1,2]
console.log(unique(arr))