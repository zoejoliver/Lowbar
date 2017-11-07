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
