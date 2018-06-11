'use strict';

const {Transform} = require('stream');

const defaultItemFilter = () => true;

class FilterObjects extends Transform {
  static filterObjects(options) {
    return new FilterObjects(options);
  }

  constructor(options) {
    super(Object.assign({}, options, {writableObjectMode: true, readableObjectMode: true}));

    this.itemFilter = options && options.itemFilter;
    if (typeof this.itemFilter != 'function') {
      this.itemFilter = defaultItemFilter;
    }
  }

  setFilter(newItemFilter) {
    if (typeof newItemFilter != 'function') {
      newItemFilter = defaultItemFilter;
    }
    this.itemFilter = newItemFilter;
  }

  _transform(chunk, encoding, callback) {
    if (this.itemFilter(chunk)) {
      this.push(chunk);
    }
    callback(null);
  }
}

module.exports = FilterObjects;
