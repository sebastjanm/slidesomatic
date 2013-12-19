import ValidationMixin from 'appkit/models/validators/validation_mixin';

import YoutubeValidator from 'appkit/models/validators/youtube';

var attr = DS.attr;

export default DS.Model.extend(ValidationMixin, {
  url: attr(),
  start: attr(),
  presentation: DS.belongsTo('presentation'),

  validators: {
    youtube: YoutubeValidator
  }
});