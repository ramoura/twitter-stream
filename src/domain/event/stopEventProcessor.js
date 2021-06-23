const eventEmitter = require('../eventEmitter');


function StopEventProcessor(){

}

StopEventProcessor.prototype.execute = function(doProcess){
    eventEmitter.emit('stream-stop');
}

StopEventProcessor.prototype.accept = function(type){
    return type == 'stop'
}


module.exports = StopEventProcessor
