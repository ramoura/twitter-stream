

function ConfigEventProcessor(){

}

ConfigEventProcessor.prototype.execute = function(doProcess){
    console.log('Config', doProcess)

}

ConfigEventProcessor.prototype.accept = function(type){
    return type == 'config'
}

module.exports = ConfigEventProcessor
