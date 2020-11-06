/*
var credentials = require('./twitter.credentials.json');
var Twitter = require('twitter');
const MessageProducer = require('./drivers/messageProducer')

var client = new Twitter({
    consumer_key: credentials.consumer_key,
    consumer_secret: credentials.consumer_secret,
    access_token_key: credentials.access_token_key,
    access_token_secret: credentials.access_token_secret
});


const messageProducer = new MessageProducer('test-events')


const stream = client.stream('statuses/filter', { track: 'vacina, bolsonaro, stf' });
stream.on('data', function (event) {
    messageProducer.sendMessage(JSON.stringify(event))
});
*/

//---
const MessageConsumer = require('./drivers/messageConsumer')
const EventProcessors = require('./domain/processor/eventProcessors')

const ConfigEventProcessor = require('./domain/processor/configEventProcessor')
const ResumeEventProcessor = require('./domain/processor/resumeEventProcessor')

var configEventProcessor = new ConfigEventProcessor();
var resumeEventProcessor = new ResumeEventProcessor();

var eventProcessors = new EventProcessors([configEventProcessor,resumeEventProcessor])

var messageConsumer = new MessageConsumer('twitter-stream-events')
messageConsumer.onMessage(msg => {
    eventProcessors.process(msg)
})
