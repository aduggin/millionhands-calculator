(function(global) {
  'use strict';

  var EMAIL_MULTIPLIER = 0.5;
  var FACEBOOK_MULTIPLIER = 0.16;
  var INSTAGRAM_MULTIPLIER = 0.1;
  var TWITTER_MULTIPLIER = 0.1;

  function CalculatorModel(data) {
    this.email = data.email || 0;
    this.facebook = data.facebook || 0;
    this.instagram = data.instagram || 0;
    this.twitter =  data.twitter || 0;
  }


  CalculatorModel.prototype.getCalculation = function () {

    var emailResult = (this.email * EMAIL_MULTIPLIER) * 12;
    var facebookResult = (this.facebook * FACEBOOK_MULTIPLIER) * 12;
    var instagramResult = (this.instagram * INSTAGRAM_MULTIPLIER) * 12;
    var twitterResult = (this.twitter * TWITTER_MULTIPLIER) * 12;

    return emailResult + facebookResult + instagramResult + twitterResult;
  };

  global.CalculatorModel = CalculatorModel;

})(this);
