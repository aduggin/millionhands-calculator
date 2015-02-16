/*globals CalculatorModel:false*/

(function(global) {
  'use strict';

  var proto, self;

  function CalculatorController(view) {
    this.$container = $(view.container);
    this.$email = $(view.email);
    this.$facebook = $(view.facebook);
    this.$instagram = $(view.instagram);
    this.$twitter = $(view.twitter);
    this.$submit = $(view.submit);
    this.$result = $(view.result);

    self = this;
  }

  proto = CalculatorController.prototype;

  proto.init = function () {
    this.$container.find(this.$submit ).on('click', this.submitHandler);
  };

  proto.submitHandler = function () {
    var formData = self.getFormData();
    var result = self.getCalculationsFromModel(formData);
    self.$result.text(result);
  };

  proto.getFormData = function () {
    var email = this.$container.find(this.$email).val() || 0;
    var facebook = this.$container.find(this.$facebook).val() || 0;
    var instagram = this.$container.find(this.$instagram).val() || 0;
    var twitter = this.$container.find(this.$twitter).val() || 0;

    var formData = {
      email:   parseInt(email),
      facebook: parseInt(facebook),
      instagram:  parseInt(instagram),
      twitter:  parseInt(twitter)
    };

    return formData;
  };

  proto.getCalculationsFromModel = function(formData) {
    var model = new CalculatorModel(formData);

    return model.getCalculation();
  };

  proto.renderResult = function(formData) {
    var model = new CalculatorModel(formData);

    return model.getCalculation();
  };

  global.CalculatorController = CalculatorController;

})(this);