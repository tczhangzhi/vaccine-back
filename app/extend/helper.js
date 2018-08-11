'use strict';
const random = require('./random');

module.exports = {
  get randomChild() {
    return {
      name: random.getName(),
      days: random.getDays(),
    };
  },
  get initChild() {
    return {
      name: random.getName(),
      days: 0,
    };
  },
  get randomBoolean() {
    return Math.random() > 0.5;
  },
  randomInt (start, end) {
    return parseInt(Math.random()*(end - start + 1) + start)
  },
  dataFormat (data) {
    for (let index in data) {
      if (data[index] instanceof Array) {
        data[index] = this.dataFormat(data[index]);
      }
    }
    return `[${data.join(' ')}]`;
  },
};
