const isArr = Array.isArray;
const keys = Object.keys;
const has = Object.prototype.hasOwnProperty
const isObj = obj => typeof obj === "object";

// deep or shallow equals primitive nested structures
// caller is responsible for:
//   storing date/regex/class as primitives
//   understanding that NaN !== NaN
const equals = (a, b, deep) => {
  if (a === b) return true;
  if (!(a && b && isObj(a) && isObj(b))) return false;
  if (isArr(a)){
    if (!isArr(b)) return false;
    let n = a.length;
    if (n !== b.length) return false;
    if (deep) while(n--) {
      if (!equals(a[n], b[n], true)) return false;
    } else while(n--) {
      if (a[n] !== b[n]) return false;
    }
    return true;
  }
  let keysA = keys(a), n, m, k;
  n = m = keysA.length;
  // avoid recursion, fails fast
  if (deep){
    if (n !== keys(b).length) return false;
    while(n--) if (!has.call(b, keysA[n])) return false;
    while(m--) if (!equals(a[k = keysA[m]], b[k], true)) return false;
    return true;
  }
  while (n--) {
    if (!has.call(b, k = keysA[n]) || a[k] !== b[k]) return false;
  }
  return m === keys(b).length;
}

module.exports = equals
