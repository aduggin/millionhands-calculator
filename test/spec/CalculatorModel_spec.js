/*globals CalculatorModel:false*/

describe('CalculatorModel', function () {
  'use strict';

  var calc;
  var data = {
    email: 17000,
    facebook: 186000,
    instagram: 5000,
    twitter: 3000
  };

  beforeEach(function () {
    calc = new CalculatorModel(data);
  });

  describe('getCalculation()', function () {
    it('returns a value', function () {
      expect(calc.getCalculation()).toEqual(468720);
    });
  });
});