/**
 * Created by hnsxy on 2016/11/2 0002.
 */
function queryClassName(node, name) {
    var starts = '(^|[ \n\r\t\f])',
        ends = '([ \n\r\t\f]|$)';
    var array = [],
        regex = new RegExp(starts + name + ends),
        elements = node.getElementsByTagName("*"),
        length = elements.length,
        i = 0,
        element;

    while (i < length) {
        element = elements[i];
        if (regex.test(element.className)) {
            array.push(element);
        }

        i += 1;
    }

    return array;
}