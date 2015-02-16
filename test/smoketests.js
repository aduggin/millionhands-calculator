module.exports = {
  'calculator shows result': function (test) {
    test.open('http://0.0.0.0:9000/')
      .type('#email', '100')
      .wait(5000)
      .click('#calculate')
      .assert.text('#result').is('600')
      .done();
  }
};