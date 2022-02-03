const { Plugin } = require('powercord/entities');
const { getModule } = require('powercord/webpack');


module.exports = class StereoCord extends Plugin {
  startPlugin () {
    this.VoiceConnection = getModule([ 'getVoiceEngine' ], false).getVoiceEngine().VoiceConnection;
    class Stereo extends this.VoiceConnection {
      setTransportOptions (obj) {
        console.log('setTransportOptions called:', obj);
        if (obj.audioEncoder) {
          obj.audioEncoder.params = { stereo: '15' };
          obj.audioEncoder.channels = 15;
        }
        if (obj.fec) {
          obj.fec = false;
        }
        if (obj.encodingVoiceBitRate < 458000) {
          obj.encodingVoiceBitRate = 458000;
        }
        super.setTransportOptions(obj);
      }
    }
    getModule([ 'getVoiceEngine' ], false).getVoiceEngine().VoiceConnection = Stereo;
  }

  pluginWillUnload () {
    getModule([ 'getVoiceEngine' ], false).getVoiceEngine().VoiceConnection = this.VoiceConnection;
  }
};
