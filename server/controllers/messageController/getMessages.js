var messageModel = require('../../models/messageModels');

module.exports = (req, res) => {
  var eventId = req.body.eventId;
  messageModel.findEventMessages(eventId)
  .then((messageArr) => {
    res.status(200).send(messageArr)
  })
  .catch((err) => {
    res.status(500).send();
  });
};
