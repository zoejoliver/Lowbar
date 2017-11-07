const expect = require('chai').expect;
const path = require('path');

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


