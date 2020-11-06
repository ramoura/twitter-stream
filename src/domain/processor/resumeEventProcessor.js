

function ResumeEventProcessor(){

}

ResumeEventProcessor.prototype.execute = function(doProcess){
    console.log('Resume', doProcess)
}

ResumeEventProcessor.prototype.accept = function(type){
    return type == 'resume'
}


module.exports = ResumeEventProcessor
