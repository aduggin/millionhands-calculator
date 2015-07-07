/*globals CalculatorController:false*/

describe('CalculatorController', function () {
  'use strict';

  var view, controller;

  beforeEach(function() {
    loadFixtures('calculator.html');
    view = {
      container: '#calculator',
      email: '#email',
      facebookFan: '#facebook-fan',
      instagram: '#instagram',
      twitter: '#twitter',
      submit: 'input[type=submit]',
      feedback: '#feedback',
      result: '#result'
    };
    controller = new CalculatorController(view);
  });

  describe('init()', function () {
    it('adds click handler to calculate button', function () {
      controller.init();
      var $submit = $(view.submit);

      expect($submit).toHandleWith('click', controller.submitHandler);
    });
  });


  describe('getFormData()', function () {
    it('extracts values from the form and returns them as an object', function () {
      $(view.email).val('17000');
      $(view.facebookFan).val('39000');
      $(view.instagram).val('5000');
      $(view.twitter).val('3000');

      var expectedFormData = {
        email: 17000,
        facebookFan: 39000,
        instagram: 5000,
        twitter: 3000
      };

      expect(controller.getFormData()).toEqual(expectedFormData);
    });

    describe('when form fields are empty', function () {
      it('returns object values as 0', function () {
        var expectedFormData = {
          email: 0,
          facebookFan: 0,
          instagram: 0,
          twitter: 0
        };

        expect(controller.getFormData()).toEqual(expectedFormData);
      });
    });
  });

  describe('getCalculationsFromModel()', function () {
    it('gets the growthValue and interest from the model as an object', function () {
      var formData = {
        email: 17000,
        facebookFan: 39000,
        instagram: 5000,
        twitter: 3000
      };

      expect(controller.getCalculationsFromModel(formData)).toEqual(10060);
    });
  });
});