var kafka = require('kafka-node')


function MessageProducer(topic){
    if (!(this instanceof MessageProducer)) { return new MessageProducer(topic) }

    this.topic = topic;
    const Producer = kafka.Producer
    const clientK = new kafka.KafkaClient({kafkaHost: 'broker-kafka:9092'}) // todo refac to singleton
    this._producer = new Producer(clientK)
}

MessageProducer.prototype.sendMessage = function(message){
    if(this._producer.ready) {
        this._producer.send([{ topic: this.topic, messages: [message] }], function (err, data) {
            if (err) console.log(err)
            //console.log(data)
        });
    }else{
        console.log("Kafka is not ready")
    }
}



module.exports = MessageProducer;
