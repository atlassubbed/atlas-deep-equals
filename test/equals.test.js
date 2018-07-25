const { describe, it } = require("mocha")
const { expect } = require("chai")
const equals = require("../src/equals");
const { Animal, Rat } = require("./util");

describe("equals", function(){
  it("should test string equality", function(){
    expect(equals("a","a")).to.be.true
    expect(equals("a","b")).to.be.false
    expect(equals("a","a", true)).to.be.true
    expect(equals("a","b", true)).to.be.false
  })
  it("should test number equality", function(){
    expect(equals(42,42)).to.be.true
    expect(equals(42,23)).to.be.false
    expect(equals(42,42, true)).to.be.true
    expect(equals(42,23, true)).to.be.false
  })
  it("should test boolean equality", function(){
    expect(equals(true,true)).to.be.true
    expect(equals(true,false)).to.be.false
    expect(equals(true,true, true)).to.be.true
    expect(equals(true,false, true)).to.be.false
  })
  it("should test `null` equality", function(){
    expect(equals(null,null)).to.be.true
    expect(equals(null,undefined)).to.be.false
    expect(equals(null,null, true)).to.be.true
    expect(equals(null,undefined, true)).to.be.false
  })
  it("should test `undefined` equality", function(){
    expect(equals(undefined,undefined)).to.be.true
    expect(equals(null,undefined)).to.be.false
    expect(equals(undefined,undefined, true)).to.be.true
    expect(equals(null,undefined, true)).to.be.false
  })
  it("should test `Infinity` equality", function(){
    expect(equals(Infinity,Infinity)).to.be.true
    expect(equals(NaN,Infinity)).to.be.false
    expect(equals(Infinity,Infinity, true)).to.be.true
    expect(equals(NaN,Infinity, true)).to.be.false
  })
  it("should test array equality", function(){
    expect(equals([1,2,3],[1,2,3])).to.be.true
    expect(equals([1,2,3],[1,2])).to.be.false
    expect(equals([1,2,3],[1,2,3], true)).to.be.true
    expect(equals([1,2,3],[1,2], true)).to.be.false
  })
  it("should test object equality", function(){
    expect(equals({class:"red-div"},{class:"red-div"})).to.be.true
    expect(equals({class:"red-div"},{class:"blue-div"})).to.be.false
    expect(equals({class:"red-div"},{class:"red-div"}, true)).to.be.true
    expect(equals({class:"red-div"},{class:"blue-div"}, true)).to.be.false
  })
  it("should not correctly test `NaN` equality", function(){
    expect(equals(NaN,NaN)).to.be.false
    expect(equals(NaN,NaN, true)).to.be.false
  })
  it("should not correctly test RegExp equality", function(){
    expect(equals(/reg/, /reg/)).to.be.true
    expect(equals(/reg/, /reg2/)).to.be.true
    expect(equals(/reg/, /reg/, true)).to.be.true
    expect(equals(/reg/, /reg2/, true)).to.be.true
  })
  it("should not correctly test Date equality", function(){
    const now = Date.now();
    const d1 = new Date(now);
    const d2 = new Date(now);
    const d3 = new Date(now + 1);
    expect(equals(d1,d2)).to.be.true
    expect(equals(d1,d3)).to.be.true
    expect(equals(d1,d2, true)).to.be.true
    expect(equals(d1,d3, true)).to.be.true
  })
  it("should not correctly test non-literal object equality", function(){
    const rat1 = new Rat(15, "brown")
    const rat2 = new Rat(15, "brown")
    const rat3 = new Animal(15);
    rat3.color = "brown";
    expect(equals(rat1, rat2)).to.be.true;
    expect(equals(rat1, rat3)).to.be.true
    expect(equals(rat1, rat2, true)).to.be.true;
    expect(equals(rat1, rat3, true)).to.be.true
  })
  it("should only test array<array> equality if deep", function(){
    expect(equals([1,2,[3,4]],[1,2,[3,4]])).to.be.false
    expect(equals([1,2,[3,4]],[1,2,[3]])).to.be.false
    expect(equals([1,2,[3,4]],[1,2,[3,4]], true)).to.be.true
    expect(equals([1,2,[3,4]],[1,2,[3]], true)).to.be.false
  })
  it("should only test object<object> equality if deep", function(){
    expect(equals({user:{id:1,name:"ron"}},{user:{id:1,name:"ron"}})).to.be.false
    expect(equals({user:{id:1,name:"ron"}},{user:{id:2,name:"ron"}})).to.be.false
    expect(equals({user:{id:1,name:"ron"}},{user:{id:1,name:"ron"}}, true)).to.be.true
    expect(equals({user:{id:1,name:"ron"}},{user:{id:2,name:"ron"}}, true)).to.be.false
  })
  it("should only test array<object> equality if deep", function(){
    expect(equals([{id:1},{id:2}],[{id:1},{id:2}])).to.be.false
    expect(equals([{id:1},{id:2}],[{id:1},{id:2.1}])).to.be.false
    expect(equals([{id:1},{id:2}],[{id:1},{id:2}], true)).to.be.true
    expect(equals([{id:1},{id:2}],[{id:1},{id:2.1}], true)).to.be.false
  })
  it("should only test object<array> equality if deep", function(){
    const r1 = {user:{id:1,name:"ron",equips:["broken wand"]}};
    const r2 = {user:{id:1,name:"ron",equips:["broken wand"]}};
    const r3 = {user:{id:1,name:"ron",equips:["40 year old rat"]}}
    expect(equals(r1,r2)).to.be.false
    expect(equals(r1,r3)).to.be.false
    expect(equals(r1,r2, true)).to.be.true
    expect(equals(r1,r3, true)).to.be.false
  })
})
