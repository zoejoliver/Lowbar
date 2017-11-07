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



