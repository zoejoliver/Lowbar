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

_.filter = (list, predicate) => {
    let resultArr = [];
    if (Array.isArray(list)) {
        for (let i = 0; i < list.length; i++) {
            if (predicate(list[i])) {
                resultArr.push(list[i]);
            }
        }
        return resultArr;
    }
    if (typeof list === 'object') {
        let resultObj = {};
        for (let key in list) {
            if (predicate(list[key])) {
                resultObj[key] = list[key];
            }
        }
        return resultObj;
    }   
};

_.reject = (list, predicate) => {
    let resultArr = [];
    if (Array.isArray(list)) {
        for (let i = 0; i < list.length; i++) {
            if (!predicate(list[i])) {
                resultArr.push(list[i]);
            }
        }
        return resultArr;
    }
    if (typeof list === 'object') {
        let resultObj = {};
        for (let key in list) {
            if (!predicate(list[key])) {
                resultObj[key] = list[key];
            }
        }
        return resultObj;
    }   
};

_.uniq = (arr) => {
    let resultArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (_.indexOf(resultArr, arr[i]) === -1) {
            resultArr.push(arr[i]);
        }
    }
    return resultArr;
};

module.exports = _;

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

