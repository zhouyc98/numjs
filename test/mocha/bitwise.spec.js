/* eslint-env mocha */
'use strict';

var expect = require('expect.js');

var nj = require('../../src');

describe('bitwise', function () {
  var v;
  var m;
  beforeEach(function () {
    v = nj.array([0xfff0, 0x0001]);
    m = nj.array([0x00ff, 0x0003]);
  });
  
  it('can do bitwise and', function () {
    expect(v.bitand(m, false).tolist())
    .to.eql([0x00f0, 1]);
  });

  it('can do bitwise or', function () {
    expect(v.bitor(m).tolist())
    .to.eql([0xffff, 3]);
  });

  it('can do bitwise xor', function () {
    expect(v.bitxor(m).tolist())
    .to.eql([0xff0f, 2]);
  });

  it('can do bitwise not', function () {
    expect(v.bitnot().tolist())
        .to.eql([~0xfff0, -2]);
  });

  it('can do left shift', function () {
    expect(v.lshift(1).tolist())
    .to.eql([0x1ffe0, 2]);
  });

  it('can do right shift', function () {
    expect(v.rshift(1).tolist())
    .to.eql([0x7ff8, 0]);
  });

  it('can do unsigned right shift', function () {
    expect(v.rrshift(1).tolist())
    .to.eql([0x7ff8, 0]);
  });

});
