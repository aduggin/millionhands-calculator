/*globals CalculatorModel:false*/

describe('CalculatorModel', function () {
  'use strict';

  var calc;
  var data = {
    email: 17000,
    facebookFan: 39000,
    facebookDj: 0,
    instagram: 5000,
    twitter: 3000
  };

  beforeEach(function () {
    calc = new CalculatorModel(data);
  });

  describe('getCalculation()', function () {
    it('returns a value', function () {
      expect(calc.getCalculation()).toEqual(10060);
    });
  });
});