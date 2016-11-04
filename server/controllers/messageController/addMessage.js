var messageModel = require('../../models/messageModels');

module.exports = (req, res) => {
  var eventId = req.body.eventId;
  var userId = req.body.userId;
  var text = req.body.text
<<<<<<< 9284fa690cea981de8683260950e1dd6d8c32d45

=======
  console.log('~~~~~~~~~~~~~~~~~~~~~req.body', req.body)
>>>>>>> Wire up the back-end
  messageModel.addMessage(eventId, userId, text)
  .then((message) => {
    if (message) {
      res.status(200).send(message);
    }
  })
  .catch((err) => {
    res.status(500).send();
  });
};
