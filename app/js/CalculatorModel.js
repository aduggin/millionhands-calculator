(function(global) {
  'use strict';

  var EMAIL_MULTIPLIER = 0.3;
  var FACEBOOK_MULTIPLIER = 0.12;
  var INSTAGRAM_MULTIPLIER = 0.05;
  var TWITTER_MULTIPLIER = 0.01;

  function CalculatorModel(data) {
    this.email = data.email || 0;
    this.facebookFan = data.facebookFan || 0;
    this.instagram = data.instagram || 0;
    this.twitter =  data.twitter || 0;
  }

  CalculatorModel.prototype.getCalculation = function () {
    var emailResult = this.email * EMAIL_MULTIPLIER;
    var facebookFanResult = this.facebookFan * FACEBOOK_MULTIPLIER;
    var instagramResult = this.instagram * INSTAGRAM_MULTIPLIER;
    var twitterResult = this.twitter * TWITTER_MULTIPLIER;

    return emailResult + facebookFanResult + instagramResult + twitterResult ;
  };

  global.CalculatorModel = CalculatorModel;

})(this);
