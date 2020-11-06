

function EventProcessors(processors) {
    if (!(this instanceof EventProcessors)) {
        return new EventProcessors()
    }
    this.listProcessor = processors
}


EventProcessors.prototype.process = function(event) {
    var type = event.type
    const processor = this.listProcessor.filter(value => value.accept(type))
    if(processor){
        processor.map(it => it.execute(event))
    }
}

module.exports = EventProcessors;
