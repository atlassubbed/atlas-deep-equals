const { isArr, isDate, isRegExp, protoOf, primEquals } = require("./util");

// deep or shallow equals primitive nested structures
const equalsFast = (a, b, deep) => {
  if (a === b) return true;
  if (!(a && b && typeof a === "object" && typeof b === "object")) return false;
  if (isArr(a)){
    if (!isArr(b)) return false;
    let n = a.length;
    if (n !== b.length) return false;
    while(n--) if (deep ? !equalsFast(a[n],b[n],deep) : a[n] !== b[n]) return false;
    return true;
  }
  let numKeys1 = 0;
  for (let f in a){
    if (!(f in b && deep ? equalsFast(a[f],b[f],deep) : a[f] === b[f])) return false;
    numKeys1++;
  }
  return numKeys1 === Object.keys(b).length;
}

// same as above but test NaN and complex objects
const equals = (a, b, deep) => {
  const p = primEquals(a, b);
  if (p !== undefined) return p;
  if (isDate(a)) return isDate(b) && a.valueOf() === b.valueOf();
  if (isRegExp(a)) return isRegExp(b) && a.toString() === b.toString();
  if (isArr(a)){
    if (!isArr(b)) return false;
    let n = a.length;
    if (n !== b.length) return false;
    while(n--) if (!(deep ? equals(a[n],b[n],deep) : primEquals(a[n], b[n])))return false;
    return true;
  }
  if (protoOf(a) !== protoOf(b)) return false;
  let numKeys1 = 0;
  for (let f in a){
    if (!(f in b && deep ? equals(a[f],b[f],deep) : primEquals(a[f], b[f]))) return false;
    numKeys1++;
  }
  return numKeys1 === Object.keys(b).length;
}

module.exports = { equals, equalsFast }
