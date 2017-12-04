const expect = require('chai').expect;
const path = require('path');
const sinon = require('sinon');
const _ = require(path.join(__dirname,'..','./index.js'));

describe('_', () => {
    'use strict';

    it('is an object', () => {
        expect(_).to.be.an('object');
    });
});

describe('_.identity', () => {
    it('returns the same value used in the argument', () => {
        expect(_.identity('hello')).to.equal('hello');
    });
});

describe('_.first', () => {
    it('returns the first element of the array when no second argument given', () => {
        expect(_.first([1,2,3,4,5])).to.equal(1);
    });
    it('returns the first given number of elements when second argument is provided', () => {
        expect(_.first([1,3,5,7,9], 3)).to.eql([1,3,5]);
    });
});

describe('_.last', () => {
    it('returns the last element of the array when no second argument given', () => {
        expect(_.last([1,2,3,4,5])).to.equal(5);
    });
    it('returns the last given number of elements when second argument is provided', () => {
        expect(_.last([1,3,5,7,9], 3)).to.eql([5,7,9]);
    });
});

describe('_.each', () => {
    it('iterates over a list of elements for an array', () => {
        let count = 0;
        function incCount () {
            count ++;
        }
        _.each([1,2,3],incCount);
        expect(count).to.equal(3);
    });
    it('check all calls are made to iteratee function for array', () => {
        const spy = sinon.spy();
        _.each([1,2,3], spy);
        expect(spy.firstCall.calledWithExactly(1,0,[1,2,3])).to.equal(true);
        expect(spy.secondCall.calledWithExactly(2,1,[1,2,3])).to.equal(true);
        expect(spy.thirdCall.calledWithExactly(3,2,[1,2,3])).to.equal(true);
    });
    it('check all calls are made to iteratee function for an object', () => {
        const spy = sinon.spy();
        _.each({one: 1, two: 2, three: 3}, spy);
        expect(spy.firstCall.calledWithExactly(1,'one',{one: 1, two: 2, three: 3})).to.equal(true);
        expect(spy.secondCall.calledWithExactly(2,'two',{one: 1, two: 2, three: 3})).to.equal(true);
        expect(spy.thirdCall.calledWithExactly(3,'three',{one: 1, two: 2, three: 3})).to.equal(true);
    });
});

describe('_.indexOf', () => {
    it('returns -1 if value is not present in the array', () => {
        expect(_.indexOf([3,3,5,2,5,6,7,8], 4)).to.equal(-1);
    });
    it('returns index of value in the array', () => {
        expect(_.indexOf([3,3,5,2,5,6,7,8], 2)).to.equal(3);
    });
    it('returns index of search value after given index as third argument', () => {
        expect(_.indexOf([1,2,3,4,5,6], 5, 2)).to.equal(2);
    });
    it('performs binary search on array if sorted argument provided', () => {
        expect(_.indexOf([1,2,3,4,5,6,7,8], 7, true)).to.equal(6);
    });
});

describe('_.filter', () => {
    it('returns an array of elements that pass the predicate test', () => {
        function isEven (x) {
            return x % 2 === 0;
        }
        expect(_.filter([1,2,3,4,5,6], isEven)).to.eql([2,4,6]);
    });
    it('calls predicate function for all elements in array', () => {
        let spy = sinon.spy();
        _.filter([1,2,3,4,5,6], spy);
        expect(spy.firstCall.calledWithExactly(1)).to.equal(true);
        expect(spy.secondCall.calledWithExactly(2)).to.equal(true);
        expect(spy.thirdCall.calledWithExactly(3)).to.equal(true);
    });
    it('returns an object where values pass the predicate test', () => {
        function isEven (x) {
            return x % 2 === 0;
        }
        expect(_.filter({one: 1, two: 2, three: 3, four: 4}, isEven)).to.eql({two: 2, four: 4});
    });
    it('calls predicate function for all keys in an object', () => {
        let spy = sinon.spy();
        _.filter({one: 1, two: 2, three: 3, four: 4}, spy);
        expect(spy.firstCall.calledWithExactly(1)).to.equal(true);
        expect(spy.secondCall.calledWithExactly(2)).to.equal(true);
        expect(spy.thirdCall.calledWithExactly(3)).to.equal(true);
    });
});

describe('_.reject', () => {
    it('returns an array of elements that do not pass the predicate test', () => {
        function isEven (x) {
            return x % 2 === 0;
        }
        expect(_.reject([1,2,3,4,5,6], isEven)).to.eql([1,3,5]);
    });
    it('calls predicate function for all elements in array', () => {
        let spy = sinon.spy();
        _.reject([1,2,3,4,5,6], spy);
        expect(spy.firstCall.calledWithExactly(1)).to.equal(true);
        expect(spy.secondCall.calledWithExactly(2)).to.equal(true);
        expect(spy.thirdCall.calledWithExactly(3)).to.equal(true);
    });
    it('returns an object where values do not pass the predicate test', () => {
        function isEven (x) {
            return x % 2 === 0;
        }
        expect(_.reject({one: 1, two: 2, three: 3, four: 4}, isEven)).to.eql({one: 1, three: 3});
    });
    it('calls predicate function for all keys in an object', () => {
        let spy = sinon.spy();
        _.reject({one: 1, two: 2, three: 3, four: 4}, spy);
        expect(spy.firstCall.calledWithExactly(1)).to.equal(true);
        expect(spy.secondCall.calledWithExactly(2)).to.equal(true);
        expect(spy.thirdCall.calledWithExactly(3)).to.equal(true);
    });
});

describe('_.uniq', () => {
    it('returns array of only the unique elements', () => {
        expect(_.uniq([1,1,1,2,2,3,4,5,5,4,3,4])).to.eql([1,2,3,4,5]);
    });
});

describe('_.map', () => {
    function double (x) {
        return x * 2;
    }
    it('returns an array of items passed through iteratee function', () => {
        expect(_.map([1,2,3,4,5], double)).to.eql([2,4,6,8,10]);
    });
    it('returns an object where values are passed through iteratee function', () => {
        expect(_.map({one:1, two: 2, three: 3}, double)).to.eql({one: 2, two: 4, three: 6});
    });
    it('calls iteratee function for all items in an array', () => {
        let spy = sinon.spy();
        _.map([1,2,3], spy);
        expect(spy.firstCall.calledWithExactly(1, 0, [1,2,3])).to.equal(true);
        expect(spy.secondCall.calledWithExactly(2, 1, [1,2,3])).to.equal(true);
        expect(spy.thirdCall.calledWithExactly(3, 2, [1,2,3])).to.equal(true);
    });
    it('calls iteratee function for all keys in an object', () => {
        let spy = sinon.spy();
        _.map({one: 1, two: 2, three: 3}, spy);
        expect(spy.firstCall.calledWithExactly(1, 'one', {one: 1, two: 2, three: 3})).to.equal(true);
        expect(spy.secondCall.calledWithExactly(2, 'two', {one: 1, two: 2, three: 3})).to.equal(true);
        expect(spy.thirdCall.calledWithExactly(3, 'three', {one: 1, two: 2, three: 3})).to.equal(true);
    });
});

describe('_.contains', () => {
    it('returns true if array contains value', () => {
        expect(_.contains([1,2,3,4,5], 3)).to.equal(true);
        expect(_.contains([1,2,3,4,5], 6)).to.equal(false);
    });
    it('returns true if object contains value', () => {
        expect(_.contains({one:1, two: 2, three: 3}, 2)).to.equal(true);
        expect(_.contains({one:1, two: 2, three: 3}, 6)).to.equal(false);
    });
});

describe('_.pluck', () => {
    const stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];

    it('returns an array of values of given property name in an object', () => {
        expect(_.pluck(stooges, 'name')).to.eql(['moe', 'larry', 'curly']);
    });
    it('returns an empty array if property name does not exist in object', () => {
        expect(_.pluck(stooges, 'height')).to.eql([]);
    });
});

describe('_.reduce', () => {
    function sum (acc, val) {
        return acc + val;
    }
    const numArr = [1,2,3,4,5];
    const numObj = {one: 1, two: 2, three: 3, four: 4, five: 5};
    it('reduces array down to one value, iterating through each value', () => {
        expect(_.reduce(numArr, sum, 0)).to.equal(15);
    });
    it('reduces object values down to one value, iterating through each key value pair', () => {
        expect(_.reduce(numObj, sum, 0)).to.equal(15);
    });
});

describe('_.every', () => {
    function isEven (x) {
        return x % 2 === 0;
    }
    const numArr = [1,2,3,4,5];
    const evenArr = [2,4,6,8,10];
    const numObj = {one: 1, two: 2, three: 3, four: 4, five: 5};
    const evenObj = {six: 6, two: 2, eight: 8, four: 4, ten: 10};
    it('returns true if all items pass predicate test', () => {
        expect(_.every(numArr, isEven)).to.equal(false);
        expect(_.every(evenArr, isEven)).to.equal(true);
        expect(_.every(numObj, isEven)).to.equal(false);
        expect(_.every(evenObj, isEven)).to.equal(true);
    });
    it('returns false when an item fails the predicate test without continuing', () => {
        const arr = [3, 2, 4, 6, 6];
        expect(_.every(arr, isEven)).to.equal(false);
    });
});

describe('_.some', () => {
    function isEven (x) {
        return x % 2 === 0;
    }
    const numArr = [1,2,3,4,5];
    const oddArr = [1,3,5,7,9];
    const numObj = {one: 1, two: 2, three: 3, four: 4, five: 5};
    const oddObj = {one: 1, three: 3, five: 5, seven: 7, nine: 9};
    it('returns true if any items pass predicate test', () => {
        expect(_.some(numArr, isEven)).to.equal(true);
        expect(_.some(oddArr, isEven)).to.equal(false);
        expect(_.some(numObj, isEven)).to.equal(true);
        expect(_.some(oddObj, isEven)).to.equal(false);
    });
});

describe('_.extend', () => {
    it('returns combined object', () => {
        const obj1 = {name: 'moe'};
        const obj2 = {age: 50};
        expect(_.extend(obj1, obj2)).to.eql({name: 'moe', age: 50});
    });
    it('replaces value if key is in both destination and source object', () => {
        const obj1 = {name: 'moe'};
        const obj2 = {name: 'zoe', age: 50};
        expect(_.extend(obj1, obj2)).to.eql({name: 'zoe', age: 50});
    });
    it('copies nested arrays and objects by reference', () => {
        const obj1 = {1:1,2:2,3:3};
        const obj2 = {4:4, 5:5, nums:[6,7,8]};
        const obj3 = {4:4, 5:5, nums:{6:6, 7:7, 8:8}};
        expect(_.extend(obj1, obj2).nums).to.eql([6,7,8]);
        expect(_.extend(obj1, obj3).nums).to.eql({6:6, 7:7, 8:8});
    });
});

describe('_.defaults', () => {
    it('returns object with values added if not defined', () => {
        const obj1 = {flavor: 'chocolate'};
        const obj2 = {flavor: 'vanilla', sprinkles: 'lots'};
        expect(_.defaults(obj1, obj2)).to.eql({flavor: 'chocolate', sprinkles: 'lots'});
    });
});

describe('_.once', () => {
    it('calls the function only once', () => {
        let count = 0;
        function incCount () {
            count ++;
        }
        const onceCall = _.once(incCount);
        onceCall();
        onceCall();
        onceCall();
        expect(count).to.equal(1);
    });
    it('check call is made only once', () => {
        const spy = sinon.spy();
        const onceCall = _.once(spy);
        onceCall();
        onceCall();
        expect(spy.calledOnce).to.equal(true);
    });
});