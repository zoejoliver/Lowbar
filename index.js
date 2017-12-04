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
    if (Array.isArray(list)) {
        let resultArr = [];
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

_.map = (list, iteratee) => {
    if (Array.isArray(list)) {
        let resultArr = [];
        for (let i = 0; i < list.length; i++) {
            let item = iteratee(list[i], i, list);
            resultArr.push(item);
        }
        return resultArr;
    }
    if (typeof list === 'object') {
        let resultObj = {};
        for (let key in list) {
            let item = iteratee(list[key], key, list);
            resultObj[key] = item;
        }
        return resultObj;
    }    
};

_.contains = (list, value, fromIndex) => {
    if (Array.isArray(list)) {
        if (fromIndex !== undefined) {
            if(_.indexOf(list, value, fromIndex) === -1) return false;
            else return true;
        }
        for (let i = 0; i < list.length; i++) {
            if (_.indexOf(list, value) === -1) return false; 
            return true;
        }
    }
    if (typeof list === 'object') {
        for (let key in list) {
            if (list[key] === value) return true; 
        }
        return false;	
    }
};

_.pluck = (list, propertyName) => {
    if (typeof list === 'object') {
        let resultArr = [];
        for (let obj in list) {
            for (let key in list[obj]) {
                if (key === propertyName) {
                    resultArr.push(list[obj][key]);
                }
            }
        }
        return resultArr;
    } 
};

_.reduce = (list, iteratee, memo) => {
    _.each(list, function(item){
        if (memo === undefined) {
            return memo = list[0];
        }
        else {
            return memo = iteratee(memo, item);
        }
    });
    return memo;
};

_.every = (list, predicate) => {
    if (list.length === 0) return true;
    return _.reduce(list, function(isTrue, elem) {
        if (predicate) {
            if (!isTrue) return false;
            else {
                if ( predicate(elem)) return true;
                else return (false);
            }
        }
        else return elem;
    }, true);
};
_.some = (list, predicate) => {
    if (Array.isArray(list)) {
        for (let i = 0; i < list.length; i++) {
            if (predicate(list[i])) return true;
        }
        return false;
    }
    if (typeof list === 'object') {
        for (let key in list) {
            if (predicate(list[key])) return true; 
        }
        return false;	
    }
};

_.extend = (destination, sources) => {
    const newObj = Object.assign({}, destination);
    for (let key in sources) {
        newObj[key] = sources[key];
    }
    return newObj;
};

_.defaults = (object, defaults) => {
    const objKeys = Object.keys(object);
    for (let key in defaults) {
        if (!_.contains(objKeys, key)){
            object[key] = defaults[key];
        }
    }
    return object;
};

// advanced underscore methods
_.once = (fn) => {
    let flag = true;
    return () => {
        if (flag) {
            flag = false;
            return fn();
        } 
    };
};

_.negate = (predicate) => {
    return (x) => {
        return !(predicate(x));
    };
};

_.shuffle = (list) => {
    let newArr = [];
    const length = list.length;
    for (let i = 0; i < length; i++) {
        let l = list.length -1;
        const random = Math.floor(Math.random() * l);
        newArr.push(list[random]);
        list.splice(random, 1);
    }
    return newArr;
};

_.invoke = (list, methodName, ...args) => {
    let resultArr = [];
    methodName = _[methodName];
    let item;
    for(let i = 0; i < list.length; i++) {
        if (args !== undefined) item = methodName(list[i], ...args);
        else item = methodName(list[i]);
        resultArr.push(item);
    }
    return resultArr;
};    

_.sortBy = (list, iteratee) => {
    if (typeof iteratee === 'function') {
        return list.sort((a,b) => {
            return iteratee(a) - iteratee(b);
        });
    } 
    else {
        return list.sort((a, b) => {
            if (a[iteratee] < b[iteratee]) return -1;
            if (a[iteratee] > b[iteratee]) return 1;
            return 0;
        });
    }
};

_.zip = () => {

};

_.sortedIndex = () => {

};

_.flatten = () => {

};

_.intersection = () => {

};

_.difference = () => {
    
};

_.memoize = () => {

};

_.delay = () => {

};

_.where = () => {

};

_.throttle = () => {

};

_.partial = () => {

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

