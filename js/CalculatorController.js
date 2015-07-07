/*globals CalculatorModel:false*/

(function(global) {
  'use strict';

  var proto, self;

  function CalculatorController(view) {
    this.view = view;
    this.$container = $(view.container);
    this.$email = $(view.email);
    this.$facebookFan = $(view.facebookFan);
    this.$instagram = $(view.instagram);
    this.$twitter = $(view.twitter);
    this.$submit = $(view.submit);

    this.insertHTML();

    self = this;
  }

  proto = CalculatorController.prototype;

  proto.init = function () {
    this.$container.find(this.$submit ).on('click', this.submitHandler);
  };

  proto.insertHTML = function() {
    var html = $(this.view.messageTmpl).html();
    this.$container.after(html);

    this.$message = $(this.view.message);
    this.$message.hide();

    this.$resultAnnually = $(this.view.resultAnnually);
    this.$resultMonthly = $(this.view.resultMonthly);
  };

  proto.submitHandler = function () {
    var formData = self.getFormData();
    var result = self.getCalculationsFromModel(formData);

    self.$message.show();
    self.$resultMonthly.text(result);
    self.$resultAnnually.text(result * 12);
  };

  proto.getFormData = function () {
    var email = this.$container.find(this.$email).val() || 0;
    var facebookFan = this.$container.find(this.$facebookFan).val() || 0;
    var instagram = this.$container.find(this.$instagram).val() || 0;
    var twitter = this.$container.find(this.$twitter).val() || 0;

    var formData = {
      email:   parseInt(email),
      facebookFan: parseInt(facebookFan),
      instagram:  parseInt(instagram),
      twitter:  parseInt(twitter)
    };

    return formData;
  };

  proto.getCalculationsFromModel = function(formData) {
    var model = new CalculatorModel(formData);

    return model.getCalculation();
  };

  global.CalculatorController = CalculatorController;

})(this);