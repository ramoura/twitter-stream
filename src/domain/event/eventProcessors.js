
/* Event Processor */
const MessageConsumer = require('../../drivers/messageConsumer')
const ConfigEventProcessor = require('./configEventProcessor')
const ResumeEventProcessor = require('./resumeEventProcessor')
const StopEventProcessor = require('./stopEventProcessor')





function EventProcessors(processors) {
    if (!(this instanceof EventProcessors)) {
        return new EventProcessors()
    }
    this.listProcessor = processors
}

EventProcessors.prototype.start = function() {
    const eventProcessors = new EventProcessors([new ConfigEventProcessor(), new ResumeEventProcessor(), new StopEventProcessor()])
    const messageConsumer = new MessageConsumer('twitter-stream-events')
    messageConsumer.onMessage(msg => {
        eventProcessors.process(msg)
    })
}


EventProcessors.prototype.process = function(event) {
    var type = event.type
    const processor = this.listProcessor.filter(value => value.accept(type))
    if(processor){
        processor.map(it => it.execute(event))
    }
}

module.exports = EventProcessors;
