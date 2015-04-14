/*globals CalculatorModel:false*/

describe('CalculatorModel', function () {
  'use strict';

  var calc;
  var data = {
    email: 17000,
    facebookFan: 93000,
    facebookDj: 93000,
    instagram: 5000,
    twitter: 3000
  };

  beforeEach(function () {
    calc = new CalculatorModel(data);
  });

  describe('getCalculation()', function () {
    it('returns a value', function () {
      expect(calc.getCalculation()).toEqual(39060);
    });
  });
});