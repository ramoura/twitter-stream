const eventEmitter = require('./eventEmitter');

/* API Twitter */
const credentials = require('../twitter.credentials.json');
const Twitter = require('twitter');
const MessageProducer = require('../drivers/messageProducer')


function TwitterStream() {
    if (!(this instanceof TwitterStream)) {
        return new TwitterStream()
    }
    this.eventEmitter = eventEmitter;

    this.client = new Twitter({
        consumer_key: credentials.consumer_key,
        consumer_secret: credentials.consumer_secret,
        access_token_key: credentials.access_token_key,
        access_token_secret: credentials.access_token_secret
    });
    this.messageProducer = new MessageProducer('test-events')

    configureStreamProcessor()

}


function configureStreamProcessor() {

}

TwitterStream.prototype.configure = function (config) {
    //'vacina, bolsonaro, stf'
    this.stream = this.client.stream('statuses/filter', { track: config.track });
}

TwitterStream.prototype.resume = function () {
    if (!this.stream) return

    const that = this;
    this.stream.on('data', function (event) {
        that.messageProducer.sendMessage(JSON.stringify(event))
    });
    this.stream.on('error', function (event) {
        console.log('Error received')
    });
    this.stream.on('end', function (event) {
        console.log('Ended received')
    });


}

TwitterStream.prototype.start = function () {
    this.eventEmitter.on('stream-config', (config) => {
        console.log('Event Received, stream-config: ', config);
        this.configure(config)
    });

    this.eventEmitter.on('stream-resume', () => {
        console.log('Event Received, stream-resume: ');
        this.resume()
    });
    this.eventEmitter.on('stream-stop', () => {
        console.log('Event Received, stream-stop: ');
        this.stop()
    });
}

TwitterStream.prototype.stop = function () {
    if (!this.stream) return

    this.stream.destroy();
}



module.exports = TwitterStream
