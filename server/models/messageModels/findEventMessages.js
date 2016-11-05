var Message = require('../../schemas/messageSchema.js');

module.exports = (eventId) => {
  return Message.find({ event: eventId })
  .then(function(messages){
    return messages;
  })
  .catch(function(err){
    if(err) {
      console.error(err)
    }
  })
}