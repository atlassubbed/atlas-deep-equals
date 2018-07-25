const { describe, it } = require("mocha")
const { expect } = require("chai")
const { equals, equalsFast } = require("../src/equals");
const { Animal, Rat } = require("./util");

describe("equalsFast", function(){
  it("should test string equality", function(){
    expect(equalsFast("a","a")).to.be.true
    expect(equalsFast("a","b")).to.be.false
    expect(equalsFast("a","a", true)).to.be.true
    expect(equalsFast("a","b", true)).to.be.false
  })
  it("should test number equality", function(){
    expect(equalsFast(42,42)).to.be.true
    expect(equalsFast(42,23)).to.be.false
    expect(equalsFast(42,42, true)).to.be.true
    expect(equalsFast(42,23, true)).to.be.false
  })
  it("should test boolean equality", function(){
    expect(equalsFast(true,true)).to.be.true
    expect(equalsFast(true,false)).to.be.false
    expect(equalsFast(true,true, true)).to.be.true
    expect(equalsFast(true,false, true)).to.be.false
  })
  it("should test `null` equality", function(){
    expect(equalsFast(null,null)).to.be.true
    expect(equalsFast(null,undefined)).to.be.false
    expect(equalsFast(null,null, true)).to.be.true
    expect(equalsFast(null,undefined, true)).to.be.false
  })
  it("should test `undefined` equality", function(){
    expect(equalsFast(undefined,undefined)).to.be.true
    expect(equalsFast(null,undefined)).to.be.false
    expect(equalsFast(undefined,undefined, true)).to.be.true
    expect(equalsFast(null,undefined, true)).to.be.false
  })
  it("should test `Infinity` equality", function(){
    expect(equalsFast(Infinity,Infinity)).to.be.true
    expect(equalsFast(NaN,Infinity)).to.be.false
    expect(equalsFast(Infinity,Infinity, true)).to.be.true
    expect(equalsFast(NaN,Infinity, true)).to.be.false
  })
  it("should test array equality", function(){
    expect(equalsFast([1,2,3],[1,2,3])).to.be.true
    expect(equalsFast([1,2,3],[1,2])).to.be.false
    expect(equalsFast([1,2,3],[1,2,3], true)).to.be.true
    expect(equalsFast([1,2,3],[1,2], true)).to.be.false
  })
  it("should test object equality", function(){
    expect(equalsFast({class:"red-div"},{class:"red-div"})).to.be.true
    expect(equalsFast({class:"red-div"},{class:"blue-div"})).to.be.false
    expect(equalsFast({class:"red-div"},{class:"red-div"}, true)).to.be.true
    expect(equalsFast({class:"red-div"},{class:"blue-div"}, true)).to.be.false
  })
  it("should not correctly test `NaN` equality", function(){
    expect(equalsFast(NaN,NaN)).to.be.false
    expect(equalsFast(NaN,NaN, true)).to.be.false
  })
  it("should not correctly test RegExp equality", function(){
    expect(equalsFast(/reg/, /reg/)).to.be.true
    expect(equalsFast(/reg/, /reg2/)).to.be.true
    expect(equalsFast(/reg/, /reg/, true)).to.be.true
    expect(equalsFast(/reg/, /reg2/, true)).to.be.true
  })
  it("should not correctly test Date equality", function(){
    const now = Date.now();
    const d1 = new Date(now);
    const d2 = new Date(now);
    const d3 = new Date(now + 1);
    expect(equalsFast(d1,d2)).to.be.true
    expect(equalsFast(d1,d3)).to.be.true
    expect(equalsFast(d1,d2, true)).to.be.true
    expect(equalsFast(d1,d3, true)).to.be.true
  })
  it("should not correctly test non-literal object equality", function(){
    const rat1 = new Rat(15, "brown")
    const rat2 = new Rat(15, "brown")
    const rat3 = new Animal(15);
    rat3.color = "brown";
    expect(equalsFast(rat1, rat2)).to.be.true;
    expect(equalsFast(rat1, rat3)).to.be.true
    expect(equalsFast(rat1, rat2, true)).to.be.true;
    expect(equalsFast(rat1, rat3, true)).to.be.true
  })
  it("should only test array<array> equality if deep", function(){
    expect(equalsFast([1,2,[3,4]],[1,2,[3,4]])).to.be.false
    expect(equalsFast([1,2,[3,4]],[1,2,[3]])).to.be.false
    expect(equalsFast([1,2,[3,4]],[1,2,[3,4]], true)).to.be.true
    expect(equalsFast([1,2,[3,4]],[1,2,[3]], true)).to.be.false
  })
  it("should only test object<object> equality if deep", function(){
    expect(equalsFast({user:{id:1,name:"ron"}},{user:{id:1,name:"ron"}})).to.be.false
    expect(equalsFast({user:{id:1,name:"ron"}},{user:{id:2,name:"ron"}})).to.be.false
    expect(equalsFast({user:{id:1,name:"ron"}},{user:{id:1,name:"ron"}}, true)).to.be.true
    expect(equalsFast({user:{id:1,name:"ron"}},{user:{id:2,name:"ron"}}, true)).to.be.false
  })
  it("should only test array<object> equality if deep", function(){
    expect(equalsFast([{id:1},{id:2}],[{id:1},{id:2}])).to.be.false
    expect(equalsFast([{id:1},{id:2}],[{id:1},{id:2.1}])).to.be.false
    expect(equalsFast([{id:1},{id:2}],[{id:1},{id:2}], true)).to.be.true
    expect(equalsFast([{id:1},{id:2}],[{id:1},{id:2.1}], true)).to.be.false
  })
  it("should only test object<array> equality if deep", function(){
    const r1 = {user:{id:1,name:"ron",equips:["broken wand"]}};
    const r2 = {user:{id:1,name:"ron",equips:["broken wand"]}};
    const r3 = {user:{id:1,name:"ron",equips:["40 year old rat"]}}
    expect(equalsFast(r1,r2)).to.be.false
    expect(equalsFast(r1,r3)).to.be.false
    expect(equalsFast(r1,r2, true)).to.be.true
    expect(equalsFast(r1,r3, true)).to.be.false
  })
})

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
  it("should test `NaN` equality", function(){
    expect(equals(NaN,NaN)).to.be.true
    expect(equals(NaN, "NaN")).to.be.false
    expect(equals(NaN,NaN, true)).to.be.true
    expect(equals(NaN, "NaN", true)).to.be.false
  })
  it("should test RegExp equality", function(){
    expect(equals(/reg/, /reg/)).to.be.true
    expect(equals(/reg/, /reg2/)).to.be.false
    expect(equals(/reg/, /reg/, true)).to.be.true
    expect(equals(/reg/, /reg2/, true)).to.be.false
  })
  it("should test Date equality", function(){
    const now = Date.now();
    const d1 = new Date(now);
    const d2 = new Date(now);
    const d3 = new Date(now + 1);
    expect(equals(d1,d2)).to.be.true
    expect(equals(d1,d3)).to.be.false
    expect(equals(d1,d2, true)).to.be.true
    expect(equals(d1,d3, true)).to.be.false
  })
  it("should test non-literal object equality", function(){
    const rat1 = new Rat(15, "brown")
    const rat2 = new Rat(15, "brown")
    const rat3 = new Animal(15);
    rat3.color = "brown";
    expect(equals(rat1, rat2)).to.be.true;
    expect(equals(rat1, rat3)).to.be.false
    expect(equals(rat1, rat2, true)).to.be.true;
    expect(equals(rat1, rat3, true)).to.be.false
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

// describe("equals", function(){
//   it("should test string equality", function(){
//     expect(equals("a","a")).to.be.true
//     expect(equals("a","b")).to.be.false
//   })
//   it("should test number equality", function(){
//     expect(equals(42,42)).to.be.true
//     expect(equals(42,23)).to.be.false
//   })
//   it("should test `NaN` equality", function(){
//     expect(equals(NaN,NaN)).to.be.true
//     expect(equals(NaN,"NaN")).to.be.false
//   })
//   it("should test boolean equality", function(){
//     expect(equals(true,true)).to.be.true
//     expect(equals(true,false)).to.be.false
//   })
//   it("should test `null` equality", function(){
//     expect(equals(null,null)).to.be.true
//     expect(equals(null,undefined)).to.be.false
//   })
//   it("should test `undefined` equality", function(){
//     expect(equals(undefined,undefined)).to.be.true
//     expect(equals(null,undefined)).to.be.false
//   })
//   it("should test `Infinity` equality", function(){
//     expect(equals(Infinity,Infinity)).to.be.true
//     expect(equals(NaN,Infinity)).to.be.false
//   })
//   it("should test RegExp equality", function(){
//     expect(equals(/reg/, /reg/)).to.be.true
//     expect(equals(/reg/, /reg2/)).to.be.false
//   })
//   it("should test Date equality", function(){
//     const now = Date.now();
//     const d1 = new Date(now);
//     const d2 = new Date(now);
//     const d3 = new Date(now + 1);
//     expect(equals(d1,d2)).to.be.true
//     expect(equals(d1,d3)).to.be.false
//   })
//   it("should test array equality", function(){
//     expect(equals([1,2,3],[1,2,3])).to.be.true
//     expect(equals([1,2,3],[1,2])).to.be.false
//   })
//   it("should test object equality", function(){
//     expect(equals({class:"red-div"},{class:"red-div"})).to.be.true
//     expect(equals({class:"red-div"},{class:"blue-div"})).to.be.false
//   })
//   it("should test non-literal object equality", function(){
//     const rat1 = new Rat(15, "brown")
//     const rat2 = new Rat(15, "brown")
//     const rat3 = new Animal(15);
//     rat3.color = "brown";
//     expect(equals(rat1, rat2)).to.be.true;
//     expect(equals(rat1, rat3)).to.be.false
//   })
//   it("should not test nested array equality", function(){
//     expect(equals([1,2,[3,4]],[1,2,[3,4]])).to.be.false
//     expect(equals([1,2,[3,4]],[1,2,[3]])).to.be.false
//   })
//   it("should not test nested object equality", function(){
//     expect(equals({user:{id:1,name:"ron"}},{user:{id:1,name:"ron"}})).to.be.false
//     expect(equals({user:{id:1,name:"ron"}},{user:{id:2,name:"ron"}})).to.be.false
//   })
//   it("should not test nested non-literal object equality", function(){
//     const rat1 = new Rat(15, "brown")
//     const rat2 = new Rat(15, "brown")
//     const rat3 = new Rat(15, "brown")
//     rat1.friend = new Animal(34);
//     rat2.friend = new Animal(34);
//     rat3.friend = new Rat(34);
//     delete rat3.friend.color
//     expect(equals(rat1, rat2)).to.be.false;
//     expect(equals(rat1, rat3)).to.be.false
//   })
//   it("should not test array<object> equality", function(){
//     expect(equals([{id:1},new Animal(2)],[{id:1},new Animal(2)])).to.be.false
//     expect(equals([{id:1},new Animal(1)],[{id:1},new Animal(3)])).to.be.false
//   })
//   it("should not test object<array> equality", function(){
//     const r1 = {user:{id:1,name:"ron",equips:[new Rat(40, "grey")]}};
//     const r2 = {user:{id:1,name:"ron",equips:[new Rat(40, "grey")]}};
//     const r3 = {user:{id:1,name:"ron",equips:[new Rat(40, "tan")]}}
//     expect(equals(r1,r2)).to.be.false
//     expect(equals(r1,r3)).to.be.false
//   })
// })

// describe("deepEqualsFast", function(){
//   it("should test string equality", function(){
//     expect(deepEqualsFast("a","a")).to.be.true
//     expect(deepEqualsFast("a","b")).to.be.false
//   })
//   it("should test number equality", function(){
//     expect(deepEqualsFast(42,42)).to.be.true
//     expect(deepEqualsFast(42,23)).to.be.false
//   })
//   it("should test `NaN` equality", function(){
//     expect(deepEqualsFast(NaN,NaN)).to.be.true
//     expect(deepEqualsFast(NaN,"NaN")).to.be.false
//   })
//   it("should test boolean equality", function(){
//     expect(deepEqualsFast(true,true)).to.be.true
//     expect(deepEqualsFast(true,false)).to.be.false
//   })
//   it("should test `null` equality", function(){
//     expect(deepEqualsFast(null,null)).to.be.true
//     expect(deepEqualsFast(null,undefined)).to.be.false
//   })
//   it("should test `undefined` equality", function(){
//     expect(deepEqualsFast(undefined,undefined)).to.be.true
//     expect(deepEqualsFast(null,undefined)).to.be.false
//   })
//   it("should test `Infinity` equality", function(){
//     expect(deepEqualsFast(Infinity,Infinity)).to.be.true
//     expect(deepEqualsFast(NaN,Infinity)).to.be.false
//   })
//   it("should test array equality", function(){
//     expect(deepEqualsFast([1,2,3],[1,2,3])).to.be.true
//     expect(deepEqualsFast([1,2,3],[1,2])).to.be.false
//   })
//   it("should test object equality", function(){
//     expect(deepEqualsFast({class:"red-div"},{class:"red-div"})).to.be.true
//     expect(deepEqualsFast({class:"red-div"},{class:"blue-div"})).to.be.false
//   })
//   it("should not correctly test RegExp equality", function(){
//     expect(deepEqualsFast(/reg/, /reg/)).to.be.true
//     expect(deepEqualsFast(/reg/, /reg2/)).to.be.true
//   })
//   it("should not correctly test Date equality", function(){
//     const now = Date.now();
//     const d1 = new Date(now);
//     const d2 = new Date(now);
//     const d3 = new Date(now + 1);
//     expect(deepEqualsFast(d1,d2)).to.be.true
//     expect(deepEqualsFast(d1,d3)).to.be.true
//   })
//   it("should not correctly test non-literal object equality", function(){
//     const rat1 = new Rat(15, "brown")
//     const rat2 = new Rat(15, "brown")
//     const rat3 = new Animal(15);
//     rat3.color = "brown";
//     expect(deepEqualsFast(rat1, rat2)).to.be.true;
//     expect(deepEqualsFast(rat1, rat3)).to.be.true
//   })
//   it("should not correctly test nested non-literal object equality", function(){
//     const rat1 = new Rat(15, "brown")
//     const rat2 = new Rat(15, "brown")
//     const rat3 = new Rat(15, "brown")
//     rat1.friend = new Animal(34);
//     rat2.friend = new Animal(34);
//     rat3.friend = new Rat(34);
//     delete rat3.friend.color
//     expect(deepEqualsFast(rat1, rat2)).to.be.true;
//     expect(deepEqualsFast(rat1, rat3)).to.be.true
//   })
//   it("should test nested array equality", function(){
//     expect(deepEqualsFast([1,2,[3,4]],[1,2,[3,4]])).to.be.true
//     expect(deepEqualsFast([1,2,[3,4]],[1,2,[3]])).to.be.false
//   })
//   it("should test nested object equality", function(){
//     expect(deepEqualsFast({user:{id:1,name:"ron"}},{user:{id:1,name:"ron"}})).to.be.true
//     expect(deepEqualsFast({user:{id:1,name:"ron"}},{user:{id:2,name:"ron"}})).to.be.false
//   })
//   it("should test array<object> equality", function(){
//     expect(deepEqualsFast([{id:1},{id:2}],[{id:1},{id:2}])).to.be.true
//     expect(deepEqualsFast([{id:1},{id:2}],[{id:1},{id:2.1}])).to.be.false
//   })
//   it("should test object<array> equality", function(){
//     const r1 = {user:{id:1,name:"ron",equips:["broken wand"]}};
//     const r2 = {user:{id:1,name:"ron",equips:["broken wand"]}};
//     const r3 = {user:{id:1,name:"ron",equips:["40 year old rat"]}}
//     expect(deepEqualsFast(r1,r2)).to.be.true
//     expect(deepEqualsFast(r1,r3)).to.be.false
//   })
// })

// describe("deepEquals", function(){
//   it("should test string equality", function(){
//     expect(deepEquals("a","a")).to.be.true
//     expect(deepEquals("a","b")).to.be.false
//   })
//   it("should test number equality", function(){
//     expect(deepEquals(42,42)).to.be.true
//     expect(deepEquals(42,23)).to.be.false
//   })
//   it("should test `NaN` equality", function(){
//     expect(deepEquals(NaN,NaN)).to.be.true
//     expect(deepEquals(NaN,"NaN")).to.be.false
//   })
//   it("should test boolean equality", function(){
//     expect(deepEquals(true,true)).to.be.true
//     expect(deepEquals(true,false)).to.be.false
//   })
//   it("should test `null` equality", function(){
//     expect(deepEquals(null,null)).to.be.true
//     expect(deepEquals(null,undefined)).to.be.false
//   })
//   it("should test `undefined` equality", function(){
//     expect(deepEquals(undefined,undefined)).to.be.true
//     expect(deepEquals(null,undefined)).to.be.false
//   })
//   it("should test `Infinity` equality", function(){
//     expect(deepEquals(Infinity,Infinity)).to.be.true
//     expect(deepEquals(NaN,Infinity)).to.be.false
//   })
//   it("should test RegExp equality", function(){
//     expect(deepEquals(/reg/, /reg/)).to.be.true
//     expect(deepEquals(/reg/, /reg2/)).to.be.false
//   })
//   it("should test Date equality", function(){
//     const now = Date.now();
//     const d1 = new Date(now);
//     const d2 = new Date(now);
//     const d3 = new Date(now + 1);
//     expect(deepEquals(d1,d2)).to.be.true
//     expect(deepEquals(d1,d3)).to.be.false
//   })
//   it("should test array equality", function(){
//     expect(deepEquals([1,2,3],[1,2,3])).to.be.true
//     expect(deepEquals([1,2,3],[1,2])).to.be.false
//   })
//   it("should test object equality", function(){
//     expect(deepEquals({class:"red-div"},{class:"red-div"})).to.be.true
//     expect(deepEquals({class:"red-div"},{class:"blue-div"})).to.be.false
//   })
//   it("should test non-literal object equality", function(){
//     const rat1 = new Rat(15, "brown")
//     const rat2 = new Rat(15, "brown")
//     const rat3 = new Animal(15);
//     rat3.color = "brown";
//     expect(deepEquals(rat1, rat2)).to.be.true;
//     expect(deepEquals(rat1, rat3)).to.be.false
//   })
//   it("should test nested array equality", function(){
//     expect(deepEquals([1,2,[3,4]],[1,2,[3,4]])).to.be.true
//     expect(deepEquals([1,2,[3,4]],[1,2,[3]])).to.be.false
//   })
//   it("should test nested object equality", function(){
//     expect(deepEquals({user:{id:1,name:"ron"}},{user:{id:1,name:"ron"}})).to.be.true
//     expect(deepEquals({user:{id:1,name:"ron"}},{user:{id:2,name:"ron"}})).to.be.false
//   })
//   it("should test nested non-literal object equality", function(){
//     const rat1 = new Rat(15, "brown")
//     const rat2 = new Rat(15, "brown")
//     const rat3 = new Rat(15, "brown")
//     rat1.friend = new Animal(34);
//     rat2.friend = new Animal(34);
//     rat3.friend = new Rat(34);
//     delete rat3.friend.color
//     expect(deepEquals(rat1, rat2)).to.be.true;
//     expect(deepEquals(rat1, rat3)).to.be.false
//   })
//   it("should test array<object> equality", function(){
//     expect(deepEquals([{id:1},new Animal(2)],[{id:1},new Animal(2)])).to.be.true
//     expect(deepEquals([{id:1},new Animal(1)],[{id:1},new Animal(3)])).to.be.false
//   })
//   it("should test object<array> equality", function(){
//     const r1 = {user:{id:1,name:"ron",equips:[new Rat(40, "grey")]}};
//     const r2 = {user:{id:1,name:"ron",equips:[new Rat(40, "grey")]}};
//     const r3 = {user:{id:1,name:"ron",equips:[new Rat(40, "tan")]}}
//     expect(deepEquals(r1,r2)).to.be.true
//     expect(deepEquals(r1,r3)).to.be.false
//   })
// })
