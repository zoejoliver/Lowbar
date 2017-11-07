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

module.exports = _;