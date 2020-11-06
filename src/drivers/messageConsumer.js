var kafka = require('kafka-node')




function MessageProducer(topic) {
    if (!(this instanceof MessageProducer)) {
        return new MessageProducer(topic)
    }
    let Consumer = kafka.Consumer
    let client = new kafka.KafkaClient({kafkaHost: 'broker-kafka:9092'})
    this.consumer = new Consumer(
        client,
        [
            { topic: topic, partition: 0 }
        ],
        {
            autoCommit: true
        }
    )

}

MessageProducer.prototype.onMessage = function(doProcess){
    this.consumer.on('message', function (message) {
        console.log(`Message received: ${JSON.stringify(message)}`)
        doProcess(JSON.parse(message.value))
    });

}


module.exports = MessageProducer;
