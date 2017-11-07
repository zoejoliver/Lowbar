const _ = {};

_.identity = (x) => {
    return x;
};

_.first = (arr, n) => {
    if (n === undefined) return arr[0];
    return arr.slice(0, n);
};

_.last = (arr, n) => {
    if (n === undefined) return arr[arr.length-1];
    return arr.slice(-n);
};

_.each = (list, iteratee) => {
    if (Array.isArray(list)) {
        for (let i = 0; i < list.length; i++) {
            iteratee(list[i], i, list);
        }
    }
    else {
        for (let key in list) {
            iteratee(list[key], key, list);
        }
    }
};

_.indexOf = (arr, value, isSorted) => {
    if (isSorted === undefined) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === value) return i;
        }
    }
    if (typeof isSorted === 'number') {
        for (let i = isSorted; i < arr.length; i++) {
            if (arr[i] === value) return i - isSorted;
        }
    }
    if (isSorted === true) {
        return binarySearch(arr, value, 0);
    }
    return -1;
};

function binarySearch(arr, val, index) {
    if (arr.length === 1) {
        return index;
    }
    var half = Math.floor(arr.length/2);
    var first = arr.slice(0, half);
    var second = arr.slice(half);
    if (val === arr[half]) {
        return (half + index);
    }
    else if (val > half) {
        index += first.length;
        return binarySearch(second, val, index);
    }
    else {
        return binarySearch(first, val, index);
    }
}
module.exports = _;