const eventEmitter = require('../eventEmitter');

function ConfigEventProcessor(){

}
ConfigEventProcessor.prototype.accept = function(type){
    return type == 'config'
}

ConfigEventProcessor.prototype.execute = function(doProcess){
    eventEmitter.emit('stream-config', doProcess);
}

module.exports = ConfigEventProcessor
