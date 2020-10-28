var credentials = require('./twitter.credentials.json');
var Twitter = require('twitter');
var kafka = require('kafka-node'),
    Producer = kafka.Producer,
    clientK = new kafka.KafkaClient({kafkaHost: 'kafka-dev:9092'}),
    producer = new Producer(clientK);

var client = new Twitter({
    consumer_key: credentials.consumer_key,
    consumer_secret: credentials.consumer_secret,
    access_token_key: credentials.access_token_key,
    access_token_secret: credentials.access_token_secret
});



producer.on('ready', function () {
    var stream = client.stream('statuses/filter', { track: 'vacina, bolsonaro, stf' });
    stream.on('data', function (event) {
        producer.send([{ topic: 'test-events', messages: [JSON.stringify(event.text)] }], function (err, data) {
            if(err) console.log(err)
        });
    });
});
