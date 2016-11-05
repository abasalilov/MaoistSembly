var Message = require('../../schemas/messageSchema.js');

module.exports = (eventId) => {
  return Message.find({ event: eventId })
  .then(function(messages){
        // console.log('results', results)
    messages.sort(function(a, b) {
      return b.createdAt - a.createdAt;
    })
    
    return messages;
  })
    .catch(function(err){
      if(err) {
        console.error(err)
      }
    })
  }