const toStr = toString || Object.prototype.toString;

const isArr = Array.isArray

const isDate = d => !!d && d instanceof Date || toStr.call(d) === "[object Date]"

const isRegExp = r => !!r && r instanceof RegExp || toStr.call(r) === "[object RegExp]"

const protoOf = v => {
  if (Object.getPrototypeOf) return Object.getPrototypeOf(v);
  return v.__proto__ || v.constructor && v.constructor.prototype;
}

const primEquals = (a, b) => {
  if (a === b) return true;
  const ta = typeof a, tb = typeof b;
  if (ta !== tb || ta === "string") return false;
  if (ta === "number") return isNaN(a) && isNaN(b);
  if (!(a && b && ta === "object")) return false;
}

module.exports = { isArr, isDate, isRegExp, protoOf, primEquals }
