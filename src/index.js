const TwitterStream = require('./domain/twitterStream')
const EventProcessors = require('./domain/event/eventProcessors')

const twitterStream = new TwitterStream();
const eventProcessors = new EventProcessors();

twitterStream.start()
eventProcessors.start()



const eventEmitter = require('./domain/eventEmitter');

setTimeout(function () {
    eventEmitter.emit('stream-config', { track: 'vacina, bolsonaro, trump, biden' });
    eventEmitter.emit('stream-resume');
}, 10000);

