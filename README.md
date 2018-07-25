# atlas-deep-equals

Recursively tests deep or shallow equality for primitive structures.

[![Travis](https://img.shields.io/travis/atlassubbed/atlas-deep-equals.svg)](https://travis-ci.org/atlassubbed/atlas-deep-equals)

---

## install

```
npm install --save atlas-deep-equals
```

## why

This is a very fast, key-order independent, deep/shallow equality check for *simple* data trees. This is meant for comparing simple (plain old javascript objects) data and is not to be used on objects containing complex prototype chains.

`JSON.stringify(a) === JSON.stringify(b)` is an unsafe way to deep-compare objects, and is not used here. Exceptions for `Date`, `Regexp` and `NaN` objects are outside the scope of this package. 

## examples

First, import the `equals` function:

```javascript
const equals = require("atlas-deep-equals");
```

### shallow comparisons

If you know your data is not nested or you are using immutable subtrees, simply perform a shallow equals:

```javascript
const props1 = {color: "red", name: "atlas", id: "ABhGjUyFt", age: 109}
const props2 = {color: "red", name: "atlas", id: "ABhGjUyFt", age: 29}

equals(props1, props2)
// false
```

### deep comparisons

If you have nested data and are not using immutability, then you can pass `true` as a third argument to perform a recursive comparison:

```javascript
const props1 = {
  posts: [
    {id: 1, text: "Hi!"},
    {id: 2, text: "Hello."},
    {id: 3, text: "Hola!!"}
  ],
  comments: [
    {id: 4, text: "Bye"},
    {id: 5, text: "see you later"}
  ]
}
const props2 = {
  posts: [
    {id: 1, text: "Hi!"},
    {id: 2, text: "Hello."},
    {id: 3, text: "Hola!!"}
  ],
  comments: [
    {id: 4, text: "Bye"},
    {id: 5, text: "see you later"}
  ]
}
const isDeep = true;
equals(props1, props2, isDeep);
// true
```

### immutability

Immutable objects make use of strict reference equality (`===`) to perform fast comparisons regardless of how nested the data is. Every time an immutable object receives an update, a brand new reference will be returned that points to the new version of the object.

Both shallow and deep `equals` will perform a reference equality check (`===`) as a short circuit before checking anything else. In the event that the references are different, `equals` will iterate (and recurse, if deep) over the object's keys/indices.

This means that if `props1` and `props2` are themselves immutable, do *not* use `equals`. Instead, use `props1 === props2` to check if they are not equal to each other.

Similarly, if `props1` and `props2` are mutable, but their top-level fields are all primitives and/or immutable, do *not* use deep `equals`. Insead, use `equals(props1, props2)` to perform a fast shallow comparison.

## caveats

### `Date`, `RegExp`

Deep-equality libraries tend to make exceptions for commonly used objects:

```javascript
...
if (isDate(a)) return isDate(b) && a.valueOf() === b.valueOf();
if (isRegExp(a)) return isRegExp(b) && a.toString() === b.toString();
...
```

This library doesn't. If a complex type can be reduced to a primitive, it makes more sense for the caller to normalize the input than for `equals` to guess what non-primitives the caller is using.

### `NaN`

`NaN` usually arises in javascript because of an error in some logic -- `equals` assumes `NaN` is taken care of by the caller. Testing for `NaN` in `equals` would be trivial, but seems unnecessary; I may decide to add a `NaN` check later, though.

### plain old javascript objects

Unless you are using some sort of immutable object (making deep `equals` irrelevant), `equals` expects
