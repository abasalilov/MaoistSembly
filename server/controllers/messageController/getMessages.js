var messageModel = require('../../models/messageModels');

module.exports = (req, res) => {
  var eventId = req.body.eventId;
  messageModel.findEventMessages(eventId)
  .then((messageArr) => {
    res.body=messageArr;
    res.status(200).send(messageArr)
    console.log('********************************res before ~~~~~~~~~~~~~', res)
    console.log('********************************res before', res.body)
  })
  .catch((err) => {
    res.status(500).send();
  });
};
