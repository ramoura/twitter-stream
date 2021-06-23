const eventEmitter = require('../eventEmitter');


function ResumeEventProcessor(){

}

ResumeEventProcessor.prototype.execute = function(){
    eventEmitter.emit('stream-resume');
}

ResumeEventProcessor.prototype.accept = function(type){
    return type == 'resume'
}


module.exports = ResumeEventProcessor
