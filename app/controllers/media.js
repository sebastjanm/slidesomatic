function round(num) {
  return Math.round(num*10) / 10;
}

var equal = Em.computed.equal;

export default Ember.ObjectController.extend({
  player: Em.computed.alias('playback.mediaPlayer'),
  editMode: false,
  youtube: equal('domainRoot', 'youtube'),
  soundcloud: equal('domainRoot', 'soundcloud'),
  vimeo: equal('domainRoot', 'vimeo'),
  scrubHighValue: 50,
  scrubMediumValue: 50,
  scrubLowValue: 50,

  getCurrentTime: function() {
    return round(this.get('player').currentTime());
  },

  skipTo: function(time, play) {
    var player = this.get('player');
    if (play) { player.play(time); }
    else { player.currentTime(time); }
  },

  resetScrubbers: function() {
    this.set('scrubHighValue', 50);
    this.set('scrubMediumValue', 50);
    this.set('scrubLowValue', 50);
    $('input[type=range]').first().focus();
  },

  scrub: function(change, magnitude) {
    var player = this.get('player'),
        time = this.getCurrentTime();

    player.currentTime(round(time + magnitude*change));
  },

  actions: {
    scrubHigh: function(change) {
      this.scrub(change, 5);
    },

    scrubMedium: function(change) {
      this.scrub(change, 1);
    },

    scrubLow: function(change) {
      this.scrub(change, 1/5);
    }
  }
});
