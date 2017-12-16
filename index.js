const _ = {};

// Returns the same value that is used as the argument.

_.identity = (x) => {
    return x;
};

// Returns the first element of an array. Passing n will return the first n elements of the array.

_.first = (arr, n) => {
    if (n === undefined) return arr[0];
    return arr.slice(0, n);
};

// Returns the last element of an array. Passing n will return the last n elements of the array.

_.last = (arr, n) => {
    if (n === undefined) return arr[arr.length-1];
    return arr.slice(-n);
};

// Iterates over a list of elements, yielding each in turn to an iteratee function. The iteratee is bound to the context object, if passed.

_.each = (list, iteratee, context) => {
    if (!context) context = this;
    if (Array.isArray(list)) {
        for (let i = 0; i < list.length; i++) {
            iteratee.call(context, list[i], i, list);
        }
    }
    else {
        for (let key in list) {
            iteratee.call(context, list[key], key, list);
        }
    }
};

// Returns the index at which value can be found in the array, or -1 if value is not present in the array. If the array is already sorted, pass true for isSorted for a faster binary search or pass a number as the third argument in order to look for the first matching value in the array after the given index.

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

// Looks through each value in the list, returning an array of all the values that pass a truth test (predicate).

_.filter = (list, predicate, context) => {
    if (!context) context = this;
    let resultArr = [];
    if (Array.isArray(list)) {
        for (let i = 0; i < list.length; i++) {
            if (predicate.call(context, list[i])) {
                resultArr.push(list[i]);
            }
        }
        return resultArr;
    }
    if (typeof list === 'object') {
        let resultObj = {};
        for (let key in list) {
            if (predicate.call(context, list[key])) {
                resultObj[key] = list[key];
            }
        }
        return resultObj;
    }   
};

// Returns the values in list without the elements that the truth test (predicate) passes. The opposite of filter.

_.reject = (list, predicate, context) => {
    if (!context) context = this;
    if (Array.isArray(list)) {
        let resultArr = [];
        for (let i = 0; i < list.length; i++) {
            if (!predicate.call(context, list[i])) {
                resultArr.push(list[i]);
            }
        }
        return resultArr;
    }
    if (typeof list === 'object') {
        let resultObj = {};
        for (let key in list) {
            if (!predicate.call(context, list[key])) {
                resultObj[key] = list[key];
            }
        }
        return resultObj;
    }   
};

// Produces a duplicate-free version of the array, keeping only the first occurence of each value. 

_.uniq = (arr) => {
    let resultArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (_.indexOf(resultArr, arr[i]) === -1) {
            resultArr.push(arr[i]);
        }
    }
    return resultArr;
};

// Produces a new array of values by mapping each value in list through a transformation function (iteratee). The iteratee is passed three arguments: the value, then the index (or key) of the iteration, and finally a reference to the entire list.

_.map = (list, iteratee, context) => {
    if (!context) context = this;
    if (Array.isArray(list)) {
        let resultArr = [];
        for (let i = 0; i < list.length; i++) {
            let item = iteratee.call(context, list[i], i, list);
            resultArr.push(item);
        }
        return resultArr;
    }
    if (typeof list === 'object') {
        let resultObj = {};
        for (let key in list) {
            let item = iteratee.call(context, list[key], key, list);
            resultObj[key] = item;
        }
        return resultObj;
    }    
};

// Returns true if the value is present in the list. Uses indexOf internally, if list is an Array. Use fromIndex to start your search at a given index.

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

// A convenient version of what is perhaps the most common use-case for map: extracting a list of property values.

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

// Reduce boils down a list of values into a single value. Memo is the initial state of the reduction, each successive step should be returned by iteratee. The iteratee is passed four arguments: memo, value and index of the iteration,and a reference to the entire list.

_.reduce = (list, iteratee, memo, context) => {
    if (!context) context = this;
    _.each(list, function(item){
        if (memo === undefined) {
            return memo = list[0];
        }
        else {
            return memo = iteratee.call(context, memo, item);
        }
    });
    return memo;
};

//Returns true if all of the values in the list pass the predicate truth test. Short-circuits and stops traversing the list if a false element is found.

_.every = (list, predicate, context) => {
    if (!context) context = this;
    if (list.length === 0) return true;
    return _.reduce(list, function(isTrue, elem) {
        if (predicate) {
            if (!isTrue) return false;
            else {
                if ( predicate.call(context, elem)) return true;
                else return (false);
            }
        }
        else return elem;
    }, true);
};

// Returns true if any of the values in the list pass the predicate truth test. Short-circuits and stops traversing the list if a true element is found.

_.some = (list, predicate, context) => {
    if (!context) context = this;
    if (Array.isArray(list)) {
        for (let i = 0; i < list.length; i++) {
            if (predicate.call(context, list[i])) return true;
        }
        return false;
    }
    if (typeof list === 'object') {
        for (let key in list) {
            if (predicate.call(context, list[key])) return true; 
        }
        return false;	
    }
};

// Shallowly copy all of the properties in the source objects over to the destination object, and return the destination object. Any nested objects or arrays will be copied by reference, not duplicated. It's in-order, so the last source will override properties of the same name in previous arguments.

_.extend = (destination, sources) => {
    const newObj = Object.assign({}, destination);
    for (let key in sources) {
        newObj[key] = sources[key];
    }
    return newObj;
};

// Fill in undefined properties in object with the first value present in the following list of defaults objects.

_.defaults = (object, defaults) => {
    const objKeys = Object.keys(object);
    for (let key in defaults) {
        if (!_.contains(objKeys, key)){
            object[key] = defaults[key];
        }
    }
    return object;
};

// ADVANCED UNDERSCORE METHODS

// Creates a version of the function that can only be called one time. Repeated calls to the modified function will have no effect, returning the value from the original call. Useful for initialization functions, instead of having to set a boolean flag and then check it later.

_.once = (fn) => {
    let flag = true;
    return () => {
        if (flag) {
            flag = false;
            return fn();
        } 
    };
};

// Returns a new negated version of the predicate function.

_.negate = (predicate) => {
    return (x) => {
        return !(predicate(x));
    };
};

// Returns a shuffled copy of the list, using a version of the Fisher-Yates shuffle.

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

// Calls the method named by methodName on each value in the list. Any extra arguments passed to invoke will be forwarded on to the method invocation.

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

// Returns a (stably) sorted copy of list, ranked in ascending order by the results of running each value through iteratee. iteratee may also be the string name of the property to sort by (eg. length).

_.sortBy = (list, iteratee, context) => {
    if (!context) context = this;
    if (typeof iteratee === 'function') {
        return list.sort((a,b) => {
            return iteratee.call(context, a) - iteratee.call(context, b);
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

// Merges together the values of each of the arrays with the values at the corresponding position. Useful when you have separate data sources that are coordinated through matching array indexes. Use with apply to pass in an array of arrays. If you're working with a matrix of nested arrays, this can be used to transpose the matrix.

_.zip = function (arrays) {
    if (arguments.length > 1) {
        arrays = [...arguments];
    }

    return arrays.map((array, index) => {
        return array.map((val, i) => {
            return arrays[i][index];
        });
    });
};

// Uses a binary search to determine the index at which the value should be inserted into the list in order to maintain the list's sorted order. If an iteratee function is provided, it will be used to compute the sort ranking of each value, including the value you pass. The iteratee may also be the string name of the property to sort by (eg. length).

_.sortedIndex = (list, value, iteratee) => {
    let newList = list;
    newList.push(value);

    if (iteratee !== undefined) {
        newList = _.sortBy(newList, iteratee);
    }
    if (iteratee === undefined) {
        newList.sort();
    }
    if (typeof list[0] === 'object') {
        const keys = _.pluck(newList, iteratee);
        const val = value[iteratee];
        return binarySearch(keys, val, 0);
    }
    return binarySearch(newList, value, 0);
};

// Flattens a nested array (the nesting can be to any depth). If you pass shallow, the array will only be flattened a single level.

_.flatten = (array, shallow, resultArray, nested) => {
    let resultArr = [];
    if (resultArray) resultArr = resultArray;
    
    for (let i = 0; i < array.length; i++) {
        if (Array.isArray(array[i])) {  
            if (shallow && nested) {
                resultArr.push(array[i]);
            } 
            if (shallow && !nested) {
                _.flatten(array[i], true, resultArr, true);
            } 
            if (!shallow) {
                _.flatten(array[i], shallow, resultArr);
            } 
        }   
        else {
            resultArr.push(array[i]);
        } 
    } 
    return resultArr;
};

// Computes the list of values that are the intersection of all the arrays. Each value in the result is present in each of the arrays.

_.intersection = function (arrays) {
    if (arguments.length > 1) {
        arrays = [...arguments];
    }
    let resultArr = [];
    let i, j;

    for (i = 0; i < arrays[0].length; i++) {
        let item = arrays[0][i];
        if (_.contains(resultArr, item)) continue;
        for (j = 1; j < arrays.length; j++) {
            if(!_.contains(arrays[j], item)) break;
        }
        if (j === arrays.length) resultArr.push(item);
    }
    return resultArr;
};

// Similar to without, but returns the values from array that are not present in the other arrays.

_.difference = function (array, others) {
    let arrays = _.flatten(others, true);
    return array.filter((val) => {
        return !_.contains(arrays, val);
    });
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

