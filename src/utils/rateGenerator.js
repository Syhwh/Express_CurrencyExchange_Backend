module.exports = {
  generateRate(min, max, time) {
    setInterval(() => Math.random() * (max - min) + min, time);
  }
};
