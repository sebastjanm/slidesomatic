import sequenceFinder from 'appkit/controllers/utils/sequence_finder';

var alias = Em.computed.alias;

export default Ember.ObjectController.extend({
  slide: 1,
  site: null,
  siteMode: false,

  needs: ['sequences'],
  sequences: alias('controllers.sequences'),
  currentSequence: alias('sequences.currentSequence'),
  presentationMode: alias('playback.presentationMode'),
  timeBinding: 'sequences.time',

  findSiteMode: sequenceFinder('site', function(self, seq) {
    return self.set('site', seq.get('site'));
  }).observes('time'),

  findSlide: function() {
    var seq = sequenceFinder.search(this, 'slide');

    if (!this.get('presentationMode') || !seq || seq.get('isMode')) { return; }
    this.set('slide', seq.get('slide'));
  }.observes('time'),

  nextSlide: function() {
    if (this.get('presentationMode')) {
      var sequences = this.get('sequences'),
          currentSequence = this.get('currentSequence'),
          currentIndex = sequences.get('currentSequenceIndex'),

          seq = sequences.find(function(seq, i) {
            if (i > currentIndex && !seq.get('isMode')) {
              return true;
            }
          });

      if (seq) { return seq.get('slide'); }
    }

    return this.get('slide') + 1;
  }.property('sequences', 'currentSequence', 'slide'),

  iframe: function() {
    var root = this.get('domainRoot');
    return root === 'google' || root === 'slid';
  }.property('domainRoot')
});
